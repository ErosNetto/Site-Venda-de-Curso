import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Index from '../pages/Index';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Configuracoes from '../pages/Configuracoes';
import PerfilUsuario from '../pages/PerfilUsuario';
import CarrinhoDeCompras from '../pages/CarrinhoDeCompras';
import Curso from '../pages/Curso';
import Instrutor from '../pages/Instrutor';
import MeusCursos from '../pages/MeusCursos';
import CriarCurso from '../pages/CriarCurso';

import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Index} isClosed={false} />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />

      <MyRoute exact path="/home/" component={Home} isClosed />
      <MyRoute
        exact
        path="/configuracoes/"
        component={Configuracoes}
        isClosed
      />
      <MyRoute exact path="/perfil/" component={PerfilUsuario} isClosed />
      <MyRoute
        exact
        path="/carrinho-de-compras/"
        component={CarrinhoDeCompras}
        isClosed
      />
      <MyRoute exact path="/cursos/:id/" component={Curso} isClosed />
      <MyRoute exact path="/instrutor/:id/" component={Instrutor} isClosed />
      <MyRoute exact path="/cursos/" component={MeusCursos} isClosed />
      <MyRoute exact path="/criarCurso/" component={CriarCurso} isClosed />
      <MyRoute
        exact
        path="/meusCursos/:id/editar/"
        component={CriarCurso}
        isClosed
      />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
