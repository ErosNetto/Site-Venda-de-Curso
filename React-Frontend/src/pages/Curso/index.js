import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImagemResponsiva from '../../components/ImgResponsive';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import {
  Main,
  TituloTexto,
  GridConteudo,
  LadoEsquerdo,
  ConteudoCurso,
  Botoes,
  LadoDireito,
} from './styled';

export default function Curso({ match }) {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Curso
  const idCurso = Number(get(match, 'params.id', ''));
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [preco, setPreco] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [instrutorID, setInstrutorID] = useState('');
  const [fotoCursos, setFotoCursos] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idCurso) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/cursos/${idCurso}`);
        const FotoCursos = get(data, 'FotoCursos[0].url', '');

        if (!FotoCursos) {
          toast.warn('Não foi possivel acessar esse curso');
          history.push('/home');
        }
        setFotoCursos(FotoCursos);

        setNome(data.nome);
        setDescricao(data.descricao);
        setCategoria(data.categoria);
        setCargaHoraria(data.carga_horaria);
        setPreco(data.preco);
        setInstrutor(data.Instrutor.nome);
        setInstrutorID(data.Instrutor.id);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/home');
      }
    }

    getData();
  }, [idCurso]);

  // Adiciona o curso no carrinho de compras
  async function handleCarrinhodeCompras(cursoId) {
    if (!cursoId) return;

    try {
      setIsLoading(true);

      const response = await axios.get('/carrinhoDeCompras/');
      const carrinho = response.data;

      const cursoNoCarrinho = carrinho.find(
        (item) => item.curso_id === cursoId && item.user_id === userId
      );

      if (cursoNoCarrinho) {
        setIsLoading(false);
        toast.warn('Esse curso já está no carrinho!');
        return;
      }

      await axios.post('/carrinhoDeCompras/', {
        curso_id: cursoId,
        user_id: userId,
      });

      setIsLoading(false);
      toast.success('Curso adicionado ao carrinho');
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

  // Adiciona o curso nos favoritos
  async function handleFavoritos(cursoId) {
    if (!cursoId) return;

    try {
      setIsLoading(true);

      const response = await axios.get('/favoritos/');
      const favoritos = response.data;

      const cursoNosFavoritos = favoritos.find(
        (item) => item.curso_id === cursoId && item.user_id === userId
      );

      if (cursoNosFavoritos) {
        setIsLoading(false);
        toast.warn('Esse curso já está nos favoritos!');
        return;
      }

      await axios.post('/favoritos/', {
        curso_id: cursoId,
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
            <h1>{nome}</h1>
            <h2>R$ {preco}</h2>
          </TituloTexto>
          <GridConteudo>
            <LadoEsquerdo>
              <ImagemResponsiva
                imageUrl={fotoCursos}
                width={522}
                height={275}
                alt="Imagem do curso"
              />
              <ConteudoCurso>
                <h4>
                  Professor:{' '}
                  <Link to={`/instrutor/${instrutorID}`}>{instrutor}</Link>
                </h4>
                <h4>
                  Carga horária: <span>{cargaHoraria}h</span>
                </h4>
                <h4>
                  Categoria: <Link to={`/home/${categoria}`}>{categoria}</Link>
                </h4>
              </ConteudoCurso>
              <Botoes>
                <button
                  type="button"
                  onClick={() => handleCarrinhodeCompras(idCurso)}
                >
                  Adiconar ao carrinho
                </button>
                {/* eslint-disable-next-line */}
                <div onClick={() => handleFavoritos(idCurso)}>
                  <i className="bi bi-heart-fill" />
                </div>
              </Botoes>
            </LadoEsquerdo>
            <LadoDireito>
              <p>{descricao}</p>
            </LadoDireito>
          </GridConteudo>
        </Main>
      </ContainerBack>

      <Footer />
    </>
  );
}

Curso.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
