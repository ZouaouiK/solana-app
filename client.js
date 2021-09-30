// client.js is used to introduce the reader to generating clients from IDLs.
// It is not expected users directly test with this example. For a more
// ergonomic example, see `tests/basic-0.js` in this workspace.

const anchor = require('@project-serum/anchor');
const TOKEN_PROGRAM_ID =require("@solana/spl-token").TOKEN_PROGRAM_ID;
 const { web3, BN } = anchor;
const {PublicKey,SYSVAR_CLOCK_PUBKEY,Account,TransactionInstruction}=anchor.web3
// Configure the local cluster.
anchor.setProvider(anchor.Provider.local());

async function main() {
  // #region main
  // Read the generated IDL.
  const idl = JSON.parse(require('fs').readFileSync('./target/idl/solana_app.json', 'utf8'));

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey('4D5m2qRsaVNgmpmcCQgKr7t87nibswG4FSVrVnvhxCDB');

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  // Execute the RPC.
  await program.rpc.initialize();
  // Execute the RPC stake
  let amount =100;//u64
  
  //let authority=new PublicKey("4tUt7sX927KuMNTqH2ExYqWTKhGTKUD3djM4fNj4w4rA");
  let authorityAccount=new anchor.web3.Account([245,107,103,220,86,80,93,53,146,92,253,182,248,14,177,108,151,43,26,0,104,62,77,221,230,20,85,137,135,172,193,209,57,195,53,36,125,229,160,203,39,121,222,130,193,164,2,94,252,215,158,0,21,178,59,47,28,124,10,207,55,243,143,175]);
 let authority= authorityAccount.publicKey;
 let tokenMint=new anchor.web3.PublicKey("EAM6BmRYMLH5qo13oF2KSd4qbpE2he8ZM4rMmfhtKuGZ");
  let miner=new anchor.web3.PublicKey("BiMH5oagWsgF94Pe2MdHcTomGqGbR98E7pF2rCmGBr8B");
  let quarry=new anchor.web3.PublicKey("5dwbuwbwxy99BiGg4JCMWVRxeoNsUFSBPZAh2tfiVqNr");
  let minerVault=new anchor.web3.PublicKey("HG3VATVt4DzzEE6XZgFGNiUAWAFgVGop5LmJymHYtZPH");
  let tokenAccount=new anchor.web3.PublicKey("FBgyaPycyh5HpWNPNvQJuHLrpC8kfbXgtjWvUhuGTNLB");
  let rewarder=new anchor.web3.PublicKey("46osvDUidFHU8kEG7dy3pm5RipnZbujRteMENpQhqPed");
  let quarry_program_id=new anchor.web3.PublicKey("81XaDHvvgWGE7PPw1Xaid7Bi5ARBYV7HeEm61rNT2swG");
  let createAccountProgram=new anchor.web3.Account([112,161,153,8,83,198,58,48,135,191,138,82,35,181,93,147,190,163,4,167,255,184,40,160,219,160,68,89,186,129,106,178,44,114,97,62,203,138,216,92,46,13,155,218,94,60,10,254,68,109,167,241,72,140,128,246,117,4,228,136,232,109,141,76]);
  let [programAddress, nonce] = await PublicKey.findProgramAddress(
    [createAccountProgram.publicKey.toBuffer()],
    programId,
   ); 
  await program.rpc.stake(new anchor.BN(amount),new anchor.BN(nonce),{
      accounts:{
          authority,
          miner,
         quarry,
         minerVault,
         tokenAccount, 
        tokenProgram:TOKEN_PROGRAM_ID,
            rewarder,
          clock:SYSVAR_CLOCK_PUBKEY,
          quarryProgram:quarry_program_id,
          programAddress,
          accountProgramAddress:createAccountProgram.publicKey,
          programId
      },
      signers: [authorityAccount],
  });  
  // #endregion main
  //await program.rpc.stake();
}

console.log('Running client.');
main().then(() => console.log('Success'));