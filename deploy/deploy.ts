import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const version = 'v0.0.1';
const deployName = 'Ballot';
let contractName = 'Ballot';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  async function main() {

    console.log(`Deploying ${deployName} ${version}`);
    const {deployments, getNamedAccounts} = hre;

    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    const deployResult = await deploy(contractName, {
      from: deployer,
      gasLimit: 4000000,
      proxy: {
        proxyContract: 'OpenZeppelinTransparentProxy',
        execute: {
          init: {
            methodName: 'initialize',
            args: ['candidateA', ethers.constants.AddressZero],
          },
        },
      },
      log: true,
      deterministicDeployment: true,
    });

    if (deployResult.newlyDeployed) {
      console.log(`Contract ${deployName} deployed at ${deployResult.address} using ${deployResult.receipt?.gasUsed} gas`);
    }

    return true;
  }

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  await main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
};
export default func;