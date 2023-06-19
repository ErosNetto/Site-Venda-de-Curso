import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { ContainerBack } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImagemResponsiva from '../../components/ImgResponsive';
import Loading from '../../components/Loading';
import {
  Main,
  TituloTexto,
  FooterTexto,
  GridListCurso,
  TextoCurso,
  BotoesCurso,
  PrecoCurso,
  Total,
  CarrinhoVazio,
} from './styled';

export default function CarrinhoDeCompras() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Carrinho de Compras
  const [carrinhoMaisCursos, setCarrinhoMaisCursos] = useState([]);
  const [carrinholength, setCarrinholength] = useState(0);
  const [favoritoslength, setFavoritoslength] = useState(0);
  const [precoTotal, setPrecoTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Finalizar carrinho
  // const [cursos, setCursos] = useState([]);

  useEffect(() => {
    if (!userId) return;

    // Get carrinho de compras
    async function getData() {
      setIsLoading(true);

      try {
        // Favoritos
        const responseFav = await axios.get('/favoritos/');
        const favoritoFiltrado = responseFav.data.filter(
          (favorito) => favorito.user_id === userId
        );
        setFavoritoslength(favoritoFiltrado.length);

        // Carrinho de Compras
        const responseCar = await axios.get('/carrinhoDeCompras/');
        const carrinhoFiltrado = responseCar.data.filter(
          (carrinho) => carrinho.user_id === userId
        );
        setCarrinholength(carrinhoFiltrado.length);

        const cursoPromises = carrinhoFiltrado.map((carrinho) =>
          axios.get(`/cursos/${carrinho.curso_id}`)
        );

        const cursoResponses = await Promise.all(cursoPromises);

        const carrinhoComCursos = carrinhoFiltrado.map((carrinho, index) => {
          const curso = cursoResponses[index].data;
          const idCarrinho = carrinho.id;
          setPrecoTotal((precoAnterior) => precoAnterior + curso.preco);
          return { idCarrinho, curso };
        });

        setCarrinhoMaisCursos(carrinhoComCursos);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }

      setIsLoading(false);
    }

    getData();
  }, [userId]);

  // Excluir o curso do carrinho de compras
  async function handleDeleteItem(e, idCarrinho, index) {
    e.persist();
    if (!idCarrinho) return;

    try {
      setIsLoading(true);

      await axios.delete(`/carrinhoDeCompras/${idCarrinho}`);
      const novosCursos = [...carrinhoMaisCursos];

      setPrecoTotal(
        (precoAnterior) => precoAnterior - novosCursos[index].curso.preco
      );

      novosCursos.splice(index, 1);
      setCarrinhoMaisCursos(novosCursos);
      setCarrinholength(novosCursos.length);

      setIsLoading(false);
      toast.success('Curso excluido');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao excluir o curso');
      }
    }
  }

  // Mover o curso para os favoritos
  async function handleAddFavoritos(e, idCarrinho, idCurso, index) {
    e.persist();
    if (!idCarrinho) return;

    try {
      setIsLoading(true);

      const response = await axios.get('/favoritos/');
      const favoritos = response.data;

      const cursoNosFavoritos = favoritos.find(
        (item) => item.curso_id === idCurso && item.user_id === userId
      );

      if (cursoNosFavoritos) {
        setIsLoading(false);
        toast.warn('Esse curso já está nos favoritos!');
        return;
      }

      await axios.delete(`/carrinhoDeCompras/${idCarrinho}`);
      const novosCursos = [...carrinhoMaisCursos];

      setPrecoTotal(
        (precoAnterior) => precoAnterior - novosCursos[index].curso.preco
      );

      novosCursos.splice(index, 1);
      setCarrinhoMaisCursos(novosCursos);
      setCarrinholength(novosCursos.length);
      setFavoritoslength((prevLength) => prevLength + 1);

      await axios.post('/favoritos/', {
        curso_id: idCurso,
        user_id: userId,
      });

      setIsLoading(false);
      toast.success('Curso adicionado aos favoritos');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao adicionar aos favoritos');
      }
    }
  }

  // Finaliza a compra, verificando se já possui o curso e enviado para metodos de pagamento
  async function finalizarCarrinho() {
    const rotaDeOrigem = '/carrinho-de-compras';
    const todosOsCursos = carrinhoMaisCursos.map(
      (carrinho) => carrinho.curso.id
    );

    try {
      setIsLoading(true);
      const response = await axios.get('/perfil/');

      let cursoNoCarrinho = false;
      todosOsCursos.forEach((value) => {
        const itemEncontrado = response.data.find(
          (item) => item.curso_id === value && item.user_id === userId
        );

        if (itemEncontrado) cursoNoCarrinho = true;
      });

      if (cursoNoCarrinho) {
        setIsLoading(false);
        toast.warn('Você já comprou esse curso!');
        return;
      }

      let parametros = '';
      for (let index = 0; index < todosOsCursos.length; index++) {
        parametros += `curso${index}=${todosOsCursos[index]}&`;
      }
      const url = `/metodos-de-pagamento?${parametros}precoTotal=${precoTotal}&rotaDeOrigem=${rotaDeOrigem}`;

      setIsLoading(false);
      history.push(url);
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

  // Comprar agora, verificando se já possui o curso e enviado para metodos de pagamento
  async function comprarAgora(e, idCurso, preco) {
    e.preventDefault();
    const rotaDeOrigem = '/carrinho-de-compras';

    try {
      setIsLoading(true);
      const response = await axios.get('/perfil/');

      const cursoNoCarrinho = response.data.find(
        (item) => item.curso_id === idCurso && item.user_id === userId
      );

      if (cursoNoCarrinho) {
        setIsLoading(false);
        toast.warn('Você já comprou esse curso!');
        return;
      }

      const url = `/metodos-de-pagamento?curso0=${idCurso}&precoTotal=${preco}&rotaDeOrigem=${rotaDeOrigem}`;
      history.push(url);
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
          <TituloTexto>
            <div className="carrinho">
              <h2>Carrinho({carrinholength})</h2>
            </div>
            <div className="favoritos">
              <Link to="/favoritos/">Favoritos({favoritoslength})</Link>
            </div>
          </TituloTexto>

          {carrinhoMaisCursos.length > 0 ? (
            carrinhoMaisCursos.map((item, index) => (
              <GridListCurso key={String(item.idCarrinho)}>
                <div className="imagen-curso">
                  <ImagemResponsiva
                    imageUrl={item.curso.FotoCursos[0].url}
                    width={250}
                    height={134}
                    alt="Imagem do curso"
                  />
                </div>

                <TextoCurso>
                  <h3>
                    <Link to={`/cursos/${item.curso.id}`}>
                      {item.curso.nome}
                    </Link>
                  </h3>
                  <BotoesCurso>
                    <Link
                      to="/carrinho-de-compras"
                      onClick={(e) =>
                        comprarAgora(e, item.curso.id, item.curso.preco)
                      }
                    >
                      Comprar agora
                    </Link>
                    <Link
                      to="/carrinho-de-compras/"
                      onClick={(e) =>
                        handleDeleteItem(e, item.idCarrinho, index)
                      }
                    >
                      Excluir
                    </Link>
                    <Link
                      to="/carrinho-de-compras/"
                      onClick={(e) =>
                        handleAddFavoritos(
                          e,
                          item.idCarrinho,
                          item.curso.id,
                          index
                        )
                      }
                    >
                      Mover para os favoritos
                    </Link>
                  </BotoesCurso>
                </TextoCurso>
                <PrecoCurso>
                  <h4>
                    {Number.isInteger(item.curso.preco)
                      ? `R$ ${item.curso.preco},00`
                      : `R$ ${item.curso.preco.toString().replace('.', ',')}`}
                  </h4>
                </PrecoCurso>
              </GridListCurso>
            ))
          ) : (
            <CarrinhoVazio>Seu carrinho está vazio</CarrinhoVazio>
          )}

          {carrinhoMaisCursos.length > 0 ? (
            <FooterTexto>
              <button type="button" onClick={finalizarCarrinho}>
                Finalizar comprar
              </button>
              <Total>
                <h5>Total:</h5>
                <h4>
                  {Number.isInteger(precoTotal)
                    ? `R$ ${precoTotal},00`
                    : `R$ ${precoTotal.toFixed(2).replace('.', ',')}`}
                </h4>
              </Total>
            </FooterTexto>
          ) : (
            <></>
          )}
        </Main>
      </ContainerBack>
      <Footer />
    </>
  );
}
