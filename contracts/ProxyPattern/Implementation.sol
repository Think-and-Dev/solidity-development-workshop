// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Contrato de implementación (lógica principal)
contract ImplementationContract {
    uint256 private value;

    function getValue() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue;
    }
}