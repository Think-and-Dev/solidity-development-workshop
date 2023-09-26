import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MyToken, TokenInteraction } from '../typechain-types';

describe('ERC20', function () {
    let owner: HardhatEthersSigner;
    let user: HardhatEthersSigner;
    let myToken: MyToken;
    let tokenInteraction: TokenInteraction;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory('MyToken');
        myToken = await MyToken.deploy();

        const TokenInteraction = await ethers.getContractFactory('TokenInteraction');
        tokenInteraction = await TokenInteraction.deploy(myToken.address);
    });

    it('should deposit and withdraw tokens', async function () {
        const initialBalance = await myToken.balanceOf(await owner.getAddress());
        const depositAmount = ethers.utils.parseEther('1'); // Deposit 1 token (in wei)

        // Owner approves TokenInteraction to spend tokens
        await myToken.connect(owner).approve(tokenInteraction.address, depositAmount);

        // Owner deposits tokens
        await tokenInteraction.connect(owner).deposit(depositAmount);

        const balanceAfterDeposit = await myToken.balanceOf(tokenInteraction.address);
        expect(balanceAfterDeposit).to.equal(depositAmount);

        // User withdraws tokens
        await tokenInteraction.connect(user).withdraw(depositAmount);

        const finalBalance = await myToken.balanceOf(await user.getAddress());
        // expect((finalBalance)).to.equal(initialBalance.add(depositAmount));
    });

    it('should get the token balance', async function () {
        const depositAmount = ethers.utils.parseEther('1'); // Deposit 1 token (in wei)

        // Owner approves TokenInteraction to spend tokens
        await myToken.connect(owner).approve(tokenInteraction.address, depositAmount);

        // Owner deposits tokens
        await tokenInteraction.connect(owner).deposit(depositAmount);

        const balance = await tokenInteraction.getBalance();
        expect(balance).to.equal(depositAmount);
    });
});
