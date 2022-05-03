# Projeto Store Manager :convenience_store:

## Contexto :selfie:

Neste projeto, foi desenvolvido uma API utilizando a arquitetura MSC!

A API construída, trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.


## Técnologias usadas :technologist:

- Projeto desenvolvido em NodeJs, utilizando a biblioteca Express para criação da API RESTful.
- MySQL para criação do Model e gestão dos dados da API.
- Mocha e Sinon para realização de testes da aplicação, utilizando o método de TDD.

## Habilidades desenvolvidas

Neste projeto, consegui desenvolver as seguintes habilidades:

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

## Executando aplicação

1. Clone o repositório
  * `git clone git@github.com:LucasAccurcio/store-manager.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd store-manager`

2. Instalando os pacotes necessários:
  - `npm install`

3. Altere o arquivo .env-example para .env

4. Inicialize o servidor de banco de dados MySQL:
  - **Na própria máquina:**
    * Certifique-se que o servidor MySQL esteja rodando com o comando:
      `sudo systemctl status mysql`
    - Para iniciar o serviço:
      `sudo systemctl start mysql`
    
  - Crie o banco de dados da aplicação:
    * Através do programa MySQL Workbench:
      - Copie o código do arquivo "StoreManager.sql", abra uma nova tabela de query, cole o conteúdo do arquivo StoreManager.sql e execute-a.
      
    * Através da extensão "MySQL" do VSCode:
      - Basta abrir o arquivo "StoreManager.sql" no próprio VSCode, clicar com o botão direito em qualquer lugar do código e selecionar a opção "Run MySQL Query".
  
  - **Através do Docker**
    * Certifique-se que já tenha o Docker instalado em sua máquina.
      - Inicie um container com a imagem do MySQL:
        * `docker container run --name store-manager-mysql -e MYSQL_ROOT_PASSWORD=store-manager -d -p 3306:3306 mysql:5`
        * `docker exec -it store-manager-mysql bash`
        * `mysql -u root -p`
        * Digite a senha: `store-manager`
        * Copie o conteúdo do arquivo "StoreManager.sql" e cole no terminal (Shift+Ctrl+v).
        * show databases;
        * Caso tenha aparecido o banco de dados "StoreManager" na tabela mostrada, tudo certo, podemos continuar.
        * Abra um novo terminal e vamos para o próximo passo.
        

4. Inicializando a API:
  - `npm run debug`

4. Utilize a extensão no VSCode "Thunder Client" ou instale o Postman em sua máquina.

5. Acesse um endpoint para verificar seu funcionamento:
  - Cria um produto - Método POST
    `http://localhost:3000/products`
    * body:
      >{
      >  "name": "Joia do Poder",
      >  "quantity": 1
      >}

  - Verifica se existe um produto cadastrado - Médoto GET
    `http://localhost:3000/products`
    

  - Verifica se existe um produto com o id especificado - Médoto GET
    `localhost:3000/products/1`

    - Caso não tenha, retorna um erro- Método GET:
      `localhost:3000/products/100`

  - Altera um produto - Método PUT
    `http://localhost:3000/products/1`
    * body:
      >{
      >  "name": "Joia do Infinito",
      >  "quantity": 100
      >}

  - Deleta um produto - Método DELETE
    `http://localhost:3000/products/1`

## Rodando os testes desenvolvidos
  `npm test`

  - Para rodar o testes e exibir o relatório de cobertura de testes:
  `npm run test:coverage`