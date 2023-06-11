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
  border-bottom: 5px solid ${colors.corSecundaria};

  h2 {
    font-size: 50px;
    font-weight: 800;
    color: ${colors.corPrimaria};
  }
`;

export const ResponsiveTable = styled.div`
  overflow: hidden;
  overflow-x: auto;
  /* margin-bottom: 25px; */
  margin: 25px 0 25px 0;
`;

export const Tabela = styled.table`
  min-width: 360px;
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    border-bottom: 2px solid ${colors.corSecundaria};
    white-space: nowrap;
    padding: 13px;
    text-align: left;
    font-size: 20px;
    color: ${colors.corPrimaria};
  }

  th {
    font-size: 22px;
  }

  td:nth-child(1) {
    white-space: normal;
  }

  td:last-child {
    text-align: center;
  }

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

export const SemCursos = styled.div`
  margin-top: 10px;
  width: 100%;

  h3 {
    text-align: center;
    font-size: 28px;
    font-weight: 600;
    color: ${colors.corPrimaria};
  }
`;
