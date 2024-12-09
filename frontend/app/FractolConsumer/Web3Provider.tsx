import { ethers } from 'ethers';
import { JsonRpcProvider, Contract } from 'ethers';

const CONTRACT_ADDRESS = "0xa3dba13932b816b8a57d7de25512e068522349eb";
const ABI = [
  "function hola_mundo() public view returns (string)",
  "function mint_fractal(address owner) public",
  "function generate_fractal(uint256 tokenId) public",
  "function get_fractal(uint256 tokenId) public view returns (uint32)",
];

export const getContract = async () => {
  try {
    console.log("Initializing provider...");

    if (typeof window.ethereum === 'undefined') {
      throw new Error("MetaMask is not installed");
    }
  
    const provider = new JsonRpcProvider("https://sepolia-rollup.arbitrum.io/rpc");
    console.log("Requesting accounts...");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.debug(accounts);
    const signer = await provider.getSigner(accounts[0]);
    console.log("Getting signer...");
    const contract = new Contract(CONTRACT_ADDRESS, ABI, signer);

    console.log("Contract initialized:", contract);
    return contract;

  } catch (error) {
    console.debug("Error in getContract:", error);
    throw error;
  }
};


