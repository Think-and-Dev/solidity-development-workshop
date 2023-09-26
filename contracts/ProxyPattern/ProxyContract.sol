// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Implementation.sol";

// Contrato Proxy que delega llamadas al contrato de implementación
contract ProxyContract {
    address private implementationAddress;

    constructor(address _implementationAddress) {
        implementationAddress = _implementationAddress;
    }

    function updateImplementation(address _newImplementationAddress) public {
        implementationAddress = _newImplementationAddress;
    }

    function getValue() public view returns (uint256) {
        return ImplementationContract(implementationAddress).getValue();
    }

    function setValue(uint256 _newValue) public {
        ImplementationContract(implementationAddress).setValue(_newValue);
    }
}