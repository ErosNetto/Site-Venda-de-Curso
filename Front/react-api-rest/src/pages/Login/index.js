import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

// import history from '../../services/history';
import { Container1 } from '../../styles/GlobalStyles';
import { Form1, LoginBox } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
    // history.push('/register');
  };

  // HTML(JSX)
  return (
    <Container1>
      <Loading isLoading={isLoading} />

      <LoginBox>
        <div className="form-box login">
          <h1>Login</h1>

          <Form1 onSubmit={handleSubmit}>
            <div className="grupo-form">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
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

            <button type="submit">Acessar</button>
          </Form1>

          <div className="login-register">
            <p>
              Não tem uma conta? <Link to="/register">Cadastrar</Link>
            </p>
          </div>
        </div>
      </LoginBox>
    </Container1>
  );
}
