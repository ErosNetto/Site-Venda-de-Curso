import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { Main, TituloPag, ResponsiveTable, Tabela, SemCursos } from './styled';

export default function HistoricoDeCompras() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Historico de Compras
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Get historico de compras
    async function getData() {
      setIsLoading(true);

      try {
        const responseHis = await axios.get(`/historicoDeCompras/`);
        const historicoFiltrado = responseHis.data.filter(
          (historicoItem) => historicoItem.user_id === userId
        );

        const cursoPromises = historicoFiltrado.map((historicoItem) =>
          axios.get(`/cursos/${historicoItem.curso_id}`)
        );

        const cursoResponses = await Promise.all(cursoPromises);

        const historicoComCursos = historicoFiltrado.map(
          (historicoItem, index) => {
            const { nome, preco } = cursoResponses[index].data;
            const { id, dataDeCompra, formaDePagamento } = historicoItem;
            return { id, nome, dataDeCompra, preco, formaDePagamento };
          }
        );
        setHistorico(historicoComCursos);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }
    }

    getData();
  }, [userId]);

  function MascaraData(dataDeCompra) {
    if (!dataDeCompra) return;

    const data1 = dataDeCompra.split('T');
    const data2 = data1[0].split('-');

    switch (data2[1]) {
      case '01':
        return `${data2[2]} de janeiro de ${data2[0]}`;
      case '02':
        return `${data2[2]} de fevereiro de ${data2[0]}`;
      case '03':
        return `${data2[2]} de março de ${data2[0]}`;
      case '04':
        return `${data2[2]} de abril de ${data2[0]}`;
      case '05':
        return `${data2[2]} de maio de ${data2[0]}`;
      case '06':
        return `${data2[2]} de junho de ${data2[0]}`;
      case '07':
        return `${data2[2]} de julho de ${data2[0]}`;
      case '08':
        return `${data2[2]} de agosto de ${data2[0]}`;
      case '09':
        return `${data2[2]} de setembro de ${data2[0]}`;
      case '10':
        return `${data2[2]} de outubro de ${data2[0]}`;
      case '11':
        return `${data2[2]} de novembro de ${data2[0]}`;
      case '12':
        return `${data2[2]} de dezembro de ${data2[0]}`;
      default:
        return '';
    }
  }

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Histórico de Compras</h2>
          </TituloPag>

          <ResponsiveTable>
            {historico.length > 0 ? (
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
                  {historico.map((item) => (
                    <tr key={String(item.id)}>
                      <td>{item.nome}</td>
                      <td>{MascaraData(item.dataDeCompra)}</td>
                      <td>
                        {Number.isInteger(item.preco)
                          ? `R$ ${item.preco},00`
                          : `R$ ${item.preco.toString().replace('.', ',')}`}
                      </td>
                      <td>{item.formaDePagamento}</td>
                      <td>
                        <button type="button">Recibo</button>
                      </td>
                    </tr>
                  ))}
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
