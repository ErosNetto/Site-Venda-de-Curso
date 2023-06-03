import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 50px;
  border-radius: 50px;
  background: ${colors.cinzaClaro};

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  /* gap: 20px; */
  height: auto;
`;

export const TituloTexto = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  padding-bottom: 15px;
  border-bottom: 5px solid ${colors.corSecundaria};

  h1 {
    font-size: 50px;
    color: ${colors.corPrimaria};
  }

  h2 {
    font-size: 28px;
    color: ${colors.corPrimaria};
  }
`;

export const GridConteudo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  /* padding: 25px 25px 25px 25px; */
  margin: 25px 0 25px 0;
`;

export const LadoEsquerdo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: left;

  img {
    width: auto;
    height: 275px;
    background: red;
  }
`;

export const ConteudoCurso = styled.div`
  margin: 15px 0 0 0;

  h4 {
    margin: 10px 0 10px 0;
    font-size: 24px;
    font-weight: 600;
    color: ${colors.corPrimaria};

    & span {
      font-size: 22px;
    }
  }

  h4 a {
    color: ${colors.corPrimaria};
    font-size: 22px;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      color: ${colors.corSecundaria};
    }
  }
`;

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 15px;

  button {
    width: 180px;
    height: 50px;
    outline: none;
    border: 5px solid ${colors.corPrimaria};
    background: none;
    color: ${colors.corPrimaria};
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${colors.corPrimaria};
      color: #fff;
    }
  }

  div {
    width: 50px;
    height: 50px;
    padding: 5px;
    border: 3px solid ${colors.corPrimaria};
    display: flex;
    justify-content: center;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: ${colors.corPrimaria};

    & i {
      position: relative;
      top: 2px;
      font-size: 25px;
    }

    &:hover {
      background: ${colors.corPrimaria};
      color: #fff;
    }
  }
`;

export const LadoDireito = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  p {
    word-break: break-all;
    font-weight: 400;
    font-size: 22px;
    line-height: 30px;
    color: ${colors.corPrimaria};
  }
`;
