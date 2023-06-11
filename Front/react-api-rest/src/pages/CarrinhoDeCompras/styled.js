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

  .btn-instrutor {
    border: 0.5rem solid ${colors.corPrimaria};
    margin: 10px 0 10px 0;
    background: none;
    color: ${colors.corPrimaria};
    padding: 12px 20px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${colors.corPrimaria};
      color: #fff;
    }
  }
`;

export const TituloTexto = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  padding-bottom: 15px;
  border-bottom: 5px solid ${colors.corSecundaria};
  margin-bottom: 25px;

  .carrinho {
    margin-left: 30px;
    border-right: 1px solid ${colors.corPrimaria};
    padding-right: 20px;

    & h2 {
      color: ${colors.corPrimaria};
      font-size: 28px;
      font-weight: 100;
    }
  }

  .favoritos {
    border-left: 1px solid ${colors.corPrimaria};
    padding-left: 20px;

    & a {
      color: #b4b3b3;
      font-size: 28px;
      cursor: pointer;
      font-weight: 300;

      &:hover {
        color: ${colors.corSecundaria};
      }
    }
  }
`;

export const GridListCurso = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 0.7fr;
  border-bottom: 1px solid ${colors.corPrimaria};
  padding: 0 25px 25px 25px;
  margin-bottom: 25px;

  img {
    width: 100%;
    height: 134px;
  }
`;

export const TextoCurso = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-left: 25px;

  h3 {
    font-size: 0;
  }

  h3 a {
    color: ${colors.corPrimaria};
    font-size: 28px;
    font-weight: 600;

    &:hover {
      color: ${colors.corSecundaria};
    }
  }
`;

export const BotoesCurso = styled.div`
  font-size: 20px;

  & a:first-child {
    /* color: #3fd304; */
    color: #3fd30469;
    padding-right: 10px;
    border-right: 2px solid ${colors.corPrimaria};
  }

  & a:first-child:hover {
    color: #3fd30494;
  }

  & a:nth-child(2) {
    color: #ff0000d7;
    padding: 0 10px 0 10px;
  }

  & a:nth-child(2):hover {
    color: ${colors.corSecundaria};
  }

  & a:nth-child(3) {
    color: #0077ff;
    padding-left: 10px;
    border-left: 2px solid ${colors.corPrimaria};
  }

  & a:nth-child(3):hover {
    color: #0455b1d7;
  }
`;

export const PrecoCurso = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: end;
  align-items: center;

  h4 {
    color: ${colors.corPrimaria};
    font-size: 30px;
    font-weight: 600;
  }
`;

export const FooterTexto = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 30px 25px 30px;

  button {
    border: 0.5rem solid ${colors.corPrimaria};
    margin: 10px 0 10px 0;
    background: none;
    color: ${colors.corPrimaria};
    padding: 12px 20px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${colors.corPrimaria};
      color: #fff;
    }

    &:focus {
      background: ${colors.corPrimaria};
      color: #fff;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--Cor-do-texto-Nav);

  h5 {
    font-size: 25px;
    margin-right: 15px;
    color: #b4b3b3;
    /* color: #615d5d; */
  }

  h4 {
    font-size: 30px;
    font-weight: 800;
  }
`;

export const CarrinhoVazio = styled.h3`
  font-size: 25px;
  text-align: center;
`;
