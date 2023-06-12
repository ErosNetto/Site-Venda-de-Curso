import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
// import axios from '../../services/axios';
import history from '../../services/history';
// import Loading from '../../components/Loading';
import { Main, TituloPag, SemCursos } from './styled';

export default function MetodosDePagamento() {
  const location = useLocation();

  // Usuario
  // const userId = useSelector((state) => state.auth.user.id);

  // Metodos de pagamento
  const [cursos, setCursos] = useState([]);
  const [precoTotal, setprecoTotal] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const rotaDeOrigem = searchParams.get('rotaDeOrigem');

    if (!rotaDeOrigem || String(rotaDeOrigem) !== '/carrinho-de-compras') {
      toast.warn('Você não pode acessar essa pagina!');
      history.push('/home');
    }

    if (searchParams.size === 3) {
      setCursos(searchParams.get('curso'));
      setprecoTotal(searchParams.get('precoTotal'));
    } else {
      toast.warn('Mais de um curso');
    }
  }, [location.search, location.state]);

  function comprar() {
    // continua
  }

  return (
    <>
      <Header />
      {/* <Loading isLoading={isLoading} /> */}

      <ContainerBack>
        <Main>
          <TituloPag>
            <h2>Metodos de Pagamento</h2>
          </TituloPag>

          <SemCursos>
            <h3>{`Cursos: ${cursos}`}</h3>
            <h3>{`Total: ${precoTotal}`}</h3>
            <button type="submit" onClick={comprar()}>
              comprar
            </button>
          </SemCursos>
        </Main>
      </ContainerBack>
    </>
  );
}
