import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import { Main, TituloTexto, GridConteudo, Form, LadoDireito } from './styled';

export default function Configuracoes() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nomeSalvo = useSelector((state) => state.auth.user.nome);
  const emailSalvo = useSelector((state) => state.auth.user.email);
  const istrutorSalvo = useSelector((state) => state.auth.user.istrutor);
  const isLoadingSalvo = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [istrutor, setIstrutor] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setNome(nomeSalvo);
    setEmail(emailSalvo);
    setIstrutor(true);
  }, [id, nomeSalvo, emailSalvo]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) return;

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Senha precisa ter entre 6 e 50 caracteres');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, emailSalvo }));
  }

  async function handleDelete(e) {
    e.preventDefault();
    if (!id) return;

    try {
      setIsLoading(true);

      await axios.delete(`/users`);
      dispatch(actions.loginFailure());
      toast.success('Usuário deletado com sucesso.');
      setIsLoading(false);
      history.push('/');
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

  async function handleInstrutor(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.put('/users', {
        istrutor,
      });
      dispatch(actions.intrutorUpdatedSuccess({ istrutor }));

      setIsLoading(false);
      toast.success('Você virou um intrutor!');
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

  return (
    <>
      <Header />
      <Loading isLoading={isLoading} />
      <Loading isLoading={isLoadingSalvo} />

      <ContainerBack>
        <Main className=" conteudo">
          <TituloTexto>
            <h1>Configurações da conta</h1>
          </TituloTexto>

          <GridConteudo>
            <Form onSubmit={handleSubmit}>
              <div className="grupo-form">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                />
              </div>

              <button type="submit">Salvar</button>
            </Form>

            <LadoDireito>
              <div>
                {istrutorSalvo ? (
                  <h3>Você já é um instrutor.</h3>
                ) : (
                  <>
                    <h3>Deseja ser um instrutor?</h3>
                    <button type="submit" onClick={handleInstrutor}>
                      Virar instrutor
                    </button>
                  </>
                )}
              </div>

              <div>
                <h3>Encerre sua conta permanentemente</h3>
                <p>
                  <span>Aviso:</span> Se encerrar sua conta, você será
                  descadastrado de todos os seus cursos e perderá o acesso para
                  sempre.
                </p>
                <button type="submit" onClick={handleDelete}>
                  Encerrar conta
                </button>
              </div>
            </LadoDireito>
          </GridConteudo>
        </Main>
      </ContainerBack>
    </>
  );
}
