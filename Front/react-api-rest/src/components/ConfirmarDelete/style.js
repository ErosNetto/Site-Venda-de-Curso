import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);

  div.div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    height: auto;
    padding: 10px 0 20px 0;
    z-index: 1;
    background: ${colors.corPrimaria};
    border: 2px solid ${colors.cinzaClaro};
    border-radius: 20px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 15px;
    color: #fff;
  }
`;

export const Botoes = styled.div`
  display: flex;
  gap: 20px;

  button {
    width: 180px;
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
`;
