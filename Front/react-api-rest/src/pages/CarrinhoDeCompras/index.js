import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

import { ContainerBack } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
  Main,
  TituloTexto,
  FooterTexto,
  GridListCurso,
  TextoCurso,
  BotoesCurso,
  PrecoCurso,
} from './styled';
import Html from '../../img/HTML-5.jpg';

export default function CarrinhoDeCompras() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);
  const [cursos, setCursos] = useState([]);
  const [carrinholength, setCarrinholength] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/carrinhoDeCompras/');
      const carrinhoFiltrado = response.data.filter(
        (carrinho) => carrinho.user_id === userId
      );
      setCarrinholength(carrinhoFiltrado);

      try {
        const cursoPromises = carrinhoFiltrado.map((carrinho) =>
          axios.get(`/cursos/${carrinho.curso_id}`)
        );
        // console.log(cursoPromises);

        const cursoResponses = await Promise.all(cursoPromises);
        // console.log(cursoResponses);

        const cursosFiltrados = cursoResponses.map(
          (response2) => response2.data
        );
        // console.log(cursosFiltrados);

        setCursos(cursosFiltrados);
      } catch (err) {
        setIsLoading(false);
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }

      setIsLoading(false);
    }

    getData();
  }, [userId]);

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <div className="carrinho">
              <h2 to="/">Carrinho({carrinholength.length})</h2>
            </div>
            <div className="favoritos">
              <Link to="/">Favoritos(4)</Link>
            </div>
          </TituloTexto>

          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <GridListCurso key={String(curso.id)}>
                {get(curso, 'FotoCursos[0].url', false) ? (
                  <div className="imagen-curso">
                    <img src={curso.FotoCursos[0].url} alt="Imagem do curso" />
                  </div>
                ) : (
                  <div className="imagen-curso">
                    <img src={Html} alt="Imagem do curso" />
                  </div>
                )}
                <TextoCurso>
                  <h3>
                    <Link to={`/cursos/${curso.id}`}>{curso.nome}</Link>
                  </h3>
                  <BotoesCurso>
                    <Link to="/">Comprar agora</Link>
                    <Link to="/">Excluir</Link>
                    <Link to="/">Adcionar aos favoritos</Link>
                  </BotoesCurso>
                </TextoCurso>
                <PrecoCurso>
                  <h4>
                    {Number.isInteger(curso.preco)
                      ? `R$ ${curso.preco}.00`
                      : `R$ ${curso.preco}`}
                  </h4>
                </PrecoCurso>
              </GridListCurso>
            ))
          ) : (
            <h3>Carrinho vazio</h3>
          )}

          <FooterTexto>
            <button type="button">Comprar</button>
            <h4>Total: R$ 495,97</h4>
          </FooterTexto>
        </Main>
      </ContainerBack>
    </>
  );
}
