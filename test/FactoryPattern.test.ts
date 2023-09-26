import { expect } from 'chai';
import { ethers } from 'hardhat';

import { Product, ProductFactory } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('FactoryPattern', function () {
  let productFactory: ProductFactory;
  let owner: HardhatEthersSigner;
  let user: HardhatEthersSigner;

  const productName = 'Example Product';

  before(async function () {
    [owner, user] = await ethers.getSigners();

    const ProductFactory = await ethers.getContractFactory('ProductFactory');
    productFactory = await ProductFactory.deploy();
  });

  it('should create a new Product contract', async function () {
    await productFactory.createProduct(productName);

    const [productAddress] = await productFactory.getDeployedProducts();

    const product = await ethers.getContractAt('Product', productAddress);

    const name = await product.name();
    expect(name).to.equal(productName);
  });

  it('should allow the owner to access and modify the product', async function () {
    const [productAddress] = await productFactory.getDeployedProducts();
    const product = await ethers.getContractAt('Product', productAddress);

    const newName = 'Updated Product Name';
    await product.changeName(newName);

    const updatedName = await product.name();
    expect(updatedName).to.equal(newName);
  });

  it('should not allow non-owner to modify the product', async function () {
    const [productAddress] = await productFactory.getDeployedProducts();
    const product = await ethers.getContractAt('Product', productAddress);

    // Non-owner cannot modify the product
    const newName = 'Updated Product Name';

    try {
      await product.connect(user).changeName(newName)
    } catch (error: any) {
      expect(error.message).to.contains('Only the owner can change the name')
    }
  });
});
