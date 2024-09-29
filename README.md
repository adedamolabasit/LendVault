# LendVault Smart Contract on Fuel Testnet

## Overview

**LendVault** is a decentralized **DeFi lending and borrowing protocol** that allows users to deposit over-collateralized assets and borrow stable tokens. The protocol is designed with robust security measures and efficient interaction mechanisms using the **Fuel testnet** for its smart contract deployment. This project leverages the **SRC6 Vault Standard** for handling collateralized assets and **SRC20** for the implementation of token functionality within the protocol.

This repository contains the smart contract implementation and a frontend application that interacts with the contract using **TypeScript SDK**. The frontend stack is built with **Vite**, enabling developers to rapidly deploy and test the system.

## Technologies Used

- **Fuel Testnet**: Blockchain test network for deploying and testing smart contracts.
- **SRC6 Vault Standard**: Handles collateral assets in the vault.
- **SRC20**: Token implementation standard for issuing and managing tokens within the protocol.
- **TypeScript SDK**: For interacting with the smart contracts deployed on the Fuel network.
- **Vite**: Fast, modern frontend build tool for setting up the development environment.

## Smart Contract Details

### Standards

- **SRC6**: This standard defines the Vault functionality, which governs how assets are collateralized and loans are provided within the system. The vault can lock user assets, mint tokens (**LVT**), and manage returns upon repayment of loans.
- **SRC20**: This is the token standard used for **LVT**, which is the governance and reward token for LendVault. It facilitates transferring, staking, and DAO governance.

### Deployment

The smart contract is deployed on the **Fuel Testnet**. By interacting with the contract, users can deposit collateral, borrow **LVT tokens**, repay loans, and participate in the DAO governance model.

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: v16.x.x or higher
- **npm**: v7.x.x or higher

### Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/lendvault.git
cd lendvault

Install Dependencies
Once the repo is cloned, install the required dependencies by running:

bash
Copy code
npm install

Running the Development Server
After installing the dependencies, you can start the local development server by running:

bash
Copy code
npm run dev