// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Contrato base que se creará mediante el patrón de fábrica
contract Product {
    address public owner;
    string public name;

    constructor(address _owner, string memory _name) {
        owner = _owner;
        name = _name;
    }

    function changeName(string memory _name) public {
        require(msg.sender == owner, "Only the owner can change the name");
        name = _name;
    }
}