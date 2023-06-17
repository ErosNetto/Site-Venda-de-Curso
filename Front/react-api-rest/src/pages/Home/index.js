import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { ContainerBack } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import Header from '../../components/Header';
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

  // Filtro de pesquisa
  const { categoria } = useParams();
  const buscaCategoria = decodeURI(categoria);

  // Curso
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/cursos');

      if (buscaCategoria) {
        const cursosFiltrados = response.data.filter(
          (curso) => curso.categoria === buscaCategoria
        );

        if (cursosFiltrados.length > 0) {
          setCursos(cursosFiltrados);
        } else {
          setCursos(response.data);
        }

        setIsLoading(false);
      } else {
        setCursos(response.data);
        setIsLoading(false);
      }
    }

    getData();
  }, [buscaCategoria]);

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
              <select name="categorias">
                <option id="1" value="valor1">
                  Categoria
                </option>
                <option id="2" value="valor2">
                  Desenvolvimento
                </option>
                <option id="3" value="valor3">
                  Negócios
                </option>
                <option id="4" value="valor4">
                  Finanças e contabilidade
                </option>
                <option id="5" value="valor5">
                  Ti e software
                </option>
                <option id="6" value="valor6">
                  Produtividade no escritório
                </option>
                <option id="7" value="valor7">
                  Desenvolvimento Pessoal
                </option>
                <option id="8" value="valor8">
                  Design
                </option>
                <option id="9" value="valor9">
                  Marketing
                </option>
                <option id="10" value="valor10">
                  Estilo de vida
                </option>
                <option id="11" value="valor11">
                  Fotografia e vídeo
                </option>
                <option id="12" value="valor12">
                  Saúde e fitness
                </option>
                <option id="13" value="valor12">
                  Música
                </option>
                <option id="14" value="valor14">
                  Ensino e estudo acadêmico
                </option>
              </select>
            </Filtro>
          </TituloPag>

          <ConteudoCurso>
            {cursos.length === 0 ? (
              <h2>Não foi possível carregar os cursos</h2>
            ) : (
              cursos.map((curso) => (
                <Curso key={String(curso.id)}>
                  <ImgCurso>
                    {get(curso, 'FotoCursos[0].url', false) ? (
                      <Link to={`/cursos/${curso.id}`}>
                        <img
                          src={curso.FotoCursos[0].url}
                          alt="Imagem do curso"
                        />
                      </Link>
                    ) : (
                      <Link to={`/cursos/${curso.id}`}>
                        <img
                          src="https://source.unsplash.com/random/270x210?r=1?e=4"
                          alt="Imagem do curso"
                        />
                      </Link>
                    )}
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
    </>
  );
}
