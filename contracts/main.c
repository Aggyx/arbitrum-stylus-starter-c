#include "../include/stylus_sdk.h"
#include "../stylus-sdk-c/include/stylus_utils.h"
#include "../stylus-sdk-c/include/bebi.h"
#include "../stylus-sdk-c/include/storage.h"
#include "../stylus-sdk-c/include/string.h"

// Constants
#define MAX_TOKENS 100
#define ADDRESS_SIZE 20  // Address size for Ethereum addresses
#define TOKEN_ID_SIZE 4  // Token ID size for uint32_t
#define STORAGE_SLOT__value 0x0  //DEny Set&get
// Struct for Fractal Data
struct FractalData {
    uint32_t token_id;
    int32_t x;
    int32_t y;
    int32_t size;
};


// buffer used to write output, avoiding malloc
uint8_t buf_out[32];

// Function to safely return a success ArbResult

// succeed and return a bebi32
ArbResult inline _return_success_bebi32(bebi32 const retval)
{
  ArbResult res = {Success, retval, 32};
  return res;
}

// Helper function to pack FractalData into a byte array ensure valid formmat 
void pack_fractal_data(struct FractalData *fractal, uint8_t *buffer) {
    memcpy(buffer, &fractal->token_id, sizeof(fractal->token_id));
    memcpy(buffer + sizeof(fractal->token_id), &fractal->x, sizeof(fractal->x));
    memcpy(buffer + sizeof(fractal->token_id) + sizeof(fractal->x), &fractal->y, sizeof(fractal->y));
    memcpy(buffer + sizeof(fractal->token_id) + sizeof(fractal->x) + sizeof(fractal->y), &fractal->size, sizeof(fractal->size));
}

// Helper function to unpack a byte array into a FractalData struct ensure valid formatting
void unpack_fractal_data(uint8_t *buffer, struct FractalData *fractal) { 
    memcpy(&fractal->token_id, buffer, sizeof(fractal->token_id));
    memcpy(&fractal->x, buffer + sizeof(fractal->token_id), sizeof(fractal->x));
    memcpy(&fractal->y, buffer + sizeof(fractal->token_id) + sizeof(fractal->x), sizeof(fractal->y));
    memcpy(&fractal->size, buffer + sizeof(fractal->token_id) + sizeof(fractal->x) + sizeof(fractal->y), sizeof(fractal->size));
}

//Pruebas commit D3portillo
ArbResult set_value(uint8_t *input, size_t len)
{

  if (len != 32)
  {
    // revert if input length is not 32 bytes
    return _return_short_string(Failure, "InvalidLength");
  }

  uint8_t *slot_address = (uint8_t *)(STORAGE_SLOT__value + 0); // Get the slot address

  // Allocate a temporary buffer to store the input
  storage_cache_bytes32(slot_address, input);

  // Flush the cache to store the value permanently
  storage_flush_cache(false);
  return _return_success_bebi32(input);
}

//Pruebas commit D3portillo
ArbResult get_value(uint8_t *input, size_t len)
{

  uint8_t *slot_address = (uint8_t *)(STORAGE_SLOT__value + 0); // Get the slot address

  storage_load_bytes32(slot_address, buf_out);
  if (bebi32_is_zero(buf_out))
  {
    return _return_short_string(Failure, "NotSet");
  }

  return _return_success_bebi32(buf_out);
}

// Mint a new fractal NFT
ArbResult mint_fractal(uint8_t *input, size_t len) {
    if (len != ADDRESS_SIZE) {
        return _return_short_string(Failure, "Invalid address length");
    }

    // Load the current token counter
    uint8_t counter_bytes[32]; 
    uint8_t counter_key[32] = {0};  // Simple 32-byte counter key for the token ID

    // Load token counter from storage
    storage_load_bytes32(counter_key, counter_bytes);
    uint32_t token_counter;
    memcpy(&token_counter, counter_bytes, sizeof(token_counter));

    // Log the current token counter
    emit_log((uint8_t *)&token_counter, sizeof(token_counter), 0);

    // Check for max token limit
    if (token_counter >= MAX_TOKENS) {
        return _return_short_string(Failure, "Max tokens reached");
    }

    // Store the owner of the NFT (the address) directly using the token_id as the key
    uint8_t owner_key[20];
    memcpy(owner_key, &token_counter, sizeof(token_counter));  // Use token ID as key
    storage_cache_bytes32(owner_key, input);  // Store address temporarily in cache

    // Log the input address and owner key
    emit_log(input, 20, 0);
    emit_log(owner_key, sizeof(owner_key), 0);

    // Increment the token counter and save it
    token_counter++;
    memcpy(counter_bytes, &token_counter, sizeof(token_counter));
    emit_log((uint8_t *)&token_counter, sizeof(token_counter), 0);  // Log new token ID

    storage_cache_bytes32(counter_key, counter_bytes);  // Store updated token counter

    // Flush cache to permanent storage
    storage_flush_cache(true);

    // Return the minted token ID (token_counter is the token ID)
    uint8_t buf_out[32];
    memcpy(buf_out, &token_counter, sizeof(token_counter));

    emit_log(buf_out, sizeof(uint32_t), 0);  // Log minted token ID
    return _return_success_bebi32(buf_out);
}

