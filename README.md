
# Fullstack Challenge 🏅 Space X API
> This is a Challenge by [Coodesh](https://coodesh.com/).

O objetivo deste desafio consiste em desenvolver uma aplicação Fullstack com os dados de lançamentos de missões espacias da Space X.


## Demonstração

[Vídeo](https://www.loom.com/embed/14f609cfa1404af090be1aa504930efb) demonstrando o funcionamento da aplicação.


## Stack utilizada

**Front-end:** React, Next, TailwindCSS, Recharts Typescript, lodash, date-fns

**Back-end:** Node, NestJS, MongoDB, Mongoose, Typescript, Cron Scheduler, Swagger, Script Automatizado


## Aprendizados

Foi um projeto dasafiador onde tive a oportunidade de aprender e me aprofundar em alguns tópicos que ainda nao havia vivenciado, alguns deles são:

- Agrupamento de dados utilizando o aggregate do mongo foi desafiador principalmente para trazer a contagem de cada foguete em cada ano. Foi necessário um tempo maior nessa parte pois li bastante a documentação para entender melhor.

- Eu nunca havia implementado gráficos e foi bem interessante a experiência de preparar os dados para eles aparecerem corretamente.


## Melhorias

Como melhoria acredito que seria bem legal implementar os requisitos diferenciais, que irei fazer como material de estudo, principalmente testes e configuração do docker. Também é possível que fazendo uma análise detalhada do código haja pontos de refatoração que irão trazer melhor performance. 

## Instalação

- Clone o projeto
```bash
  git clone git@github.com:pedropereiradev/coodesh-spaceX.git
  cd coodesh-spaceX
```

- Para que tudo funcione como o desejado, é necessário definir as variáveis de ambiente
```bash
  cd back-end
  touch .env
```

- Insira o endereço do banco conforme o modelo em `.env.example`

- Faça o mesmo com o frontend
```bash
  cd back-end
  touch .env.local
```

- Insira o endereço do backend e do site conforme o modelo em `.env.example`

- Acesse e instale o backend da aplicação
```bash
  cd back-end
  npm i
```

- Para roda o backend da aplicação
```bash
  cd back-end
  npm run start:dev
```

- Acesse e instale o frontend da aplicação

Obs: Caso esteja no diretório do backend, retorne para o principal utilizando `cd ..`

```bash
  cd front-end
  npm i
```

- Para roda o frontend da aplicação
```bash
  cd front-end
  npm run dev
```

- Acesse a URL `http://localhost:3000`


## Documentação da API

Após instalar e executar a aplicação, é possível visualizar a documentação da API acessando `http://localhost:3001/api`
