// components/MintFractal.tsx
import { useState } from 'react';
import { getContract } from '../Web3Provider';

const MintFractal = () => {
  const [AddressToMint, setAddressToMint] = useState("");
  const [mintResult, setMintResult] = useState("Minting Failed !");

  const mintFractal = async (ownerAddress: string) => {
    try {
      console.log("Mint fractal on " + ownerAddress);
      const contract = await getContract();
      console.log(contract.getAddress());
      const tx = await contract.mint_fractal(ownerAddress);
      await tx.wait();  // Wait for the transaction to be mined
      console.log(tx)
      setMintResult('Mint successful!');
    } catch (error) {
      console.debug('Minting failed', error);
      setMintResult('Minting failed');
    }
  };

  return (
    <div className="mint-fractal">
      <h2>Mint a New Fractal</h2>
      <input 
      onChange={(e)=> {
        setAddressToMint(e.target.value)
      }}
      placeholder="Your Contract Address !">
      </input>
      <button onClick={() => mintFractal(AddressToMint)}>
        Mint Fractal
      </button>
      {mintResult && <p>{mintResult}</p>}
    </div>
  );
};

export default MintFractal;
