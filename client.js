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
  const idl = JSON.parse(require('fs').readFileSync('/Users/karima/projects/anchor/test1/target/idl/test1.json', 'utf8'));

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey('wHdFdxtLVyeM3uDr3x1mSy1JNkt8iG2nZkbQguY2Mmu');

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);
  const owner = new anchor.web3.Account();

  let createAccountProgram = new anchor.web3.Account([112, 152, 22, 24, 214, 173, 250, 98, 192, 214, 50, 104, 196, 104, 105, 184, 87, 99, 220, 223, 116, 66, 3, 19, 167, 5, 102, 11, 232, 199, 11, 166, 87, 188, 108, 80, 242, 45, 37, 163, 74, 88, 103, 23, 49, 219, 164, 70, 19, 227, 104, 61, 89, 136, 150, 158, 145, 111, 179, 89, 53, 73, 6, 20]);
  let [programAddress, nonce] = await PublicKey.findProgramAddress(
    [createAccountProgram.publicKey.toBuffer()],
    programId,
  );
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
      programId: new anchor.web3.PublicKey("Bbodx4EkzjUTJaFoqkBn85tDagALRpqGqXhcBQZxkwmb"),
    }
  });

  let authorityAccount = new anchor.web3.Account([97, 235, 148, 58, 212, 114, 223, 11, 54, 74, 119, 187, 200, 29, 207, 43, 90, 241, 20, 122, 65, 142, 183, 77, 213, 219, 49, 4, 133, 168, 202, 148, 197, 48, 213, 179, 89, 143, 143, 96, 149, 188, 109, 170, 238, 110, 185, 150, 46, 58, 85, 4, 151, 22, 242, 152, 101, 254, 100, 193, 229, 78, 111, 158]);
  let authority = authorityAccount.publicKey;
  let miner = new anchor.web3.PublicKey("3ZFdfEii73dwuQqZ7B8LWXimVbiaRE7mjs4NhUp2FMoe");
  let quarry = new anchor.web3.PublicKey("HinEaeex1hyfa4Q2E34rwpAfWVGeFJrBLB1JtVc1ZGf1");
  let minerVault = new anchor.web3.PublicKey("Bb4t8uWTzQfDaswVrQ2L8BKpoWwsD6pbCtKST3735MM8");
  let tokenAccount = new anchor.web3.PublicKey("4C6GBjvPrqgHi6mbjsckC7SfgnxezqXMLdv1pkqA7eqB");
  let rewarder = new anchor.web3.PublicKey("ALHLfEvEyzKa3Nj93x6QSfegfbPkrVTtpuhKUzdCJwr3");
  let quarry_program_id = new anchor.web3.PublicKey("4zUyFEkwfyyrLq2Z5mkrTNKgUjfHShA2QQK3NSeWGirB");
 
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
  }); 
  console.log('Success withdrow');
  let mintWrapper=new anchor.web3.PublicKey("7PTMcLx6zbER2tH8739hoZB6Ng8ejy9u7mjtRqcLWjpz");
  let mintWrapperProgram=new anchor.web3.PublicKey("29ZVNxZbUZVCEsLme6xJNrpmRsWNxdqNmHab38t5M7Dd")
  let minter=new anchor.web3.PublicKey("FCy7B2p5sxxD5euZwNhpQcwm2ux2WRxQ9ERryu2gayCo")
  let rewardsTokenMint=new anchor.web3.PublicKey("8VE6PQwA12udpCxbRMvuvV9qcuW3VuaU3QJhboCQG3mh");
 let rewardsTokenAccount=new anchor.web3.PublicKey("Asc6ymmmkLdZvDuasbyqeURNmmhETiRWLJMthC7QoHS5");
let claimFeeTokenAccount=new anchor.web3.PublicKey("7PrXwYLgamYLyqjzuaH4YcJAsvfpsYnkNH19d6fGtnXZ");

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
}

console.log('Running client.');
main().then(() => console.log('Success'));