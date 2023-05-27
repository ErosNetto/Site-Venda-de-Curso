import React from 'react';
import { Link } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
  Main,
  TituloTexto,
  FooterTexto,
  GridListCurso,
  TextoCurso,
  BotoesCurso,
  PrecoCurso,
} from './styled';
import Html from '../../img/HTML-5.jpg';

export default function Configuracoes() {
  return (
    <>
      <Header />
      <Loading />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <div className="carrinho">
              <h2 to="/">Carrinho(3)</h2>
            </div>
            <div className="favoritos">
              <Link to="/">Favoritos(4)</Link>
            </div>
          </TituloTexto>

          <GridListCurso>
            <div className="imagen-curso">
              <img src={Html} alt="Imagem do curso" />
            </div>

            <TextoCurso>
              <h3>
                <Link to="/">Curso de Python</Link>
              </h3>
              <BotoesCurso>
                <Link to="/">Comprar agora</Link>
                <Link to="/">Excluir</Link>
                <Link to="/">Adcionar aos favoritos</Link>
              </BotoesCurso>
            </TextoCurso>

            <PrecoCurso>
              <h4>R$ 109.99</h4>
            </PrecoCurso>
          </GridListCurso>

          <FooterTexto>
            <button type="button">Comprar</button>
            <h4>Total: R$ 495,97</h4>
          </FooterTexto>
        </Main>
      </ContainerBack>
    </>
  );
}
