import * as dotenv from 'dotenv';
import { NetworksUserConfig } from 'hardhat/types';

dotenv.config();

const alchemyUrl = process.env.ALCHEMY_URL || '';
const infuraApiKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.HDWALLET_MNEMONIC;
const forkEnabled = process.env.FORK_ENABLED || false;

const networks: NetworksUserConfig = {
  localhost: {
    live: false,
    chainId: 1,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
  },
};

if (forkEnabled) {
  networks.hardhat = {
    live: false,
    chainId: 1,
    forking: {
      url: alchemyUrl,
    },
    accounts: {
      mnemonic,
    },
  };
} else {
  networks.hardhat = {
    live: false,
    allowUnlimitedContractSize: true,
  };
}

if (mnemonic) {
  networks.bsc = {
    live: true,
    chainId: 56,
    url: 'https://bsc-dataseed.binance.org',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.bscTestnet = {
    live: true,
    chainId: 97,
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.polygon = {
    live: true,
    chainId: 137,
    url: 'https://polygon-rpc.com',
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };

  networks.mumbai = {
    live: true,
    chainId: 80001,
    url: 'https://rpc-mumbai.maticvigil.com/',
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.fuji = {
    url: 'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc	',
    accounts: {
      mnemonic
    },
    chainId: 43113,
  };
}

if (infuraApiKey && mnemonic) {
  networks.goerli = {
    live: true,
    url: `https://goerli.infura.io/v3/${infuraApiKey}`,
    chainId: 5,
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.rinkeby = {
    live: true,
    url: `https://rinkeby.infura.io/v3/${infuraApiKey}`,
    blockGasLimit: 8000000,
    chainId: 4,
    accounts: {
      mnemonic,
    },
    tags: ['staging'],
  };

  networks.mainnet = {
    live: true,
    url: alchemyUrl,
    chainId: 1,
    accounts: {
      mnemonic,
    },
    tags: ['prod'],
  };
} else {
  console.warn('No infura or hdwallet available for testnets');
}

export default networks;