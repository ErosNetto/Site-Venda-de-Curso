import React from 'react';

import { Link } from 'react-router-dom';

import './styled.css';
import javaScritpImg from '../../img/javascript-img.svg';

export default function Index() {
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
                <a href="#grid-one">Primeira Grid</a>
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
                <Link to="/login">Login</Link>
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
            <h2>Mergulhe na Tecnologia</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
              aliquid deserunt ea. Quia adipisci nobis tempora explicabo? Animi
              dolor, quis similique exercitationem voluptate ad itaque eum quo
              fugit, cumque quia!
            </p>
          </div>
          <div className="intro-img">
            <img src={javaScritpImg} alt="Logo de HTML, CSS e JavaScript." />
          </div>
        </div>
      </section>

      {/* <!-- Section 2 --> */}
      <section id="intro" className="white-bg section">
        <div className="main-content top3-content">
          <h2>Quem Somos</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
        </div>
      </section>

      {/* <!-- Section 3 --> */}
      <section id="grid-one" className="grid-one main-bg section">
        <div className="main-content grid-one-content">
          <h2 className="grid-main-heading">Grid</h2>
          <p className="grid-description">Uma breve descrição.</p>
          <div className="grid">
            <article>
              <h3>Teste 1</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
            <article>
              <h3>Teste 2</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
            <article>
              <h3>Teste 3</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* <!-- Section 4 --> */}
      <section id="gallery" className="grid-one white-bg section">
        <div className="main-content grid-one-content">
          <h2 className="grid-main-heading">Cursos mais procurados</h2>
          <p className="grid-description">Lorem</p>
          <div className="grid">
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=1"
                alt="random image from unsplash"
              /> */}
            </div>
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=2"
                alt="random image from unsplash"
              /> */}
            </div>
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=3"
                alt="random image from unsplash"
              /> */}
            </div>
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=4"
                alt="random image from unsplash"
              /> */}
            </div>
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=5"
                alt="random image from unsplash"
              /> */}
            </div>
            <div className="gallery-img">
              {/* <img
                src="https://source.unsplash.com/random/360x360?r=6"
                alt="random image from unsplash"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 5 -->
      <section id="grid-two" className="grid-one main-bg section">
        <div className="main-content grid-one-content">
          <h2 className="grid-main-heading">My Grid 2</h2>
          <p className="grid-description">Uma breve descrição.</p>
          <div className="grid">
            <article>
              <h3>Texto 1</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
            <article>
              <h3>Texto 2</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
            <article>
              <h3>Texto 3</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                cumque sed exercitationem ducimus voluptatem ipsam, soluta,
                dolor quibusdam libero quas quam adipisci itaque molestias,
                corporis ex fuga? Autem, dolor quas.
              </p>
            </article>
          </div>
        </div>
      </section> */}

      {/* <!-- Section 6 -->
      <section id="intro" className="white-bg section">
        <div className="main-content top3-content">
          <h2>Quem Somos</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem velit saepe quidem ipsa reiciendis nesciunt commodi
            labore, voluptatem laborum expedita atque tenetur dolorem
            praesentium similique iusto ab reprehenderit perferendis aliquam.
          </p>
        </div>
      </section> */}

      {/* <!-- Section 7 --> */}
      <section id="contact" className="intro main-bg section">
        <div className="main-content intro-content">
          <div className="intro-text-content">
            <h2>Fale conosco</h2>
            <p>Talvez um Texto</p>
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
