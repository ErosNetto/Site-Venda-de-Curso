import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeaderInicio, SearchBox, MenuSuspeso, Nav } from './style';
import fotoPerfil from '../../img/Group 5.png';

export default function Header() {
  const [expanded, setExpanded] = useState(false);

  const istrutor = useSelector((state) => state.auth.istrutor);

  function handleExpandir() {
    setExpanded(!expanded);
  }

  return (
    <>
      <HeaderInicio>
        <div className="btn-exp">
          {/* <button onClick={handleExpandir} type="button">
            <i className="bi bi-list" id="btn-ex" />
          </button> */}
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
              <Link to="/lista-de-desejo" className="a-horizontal">
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
                      <img src={fotoPerfil} alt="Foto de perfil" />
                    </div>
                    <div className="info-text">
                      <h3>Eros Netto Antunes</h3>
                      <p>erosnettoantunes@gmail.com</p>
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
                    <Link to="/lista-de-desejo">Lista de desejos</Link>
                  </li>
                  <li>
                    <Link to="/configuracoes">Configurações da Conta</Link>
                  </li>
                  <li>
                    <Link to="/historico-de-compras">Histórico de compras</Link>
                  </li>
                  <li>
                    <Link to="/">Sair</Link>
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
            <li className="item-menu ativo">
              <Link to="/home">
                <span className="icon">
                  <i className="bi bi-house-door" />
                </span>
                <span className="text-link">Inicio</span>
              </Link>
            </li>

            <li className="item-menu">
              <Link to="/perfil">
                <span className="icon">
                  <i className="bi bi-person-circle" />
                </span>
                <span className="text-link">Perfil</span>
              </Link>
            </li>

            {istrutor ? (
              <li className="item-menu">
                <Link to="/cursos">
                  <span className="icon">
                    <i className="bi bi-folder" />
                  </span>
                  <span className="text-link">Cursos</span>
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li className="item-menu">
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
