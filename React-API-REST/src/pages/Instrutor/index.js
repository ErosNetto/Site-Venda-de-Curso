import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import ImagemResponsiva from '../../components/ImgResponsive';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import {
  Main,
  TituloTexto,
  GridConteudo,
  LadoEsquerdo,
  LadoDireito,
  ConteudoCursos,
  Curso,
  ImgCurso,
} from './styled';
import SemFoto from '../../img/sem-foto-instrutor.png';

export default function Instrutor({ match }) {
  const id = get(match, 'params.id', '');
  const [idConvertido, setIdConvertido] = useState(null);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  // const [profissao, setProfissao] = useState('');
  const [biografia, setBiografia] = useState('');
  // const [idioma, setIdioma] = useState('Portugues(BR)');
  const [foto, setFoto] = useState('');
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const ConverteID = parseInt(id, 10);
    setIdConvertido(ConverteID);

    // Procura o instrutor pelo ID
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/instrutor/${id}`);
        const FotoInstrutor = get(data, 'FotoInstrutors[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        // setProfissao(data.profissao);
        setBiografia(data.biografia);
        // setIdioma(data.idioma);
        setFoto(FotoInstrutor);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400 || errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }

        history.push('/home');
      }

      // Pega todos os cursos que o instrutor tiver
      try {
        setIsLoading(true);
        const { data } = await axios.get('/cursos/');
        const cursosFiltrados = data.filter(
          (curso) => curso.Instrutor.id === idConvertido
        );

        const cursosComFotos = [];
        cursosFiltrados
          .filter((curso) => curso.FotoCursos.length > 0)
          .forEach((curso) => cursosComFotos.push(curso));

        setCursos(cursosComFotos);
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
  }, [id, idConvertido]);

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <h2>Perfil do instrutor</h2>
          </TituloTexto>

          <GridConteudo>
            <LadoEsquerdo>
              {foto ? (
                <ImagemResponsiva
                  imageUrl={foto}
                  width={250}
                  height={250}
                  alt="Imagem do curso"
                />
              ) : (
                <img src={SemFoto} alt="Foto do Instrutor" />
              )}

              <p>{`${nome} ${sobrenome}`}</p>
            </LadoEsquerdo>

            <LadoDireito>
              <h3>Sobre</h3>
              <p>{biografia}</p>
            </LadoDireito>
          </GridConteudo>

          <h3 className="inst-h3">
            {cursos
              ? 'Curos autorais:'
              : 'No momento este instrutor não possui nenhum curso'}
          </h3>

          <ConteudoCursos>
            {cursos ? (
              cursos.map((curso) => (
                <Curso key={String(curso.id)}>
                  <ImgCurso>
                    <Link to={`/cursos/${curso.id}`}>
                      <ImagemResponsiva
                        imageUrl={curso.FotoCursos[0].url}
                        width={240}
                        height={188}
                        alt="Imagem do curso"
                      />
                    </Link>
                  </ImgCurso>
                  <h4>{curso.nome}</h4>
                </Curso>
              ))
            ) : (
              <></>
            )}
          </ConteudoCursos>
        </Main>
      </ContainerBack>
    </>
  );
}

Instrutor.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
