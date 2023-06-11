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
  GridListCurso,
  TextoCurso,
  BotoesCurso,
  PrecoCurso,
  FavoritoVazio,
} from './styled';
import Html from '../../img/HTML-5.jpg';

export default function CarrinhoDeCompras() {
  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Carrinho de Compras
  const [favoritosMaisCursos, setFavoritosMaisCursos] = useState([]);
  const [carrinholength, setCarrinholength] = useState(0);
  const [favoritoslength, setFavoritoslength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    // Get favoritos
    async function getData() {
      setIsLoading(true);

      try {
        // Carrinho de Compras
        const responseCar = await axios.get('/carrinhoDeCompras/');
        const carrinhoFiltrado = responseCar.data.filter(
          (carrinho) => carrinho.user_id === userId
        );
        setCarrinholength(carrinhoFiltrado.length);

        // Favoritos
        const responseFav = await axios.get('/favoritos/');
        const favoritoFiltrado = responseFav.data.filter(
          (favorito) => favorito.user_id === userId
        );
        setFavoritoslength(favoritoFiltrado.length);

        const cursoPromises = favoritoFiltrado.map((favorito) =>
          axios.get(`/cursos/${favorito.curso_id}`)
        );

        const cursoResponses = await Promise.all(cursoPromises);

        const favoritoComCursos = favoritoFiltrado.map((favorito, index) => {
          const curso = cursoResponses[index].data;
          const idFavoritos = favorito.id;
          return { idFavoritos, curso };
        });

        setFavoritosMaisCursos(favoritoComCursos);
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

      setIsLoading(false);
    }

    getData();
  }, [userId]);

  // Excluir o curso dos favoritos
  async function handleDeleteItem(e, idFavoritos, index) {
    e.persist();
    if (!idFavoritos) return;

    try {
      setIsLoading(true);

      await axios.delete(`/favoritos/${idFavoritos}`);
      const novosCursos = [...favoritosMaisCursos];
      novosCursos.splice(index, 1);
      setFavoritosMaisCursos(novosCursos);
      setFavoritoslength(novosCursos.length);

      setIsLoading(false);
      toast.success('Curso excluido');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao excluir o curso');
      }
    }
  }

  // Mover o curso para o carrinho de compras
  async function handleMovCarrrinho(e, idFavoritos, idCurso, index) {
    e.persist();
    if (!idFavoritos) return;

    try {
      setIsLoading(true);

      const response = await axios.get('/carrinhoDeCompras/');
      const favoritos = response.data;

      const cursoNoCarrinho = favoritos.find(
        (item) => item.curso_id === idCurso && item.user_id === userId
      );

      if (cursoNoCarrinho) {
        setIsLoading(false);
        toast.warn('Esse curso já está no seu carrinho!');
        return;
      }

      await axios.delete(`/favoritos/${idFavoritos}`);
      const novosCursos = [...favoritosMaisCursos];
      novosCursos.splice(index, 1);
      setFavoritosMaisCursos(novosCursos);
      setFavoritoslength(novosCursos.length);
      setCarrinholength((prevLength) => prevLength + 1);

      await axios.post('/carrinhoDeCompras/', {
        curso_id: idCurso,
        user_id: userId,
      });

      setIsLoading(false);
      toast.success('Curso adicionado ao carrinho');
    } catch (err) {
      setIsLoading(false);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro ao adicionar no carrinho');
      }
    }
  }

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <div className="carrinho">
              <Link to="/carrinho-de-compras/">Carrinho({carrinholength})</Link>
            </div>
            <div className="favoritos">
              <h2>Favoritos({favoritoslength})</h2>
            </div>
          </TituloTexto>

          {favoritosMaisCursos.length > 0 ? (
            favoritosMaisCursos.map((item, index) => (
              <GridListCurso key={String(item.idFavoritos)}>
                {get(item.curso, 'FotoCursos[0].url', false) ? (
                  <div className="imagen-curso">
                    <img
                      src={item.curso.FotoCursos[0].url}
                      alt="Imagem do curso"
                    />
                  </div>
                ) : (
                  <div className="imagen-curso">
                    <img src={Html} alt="Imagem do curso" />
                  </div>
                )}
                <TextoCurso>
                  <h3>
                    <Link to={`/cursos/${item.curso.id}`}>
                      {item.curso.nome}
                    </Link>
                  </h3>
                  <BotoesCurso>
                    <Link
                      to="/favoritos/"
                      onClick={(e) =>
                        handleDeleteItem(e, item.idFavoritos, index)
                      }
                    >
                      Excluir
                    </Link>
                    <Link
                      to="/favoritos/"
                      onClick={(e) =>
                        handleMovCarrrinho(
                          e,
                          item.idFavoritos,
                          item.curso.id,
                          index
                        )
                      }
                    >
                      Adicionar ao carrinho de compras
                    </Link>
                  </BotoesCurso>
                </TextoCurso>
                <PrecoCurso>
                  <h4>
                    {Number.isInteger(item.curso.preco)
                      ? `R$ ${item.curso.preco}.00`
                      : `R$ ${item.curso.preco}`}
                  </h4>
                </PrecoCurso>
              </GridListCurso>
            ))
          ) : (
            <FavoritoVazio>Você não tem nenhum favorito</FavoritoVazio>
          )}
        </Main>
      </ContainerBack>
    </>
  );
}
