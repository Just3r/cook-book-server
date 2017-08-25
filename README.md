
## Getting Started

Clone this repository

Install  and start mongodb
```js
brew install mongodb 
brew services start mongodb
```


Install yarn:
```js
npm install -g yarn
```

Set environment (vars):
```sh
cp .env.example .env
```

Install dependencies:
```sh
yarn
```

Start server:
```sh
yarn start
```


Server will run on 4040 by default


Run  seeds to add data:
```sh
yarn seed
```
