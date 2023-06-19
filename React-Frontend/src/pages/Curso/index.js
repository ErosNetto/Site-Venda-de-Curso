import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
  ConteudoCurso,
  Botoes,
  LadoDireito,
} from './styled';

export default function Curso({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [preco, setPreco] = useState('');
  const [instrutor, setInstrutor] = useState('');
  const [instrutorID, setInstrutorID] = useState('');
  const [fotoCursos, setFotoCursos] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/cursos/${id}`);
        const FotoCursos = get(data, 'FotoCursos[0].url', '');

        if (!FotoCursos) {
          toast.warn('Não foi possivel acessar esse curso');
          history.push('/home');
        }
        setFotoCursos(FotoCursos);

        setNome(data.nome);
        setDescricao(data.descricao);
        setCategoria(data.categoria);
        setCargaHoraria(data.carga_horaria);
        setPreco(data.preco);
        setInstrutor(data.Instrutor.nome);
        setInstrutorID(data.Instrutor.id);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/home');
      }
    }

    getData();
  }, [id]);

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />
      <ContainerBack>
        <Main>
          <TituloTexto>
            <h1>{nome}</h1>
            <h2>R$ {preco}</h2>
          </TituloTexto>
          <GridConteudo>
            <LadoEsquerdo>
              <ImagemResponsiva
                imageUrl={fotoCursos}
                width={522}
                height={275}
                alt="Imagem do curso"
              />
              <ConteudoCurso>
                <h4>
                  Professor:{' '}
                  <Link to={`/instrutor/${instrutorID}`}>{instrutor}</Link>
                </h4>
                <h4>
                  Carga horária: <span>{cargaHoraria}h</span>
                </h4>
                <h4>
                  Categoria: <Link to={`/home/${categoria}`}>{categoria}</Link>
                </h4>
              </ConteudoCurso>
              <Botoes>
                <button type="button">Adiconar ao carrinho</button>
                <div>
                  <i className="bi bi-heart-fill" />
                </div>
              </Botoes>
            </LadoEsquerdo>
            <LadoDireito>
              <p>{descricao}</p>
            </LadoDireito>
          </GridConteudo>
        </Main>
      </ContainerBack>
    </>
  );
}

Curso.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
