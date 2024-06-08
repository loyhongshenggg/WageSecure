const xrpl = require('xrpl');

async function createAdminWallet() {
    
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    console.log("Connecting to Testnet...");
    
    await client.connect();
    const test_wallet = xrpl.Wallet.fromSeed("sEdVjHZN4oQ1LTJSxCjTGbpq4Puu3Z3");

    client.disconnect();

    return test_wallet;

    
}

async function createUserWallet() {
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    console.log("Connecting to Testnet...");
    await client.connect();

    const new_wallet = (await client.fundWallet()).wallet
    console.log(`Got new wallet address ${new_wallet.address}.`)
    client.disconnect();

    return new_wallet;
}

module.exports = { createAdminWallet, createUserWallet};