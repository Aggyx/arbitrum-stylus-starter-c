// app/page.tsx
"use client"

import MintFractal from './components/MintFractal';
import GenerateFractal from './components/GenerateFractal';
import GetFractal from './components/GetFractal';


const FractalApp = () => {
  return (
    
    <div className="fractal-app">
      <h1>Fractal NFT Smart Contract Testing</h1>
      
      <div className="content-container">
        <div className="mint-section">
          <MintFractal />
        </div>
        
        <div className="generate-section">
          <GenerateFractal />
        </div>
        
        <div className="get-section">
          <GetFractal />
        </div>
      </div>
    </div>
  );
};

export default FractalApp;
