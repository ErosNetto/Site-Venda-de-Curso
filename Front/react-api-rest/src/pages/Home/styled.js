import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 1340px;
  margin: 0 auto;
  padding: 15px 15px;
  border-radius: 50px;
  background: ${colors.cinzaClaro};
`;

export const TituloPag = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin-bottom: 10px;
  /* border-bottom: 5px solid red; */

  h2 {
    font-size: 55px;
    font-weight: 800;
    color: ${colors.corPrimaria};
  }
`;

export const Filtro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 22px 0 0 30px; */

  select {
    padding: 10px;
    font-size: 22px;
    width: 314px; /*200px*/
    height: 50px;
    background: ${colors.corPrimaria};
    color: #fff;
  }
`;

export const ConteudoCurso = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const Curso = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  padding: 15px;
  border-radius: 20px;
  background: ${colors.corPrimaria};
`;

export const ImgCurso = styled.div`
  width: 100%;
  max-width: 270px;
  max-height: 210px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgb(21 29 66);

  img {
    transition: all 300ms ease-in-out;
    width: 100%;

    &:hover {
      opacity: 0.4;
    }
  }
`;

export const Descricao = styled.div`
  color: #fff;

  h3 {
    word-break: break-all;
    font-size: 15px;
    font-weight: 600;
    display: block;
    margin: 6px 0 4px 0;
  }

  h4 {
    font-size: 12px;
    font-weight: 400;
    display: block;
    margin-bottom: 14px;
  }

  p {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0;
  }
`;

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 15px;

  button {
    width: 185px;
    height: 50px;
    outline: none;
    border: 3px solid #fff;
    background: none;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #fff;
      color: ${colors.corPrimaria};
    }
  }

  div {
    width: 50px;
    height: 50px;
    padding: 5px;
    border: 3px solid #fff;
    display: flex;
    justify-content: center;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: #fff;

    & i {
      position: relative;
      top: 2px;
      font-size: 25px;
    }

    &:hover {
      background: #fff;
      color: ${colors.corPrimaria};
    }
  }
`;
