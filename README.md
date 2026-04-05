<h1 align="center">Financee</h1>
<p align="center">Controle financeiro pessoal feito com React</p>

---

## Visão Geral

O projeto foi desenvolvido com foco em simular um cenário real de aplicação financeira, priorizando organização de código, experiência do usuário e evolução contínua de funcionalidades.

A interface foi pensada com abordagem mobile-first, proporcionando uma experiência fluida em dispositivos móveis.

---


## Demonstração

<table align="center">
  <tr>
    <td>
      <img src="https://i.imgur.com/PrzyC5U.gif" width="250"/>
    </td>
    <td align="center">
      <img src="https://i.imgur.com/WfcfYH1.jpeg" width="350"/>
      <br><br>
      <p>
        <strong>Financee</strong> é uma aplicação de controle financeiro pessoal desenvolvida com React.
        O objetivo do projeto é permitir o gerenciamento de receitas e despesas de forma simples, organizada e intuitiva.
      </p>
      <p>
        Experimente aqui: https://financee-pi.vercel.app/
      </p>
    </td>
  </tr>
</table>

---

## Funcionalidades

* Cadastro de transações (receitas e despesas)
* Exclusão de transações
* Organização por categorias
* Visualização por mês
* Estatísticas agrupadas por categoria
* Sistema de transações parceladas
* Validação de dados com feedback ao usuário
* Persistência de dados com localStorage
* Interface responsiva

---

## Sistema de Parcelamento

O sistema de parcelamento permite dividir uma transação em múltiplas partes distribuídas ao longo dos meses.

Ao criar uma transação parcelada:

* O valor total é dividido proporcionalmente
* Cada parcela é atribuída a um mês subsequente
* O sistema trata corretamente a virada de meses e anos

Essa funcionalidade exigiu a implementação de:

* Manipulação de datas
* Controle de precisão de valores monetários
* Consistência entre diferentes telas (dashboard, calendário e estatísticas)

---

## Tecnologias Utilizadas

* React
* JavaScript (ES6+)
* Tailwind CSS
* Vite

---

## Estrutura do Projeto

O projeto segue uma organização baseada em separação de responsabilidades:

* `components/ui` → componentes visuais reutilizáveis
* `components/features` → componentes relacionados às regras de negócio
* `pages` → páginas principais da aplicação
* `services` → manipulação de dados (localStorage)
* `utils` → funções auxiliares (validação, cálculos)

---

## Persistência de Dados

As informações são armazenadas localmente utilizando o localStorage do navegador.

Foi implementado um mecanismo de migração de dados para garantir compatibilidade entre diferentes versões da aplicação.

---

## Desafios e Aprendizados

Durante o desenvolvimento, os principais desafios foram:

* Estruturar corretamente os dados das transações
* Implementar o sistema de parcelamento
* Garantir consistência no tratamento de datas
* Manter o código organizado com o crescimento do projeto

Este projeto contribuiu para o desenvolvimento de habilidades como:

* Organização e arquitetura de código
* Modelagem de dados
* Gerenciamento de estado no React
* Construção de funcionalidades voltadas ao usuário

---

## Melhorias Futuras

* Integração com backend (Node.js e banco de dados)
* Sistema de autenticação
* Sincronização entre dispositivos
* Relatórios financeiros mais avançados
* Exportação de dados

---


## Autor

Luis Pamplona
https://github.com/LuisFPamplona
