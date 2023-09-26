import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import '@nomiclabs/hardhat-ethers'
import "hardhat-abi-exporter"
import "hardhat-gas-reporter"
import "hardhat-docgen"
import "hardhat-contract-sizer"
import networks from './hardhat.networks';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      // it is recommended to use optimisation for production
      // this helps reduce contract size and gas costs
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks,
  // helps to have a stimated gas cost for each contract method
  gasReporter: {
    currency: 'USD',
    gasPrice: 30,
    enabled: true
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
    except: ['./test'],
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  etherscan: {
    apiKey: process.env.POLY_API_KEY || ''
  },
  mocha: {
    timeout: 30000
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: true
  }
};

export default config;
