// components/GenerateFractal.tsx
import { useState } from 'react';
import { getContract } from '../Web3Provider';

const GenerateFractal = () => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [fractalData, setFractalData] = useState<any>(null);

  const generateFractal = async (tokenId: number) => {
    try {
      const contract = await getContract();
      const result = await contract.generate_fractal(tokenId);
      console.log('Fractal data:', result);
      setFractalData(result);
    } catch (error) {
      console.debug('Failed to generate fractal', error);
    }
  };

  return (
    <div className="generate-fractal">
      <h2>Generate Fractal Data</h2>
      <input
        type="number"
        placeholder="Enter Token ID"
        value={tokenId || ''}
        onChange={(e) => setTokenId(Number(e.target.value))}
      />
      <button onClick={() => generateFractal(tokenId!)}>Generate Fractal</button>
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

export default GenerateFractal;
