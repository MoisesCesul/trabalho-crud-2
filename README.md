# <Fundamentos Back-end>

Esta é uma API RESTful desenvolvida com NestJS para gerenciamento de produtos, persistindo dados com Prisma ORM e PostgreSQL, tudo orquestrado via Docker Compose.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

* **[Node.js](https://nodejs.org/)**
* **[TypeScript](https://www.typescriptlang.org/)**
* **[NestJS](https://nestjs.com/)**: Um framework progressivo Node.js para a construção de aplicativos do lado do servidor eficientes, confiáveis e escaláveis.
* **[Prisma ORM](https://www.prisma.io/)**: Um ORM de última geração que facilita o acesso a bancos de dados de forma segura e com tipagem forte.
* **[PostgreSQL](https://www.postgresql.org/)**: Um sistema de gerenciamento de banco de dados relacional de código aberto robusto.
* **[Docker](https://www.docker.com/)**
* **[Docker Compose](https://docs.docker.com/compose/)**: Ferramenta para definir e executar aplicativos Docker multi-container.

## 📦 Pré-requisitos

Antes de iniciar o projeto, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **[Node.js](https://nodejs.org/)**
* **[Git](https://git-scm.com/)**
* **[Docker](https://www.docker.com/products/docker-desktop)**
* **[Docker Compose](https://docs.docker.com/compose/install/)**

## ⚙️ Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/JulianoRamos/fundamentos-backend.git](https://github.com/JulianoRamos/fundamentos-backend.git)
    cd fundamentos-backend
    ```

2.  **Configuração do Ambiente:**
    * Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
        ```bash
        cp .env.example .env
        ```
    * Edite o arquivo `.env` e configure as variáveis de ambiente necessárias, especialmente as de conexão com o banco de dados. Exemplo:
        ```env
        DATABASE_URL="postgresql://user:password@db:5432/mydatabase?schema=public"
        ```
        *Certifique-se de que o `DATABASE_URL` no `.env` esteja de acordo com o serviço `db` definido no seu `docker-compose.yml`.*

3.  **Inicie os serviços com Docker Compose:**
    ```bash
    docker-compose up -d
    ```
    * Este comando irá construir as imagens Docker, criar os contêineres para para o banco de dados PostgreSQL e Redis, e iniciá-los em segundo plano.

4.  **Execute as Migrações do Prisma:**
    * Após os contêineres estarem em execução e as dependências instaladas, execute as migrações do banco de dados para criar o schema. **Certifique-se de que o banco de dados (PostgreSQL) esteja rodando via Docker Compose antes de executar este comando.**
    ```bash
    npx prisma migrate dev
    ```

5.  **Acesse a Aplicação:**
    * A API estará rodando em `http://localhost:3000`.

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---