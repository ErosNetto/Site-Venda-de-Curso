import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useLocation } from 'react-router-dom';

import { ContainerBack } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import {
  Main,
  OpcoesPagamento,
  Conteudo,
  Bandeiras,
  Form,
  LadoEsquerdo,
  LadoDireito,
  BtnComprar,
} from './styled';

import VisaImg from '../../img/visa.png';
import MastercardImg from '../../img/mastercard.png';
import AmericandImg from '../../img/american.png';
import EloImg from '../../img/elo.png';
import HipercardImg from '../../img/hipercard.png';
import DinersImg from '../../img/diners.png';
import JcbImg from '../../img/jcb.png';

export default function MetodosDePagamento() {
  const location = useLocation();

  // Usuario
  const userId = useSelector((state) => state.auth.user.id);

  // Metodos de pagamento
  const [cursos, setCursos] = useState([]);
  const [precoTotal, setprecoTotal] = useState(0);
  const [formaDePagamento, setFormaDePagamento] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormaDePagamento('Cartão Crédito');

    const searchParams = new URLSearchParams(location.search);
    const rotaDeOrigem = searchParams.get('rotaDeOrigem');

    if (!rotaDeOrigem || String(rotaDeOrigem) !== '/carrinho-de-compras') {
      toast.warn('Você não pode acessar essa página!');
      history.push('/home');
    } else {
      const parametrosCursos = [];
      let index = 0;
      let curso = searchParams.get(`curso${index}`);
      const preco = searchParams.get('precoTotal');

      while (curso) {
        parametrosCursos.push(curso);
        index++;
        curso = searchParams.get(`curso${index}`);
      }

      setCursos(parametrosCursos);
      setprecoTotal(Number(preco));
    }
  }, [location.search, location.state]);

  // Finaliza a compra
  async function comprar() {
    if (!userId || cursos.length === 0) return;

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;

    try {
      setIsLoading(true);

      // Verifica se já comprou o curso
      const responseVerifica = await axios.get('/perfil/');

      let cursoJaComprado = false;
      cursos.forEach((value) => {
        const itemEncontrado = responseVerifica.data.find(
          (item) => item.curso_id === value && item.user_id === userId
        );

        if (itemEncontrado) cursoJaComprado = true;
      });

      if (cursoJaComprado) {
        setIsLoading(false);
        toast.warn('Você já comprou esse curso!');
        history.push('home');
        return;
      }

      // Começa a fazer a transação
      cursos.forEach(async (value) => {
        await axios.post('/perfil/', {
          user_id: userId,
          curso_id: value,
        });

        await axios.post('/historicoDeCompras/', {
          curso_id: value,
          user_id: userId,
          dataDeCompra: dataFormatada,
          formaDePagamento,
        });

        const responseCar = await axios.get('/carrinhoDeCompras/');
        const itemEncontradoCar = responseCar.data.find(
          (item) => item.curso_id === Number(value) && item.user_id === userId
        );
        if (itemEncontradoCar)
          await axios.delete(`/carrinhoDeCompras/${itemEncontradoCar.id}`);

        const responseFav = await axios.get('/favoritos/');
        const itemEncontradoFav = responseFav.data.find(
          (item) => item.curso_id === Number(value) && item.user_id === userId
        );
        if (itemEncontradoFav)
          await axios.delete(`/favoritos/${itemEncontradoFav.id}`);
      });
      setIsLoading(false);

      toast.success('Compra feita com sucesso!');
      history.push('/perfil');
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

      <ContainerBack>
        <Main>
          <OpcoesPagamento>
            <div>
              <h2>Cartão Crédito</h2>
            </div>
            <div>
              <h2>Transferência</h2>
            </div>
            <div>
              <h2>Outras opções</h2>
            </div>
          </OpcoesPagamento>
          <Conteudo>
            <Bandeiras>
              <div>
                <label htmlFor="visa">
                  <img
                    src={VisaImg}
                    style={{ width: '98px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input type="radio" id="visa" name="bandeira" value="Visa" />
              </div>

              <div>
                <label htmlFor="mastercard">
                  <img
                    src={MastercardImg}
                    style={{ width: '94px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input
                  type="radio"
                  id="mastercard"
                  name="bandeira"
                  value="Visa"
                />
              </div>

              <div>
                <label htmlFor="hipercard">
                  <img
                    src={HipercardImg}
                    style={{ width: '95px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input
                  type="radio"
                  id="hipercard"
                  name="bandeira"
                  value="Visa"
                />
              </div>

              <div>
                <label htmlFor="elo">
                  <img
                    src={EloImg}
                    style={{ width: '65px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input type="radio" id="elo" name="bandeira" value="Visa" />
              </div>

              <div>
                <label htmlFor="americand">
                  <img
                    src={AmericandImg}
                    style={{ width: '98px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input
                  type="radio"
                  id="americand"
                  name="bandeira"
                  value="Visa"
                />
              </div>

              <div>
                <label htmlFor="diners">
                  <img
                    src={DinersImg}
                    style={{ width: '92px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input type="radio" id="diners" name="bandeira" value="Visa" />
              </div>

              <div>
                <label htmlFor="jbc">
                  <img
                    src={JcbImg}
                    style={{ width: '95px' }}
                    alt="Imagem do curso"
                  />
                </label>
                <input type="radio" id="jbc" name="bandeira" value="Visa" />
              </div>
            </Bandeiras>

            <Form>
              <LadoEsquerdo>
                <div className="grupo-form">
                  <label htmlFor="numeroCartao">Número do cartão</label>
                  <input
                    type="text"
                    placeholder="Digite apenas números e sem espaços"
                  />
                </div>

                <div className="grupo-form">
                  <label htmlFor="titularCartao">Nome titular cartão</label>
                  <input
                    type="text"
                    placeholder="Digite exatamente igual ao impresso no cartão"
                  />
                </div>

                <div className="grupo-form">
                  <label htmlFor="souCartao">Titular do cartão</label>
                  <select name="categorias">
                    <option id="1" value="valor1">
                      Sou o titular do cartão
                    </option>
                    <option id="2" value="valor2">
                      Não sou o titular do cartão
                    </option>
                  </select>
                </div>
              </LadoEsquerdo>

              <LadoDireito>
                <div className="grupo-form">
                  <label>Data de Validade</label>
                  <div className="grupo-form-2">
                    <select name="mesValidade">
                      <option id="1" value="valor1">
                        Mês
                      </option>
                      <option id="2" value="valor2">
                        Janeiro
                      </option>
                      <option id="3" value="valor3">
                        Fevereiro
                      </option>
                      <option id="4" value="valor4">
                        Março
                      </option>
                      <option id="5" value="valor5">
                        Abril
                      </option>
                      <option id="6" value="valor6">
                        Maio
                      </option>
                      <option id="7" value="valor7">
                        Junho
                      </option>
                      <option id="8" value="valor8">
                        Julho
                      </option>
                      <option id="9" value="valor9">
                        Agosto
                      </option>
                      <option id="10" value="valor10">
                        Setembro
                      </option>
                      <option id="11" value="valor11">
                        Outubro
                      </option>
                      <option id="12" value="valor12">
                        Novembro
                      </option>
                      <option id="13" value="valor13">
                        Dezembro
                      </option>
                    </select>
                    <select name="anoValidade">
                      <option value="">Ano</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                    </select>
                  </div>
                </div>

                <div className="grupo-form">
                  <label htmlFor="digitos">Código de Segurança</label>
                  <input
                    type="text"
                    placeholder="Digitos impressos no verso do cartão"
                  />
                </div>

                <div className="grupo-form">
                  <label htmlFor="parcelamento">Parcelamento</label>
                  <select name="parcelamento">
                    <option value="1">
                      {Number.isInteger(precoTotal)
                        ? `R$ ${precoTotal},00 à vista`
                        : `R$ ${precoTotal
                            .toString()
                            .replace('.', ',')} à vista`}
                    </option>
                  </select>
                </div>
              </LadoDireito>
            </Form>

            <BtnComprar>
              <button type="button" onClick={comprar}>
                Finalizar compra
              </button>
            </BtnComprar>
          </Conteudo>
        </Main>
      </ContainerBack>

      <Footer />
    </>
  );
}
