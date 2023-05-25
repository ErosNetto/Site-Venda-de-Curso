import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
  Main,
  TituloPag,
  Filtro,
  ConteudoCurso,
  Curso,
  ImgCurso,
  Descricao,
  Botoes,
} from './styled';
import axios from '../../services/axios';

export default function Home() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/cursos');
      setCursos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Cursos</h2>
            <Filtro>
              <select name="categorias">
                <option id="1" value="valor1">
                  Categoria
                </option>
                <option id="2" value="valor2">
                  Desenvolvimento
                </option>
                <option id="3" value="valor3">
                  Negócios
                </option>
                <option id="4" value="valor4">
                  Finanças e contabilidade
                </option>
                <option id="5" value="valor5">
                  Ti e software
                </option>
                <option id="6" value="valor6">
                  Produtividade no escritório
                </option>
                <option id="7" value="valor7">
                  Desenvolvimento Pessoal
                </option>
                <option id="8" value="valor8">
                  Design
                </option>
                <option id="9" value="valor9">
                  Marketing
                </option>
                <option id="10" value="valor10">
                  Estilo de vida
                </option>
                <option id="11" value="valor11">
                  Fotografia e vídeo
                </option>
                <option id="12" value="valor12">
                  Saúde e fitness
                </option>
                <option id="13" value="valor12">
                  Música
                </option>
                <option id="14" value="valor14">
                  Ensino e estudo acadêmico
                </option>
              </select>
            </Filtro>
          </TituloPag>

          <ConteudoCurso>
            {cursos.map((curso) => (
              <Curso key={String(curso.id)}>
                <ImgCurso>
                  {get(curso, 'FotoCursos[0].url', false) ? (
                    <Link to={`/cursos/${curso.id}`}>
                      <img
                        src={curso.FotoCursos[0].url}
                        alt="Imagem do curso"
                      />
                    </Link>
                  ) : (
                    <Link to={`/cursos/${curso.id}`}>
                      <img
                        src="https://source.unsplash.com/random/270x210?r=1?e=4"
                        alt="Imagem do curso"
                      />
                    </Link>
                  )}
                </ImgCurso>
                <Descricao>
                  <h3>{curso.nome}</h3>
                  <h4>{curso.Instrutor.nome}</h4>
                  <p>{curso.preco}</p>
                </Descricao>
                <Botoes>
                  <button type="button">Adiconar ao carrinho</button>
                  <div>
                    <i className="bi bi-heart-fill" />
                  </div>
                </Botoes>
              </Curso>
            ))}
          </ConteudoCurso>
        </Main>
      </ContainerBack>
    </>
  );
}
