import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 50px;
  border-radius: 50px;
  background: #fff;

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  /* gap: 20px; */
  height: auto;

  .inst-h3 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 800;
    color: ${colors.corPrimaria};
  }
`;

export const TituloTexto = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 5px solid ${colors.corSecundaria};

  h1 {
    font-size: 50px;
    color: ${colors.corPrimaria};
  }
`;

export const GridConteudo = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 55px;
  margin: 25px 0 0 0;
`;

export const LadoEsquerdo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;

  img {
    width: 250px;
    height: 250px;
  }

  p {
    font-size: 30px;
    font-weight: 600;
    margin-top: 10px;
    color: ${colors.corPrimaria};
  }
`;

export const LadoDireito = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border-radius: 50px;
  background: ${colors.corPrimaria};
  padding: 20px;
  color: #fff;

  h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #fff;
  }

  p {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #fff;
  }
`;

export const ConteudoCursos = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  gap: 20px;
`;

export const Curso = styled.div`
  width: 300px;
  height: auto;
  margin: 5px;
  padding: 15px;
  border-radius: 20px;
  background: ${colors.corPrimaria};

  h4 {
    font-size: 18px;
    font-weight: 600;
    display: block;
    color: #fff;
    margin-top: 6px;
  }
`;

export const ImgCurso = styled.div`
  width: 100%;
  max-width: 270px;
  max-height: 210px;
  overflow: hidden;
  border-radius: 20px;

  img {
    transition: all 300ms ease-in-out;
    width: 100%;

    &:hover {
      opacity: 0.4;
    }
  }
`;
