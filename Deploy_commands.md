
 Deploying on LocalHost DevNode:
 - run nitro-dev-node
        - Valores nitro por defecto:
            - ChainId:412346
            - Address: 0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E
            - Private key: 0xb6b15c8cb491557369f3c7d2c287b053eb229daa9c22138887752191c9520659
 - cargo stylus check --wasm-file ./contract.wasm (no especificamos endpoint)
 - cargo stylus deploy --wasm-file ./contract.wasm --cargo-stylus-version 0.5.3 --private-key <NITRO_PRIVATE_KEY>


 Deploying live on Sepolia Testnet: 


cargo stylus check --wasm-file ./contract.wasm -e https://sepolia-rollup.arbitrum.io/rpc

cargo stylus deploy --wasm-file ./contract.wasm -e https://sepolia-rollup.arbitrum.io/rpc --cargo-stylus-version 0.5.3 --private-key <HERE>