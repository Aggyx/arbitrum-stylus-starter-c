# Arbitrum Stylus Starter Template for C

# NFT creation in Arbitrum Stylus !

We are going to use Fractal functions from Common Core 42.

Store thoses functions result in C-Struct for storing unique fractal seeds parameters.

We will use NFT 721 logic like implementation for generating Unique and limited Fractol Tokens.

# The Contract

The contract itself is very basic, only has 3 purpose functions.

-> Mint() -> Create a TokenId (1) attached to an walletAddress by a Counter variable. 

-> generate_fractal() -> Supposed to load 32 bytes to storage the test-fractal-struct with its associated TokenId (1).

-> get_fractal() -> Load 32 bytes of Fractal Struct with TokenId as key inside load cache

# Testing
-> Cast_commands.md
-> Deploy_commands.md

# Frontend
As our super mentor @D3portillo has taught us how to use nextJs Component and State Varibales, this repo contains a small Workshop inside /frontend/Workshop7december
for nextJs starting guide.

As this repo is forked i keep untouched the original page /frontend for interacting with 42EarntoHack posts.

A new page on /frontend/FractolConsummer is being written with ethers library for interacting with Fractol SmartContract. 

# Todo:
  ## Errores
  --> Mint() no crea un token address válido para el fractal.
  --> generate_fractal() no genera el fractal en el slot correcto.
  --> get_fractal() -> devuelve 0x0.
  
--> Usage of Fractal function populating Fractal Struct.

--> More 721 protocol alike contract. 

--> Struct  return enrichment for displaying capacities

--> Test Frontend consummer

# Register and Storage Slots

Storage slots are pretty similar to registers in 32bit architectures.
Since both have:

1. Fixed Size: Storage slots in Ethereum can hold exactly 32 bytes. Similar to how registers have a fixed size in assembly (e.g., 32-bit, 64-bit).

2. Direct Addressing: Just as you access a specific register by its identifier (eax, r1), you access storage slots using their indexes: 0x01, 0x02.

3. Explicit Management: Like assembly programming, developers must explicitly manage how storage slots are allocated and used. Miss assignment of memory/slots can cause data corruption.

# Requisitos

- Brew (Mac) / Chocolatey (Windows)
- Docker (Docker Desktop)
- rust, cargo y rustup
- LLVM (con wasm-ld): Disponible desde la versión 15 (`llvm@15`)

## Verificar si tenemos `wasm-strip` instalado

Si no, podemos instalarlo con `brew install wabt`

## Instalando Cargo Stylus

- fork / git clone de este repositorio
- `git submodule update --init --recursive`
- `cargo install cargo-stylus`
- `rustup target add wasm32-unknown-unknown` (**opcional**, solventa un error de target wasm32 not found al hacer make)

## Validar entorno de desarollo

- `make` para generar el archivo contract.wasm
- `cargo stylus check --wasm-file ./contract.wasm -e https://sepolia-rollup.arbitrum.io/rpc` (si tenemos output en verde estamos listos 🚀🚀)
