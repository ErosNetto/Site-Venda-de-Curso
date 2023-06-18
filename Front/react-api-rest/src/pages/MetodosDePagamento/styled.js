import styled from 'styled-components';

import * as colors from '../../config/colors';

export const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 15px;
  position: relative;
  height: auto;
`;

export const OpcoesPagamento = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  div {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px 22px 0 0;
    background: rgb(203 203 203);
    border: 1px solid rgb(167 164 164);

    h2 {
      font-weight: 400;
      font-size: 27px;
      color: ${colors.corPrimaria};
    }
  }

  div:nth-child(1) {
    background: #fff;
    border-bottom: none;
  }
`;

export const Conteudo = styled.div`
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
  padding: 15px 50px;
  position: relative;
  background: #fff;
  border-radius: 0 0 22px 22px;
  border: 1px solid rgb(203 203 203);
  border-top: none;
`;

export const Bandeiras = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  label {
    width: 100px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(203 203 203);
  }
  input {
    margin: 10px 0 10px 0;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  margin: 25px 0 0 0;
`;

export const LadoEsquerdo = styled.form`
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
  .grupo-form select {
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
      box-shadow: 0 0 10px 2px ${colors.corSecundaria};
    }

    &:hover {
      box-shadow: 0 0 10px 2px ${colors.corSecundaria};
    }
  }

  .grupo-form select {
    padding: 10px 20px;
  }

  .grupo-form-2 {
    flex: 1 1 50%;
  }
`;

export const LadoDireito = styled.form`
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

  .grupo-form-2 {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .grupo-form label {
    display: block;
    margin-bottom: 10px;
  }

  .grupo-form input,
  .grupo-form select {
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
      box-shadow: 0 0 10px 2px ${colors.corSecundaria};
    }

    &:hover {
      box-shadow: 0 0 10px 2px ${colors.corSecundaria};
    }
  }

  .grupo-form select {
    padding: 10px 20px;
  }
`;

export const BtnComprar = styled.div`
  display: flex;
  justify-content: center;

  button {
    border: 0.5rem solid ${colors.corPrimaria};
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
