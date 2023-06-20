import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 1.5rem 5rem;
  border-radius: 3rem;
  background: ${colors.cinzaClaro};
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  height: auto;
`;

export const TituloTexto = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 1fr;
  gap: 4rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.5rem solid ${colors.corSecundaria};

  div {
    display: flex;
    align-items: center;
    justify-content: left;
    flex-flow: row wrap;
  }

  div + div {
    justify-content: end;
  }

  h1 {
    word-break: break-all;
    font-size: 5rem;
    color: ${colors.corPrimaria};
  }

  h2 {
    font-size: 2.8rem;
    color: ${colors.corPrimaria};
  }
`;

export const GridConteudo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5.5rem;
  margin: 2.5rem 0 2.5rem 0;
`;

export const LadoEsquerdo = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: left;

  img {
    width: auto;
    height: 27.5rem;
    /* background: red; */
  }
`;

export const ConteudoCurso = styled.div`
  margin: 1.5rem 0 0 0;

  h4 {
    margin: 1rem 0 1rem 0;
    font-size: 2.4rem;
    font-weight: 600;
    color: ${colors.corPrimaria};

    & span {
      font-size: 2.2rem;
    }
  }

  h4 a {
    color: ${colors.corPrimaria};
    font-size: 2.2rem;
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
  gap: 3rem;
  margin-top: 1.5rem;

  button {
    width: 18.5rem;
    height: 5rem;
    outline: none;
    border: 3px solid ${colors.corPrimaria};
    background: none;
    color: ${colors.corPrimaria};
    font-size: 1.6rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${colors.corPrimaria};
      color: #fff;
    }
  }

  div {
    width: 5rem;
    height: 5rem;
    padding: 0.5rem;
    border: 3px solid ${colors.corPrimaria};
    display: flex;
    justify-content: center;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: ${colors.corPrimaria};

    & i {
      position: relative;
      top: 2px;
      font-size: 2.5rem;
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
  align-content: space-between;
  justify-content: flex-end;
  flex-wrap: wrap;

  p {
    word-break: break-all;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 3rem;
    color: ${colors.corPrimaria};
  }
`;
