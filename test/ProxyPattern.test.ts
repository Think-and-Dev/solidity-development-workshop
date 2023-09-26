import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ImplementationContract, ProxyContract } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('ProxyPattern', function () {
  let owner: HardhatEthersSigner;
  let implementationContract: ImplementationContract;
  let proxyContract: ProxyContract;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const ImplementationContract = await ethers.getContractFactory('ImplementationContract');
    implementationContract = await ImplementationContract.deploy();

    const ProxyContract = await ethers.getContractFactory('ProxyContract');
    proxyContract = await ProxyContract.deploy(implementationContract.address);
  });

  it('should set and get a value in ImplementationContract', async function () {
    const newValue = 42;
    await implementationContract.setValue(newValue);

    const storedValue = await implementationContract.getValue();
    expect(storedValue).to.equal(newValue);
  });

  it('should set and get a value in ProxyContract', async function () {
    const newValue = 42;
    await proxyContract.setValue(newValue);

    const storedValue = await proxyContract.getValue();
    expect(storedValue).to.equal(newValue);
  });

  it('should delegate calls to ImplementationContract from ProxyContract', async function () {
    const newValue = 42;
    await proxyContract.setValue(newValue);

    const storedValueInImplementation = await implementationContract.getValue();
    expect(storedValueInImplementation).to.equal(newValue);
  });

  it('should create a new implementation contract and update the proxy contract', async function () {
    await proxyContract.setValue(42);
    expect(await proxyContract.getValue()).to.equal(42);

    const ImplementationContract = await ethers.getContractFactory('ImplementationContract');
    const newImplementationContract = await ImplementationContract.deploy();

    await proxyContract.updateImplementation(newImplementationContract.address);

    expect(await proxyContract.getValue()).to.equal(0);
  });

});
