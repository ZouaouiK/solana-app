const anchor = require('@project-serum/anchor');
//process.env.ANCHOR_WALLET="/home/unix/.config/solana/id.json"

const TOKEN_PROGRAM_ID = require("@solana/spl-token").TOKEN_PROGRAM_ID;
const SystemProgram = require("@solana/web3.js").SystemProgram;
const SYSVAR_CLOCK_PUBKEY = anchor.web3.SYSVAR_CLOCK_PUBKEY;
const PublicKey = require("@solana/web3.js").PublicKey;

async function main() {
  // Configure the client to use the local cluster. 
  process.env.ANCHOR_PROVIDER_URL = "https://api.devnet.solana.com"
  process.env.ANCHOR_WALLET = "/Users/karima/.config/solana/id.json"
  anchor.setProvider(anchor.Provider.env());
  const idl = JSON.parse(require('fs').readFileSync('./target/idl/test1.json', 'utf8'));

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey('A8soaG4944wJQgZWSJxtAVkVzrCWYFqQC2xzpsxRYzEi');

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);
  const owner = new anchor.web3.Account();

  let createAccountProgram = new anchor.web3.Account([112, 152, 22, 24, 214, 173, 250, 98, 192, 214, 50, 104, 196, 104, 105, 184, 87, 99, 220, 223, 116, 66, 3, 19, 167, 5, 102, 11, 232, 199, 11, 166, 87, 188, 108, 80, 242, 45, 37, 163, 74, 88, 103, 23, 49, 219, 164, 70, 19, 227, 104, 61, 89, 136, 150, 158, 145, 111, 179, 89, 53, 73, 6, 20]);
  let [programAddress, nonce] = await PublicKey.findProgramAddress(
    [createAccountProgram.publicKey.toBuffer()],
    programId,
  );
  console.log('Success say hello');
  // Execute the RPC.
  await program.rpc.seyHello(new anchor.BN(nonce), {
    accounts: {
      owner: owner.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      programAddress,
      tokenProgram1: TOKEN_PROGRAM_ID,
      accountProgramAddress: createAccountProgram.publicKey,
      tokenProgram2: TOKEN_PROGRAM_ID,
      programPrincipal: programId,
      tokenProgram3: TOKEN_PROGRAM_ID,
      programId: new anchor.web3.PublicKey("2QEZjUV9NeqEWMsLU6u9UNfgbFrxrJppJbdCLPZp9YrR"),
    }
  });
  console.log('Success say hello');
  let authorityAccount = new anchor.web3.Account([92,214,28,156,59,19,5,96,187,84,201,183,47,79,228,182,53,200,87,175,118,103,172,100,17,143,32,47,203,125,132,78,204,193,93,5,199,108,171,91,214,51,110,202,161,21,93,119,0,76,78,118,41,98,33,79,138,6,196,205,188,29,102,142]);
  let authority = authorityAccount.publicKey;
  let miner = new anchor.web3.PublicKey("84MaX43EKdo8TXhJbKDcXEx5mFAyWJJMkz8yBCBfSbUb");
  let quarry = new anchor.web3.PublicKey("3GPTrNFSjJXmmPZvr3Xo2wCg5KScyNzfGAPJymD5c1PD");
  let minerVault = new anchor.web3.PublicKey("DrFuygWpBn3nKqVLhVQQiELYCvWquLsSXyXGUa9uB89E");
  let tokenAccount = new anchor.web3.PublicKey("EpxLNchkdBNz3LPS7CCFrdhTQ4jxYbCJkQgCZRFnWPs");
  let rewarder = new anchor.web3.PublicKey("7vsFSLgvi1tbS8ehiMYabyYG9gfsz9uTBbiCmYeXJ9t8");
  let quarry_program_id = new anchor.web3.PublicKey("ECgnvNxKC1eHDfoDX2Ac6hsPFdCsSJWA4fxVd1SDDtrm");
 
  let amount = 100;//u64
   await program.rpc.stake(new anchor.BN(amount), new anchor.BN(nonce), {
    accounts: {
      authority,
      miner,
      quarry,
      minerVault,
      tokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      rewarder,
      unusedClock: SystemProgram.programId,
       quarryProgram: quarry_program_id,
     
     
    },
    signers: [authorityAccount],
  });  
  console.log('Success Stake');  
/* 
  await program.rpc.withdrow(new anchor.BN(amount), {
    accounts: {
      authority,
      miner,
      quarry,
      minerVault,
      tokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      rewarder,
      unusedClock: SystemProgram.programId,
       quarryProgram: quarry_program_id,
    
     
    },
    signers: [authorityAccount],
  });  */
  //console.log('Success withdrow');
  
  let mintWrapper=new anchor.web3.PublicKey("GshsoQUwH8rr5L96FdvZVRBWouvupk2G5ydh1YRRXEfy");
  let mintWrapperProgram=new anchor.web3.PublicKey("HwvNTQqkMnCw5fQXW38Wz1GobhCc3FrzdChhqXQ5NvLj")
  let minter=new anchor.web3.PublicKey("2QtEDzZp8H9TPnP7S31ELSHaW32t9LhYRqE6SNbfAXEE")
  let rewardsTokenMint=new anchor.web3.PublicKey("3c3aGPTgFMAGd9fdMZ6KAVcUWzZVzZKX2KiW2xYAokkU");
 let rewardsTokenAccount=new anchor.web3.PublicKey("9CLj63o8SEdJieZV6sfKdZo6bME9fXeo5dVxeyhtqfE2");
let claimFeeTokenAccount=new anchor.web3.PublicKey("GpEfEAwMNxLLnw4fhXSVxhLqEYpDAbazt3AQ849Co6XL");
console.log('claim');
 await program.rpc.claim({
   accounts: {
     mintWrapper,
    mintWrapperProgram,
    minter,
    rewardsTokenMint, 
     rewardsTokenAccount,
    claimFeeTokenAccount,
    authority,
    miner,
    quarry,
    unusedMinerVault :minerVault,
    unusedTokenAccount:tokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
    rewarder,
    unusedClock: SystemProgram.programId,
    quarryProgram: quarry_program_id 
   
  }, signers: [authorityAccount],}); 
  console.log('Success claim rewards');  
   
console.log('Running client.');
}
 
main().then(() => console.log('Success'));