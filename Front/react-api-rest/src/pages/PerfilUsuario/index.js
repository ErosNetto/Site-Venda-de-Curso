import React from 'react';
import { Link } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
  Main,
  TituloPag,
  ConteudoCursos,
  Curso,
  ImgCurso,
  Barra,
} from './styled';

export default function Configuracoes() {
  return (
    <>
      <Header />
      <Loading />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Perfil do usuário</h2>
          </TituloPag>

          <h3>Meu progresso:</h3>

          <ConteudoCursos>
            <Curso>
              <ImgCurso>
                <Link to="/home">
                  <img
                    src="https://source.unsplash.com/random/270x210?r=1?e=4"
                    alt="Imagem do curso"
                  />
                </Link>
              </ImgCurso>
              <h4>Curso de JavaScript Avançado</h4>
              <Barra>
                <div />
                <h5>50%</h5>
              </Barra>
            </Curso>
          </ConteudoCursos>
        </Main>
      </ContainerBack>
    </>
  );
}
