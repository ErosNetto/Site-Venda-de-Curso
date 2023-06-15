import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useLocation } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import { Main, TituloPag, SemCursos } from './styled';

export default function MetodosDePagamento() {
  const location = useLocation();

  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Metodos de pagamento
  const [cursos, setCursos] = useState([]);
  const [precoTotal, setprecoTotal] = useState(0);
  const [formaDePagamento, setFormaDePagamento] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormaDePagamento('PIX');

    const searchParams = new URLSearchParams(location.search);
    const rotaDeOrigem = searchParams.get('rotaDeOrigem');

    if (!rotaDeOrigem || String(rotaDeOrigem) !== '/carrinho-de-compras') {
      toast.warn('Você não pode acessar essa página!');
      history.push('/home');
    } else {
      const parametrosCursos = [];
      let index = 0;
      let curso = searchParams.get(`curso${index}`);
      const preco = searchParams.get('precoTotal');

      while (curso) {
        parametrosCursos.push(curso);
        index++;
        curso = searchParams.get(`curso${index}`);
      }

      setCursos(parametrosCursos);
      setprecoTotal(preco);
    }
  }, [location.search, location.state]);

  // Finaliza a compra
  async function comprar() {
    if (!userId || cursos.length === 0) return;

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    try {
      setIsLoading(true);

      // Verifica se já comprou o curso
      const responseVerifica = await axios.get('/perfil/');

      let cursoJaComprado = false;
      cursos.forEach((value) => {
        const itemEncontrado = responseVerifica.data.find(
          (item) => item.curso_id === value && item.user_id === userId
        );

        if (itemEncontrado) cursoJaComprado = true;
      });

      if (cursoJaComprado) {
        setIsLoading(false);
        toast.warn('Você já comprou esse curso!');
        history.push('home');
        return;
      }

      // Começa a fazer a transação
      cursos.forEach(async (value) => {
        await axios.post('/perfil/', {
          user_id: userId,
          curso_id: value,
        });

        await axios.post('/historicoDeCompras/', {
          curso_id: value,
          user_id: userId,
          dataDeCompra: dataFormatada,
          formaDePagamento,
        });

        const responseCar = await axios.get('/carrinhoDeCompras/');
        const itemEncontradoCar = responseCar.data.find(
          (item) => item.curso_id === Number(value) && item.user_id === userId
        );
        if (itemEncontradoCar)
          await axios.delete(`/carrinhoDeCompras/${itemEncontradoCar.id}`);

        const responseFav = await axios.get('/favoritos/');
        const itemEncontradoFav = responseFav.data.find(
          (item) => item.curso_id === Number(value) && item.user_id === userId
        );
        if (itemEncontradoFav)
          await axios.delete(`/favoritos/${itemEncontradoFav.id}`);
      });
      setIsLoading(false);

      toast.success('Compra feita com sucesso!');
      history.push('/perfil');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Metodos de Pagamento</h2>
          </TituloPag>

          <SemCursos>
            <h3>{`Cursos: ${cursos}`}</h3>
            <h3>{`Total: ${precoTotal}`}</h3>
            <button type="button" onClick={comprar}>
              comprar
            </button>
          </SemCursos>
        </Main>
      </ContainerBack>
    </>
  );
}
