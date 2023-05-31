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

  .btn-largo {
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
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  /* padding: 25px 25px 25px 25px; */
  margin: 25px 0 0 0;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  .grupo-form {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    color: ${colors.corPrimaria};
  }

  .grupo-form label {
    display: block;
    margin-bottom: 10px;
  }

  .grupo-form input,
  .grupo-form textarea {
    width: 100%;
    height: 50px;
    border: none;
    background: ${colors.corPrimaria};
    padding: 15px 20px;
    margin: 0 0 15px 0;
    font-size: 20px;
    outline: none;
    transition: all 0.2s;
    color: #fff;

    &:focus {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }

    &:hover {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }
  }

  .grupo-form textarea {
    height: 250px;
    resize: none;
  }

  .grupo-form ::placeholder {
    color: #aeaeae;
  }

  select {
    width: 100%;
    height: 50px;
    padding: 10px 15px;
    font-size: 22px;
    background: ${colors.corPrimaria};
    color: #fff;

    &:focus {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }

    &:hover {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }
  }

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
export const LadoDireito = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 55px;
  color: ${colors.corPrimaria};
`;

export const Container1 = styled.div`
  label {
    display: block;
    margin-bottom: 10px;
  }
`;

export const Container2 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  label {
    display: block;
    margin-bottom: 10px;
  }
`;

export const FotoDoCurso = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 370px;
    height: 270px;
    border: 3px solid ${colors.corPrimaria};
    background: ${colors.corPrimaria};
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    margin: 0;
    position: absolute;
    color: #fff;
    bottom: 0;
    background: ${colors.corPrimaria};
    width: 55px;
    height: 55px;
    border-radius: 50%;
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }
  }

  input {
    display: none;
  }

  i {
    margin-top: 5px;
    font-size: 35px;
    transition: 0.2s;

    &:hover {
      color: ${colors.corSecundaria};
    }
  }
`;

export const VideoCurso = styled.div`
  width: 100%;
  color: ${colors.corPrimaria};

  input {
    display: none;
  }

  div {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 3px solid ${colors.corPrimaria};
  }

  label {
    border: 5px solid ${colors.corPrimaria};
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

  span {
    padding: 10px;
    font-size: 20px;
  }
`;
