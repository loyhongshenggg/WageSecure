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

async function getWalletAddressFromSeed(seed) {
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    console.log("Connecting to Testnet...");
    await client.connect();

    const wallet_add = xrpl.Wallet.fromSeed(seed);
    console.log(`Got the wallet address ${new_wallet.address} for seed ${seed}`)
    client.disconnect();

    return wallet_add;
}

async function sendXRP(srcSeed, destSeed, xrpAmt) {
    console.log("Connecting to the selected ledger.\n")
    // standbyResultField.value = results
    console.log('Connecting to ' + "wss://s.altnet.rippletest.net:51233 " + '....')
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    await client.connect()
        
    console.log("\nConnected. Sending XRP.\n")
    // standbyResultField.value = results
        
    const standby_wallet = xrpl.Wallet.fromSeed(srcSeed)
    const operational_wallet = xrpl.Wallet.fromSeed(destSeed)
    // const sendAmount = standbyAmountField.value //amount to send
          
    console.log("\nstandby_wallet.address: = " + standby_wallet.address)
    // standbyResultField.value = results

    const prepared = await client.autofill({
        "TransactionType": "Payment",
        "Account": standby_wallet.address,
        "Amount": xrpl.xrpToDrops(xrpAmt),
        "Destination": operational_wallet.address
      })
      
    const signed = standby_wallet.sign(prepared)

    const tx = await client.submitAndWait(signed.tx_blob)

    console.log("\nBalance changes: " + 
    JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))
    // standbyResultField.value = results

    let standby_wallet_amt =  (await client.getXrpBalance(standby_wallet.address))
    let operational_wallet_amt = (await client.getXrpBalance(operational_wallet.address)) 
    console.log(`Sender has ${standby_wallet_amt}, receiver has ${operational_wallet_amt}`)       
    console.log(tx);        
    client.disconnect()    

    return tx;
}


async function sendXRPGroup(srcSeed, destSeedArr, xrpAmt) {
    console.log("Connecting to the selected ledger.\n");
    console.log('Connecting to ' + "wss://s.altnet.rippletest.net:51233" + '....');
    
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    await client.connect();
    
    console.log("\nConnected. Sending XRP.\n");
    
    const standby_wallet = xrpl.Wallet.fromSeed(srcSeed);

    let consolidatedtx = [];
    
    for (let destSeed of destSeedArr) {
        const operational_wallet = xrpl.Wallet.fromSeed(destSeed);
        console.log("\nstandby_wallet.address: = " + standby_wallet.address);
        
        const prepared = await client.autofill({
            "TransactionType": "Payment",
            "Account": standby_wallet.address,
            "Amount": xrpl.xrpToDrops(xrpAmt),
            "Destination": operational_wallet.address
        });
        
        const signed = standby_wallet.sign(prepared);
        const tx = await client.submitAndWait(signed.tx_blob);
        
        console.log("\nBalance changes: " + 
        JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2));
        
        let standby_wallet_amt = await client.getXrpBalance(standby_wallet.address);
        let operational_wallet_amt = await client.getXrpBalance(operational_wallet.address);
        console.log(`Sender has ${standby_wallet_amt}, receiver has ${operational_wallet_amt}`);
        consolidatedtx.push(tx);
    }
    
    client.disconnect();
    return consolidatedtx;
}


async function getWalletBalance(seed) {
    const client = new xrpl.Client(process.env.TESTNET || "wss://s.altnet.rippletest.net:51233");
    await client.connect()

    const standby_wallet = xrpl.Wallet.fromSeed(seed)
    let wallet_amt = (await client.getXrpBalance(standby_wallet.address)) 

    client.disconnect()
    return wallet_amt;
}



module.exports = { createAdminWallet, createUserWallet, getWalletAddressFromSeed, sendXRP, getWalletBalance, sendXRPGroup};