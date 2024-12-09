
Test Call

First we call our Hola mundo view pure function of our C-contract

1. cast call --rpc-url http://127.0.0.1:8547 0xa6e41ffd769491a42a6e5ce453259b93983a22ef "hola_mundo() (string)"
                --> local Nitro DeV Node    -->DeployedContract                     --> Function with args

For decoding output we use abi-decode defining return type

2.  cast abi-decode "hola_mundo() (string)" "0x....result"

(ex:
0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000017486f6c61203432204d616472696420534d41474e494e59000000000000000000)


The next calls are made on public Sepolia testnet chain on address of deployed contract.
Arbi Sepolia Contract:
Chain RPC url: https://sepolia-rollup.arbitrum.io/rpc
CHaind ID; 421614

v.1 deployed code at address: 0xd0453709ebba11e5a0e10c4e8bde2ad2e48274c4
v.2:
deployed code at address: 0xf9ee47a2258571f4dbadaec2de82b113e7c9c63c
deployment tx hash: 0x90918697744655527317535786660799f03b450bc820b74bc8b01e99c9373b62
contract activated and ready onchain with tx hash: 0xc3c811e5adc6f1023f6ad3da504ed1e5a58068bc1f7765cbccaa8d900cc858c3
v.3
deployed code at address: 0x8998eb95504545ef31c829974a505bc9762ecade
deployment tx hash: 0x88d0b4261af581ff04831bc0e2ee472ea1258d998fc9e5b528e75bcc997259cd
contract activated and ready onchain with tx hash: 0xea55f8e096501807e278ba941c2e8a90a515d887ff81b8b03176ad4c52c9a9a9
v.4
0xa3dba13932b816b8a57d7de25512e068522349eb
v.5
0xee34e7fb04f750ed82c07f11bdba7533d5c66fdd
v.6
0x278b92659beb22af5e2603a7d5c802763450e14d
v7.
0x7e2140726f5ddb83e5c41fdd39dc5c1aa9f26066
v8.
0x7f746827886d6767187f2253b5d35e4335292a87


1 MINTING FIRST CALL 
# Minting (pass an Ethereum address)
cast send <CONTRACT> "mint_fractal(address)" <DESTINATION_ADDRESS_WALLET> --private-key <FUNDING_WALLET> --rpc-url https://sepolia-rollup.arbitrum.io/rpc

2 Generate Fractal for created Token.
# Generate/Get Fractal (use token ID)
cast send <CONTRACT> "generate_fractal(uint256)" ($(cast to-uint256 1) | 1 | cast keccak 1) --private-key <FUNDING_WALLET> --rpc-url https://sepolia-rollup.arbitrum.io/rpc

3. Retrieve Struct data of TokenId.
cast call <CONTRACT> "get_fractal(uint256)" $(cast to-uint256 1) 


