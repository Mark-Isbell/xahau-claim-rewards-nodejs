const xrplAccountlib = require("xrpl-accountlib");


// set variables prior to running program:
const publicAddress = "rEUWAPHvNi6C8zbeuVMRERXPQjUSwi5wGg"; 
const seedValue ="sskRWQDQgGNebMi8HnxQQT8wSoaDt"; 


// production network
// const netWork = "wss://xahau.network"

// test network 
const netWork = "wss://xahau-test.net"

// derive wallet 
let wallet = xrplAccountlib.derive.familySeed(seedValue);

if (wallet.address === publicAddress) {
    console.log("The public key matches what you entered: " + wallet.address);
    claimReward();

}
else {
    console.log("The addresses don't match, so trying a different algorithm");
    wallet = xrplAccountlib.derive.familySeed(seedValue, { algorithm: "secp256k1" });

    if (wallet.address === publicAddress) {
        console.log("The public key matches what you entered: " + wallet.address);
        claimReward();
    }
    else {
        console.log("transaction failed due to account not matching. You indicated account: " + publicAddress + ", but we derived: " + wallet.address);
    }
}

async function claimReward() {
    // get network info
    const networkInfo = await xrplAccountlib.utils.txNetworkAndAccountValues(netWork, wallet)

    // prepare transaction 
    const transaction = {
        TransactionType: "ClaimReward",
        Issuer: "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
        ...networkInfo.txValues
    };

    console.log("prepared transaction is: " + JSON.stringify(transaction));

    // sign transaction
    const submitted = await xrplAccountlib.signAndSubmit(transaction, netWork, wallet)

    console.log("raw transaction result is: ");
    console.log(submitted);  
}















