// components/GetFractal.tsx
import { useState } from 'react';
import { getContract } from '../Web3Provider';

const GetFractal = () => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [fractalData, setFractalData] = useState<any>(null);

  const getFractal = async (tokenId: number) => {
    try {
      const contract = await getContract();
      console.log("Fractal function: ",  tokenId);
      const result = contract.get_fractal(tokenId);
      console.log('Fractal data:', result);
      setFractalData(result);
    } catch (error) {
      console.debug('Failed to retrieve fractal', error);
    }
  };

  return (
    <div className="get-fractal">
      <h2>Get Fractal Data</h2>
      <input
        type="number"
        placeholder="Enter Token ID"
        value={tokenId || ''}
        onChange={(e) => setTokenId(Number(e.target.value))}
      />
      <button onClick={() => getFractal(tokenId!)}>Get Fractal</button>
      {fractalData && (
        <div>
          <p>Token ID: {fractalData[0]}</p>
          <p>X: {fractalData[1]}</p>
          <p>Y: {fractalData[2]}</p>
          <p>Size: {fractalData[3]}</p>
        </div>
      )}
    </div>
  );
};

export default GetFractal;
