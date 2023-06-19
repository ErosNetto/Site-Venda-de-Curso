import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 15px;
  border-radius: 50px;
  background: #fff;

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  /* gap: 20px; */
  height: auto;
`;

export const TituloPag = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 5px solid ${colors.corSecundaria};

  h2 {
    font-size: 50px;
    font-weight: 800;
    color: ${colors.corPrimaria};
  }
`;

export const CriarCurso = styled.div`
  margin: 10px 0 15px 0;

  a {
    font-size: 25px;
    font-weight: 800;
    color: ${colors.corPrimaria};

    &:hover {
      color: ${colors.corSecundaria};
    }
  }
`;

export const ConteudoCursos = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  gap: 14px;
`;

export const SemCursos = styled.div`
  margin-top: 10px;
  width: 100%;

  h3 {
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: ${colors.corPrimaria};
  }
`;

export const Curso = styled.div`
  width: 272px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  padding: 15px;
  border-radius: 20px;
  background: ${colors.corPrimaria};

  h4 {
    font-size: 18px;
    font-weight: 600;
    display: block;
    color: #fff;
    margin: 6px 0 10px 0;
  }
`;

export const ImgCurso = styled.div`
  width: 100%;
  max-width: 242px;
  max-height: 188px;
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

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 15px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
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

  button {
    width: 50px;
    height: 50px;
    padding: 5px;
    border: 3px solid #fff;
    display: flex;
    justify-content: center;
    /* border-radius: 50%; */
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
