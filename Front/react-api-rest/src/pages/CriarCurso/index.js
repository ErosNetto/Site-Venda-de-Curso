import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import {
  Main,
  TituloTexto,
  GridConteudo,
  Form,
  LadoDireito,
  Container1,
  Container2,
  FotoDoCurso,
  VideoCurso,
} from './styled';
import SemFoto from '../../img/Group 5.png';

export default function CriarCurso({ match }) {
  const dispatch = useDispatch();

  // Intrutor
  const idInstrutorSalvo = useSelector((state) => state.auth.idDoInstrutor);

  // Curso editar
  const idCursoEditar = get(match, 'params.id', '');

  // Curso
  const [idCurso, setIdCurso] = useState('');
  const [nomeCurso, setNomeCurso] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Foto e video Curso
  const [fotoCurso, setFotoCurso] = useState('');
  const [videoCurso, setVideoCurso] = useState('');

  useEffect(() => {
    if (!idCursoEditar) return;
    setIdCurso(idCursoEditar);

    // Seta o curso caso seja para editar
    async function getCurso() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/cursos/${idCursoEditar}`);
        const FotoCurso = get(data, 'FotoCursos[0].url', '');
        const VideoDoCurso = get(data, 'VideoCursos[0].originalname', '');

        if (data) {
          setFotoCurso(FotoCurso);
          setVideoCurso(VideoDoCurso);
          setNomeCurso(data.nome);
          setCategoria(data.categoria);
          setCargaHoraria(data.carga_horaria);
          setPreco(data.preco);
          setDescricao(data.descricao);
        } else {
          setNomeCurso('');
          setCategoria('');
          setCargaHoraria('');
          setPreco('');
          setDescricao('');
        }

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

    getCurso();
  }, [idCursoEditar]);

  async function handleCriarEditarCurso(e) {
    e.preventDefault();
    if (!idInstrutorSalvo) return;

    let formErrors = false;

    if (nomeCurso.length < 3 || nomeCurso.length > 255) {
      formErrors = true;
      toast.error('O nome do curso precisa ter entre 3 e 255 caracteres');
    }

    if (!categoria === 'Categoria' || categoria <= 0) {
      formErrors = true;
      toast.error('Selecione uma categoria');
    }

    if (cargaHoraria <= 0) {
      formErrors = true;
      toast.error('Preencha a carga horária');
    }

    const precoConvetido = parseFloat(preco);
    setPreco(precoConvetido);

    if (preco < 0 || Number.isNaN(preco)) {
      formErrors = true;
      toast.error('Campo preço é obrigatório');
    }

    if (descricao.length < 10) {
      formErrors = true;
      toast.error('Campo descrição precisa ter no minimo 10 caracteres.');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      if (idCurso) {
        // UPDATE
        await axios
          .put(`/cursos/${idCurso}`, {
            nome: nomeCurso,
            descricao,
            categoria,
            carga_horaria: cargaHoraria,
            preco,
            instrutor_id: idInstrutorSalvo,
          })
          .then((response) => {
            setIdCurso(response.data.id);
          })
          .catch(() => {
            toast.error('Ocorreu um erro desconhecido');
          });
        toast.success('Curso editado com sucesso');
      } else {
        // CREATE
        await axios
          .post('/cursos/', {
            nome: nomeCurso,
            descricao,
            categoria,
            carga_horaria: cargaHoraria,
            preco,
            instrutor_id: idInstrutorSalvo,
          })
          .then((response) => {
            setIdCurso(response.data.id);
          })
          .catch(() => {
            toast.error('Ocorreu um erro desconhecido');
          });
        toast.success('Curso criado com sucesso');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  // Envia a foto do curso
  async function handleFotoCurso(e) {
    if (!idCurso) {
      toast.warn(
        'Tempo expirado você precisa voltar e editar o curso para colocar uma foto nele!'
      );
      return;
    }

    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFotoCurso(fotoURL);

    const formData = new FormData();
    formData.append('curso_id', idCurso);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotosCurso/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso!');

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

  // Envia o video do curso
  async function handleVideoCurso(e) {
    if (!idCurso) {
      toast.warn(
        'Tempo expirado você precisa voltar e editar o curso para colocar um video nele!'
      );
      return;
    }

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('curso_id', idCurso);
    formData.append('video', file);

    try {
      setIsLoading(true);

      await axios.post('/videoCurso/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Video enviado com sucesso!');

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

  // Escolhe a opçaõ do Setect (categoria)
  const handleSelectOpcoes = (e) => {
    setCategoria(e.target.value);
  };

  // Tira a Mascara do preço
  const handlePrecoChange = (value) => {
    const precoNumber = parseFloat(
      value.replace(/[^0-9,-]+/g, '').replace(',', '.')
    );
    setPreco(precoNumber);
  };

  // Input de arquivo
  const handleInputAquivo = (e) => {
    document.querySelector('.nome-arquivo').textContent =
      e.target.files[0].name;
  };

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />

      <ContainerBack>
        <Main>
          <TituloTexto>
            <h1>{idCurso ? 'Editar Curso' : 'Criar curso'}</h1>
          </TituloTexto>

          <GridConteudo>
            <Form>
              <div className="grupo-form">
                <label htmlFor="nomeCurso">Nome do curso</label>
                <input
                  type="text"
                  value={nomeCurso}
                  onChange={(e) => setNomeCurso(e.target.value)}
                  placeholder="O nome do curso"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="categorias">Categoria</label>
                <select
                  name="categorias"
                  onChange={handleSelectOpcoes}
                  value={categoria}
                >
                  <option key={1} id="1" value="">
                    Selecione uma opção
                  </option>
                  <option key={2} id="2" value="Desenvolvimento">
                    Desenvolvimento
                  </option>
                  <option key={3} id="3" value="Negócios">
                    Negócios
                  </option>
                  <option key={4} id="4" value="Finanças e contabilidade">
                    Finanças e contabilidade
                  </option>
                  <option key={5} id="5" value="Ti e software">
                    Ti e software
                  </option>
                  <option key={6} id="6" value=" Produtividade no escritório">
                    Produtividade no escritório
                  </option>
                  <option key={7} id="7" value="Desenvolvimento Pessoal">
                    Desenvolvimento Pessoal
                  </option>
                  <option key={8} id="8" value="Design">
                    Design
                  </option>
                  <option key={9} id="9" value="Marketing">
                    Marketing
                  </option>
                  <option key={10} id="10" value="Estilo de vida">
                    Estilo de vida
                  </option>
                  <option key={11} id="11" value="Fotografia e vídeo">
                    Fotografia e vídeo
                  </option>
                  <option key={12} id="12" value="Saúde e fitness">
                    Saúde e fitness
                  </option>
                  <option key={13} id="13" value="Música">
                    Música
                  </option>
                  <option key={14} id="14" value="Ensino e estudo acadêmico">
                    Ensino e estudo acadêmico
                  </option>
                </select>
              </div>

              <div className="grupo-form">
                <label htmlFor="cargaHoraria">Carga horária</label>
                <input
                  type="number"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                  placeholder="Coloque a carga horária"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="preco">Preço</label>
                <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  allowLeadingZeros={false}
                  value={preco}
                  onValueChange={(values) =>
                    handlePrecoChange(values.formattedValue)
                  }
                  placeholder="Preço do curso"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="A descrição do curso"
                />
              </div>
            </Form>

            <LadoDireito>
              <Container1>
                <label htmlFor="foto">Foto do curso</label>

                <FotoDoCurso>
                  {fotoCurso ? (
                    <img
                      className="imgfoto"
                      src={fotoCurso}
                      alt="Imagem do curso"
                    />
                  ) : (
                    <img
                      className="imgfoto"
                      src={SemFoto}
                      alt="Imagem do curso"
                    />
                  )}
                  <label htmlFor="fotoCurso">
                    <input
                      type="file"
                      id="fotoCurso"
                      onChange={handleFotoCurso}
                    />
                    <i className="bi bi-pencil-square" />
                  </label>
                </FotoDoCurso>
              </Container1>

              <Container2>
                <label>Video do curso</label>

                <VideoCurso>
                  <input
                    type="file"
                    id="videoCurso"
                    onChange={(e) => {
                      handleInputAquivo(e);
                      handleVideoCurso(e);
                    }}
                  />
                  <div>
                    <label htmlFor="videoCurso">Procurar</label>
                    <span className="nome-arquivo">
                      {idCursoEditar && videoCurso
                        ? videoCurso
                        : 'Nenhum arquivo selecionado'}
                    </span>
                  </div>
                </VideoCurso>
              </Container2>
            </LadoDireito>
          </GridConteudo>

          <button
            type="submit"
            className="btn-largo"
            onClick={handleCriarEditarCurso}
          >
            {!idCurso ? 'Criar' : 'Salvar'}
          </button>
        </Main>
      </ContainerBack>
    </>
  );
}

CriarCurso.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
