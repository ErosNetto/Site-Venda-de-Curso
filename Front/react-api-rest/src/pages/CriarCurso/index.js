import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { /* useSelector, */ useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
// import history from '../../services/history';
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

export default function Configuracoes() {
  const dispatch = useDispatch();

  // Curso
  const [nomeCurso, setNomeCurso] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Foto e video Curso
  const [fotoCurso, setFotoCurso] = useState('');
  // const [videoCurso, setVideoCurso] = useState('');
  // Intrutor
  const [instrutorId, setInstrutorId] = useState('');
  // const instrutorId = get(match, 'params.id', '');

  const handlePrecoChange = (value) => {
    const precoNumber = parseFloat(
      value.replace(/[^0-9,-]+/g, '').replace(',', '.')
    );
    setPreco(precoNumber);
  };

  useEffect(() => {
    setInstrutorId('32');
  }, []);

  async function handleCriarEditarCurso(e) {
    e.preventDefault();
    if (!instrutorId) return;

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

    if (preco.length <= 0) {
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
      await axios.post('/cursos/', {
        nome: nomeCurso,
        descricao,
        categoria,
        carga_horaria: cargaHoraria,
        preco,
        instrutor_id: instrutorId,
      });
      toast.success('Curso criado com sucesso');
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

  // Escolhe a opçaõ do Setect (categoria)
  const handleSelectOpcoes = (e) => {
    setCategoria(e.target.value);
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
            <h1>Criar curso</h1>
            {/* <h1>Edita curso</h1> */}
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
                <select name="categorias" onChange={handleSelectOpcoes}>
                  <option key={1} id="1" value="">
                    Categoria
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
                {/* <NumericFormat
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  allowLeadingZeros={false}
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="Preço do curso"
                /> */}

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
                      alt="Foto de perfil do instrutor"
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
                      //   onChange={handleFotoInstrutor}
                    />
                    <i className="bi bi-pencil-square" />
                  </label>
                </FotoDoCurso>
              </Container1>

              <Container2>
                <label htmlFor="videoCurso">Video do curso</label>

                <VideoCurso>
                  <input
                    type="file"
                    id="videoCurso"
                    onChange={handleInputAquivo}
                  />
                  <div>
                    <label htmlFor="videoCurso">Procurar</label>
                    <span className="nome-arquivo">
                      Nenhum arquivo selecionado
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
            {/* {!IdCurso ? 'Criar' : 'Salvar'} */}
            Criar
          </button>
        </Main>
      </ContainerBack>
    </>
  );
}
