// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Product.sol";

// Contrato de fábrica para crear productos
contract ProductFactory {
    address[] public deployedProducts;

    // Función para crear un nuevo producto
    function createProduct(string memory _name) public {
        // Crea una nueva instancia del contrato Product
        Product newProduct = new Product(msg.sender, _name);

        // Almacena la dirección del nuevo producto
        deployedProducts.push(address(newProduct));
    }

    // Función para obtener la lista de direcciones de los productos creados
    function getDeployedProducts() public view returns (address[] memory) {
        return deployedProducts;
    }
}