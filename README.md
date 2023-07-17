# TCC-Site Venda de Curso

Versão: 1.1.0

Este é o meu Trabalho de Conclusão de Curso para o Técnico em Informática. O projeto consiste em um Site de Venda de Cursos Online, que foi inspirado no website da Udemy.

O projeto está dividido em duas partes: Front-End e Back-End, e foi desenvolvido utilizando JavaScript, Node.js, MySQL e React.

## Back-End:
A parte do Back-End foi construída utilizando JavaScript, Node.js, Express e MySQL. Foi desenvolvida uma API REST para a comunicação entre o Front-End e o Banco de Dados.

## Front-End:
O Front-End foi desenvolvido utilizando React para consumir a API REST criada anteriormente. Foram implementadas a maioria das funcionalidades necessárias para a venda de cursos online.

## Banco de Dados:
Para armazenar os dados do sistema, foi utilizado o MySQL juntamente com o Docker. Essas tecnologias foram escolhidas por sua confiabilidade e escalabilidade.

## Instalação e Configuração:
Para executar o projeto localmente, siga as etapas abaixo:

1. Clone este repositório.
2. Configure o ambiente de desenvolvimento com as dependências necessárias.
3. Crie o seu arquivo .env com as configurações.
4. Inicie o servidor do Back-End.
5. Execute o Front-End em um ambiente de desenvolvimento.

## Configurações do Arquivo .env
Antes de executar o projeto, é necessário criar um arquivo `.env` dentro da pasta **API REST - TCC** no diretório do projeto com as configurações adequadas. Siga as etapas abaixo para criar o arquivo `.env`:

1. Na pasta **API REST - TCC** do projeto, crie um arquivo chamado `.env`.
2. Abra o arquivo `.env` em um editor de texto.
3. Adicione as configurações necessárias no arquivo, seguindo o formato `CHAVE=VALOR`. Por exemplo:

  DATABASE=nomedobanco
  DATABASE_HOST=localhost
  DATABASE_PORT=3306
  DATABASE_USERNAME=usuariodb
  DATABASE_PASSWORD=senhadb

  TOKEN_SECRET=suachave
  TOKEN_EXPIRATION=7d

  APP_URL=http://localhost:3005
  APP_PORT=3005

Certifique-se de adicionar as configurações específicas do seu ambiente, como nome do banco de dados, host, porta, usuário e senha do banco de dados, chave do token de autenticação, URL e porta do aplicativo.

4. Salve o arquivo `.env`.

Lembre-se de substituir os valores das configurações de exemplo pelos valores corretos do seu ambiente.

## Futuras Atualizações
Estamos comprometidos em continuar aprimorando o projeto de venda de cursos online. Algumas das atualizações planejadas para o futuro incluem:

1. **Sistema de Avaliações e Comentários**: Pretendemos implementar um sistema de avaliações e comentários, permitindo que os alunos deixem feedback sobre os cursos adquiridos e compartilhem suas experiências com outros usuários.

2. **Recomendação Personalizada de Cursos**: Vamos desenvolver um algoritmo de recomendação inteligente que analisará os interesses e histórico de cada usuário para sugerir cursos relevantes e personalizados, aprimorando assim a experiência de descoberta de novos cursos.

## Licença:
Este projeto está licenciado sob a [MIT License](LICENSE).
