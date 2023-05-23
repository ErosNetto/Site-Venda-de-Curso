import styled from 'styled-components';
import * as colors from '../../config/colors';

export const LoginBox = styled.section`
  position: relative;
  width: 420px;
  height: auto;
  /* background: #fff; */
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, 0.5);
  border: 2px solid #0a1128;
  /* overflow: hidden; */
  transition: height 0.2s ease;

  h1 {
    font-size: 2em;
    color: #fff;
    text-align: center;
  }

  p {
    font-size: 16px;
    text-align: center;
    margin: 10px 0 0 0;
  }
`;

export const Form1 = styled.form`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  .grupo-form {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    color: #fff;
  }

  .grupo-form label {
    display: block;
    margin-bottom: 10px;
  }

  .grupo-form input {
    width: 100%;
    height: 50px;
    border: none;
    background: #fff;
    padding: 15px 20px;
    margin: 0 0 15px 0;
    font-size: 20px;
    outline: none;
    transition: all 0.2s;

    &:focus {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }

    &:hover {
      box-shadow: 0 0 10px 1px ${colors.corSecundaria};
    }
  }

  .grupo-form ::placeholder {
    /* color: black; */
  }

  button {
    border: 0.5rem solid #fff;
    margin: 10px 0 10px 0;
    background: none;
    color: #fff;
    padding: 12px 20px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: #fff;
      color: ${colors.corPrimaria};
    }
  }
`;
