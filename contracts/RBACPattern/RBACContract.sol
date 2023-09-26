// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Contrato RBAC (Role Based Access Control) que permite definir roles de administrador
contract RBACContract {
    address private owner;
    mapping(address => bool) private admins;

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    function addAdmin(address _admin) public onlyOwner {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) public onlyOwner {
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function isAdmin(address _address) public view returns (bool) {
        return admins[_address];
    }

    function onlyAdminFunction() public view onlyAdmin returns (string memory) {
        return "This function can only be called by an admin";
    }

    function onlyOwnerFunction() public view onlyOwner returns (string memory) {
        return "This function can only be called by the owner";
    }
}
