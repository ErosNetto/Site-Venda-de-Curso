import React from 'react';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { Main, TituloPag, ResponsiveTable, Tabela, SemCursos } from './styled';

export default function Configuracoes() {
  return (
    <>
      <Header />
      <Loading />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Histórico de Compras</h2>
          </TituloPag>

          <ResponsiveTable>
            {true ? (
              <Tabela>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Data</th>
                    <th>Preço total</th>
                    <th>Tipo de pagamento</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Curso de JavaScript</td>
                    <td>30 de nov de 2022</td>
                    <td>R$ 39.90</td>
                    <td>Cartão de Crédito</td>
                    <td>
                      <button type="button">Recibo</button>
                    </td>
                  </tr>
                </tbody>
              </Tabela>
            ) : (
              <SemCursos>
                <h3>Você não possui nenhum histórico de compras</h3>
              </SemCursos>
            )}
          </ResponsiveTable>
        </Main>
      </ContainerBack>
    </>
  );
}
