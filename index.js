// console.clear();
require("dotenv").config();
const {
  AccountId,
  PrivateKey,
  Client,
  ContractFunctionParameters,
  ContractExecuteTransaction,
  ContractCallQuery,
  Hbar,
  ContractCreateFlow
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
  // Import the compiled contract bytecode
  const contractBytecode = fs.readFileSync(
    "bytecode.bin"
  );

  // // Instantiate the smart contract
  const contractCreateTx = new ContractCreateFlow()
    .setBytecode(contractBytecode)
    .setGas(10000000)
    .setConstructorParameters(
      new ContractFunctionParameters().addString("Welcome to Cristian's test")
    );
  const contractCreateSubmit = await contractCreateTx.execute(client);
  const contractCreateRx = await contractCreateSubmit.getReceipt(client);
  const contractId = contractCreateRx.contractId;
  const contractAddress = contractId.toSolidityAddress();
  console.log(`- The smart contract ID is: ${contractId} \n`);
  console.log(`- Smart contract ID in Solidity format: ${contractAddress} \n`);


}
main();