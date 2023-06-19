import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ImagemResponsiva from '../../components/ImgResponsive';
import axios from '../../services/axios';
import './styled.css';
import imgInicial from '../../img/img-inicial.svg';

export default function Index() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // Curso
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get('/home/');
        const ultimosCursos = data
          .filter((curso) => curso && curso.FotoCursos.length > 0)
          .slice(-6);

        setCursos(ultimosCursos);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }
    }

    getData();
  }, []);

  return (
    <>
      {/* // Header */}
      <aside className="menu white-bg">
        <div className="main-content menu-content">
          <h1>
            <a href="#home">Curso em Vídeo</a>
          </h1>
          <nav>
            <ul>
              <li>
                <a href="#intro">Quem Somos</a>
              </li>
              <li>
                <a href="#grid-one">Aprenda Conosco</a>
              </li>
              <li>
                <a href="#gallery">Cursos</a>
              </li>
              {/* <li>
                <a href="#grid-two">Segunda Grid</a>
              </li> */}
              <li>
                <a href="#contact">Contato</a>
              </li>
              <li>
                {isLoggedIn ? (
                  <Link to="/home">Home</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      {/* <!-- Espaço menu --> */}
      <div className="menu-spacing" />

      {/* <!-- Section 1 --> */}
      <section id="home" className="intro main-bg section">
        <div className="main-content intro-content">
          <div className="intro-text-content">
            <h2>Descubra o aprendizado online!</h2>
            <p>
              Explore cursos online de alta qualidade, desenvolvidos por
              especialistas. Aprenda no seu ritmo e alcance seus objetivos de
              aprendizado.
            </p>
          </div>
          <div className="intro-img">
            <img src={imgInicial} alt="Logo de HTML, CSS e JavaScript." />
          </div>
        </div>
      </section>

      {/* <!-- Section 2 --> */}
      <section id="intro" className="white-bg section">
        <div className="main-content top3-content">
          <h2>Quem Somos</h2>
          <p>
            Somos uma equipe apaixonada pela educação online e pela
            democratização do conhecimento. Oferecemos cursos de alta qualidade,
            acessíveis a todos, independentemente de sua localização ou
            recursos.
          </p>
          <p>
            Nossa equipe de instrutores altamente qualificados, provenientes de
            diversas áreas de conhecimento, traz consigo experiência prática e
            conhecimentos especializados. Garantimos acesso a conteúdos
            atualizados e relevantes para o seu sucesso pessoal e profissional.
          </p>
          <p>
            Nosso compromisso vai além de cursos excepcionais, buscamos
            proporcionar uma experiência de usuário única. Nossa equipe de
            suporte está sempre disponível para ajudar, garantindo uma jornada
            de aprendizado tranquila. Estamos aqui para apoiá-lo desde a escolha
            do curso até a conclusão bem-sucedida.
          </p>
        </div>
      </section>

      {/* <!-- Section 3 --> */}
      <section id="grid-one" className="grid-one main-bg section">
        <div className="main-content grid-one-content">
          <h2 className="grid-main-heading">Aprenda Conosco</h2>
          <p className="grid-description">
            Descubra por que somos a melhor opção para o seu aprendizado online.
          </p>
          <div className="grid">
            <article>
              <h3>-</h3>
              <p>
                Nossa plataforma foi projetada com foco na facilidade de uso e
                na navegabilidade. Você encontrará uma interface intuitiva, que
                permite explorar facilmente os cursos, visualizar o conteúdo e
                acompanhar seu progresso. Além disso, oferecemos recursos como
                fóruns de discussão e atividades práticas, para que você possa
                interagir com outros alunos e aplicar o que aprendeu.
              </p>
            </article>
            <article>
              <h3>-</h3>
              <p>
                Todos os nossos cursos são cuidadosamente elaborados por
                especialistas em suas áreas, garantindo que você receba
                conhecimentos de alta qualidade e atualizados. Valorizamos o
                aprendizado prático, fornecendo exemplos do mundo real e
                exercícios que o ajudarão a aplicar o que aprendeu em situações
                reais.
              </p>
            </article>
            <article>
              <h3>-</h3>
              <p>
                Estamos comprometidos em oferecer um ambiente de aprendizado
                inclusivo e acessível. Nossa plataforma suporta recursos de
                acessibilidade, como legendas em vídeos e opções de contraste de
                cores. Além disso, buscamos manter preços acessíveis para nossos
                cursos, para que o conhecimento esteja ao alcance de todos.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* <!-- Section 4 --> */}
      <section id="gallery" className="grid-one white-bg section">
        <div className="main-content grid-one-content">
          {cursos.length === 0 ? (
            <h2 className="grid-main-heading-center">
              Não foi possível carregar os cursos no momento.
            </h2>
          ) : (
            <>
              <h2 className="grid-main-heading">Cursos mais procurados</h2>
              {/* <p className="grid-description">Lorem</p> */}
              <div className="grid">
                {cursos.length > 0 ? (
                  cursos.map((curso) => (
                    <div className="gallery-img" key={String(curso.id)}>
                      <Link to={`/cursos/${curso.id}`}>
                        <ImagemResponsiva
                          imageUrl={curso.FotoCursos[0].url}
                          width={300}
                          height={300}
                          alt="Imagem do curso"
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* <!-- Section 7 --> */}
      <section id="contact" className="intro main-bg section">
        <div className="main-content intro-content intro-content-contato">
          <div className="intro-text-content">
            <h2>Entre em contato conosco</h2>
            {/* <p>Talvez um Texto</p> */}
          </div>
          <div className="contact-form">
            <fieldset className="form-grid">
              <legend>Contato</legend>

              <div className="form-group">
                {/* eslint-disable-next-line */}
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Seu nome"
                />
              </div>

              <div className="form-group">
                {/* eslint-disable-next-line */}
                <label htmlFor="sobrenome">Sobrenome</label>
                <input
                  type="text"
                  name="sobrenome"
                  id="sobrenome"
                  placeholder="Seu sobrenome"
                />
              </div>

              <div className="form-group">
                {/* eslint-disable-next-line */}
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Seu e-mail"
                />
              </div>

              <div className="form-group full-width">
                {/* eslint-disable-next-line */}
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  name="mensagem"
                  id="mensagem"
                  cols="30"
                  rows="10"
                  placeholder="Sua mensagem"
                />
              </div>

              <div className="form-group full-width">
                <button type="submit">Enviar</button>
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer white-bg">
        <p>
          <a
            rel="nofollow noreferrer"
            target="_blank"
            href="https://github.com/ErosNetto"
          >
            Feito por: Eros Netto Antunes
          </a>
        </p>
      </footer>

      {/* <a className="back-to-top" href="#">
        ➤
      </a> */}
    </>
  );
}
