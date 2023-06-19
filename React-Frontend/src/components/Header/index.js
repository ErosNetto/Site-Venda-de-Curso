import React, { useEffect, useState } from 'react';
// import { get } from 'lodash';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/modules/auth/actions';
// import axios from '../../services/axios';
import history from '../../services/history';
// import Loading from '../Loading';
import { HeaderInicio, SearchBox, MenuSuspeso, Nav } from './style';
import fotoPerfil from '../../img/Group 5.png';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { categoria } = useParams();
  const buscaCategoria = categoria ? decodeURI(categoria) : '';

  const [expanded, setExpanded] = useState(false);

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const istrutor = useSelector((state) => state.auth.user.istrutor);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  // const [fotoUser, setFotoUser] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const [pagina, setPagina] = useState('');

  function handleExpandir() {
    setExpanded(!expanded);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    toast.warn('Você saiu!');
    history.push('/');
  };

  useEffect(() => {
    if (!id) return;

    const paginaAtual = location.pathname;
    setPagina(paginaAtual);

    setNome(nomeStored);
    setEmail(emailStored);

    // async function getData() {
    //   try {
    //     // setIsLoading(true);
    //     const { data } = await axios.get(`/user/${id}`);
    //     const FotoUser = get(data, 'FotoUser[0].url', '');

    //     setFotoUser(FotoUser);

    //     // setIsLoading(false);
    //   } catch (err) {
    //     // setIsLoading(false);
    //     const status = get(err, 'response.status', 0);
    //     const errors = get(err, 'response.data.errors', []);

    //     if (status === 400) errors.map((error) => toast.error(error));
    //     // toast.error('Erro ao carregar a imagem de usuario!');
    //   }
    // }

    // getData();
  }, [id, nomeStored, emailStored, location]);

  return (
    <>
      {/* <Loading isLoading={isLoading} /> */}
      <HeaderInicio>
        <div className="btn-exp">
          {/* eslint-disable-next-line */}
          <i onClick={handleExpandir} className="bi bi-list" id="btn-ex" />
          <h1>
            <Link to="/home">Curso em Vídeo</Link>
          </h1>
        </div>

        <nav>
          <ul>
            <li>
              <SearchBox>
                <input type="text" placeholder="Pesquisar..." />
                <Link to="#id">
                  <i className="bi bi-search" />
                </Link>
              </SearchBox>
            </li>

            <li>
              <Link to="/carrinho-de-compras" className="a-horizontal">
                <i className="bi bi-cart cart1" />
                <i className="bi bi-cart-fill cart2" />
              </Link>
            </li>

            <li>
              <Link to="/favoritos" className="a-horizontal">
                <i className="bi bi-heart he1" />
                <i className="bi bi-heart-fill he2" />
              </Link>
            </li>

            <li className="menu-hover">
              <Link to="/perfil" className="a-horizontal">
                <div className="img-user">
                  <img src={fotoPerfil} alt="Foto de perfil" />
                </div>
              </Link>

              <MenuSuspeso id="menu-sus">
                <div className="info-conteudo">
                  <Link to="/perfil">
                    <div className="info-img">
                      {/* {fotoUser ? ( */}
                      {/* <img src={fotoUser} alt="Foto de perfil" /> */}
                      {/* ) : ( */}
                      <img src={fotoPerfil} alt="Foto de perfil" />
                      {/* )} */}
                    </div>
                    <div className="info-text">
                      <h3>{nome}</h3>
                      <p>{email}</p>
                    </div>
                  </Link>
                </div>
                <hr />
                <ul>
                  <li>
                    <Link to="/perfil">Meu Perfil</Link>
                  </li>
                  <li>
                    <Link to="/carrinho-de-compras">Meu Carrinho</Link>
                  </li>
                  <li>
                    <Link to="/favoritos">Favoritos</Link>
                  </li>
                  <li>
                    <Link to="/configuracoes">Configurações da Conta</Link>
                  </li>
                  <li>
                    <Link to="/historico-de-compras">Histórico de compras</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogout} to="/logout">
                      Sair
                    </Link>
                  </li>
                </ul>
              </MenuSuspeso>
            </li>
          </ul>
        </nav>
      </HeaderInicio>

      <aside>
        <Nav className={expanded ? 'expandir' : ''}>
          <ul>
            <li
              className={
                pagina === '/home' || buscaCategoria
                  ? 'item-menu ativo'
                  : 'item-menu'
              }
            >
              <Link to="/home">
                <span className="icon">
                  <i className="bi bi-house-door" />
                </span>
                <span className="text-link">Inicio</span>
              </Link>
            </li>

            <li
              className={pagina === '/perfil' ? 'item-menu ativo' : 'item-menu'}
            >
              <Link to="/perfil">
                <span className="icon">
                  <i className="bi bi-person-circle" />
                </span>
                <span className="text-link">Perfil</span>
              </Link>
            </li>

            {istrutor ? (
              <li
                className={
                  pagina === '/cursos' ? 'item-menu ativo' : 'item-menu'
                }
              >
                <Link to="/meusCursos">
                  <span className="icon">
                    <i className="bi bi-folder" />
                  </span>
                  <span className="text-link">Cursos</span>
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li
              className={
                pagina === '/configuracoes' ? 'item-menu ativo' : 'item-menu'
              }
            >
              <Link to="/configuracoes">
                <span className="icon">
                  <i className="bi bi-gear" />
                </span>
                <span className="text-link">Configuração</span>
              </Link>
            </li>
          </ul>
        </Nav>
      </aside>
    </>
  );
}
