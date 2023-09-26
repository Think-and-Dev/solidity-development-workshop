import {HardhatEthersSigner} from '@nomicfoundation/hardhat-ethers/signers';
import {expect} from 'chai';
import {Contract} from 'ethers';
import {ethers} from 'hardhat';
import {RBACContract} from '../typechain-types';

describe('RBACPattern', function () {
  let owner: HardhatEthersSigner;
  let admin: HardhatEthersSigner;
  let user: HardhatEthersSigner;
  let rbacContract: RBACContract;

  beforeEach(async function () {
    [owner, admin, user] = await ethers.getSigners();

    const RBACContract = await ethers.getContractFactory('RBACContract');
    rbacContract = await RBACContract.deploy();
  });

  it('should add and remove admins', async function () {
    await rbacContract.addAdmin(await admin.getAddress());
    expect(await rbacContract.isAdmin(await admin.getAddress())).to.equal(true);

    await rbacContract.removeAdmin(await admin.getAddress());
    expect(await rbacContract.isAdmin(await admin.getAddress())).to.equal(false);
  });

  it('should allow only admin to call onlyAdminFunction', async function () {
    await rbacContract.addAdmin(await admin.getAddress());

    try {
      await rbacContract.connect(user).onlyAdminFunction();
    } catch (error: any) {
      expect(error.message).to.contains('Only admin can call this function');
    }

    try {
      await rbacContract.onlyAdminFunction();
    } catch (error: any) {
      expect(error.message).to.exist;
    }
  });

  it('should allow only owner to call onlyOwnerFunction', async function () {
    try {
      await rbacContract.onlyOwnerFunction();
    } catch (error: any) {
      expect(error.message).to.contains('Only owner can call this function');
    }

    try {
      await rbacContract.connect(admin).onlyOwnerFunction();
    } catch (error: any) {
      expect(error.message).to.contains('Only owner can call this function');
    }

    try {
      await rbacContract.connect(owner).onlyOwnerFunction();
    } catch (error: any) {
      expect(error.message).to.exist;
    }
  });
});
