import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import ImagemResponsiva from '../../components/ImgResponsive';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import {
  Main,
  TituloPag,
  ConteudoCursos,
  Curso,
  ImgCurso,
  Botoes,
  CriarCurso,
  SemCursos,
} from './styled';

import cursoSemFoto from '../../img/sem-foto.png';

export default function Configuracoes() {
  // Instrutor
  const idInstrutorSalvo = useSelector((state) => state.auth.idDoInstrutor);

  // Cursos
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!idInstrutorSalvo) {
      toast.warn('Preencha as informaçoes do instrutor!');
      history.push('/configuracoes');
      setTimeout(() => {
        const elemento = document.getElementById('instrutor');
        if (elemento) {
          const offset = elemento.offsetTop;
          const scrollTop = offset - 115;
          window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
      }, 100);
    }

    // Acha os cursos do instrutor
    async function getCursos() {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/meusCursos/');
        const cursosFiltrados = data.filter(
          (curso) => curso.Instrutor.id === idInstrutorSalvo
        );

        const semFoto = cursosFiltrados.filter(
          (curso) => curso.FotoCursos.length === 0
        );

        const semVideo = cursosFiltrados.filter(
          (curso) => curso.VideoCursos.length === 0
        );

        if (semFoto.length > 0 && semVideo.length > 0) {
          toast.warn('Aviso: Existem cursos sem foto e sem vídeo.');
        } else {
          if (semFoto.length > 0) toast.warn('Aviso: Existem cursos sem foto.');
          if (semVideo.length > 0)
            toast.warn('Aviso: Existem cursos sem vídeo.');
        }

        setCursos(cursosFiltrados);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
          // history.push('/home');
        }
      }
    }

    getCursos();
  }, [idInstrutorSalvo]);

  // Confimar se quer mesmo deletar o curso
  function handleDeleteConfirme(e) {
    e.preventDefault();
    const confirmacao = e.currentTarget.nextSibling;
    confirmacao.style.display = 'block';
    e.currentTarget.remove();
  }

  // Delete o curso
  async function handleDeleteCurso(e, idCurso, index) {
    e.persist();

    try {
      setIsLoading(true);
      await axios.delete(`/cursos/${idCurso}`);
      const novosCursos = [...cursos];
      novosCursos.splice(index, 1);
      setCursos(novosCursos);
      toast.success('Curso excluido');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao deletar o curso!');
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
            <h2>Meus cursos</h2>
          </TituloPag>

          <CriarCurso>
            <Link to="/criarCurso">Criar um curso</Link>
          </CriarCurso>

          <ConteudoCursos>
            {cursos.length <= 0 ? (
              <SemCursos>
                <h3>Você não possui nenhum curso</h3>
              </SemCursos>
            ) : (
              cursos.map((curso, index) => (
                <Curso key={String(curso.id)}>
                  <div>
                    <ImgCurso>
                      {get(curso, 'FotoCursos[0].url', false) ? (
                        <Link to={`/cursos/${curso.id}`}>
                          <ImagemResponsiva
                            imageUrl={curso.FotoCursos[0].url}
                            width={240}
                            height={188}
                            alt="Imagem do curso"
                          />
                        </Link>
                      ) : (
                        <img
                          src={cursoSemFoto}
                          alt="Curso sem foto"
                          style={{ cursor: 'not-allowed' }}
                        />
                      )}
                    </ImgCurso>
                    <h4>{curso.nome}</h4>
                  </div>
                  <Botoes>
                    <Link to={`/meusCursos/${curso.id}/editar`}>
                      Editar curso
                    </Link>

                    <button type="button" onClick={handleDeleteConfirme}>
                      <i className="bi bi-trash3" />
                    </button>

                    <button
                      style={{ display: 'none' }}
                      type="button"
                      onClick={(e) => handleDeleteCurso(e, curso.id, index)}
                    >
                      <i className="bi bi-check-lg" />
                    </button>
                  </Botoes>
                </Curso>
              ))
            )}
          </ConteudoCursos>
        </Main>
      </ContainerBack>
    </>
  );
}
