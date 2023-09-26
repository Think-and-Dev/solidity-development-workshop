// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    // Variables de estado públicas para detalles del token
    string public constant NAME = "My Token";
    string public constant SYMBOL = "MT";
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**uint256(DECIMALS); // 1,000,000 tokens con 18 decimales

    // Constructor del contrato que inicializa el token
    constructor() ERC20(NAME, SYMBOL) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Función para quemar tokens (solo el propietario puede llamarla)
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}