// Generate fractal data for a specific token
ArbResult generate_fractal(uint8_t *input, size_t len) {
    if (len < sizeof(uint32_t)) {
        return _return_short_string(Failure, "Invalid input length");
    }

    uint32_t token_id;
    memcpy(&token_id, input, sizeof(uint32_t));

    // Create fractal data based on the token_id
    struct FractalData fractal;
    fractal.token_id = token_id;
    fractal.x = token_id * 100;  // Example fractal calculation
    fractal.y = token_id * 100;
    fractal.size = 50;

    // Pack the fractal data into a byte array for storage
    uint8_t fractal_bytes[sizeof(struct FractalData)];
    pack_fractal_data(&fractal, fractal_bytes);

    // Log the fractal data
    emit_log(fractal_bytes, sizeof(fractal_bytes), 0);

    // Store fractal data using token_id as the key
    uint8_t fractal_key[32];
    memcpy(fractal_key, &token_id, sizeof(token_id));  // Use token_id as key
    storage_cache_bytes32(fractal_key, fractal_bytes);  // Store packed data temporarily

    // Log the fractal storage key
    emit_log(fractal_key, sizeof(fractal_key), 0);

    // Flush cache to permanent storage
    storage_flush_cache(true);

    return _return_short_string(Success, "Fractal generated");
}

// Retrieve fractal data for a specific token
ArbResult get_fractal(uint8_t *input, size_t len) {
    if (len < sizeof(uint32_t)) {
        return _return_short_string(Failure, "Invalid token ID");
    }

    uint32_t token_id;
    memcpy(&token_id, input, sizeof(uint32_t));

    // Log the token ID
    emit_log((uint8_t *)&token_id, sizeof(token_id), 0);

    // Load fractal data using token_id as the key
    uint8_t fractal_key[32];
    memcpy(fractal_key, &token_id, sizeof(token_id)); // Copiarse el token_id a fractal_key uint8[32]

    // Log the fractal storage key
    emit_log(fractal_key, sizeof(fractal_key), 0);

    uint8_t fractal_data[sizeof(struct FractalData)];
    storage_load_bytes32(fractal_key, fractal_data);  // Load data directly with fractal_key as key storage

    // Log the fractal data
    emit_log(fractal_data, sizeof(fractal_data), 0);

    // Unpack the fractal data from the byte array
    struct FractalData fractal;
    unpack_fractal_data(fractal_data, &fractal);

    // Return the fractal data as bytes (this will be decoded by the client)
    uint8_t buf_out[sizeof(struct FractalData)];
    pack_fractal_data(&fractal, buf_out);
    return _return_success_bebi32(buf_out);
}

// Hello World function (for testing)
ArbResult hola_mundo(uint8_t *input, size_t len) {
    return _return_short_string(Success, "Hola 42 Madrid SMAGNINY");
}

// Handler function to process function calls
int handler(size_t argc) {
    if (argc < 4) {
        return Failure;  // Ensure at least one function selector and arguments
    }

    uint8_t argv[argc];
    read_args(argv);  // Read arguments into argv

    // Register the function selectors and their corresponding handler functions
    FunctionRegistry registry[] = {
        {to_function_selector("hola_mundo()"), hola_mundo},
        {to_function_selector("mint_fractal(address)"), mint_fractal},
        {to_function_selector("generate_fractal(uint256)"), generate_fractal},
        {to_function_selector("get_fractal(uint256)"), get_fractal}
    };

    // Extract the function selector (first 4 bytes from argv)
    uint32_t signature;
    memcpy(&signature, argv, 4);  // Get the function selector from the input

    // Call the appropriate function from the registry based on the signature
    ArbResult res = call_function(
        registry,  // Function registry
        sizeof(registry) / sizeof(registry[0]),  // Number of registered functions
        signature,  // The function selector we want to call
        argv + 4,  // Arguments (after the function selector)
        argc > 4 ? argc - 4 : 0  // Length of the arguments
    );

    // Write the result back to output
    write_result(res.output, res.output_len);
    return res.status;
}

// Entry point
ENTRYPOINT(handler)
