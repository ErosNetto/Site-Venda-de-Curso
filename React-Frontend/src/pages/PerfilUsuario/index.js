import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImagemResponsiva from '../../components/ImgResponsive';
import Loading from '../../components/Loading';
import {
  Main,
  TituloPag,
  ConteudoCursos,
  Curso,
  ImgCurso,
  Barra,
  SemCursos,
} from './styled';

export default function Configuracoes() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Perfil
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function getData() {
      try {
        setIsLoading(true);

        const responsePer = await axios.get('/perfil/');
        const cursosPerfil = responsePer.data.filter(
          (item) => item.user_id === userId
        );

        const cursoPromises = cursosPerfil.map((item) =>
          axios.get(`/cursos/${item.curso_id}`)
        );

        const cursoResponses = await Promise.all(cursoPromises);

        const perfilComCursos = cursosPerfil.map((item, index) => {
          const cursoNome = cursoResponses[index].data.nome;
          const cursoId = cursoResponses[index].data.id;
          const FotoCursos = cursoResponses[index].data.FotoCursos[0];
          const VideoCursos = cursoResponses[index].data.VideoCursos[0];
          const idFav = item.id;
          const { progresso } = item;
          return {
            idFav,
            cursoId,
            cursoNome,
            progresso,
            FotoCursos,
            VideoCursos,
          };
        });

        setCursos(perfilComCursos);
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
  }, [userId]);

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Perfil do usuário</h2>
          </TituloPag>
          {cursos.length > 0 ? <h3>Meu progresso:</h3> : <></>}

          <ConteudoCursos>
            {cursos.length > 0 ? (
              cursos.map((curso) => (
                <Curso key={String(curso.cursoId)}>
                  <div>
                    <ImgCurso>
                      <Link
                        to={
                          curso.cursoNome
                            ? `videos/${curso.cursoNome}/${curso.cursoId}`
                            : '/perfil'
                        }
                      >
                        <ImagemResponsiva
                          imageUrl={curso.FotoCursos.url}
                          width={240}
                          height={188}
                          alt="Imagem do curso"
                        />
                      </Link>
                    </ImgCurso>

                    <h4>{curso.cursoNome}</h4>
                  </div>

                  <Barra>
                    <div />
                    <h5>{curso.progresso}%</h5>
                  </Barra>
                </Curso>
              ))
            ) : (
              <SemCursos>
                <h3>Parece que você ainda não adquiriu nenhum curso</h3>
              </SemCursos>
            )}
          </ConteudoCursos>
        </Main>
      </ContainerBack>

      <Footer />
    </>
  );
}
