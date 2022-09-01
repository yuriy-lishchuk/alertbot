const { CosmWasmClient } = require('secretjs');

// Load environment variables
const SECRET_REST_URL='https://secret-holodeck-2--lcd--full.datahub.figment.io/apikey/47c6970a118c040e08681d806bfb9580/'

const main = async () => {
  // Create connection to DataHub Secret Network node
 const client = new CosmWasmClient(SECRET_REST_URL);

  // Query chain ID
  const chainId = await client.getChainId()
	

  console.log('ChainId:', chainId);

};

main().catch((err) => {
  console.error(err);
});