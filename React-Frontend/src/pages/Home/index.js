import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
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
  TituloPag,
  Filtro,
  ConteudoCurso,
  Curso,
  ImgCurso,
  Descricao,
  Botoes,
} from './styled';

export default function Home() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Filtro de pesquisa pela url
  const { categoria } = useParams();
  const buscaCategoria = categoria ? decodeURI(categoria) : '';

  // Função categoria
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [cursosFiltrados2, setCursosFiltrados] = useState([]);

  // Curso
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/cursos');
        const cursosComFotos = [];
        response.data
          .filter((curso) => curso.FotoCursos.length > 0)
          .forEach((curso) => cursosComFotos.push(curso));

        setCursos(cursosComFotos);

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
    }

    getData();
    // setCategoriaSelecionada('');
  }, [userId]);

  // Filtra por cateria seja ela pela url ou select
  useEffect(() => {
    setCategoriaSelecionada(buscaCategoria);
  }, [buscaCategoria]);

  useEffect(() => {
    const handleFiltraPorCategoria = () => {
      const cursosFiltrados = cursos.filter(
        (item) => item.categoria === categoriaSelecionada
      );
      setCursosFiltrados(cursosFiltrados);
    };

    handleFiltraPorCategoria();
  }, [categoriaSelecionada, cursos]);

  // Cancela a filtragem do select ou URL
  function handleCancelarFiltragem() {
    if (buscaCategoria) {
      history.push('/home');
    } else {
      setCategoriaSelecionada('');
    }
  }

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
          <TituloPag>
            <h2>Cursos</h2>
            <Filtro>
              {categoriaSelecionada && (
                <button type="button" onClick={handleCancelarFiltragem}>
                  <i className="bi bi-x-lg" />
                </button>
              )}
              <select
                name="categorias"
                value={categoriaSelecionada}
                onChange={(event) =>
                  setCategoriaSelecionada(event.target.value)
                }
              >
                <option id="1" value="">
                  Selecione uma categoria
                </option>
                <option id="2" value="Desenvolvimento">
                  Desenvolvimento
                </option>
                <option id="3" value="Negócios">
                  Negócios
                </option>
                <option id="4" value="Finanças e contabilidade">
                  Finanças e contabilidade
                </option>
                <option id="5" value="Ti e software">
                  Ti e software
                </option>
                <option id="6" value="Produtividade no escritório">
                  Produtividade no escritório
                </option>
                <option id="7" value="Desenvolvimento Pessoal">
                  Desenvolvimento Pessoal
                </option>
                <option id="8" value="Design">
                  Design
                </option>
                <option id="9" value="Marketing">
                  Marketing
                </option>
                <option id="10" value="Estilo de vida">
                  Estilo de vida
                </option>
                <option id="11" value="Fotografia e vídeo">
                  Fotografia e vídeo
                </option>
                <option id="12" value="Saúde e fitness">
                  Saúde e fitness
                </option>
                <option id="13" value="Música">
                  Música
                </option>
                <option id="14" value="Ensino e estudo acadêmico">
                  Ensino e estudo acadêmico
                </option>
              </select>
            </Filtro>
          </TituloPag>

          <ConteudoCurso>
            {/* eslint-disable-next-line */}
            {categoriaSelecionada ? (
              cursosFiltrados2.length === 0 ? (
                <h2>Não foram encontrados cursos nessa categoria.</h2>
              ) : (
                cursosFiltrados2.map((curso) => (
                  <Curso key={String(curso.id)}>
                    <div>
                      <ImgCurso>
                        <Link to={`/cursos/${curso.id}`}>
                          <ImagemResponsiva
                            imageUrl={curso.FotoCursos[0].url}
                            width={268}
                            height={210}
                            alt="Imagem do curso"
                          />
                        </Link>
                      </ImgCurso>
                      <Descricao>
                        <h3>{curso.nome}</h3>
                        <h4>{curso.Instrutor.nome}</h4>
                        <p>
                          {Number.isInteger(curso.preco)
                            ? `R$ ${curso.preco},00`
                            : `R$ ${curso.preco.toString().replace('.', ',')}`}
                        </p>
                      </Descricao>
                    </div>
                    <Botoes>
                      <button
                        type="button"
                        onClick={() => handleCarrinhodeCompras(curso.id)}
                      >
                        Adicionar ao carrinho
                      </button>
                      {/* eslint-disable-next-line */}
                      <div onClick={() => handleFavoritos(curso.id)}>
                        <i className="bi bi-heart-fill" />
                      </div>
                    </Botoes>
                  </Curso>
                ))
              )
            ) : (
              cursos.map((curso) => (
                <Curso key={String(curso.id)}>
                  <div>
                    <ImgCurso>
                      <Link to={`/cursos/${curso.id}`}>
                        <ImagemResponsiva
                          imageUrl={curso.FotoCursos[0].url}
                          width={268}
                          height={210}
                          alt="Imagem do curso"
                        />
                      </Link>
                    </ImgCurso>
                    <Descricao>
                      <h3>{curso.nome}</h3>
                      <h4>{curso.Instrutor.nome}</h4>
                      <p>
                        {Number.isInteger(curso.preco)
                          ? `R$ ${curso.preco},00`
                          : `R$ ${curso.preco.toString().replace('.', ',')}`}
                      </p>
                    </Descricao>
                  </div>
                  <Botoes>
                    <button
                      type="button"
                      onClick={() => handleCarrinhodeCompras(curso.id)}
                    >
                      Adicionar ao carrinho
                    </button>
                    {/* eslint-disable-next-line */}
                    <div onClick={() => handleFavoritos(curso.id)}>
                      <i className="bi bi-heart-fill" />
                    </div>
                  </Botoes>
                </Curso>
              ))
            )}
          </ConteudoCurso>
        </Main>
      </ContainerBack>

      <Footer />
    </>
  );
}
