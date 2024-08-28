import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

import imgBack from '../img/main-bg.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  /* button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 700;
    transition: all 300ms;

    &:hover {
      filter: brightness(75%);
    }
  } */

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.primaryDarkColor};
    color: #fff;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.primaryDarkColor};
    color: #fff;
  }

  body .Toastify__close-button {
    color: #fff;
  }
`;

export const Container404 = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${imgBack});
  background-size: cover;
  background-position: center center;
`;

// Container de LOGIN E CADASTRO
export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${imgBack});
  background-size: cover;
  background-position: center center;
  color: #fff;
`;

// Container e Backgroud
export const ContainerBack = styled.section`
  padding: 130px 0 50px 113px;
  min-height: 100vh;
  background-image: url(${imgBack});
  background-size: cover;
  background-position: center center;
`;
