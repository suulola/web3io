# Whitelist project

Whitelist is a project that allows.

## Installation

Use the node package manager [nodejs](https://nodejs.org/en/) to install the dependencies.

### For client section

```bash
cd client
yarn OR npm install
yarn dev
```

### To deploy the existing smart contract

```bash
cd ./
yarn OR npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network rinkeby

```


#### Set your environmental variables in .env

```shell
ALCHEMY_API_KEY_URL=xxxxxx
RINKEBY_PRIVATE_KEY=xxxxx
```


## To deploy to vercel
```shell
vercel login
vercel
# follow the prompt
```


+ Hosted on [vercel](https://whitelist-dapp-three-sepia.vercel.app/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)