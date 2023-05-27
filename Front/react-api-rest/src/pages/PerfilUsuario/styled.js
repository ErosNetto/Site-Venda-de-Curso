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

  h3 {
    font-size: 35px;
    font-weight: 800;
    margin: 5px 0 15px 0;
    color: ${colors.corPrimaria};
  }
`;

export const TituloPag = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  border-bottom: 5px solid ${colors.corSecundaria};

  h2 {
    font-size: 50px;
    font-weight: 800;
    color: ${colors.corPrimaria};
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
    margin: 6px 0 10px 0;
  }
`;

export const ImgCurso = styled.div`
  width: 100%;
  max-width: 270px;
  max-height: 210px;
  overflow: hidden;
  border-radius: 20px;

  img {
    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.4;
    }
  }
`;

export const Barra = styled.div`
  width: 100%;
  height: 40px;
  background: ${colors.cinzaClaro};
  border-radius: 50px;
  overflow: hidden;

  div {
    height: 100%;
    border-radius: 50px;
    width: 50%;
    background: ${colors.corSecundaria};
  }

  h5 {
    font-size: 22px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    position: relative;
    top: -36px;
  }
`;
