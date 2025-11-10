# Título do Projeto: Sistema para reserva de transporte

## 1. Objetivo do Projeto

O objetivo deste projeto é desenvolver um sistema de agendamento de transporte que permita aos usuários visualizar, criar, e gerenciar reservas de forma eficiente, otimizando a logística e a comunicação entre passageiros e a administração.


## 2. Features Implementadas

- **Autenticação de Usuário:** Sistema de login seguro para garantir que apenas usuários autorizados tenham acesso à plataforma.
- **Visualização de Reservas:** Apresentação das reservas em uma tabela organizada e de fácil leitura, com funcionalidades de ordenação e filtro.
- **Criação de Novas Reservas:** Formulário intuitivo para adicionar novas reservas ao sistema, com campos para data, hora, local de partida, destino e número de passageiros.
- **Edição de Reservas:** Funcionalidade para modificar informações de reservas existentes, como alterar horários ou locais.
- **Exclusão de Reservas:** Opção para remover reservas que não são mais necessárias.
- **Filtragem por Data:** Ferramenta que permite aos usuários filtrar as reservas exibidas em um intervalo de datas específico, facilitando a busca por agendamentos passados ou futuros.

## 3. Tecnologias Utilizadas

- **Frontend:**
  - **React:** Biblioteca principal para a construção da interface de usuário.
  - **React Router Dom:** Para gerenciamento de rotas e navegação na aplicação.
  - **React Hooks (`useState`, `useEffect`, `useContext`):** Para gerenciamento de estado e ciclo de vida dos componentes.
  - **Context API:** Para gerenciamento de estado global, como autenticação de usuário e dados de reservas.
  - **Vite:** Ferramenta de build e servidor de desenvolvimento local.
- **Backend (Mock):**
  - **json-server:** Para simular uma API RESTful localmente e persistir os dados em um arquivo `db.json`.

## 4. Instruções de Execução

Siga os passos abaixo para executar a aplicação em seu ambiente local:

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

**Passo a passo:**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/KarlaAlmeida/sistema-reserva-transporte
    cd sistema-reserva-transporte
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor da API (mock):**
    Em um terminal, execute o comando abaixo para iniciar o `json-server`. Ele irá servir os dados do arquivo `db.json` na porta 3001.
    ```bash
    npx json-server --watch db.json --port 3001
    ```

4.  **Inicie a aplicação React:**
    Em outro terminal, execute o seguinte comando para iniciar o servidor de desenvolvimento do Vite.
    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse [http://localhost:5173](http://localhost:5173).

## 5. Link do Repositório GitHub

O código-fonte completo da aplicação está disponível no seguinte repositório:
- **URL:** `https://github.com/KarlaAlmeida/sistema-reserva-transporte`

## 6. Screenshots ou Demonstração

**Tela de Login:**
<img width="1902" height="577" alt="image" src="https://github.com/user-attachments/assets/f66785f8-3614-4be8-acfc-ea3c30bb145a" />

**Dashboard de Reservas:**
<img width="1908" height="703" alt="image" src="https://github.com/user-attachments/assets/e0ba54d5-d4df-45e8-9d69-4be449da0af2" />

<img width="1907" height="962" alt="image" src="https://github.com/user-attachments/assets/a7434de4-340b-4f1a-91f6-896737f2b530" />

## 7. Considerações Finais

O desenvolvimento deste projeto foi uma experiência de grande aprendizado, permitindo a aplicação prática de conceitos de desenvolvimento frontend com React. Um dos principais desafios foi a gestão do estado da aplicação de forma centralizada e eficiente, o que foi solucionado com o uso da Context API. Ao final, o projeto atingiu seu objetivo de criar uma ferramenta funcional para o gerenciamento de reservas, consolidando conhecimentos em tecnologias modernas e boas práticas de desenvolvimento.

## 9. Créditos

- **[Karla Cristina Barros de Almeida Matias]:** Desenvolvimento da aplicação.
- Agradecimentos ao professor Willian Almeida Rodrigues e os alunos da Pós Graduação em Engenharia de Software do Infnet pela ajuda e orientação durante o projeto.
- Documentação oficial do [React](https://reactjs.org/) foi fonte de consulta essencial.
