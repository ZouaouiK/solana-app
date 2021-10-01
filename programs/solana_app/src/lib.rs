use anchor_lang::prelude::*;
use quarry_mine::Quarry;
use quarry_mine::UserStake;
use quarry_mine::Rewarder;
use quarry_mine::Miner;
use anchor_spl::token::TokenAccount;
use hello_world::AccountHello;

use std::convert::TryInto;
solana_program::declare_id!("4D5m2qRsaVNgmpmcCQgKr7t87nibswG4FSVrVnvhxCDB");

#[program]
pub mod solana_app {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        msg!("msg hello karima");
        println!("println initialise");
        Ok(())
    }
   /* pub fn stake(ctx: Context<AccountStake>,amount:u64,nonce:u64) -> ProgramResult {
        msg!("hello karima");
        msg!("hello karima 2");
        println!(" 0");
         let authority=ctx.accounts.authority.clone();
        let miner  =ProgramAccount::<Miner>::try_from(
            &ctx.accounts.miner.to_account_info(),
        )?;
        println!(" 1");
      let quarry  =ProgramAccount::<Quarry>::try_from(
            &ctx.accounts.quarry.to_account_info(),
        )?; 
        let rewarder  =ProgramAccount::<Rewarder>::try_from(
            &ctx.accounts.rewarder.to_account_info(),
        )?; 
       
        println!(" 2");
        let cpi_accounts = UserStake {
            authority: authority,
            miner,
            quarry,
            miner_vault:ctx.accounts.miner_vault.clone(),
            token_account:ctx.accounts.token_account.clone(),
            token_program:ctx.accounts.token_program.clone(),
            rewarder,
            clock:ctx.accounts.clock.clone(),
        }; 
        let seeds=&[&ctx.accounts.account_program_address.key.to_bytes()[..32], &[nonce.try_into().unwrap()]];
        msg!("hello karima 2");
        let expected_allocated_key = Pubkey::create_program_address(seeds, ctx.accounts.program_id.key)?;
    if *ctx.accounts.program_address.key != expected_allocated_key {
        // allocated key does not match the derived address
        return Err(ProgramError::InvalidArgument);
    } 
    msg!("hello karima 3");
    let signe_seeds=&[&seeds[..]];
    msg!("hello karima 4");
    let cpi_program = ctx.accounts.quarry_program.clone();
     let cpi_ctx = CpiContext::new_with_signer(
        cpi_program,
        cpi_accounts,
        signe_seeds,

    );
    msg!("hello karima 5");
    quarry_mine::cpi::stake_tokens(cpi_ctx,amount);//problem
    msg!("hello karima 6");
        println!(" 3");
     
        Ok(())
    }*/
    pub fn set_hello(ctx: Context<AccountH>,nonce:u64) -> ProgramResult {
        msg!("set_hello");

        let cpi_program = ctx.accounts.program_helloword.clone();
        let cpi_accounts = AccountHello {
            owner:ctx.accounts.owner.clone(),
        }; 
        let seeds=&[&ctx.accounts.account_program_address.key.to_bytes()[..32], &[nonce.try_into().unwrap()]];
        let expected_allocated_key = Pubkey::create_program_address(seeds, ctx.accounts.program_id.key)?;
        if *ctx.accounts.program_address.key != expected_allocated_key {
            // allocated key does not match the derived address
            return Err(ProgramError::InvalidArgument);
        }
        let signe_seeds=&[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(
            cpi_program,
            cpi_accounts,
            signe_seeds,
    
        );
        msg!("set_hello before cpi {:?}" , cpi_program);
        hello_world::cpi::hello(cpi_ctx);//// problem
        msg!("set_hello after cpi");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct AccountH<'info>{
 //owner 
 pub owner:AccountInfo<'info>,
 //program id hello word 
 pub program_helloword:AccountInfo<'info>,
 //programAddress 
pub program_address:AccountInfo<'info>,
 //programAddress 
 pub account_program_address:AccountInfo<'info>,
//program id 
pub program_id:AccountInfo<'info>,


}

#[derive(Accounts)]
pub struct AccountStake<'info>{
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    /// Miner.
    #[account(mut)]
    pub miner: CpiAccount<'info, Miner>,
    /// Quarry to claim from.
    #[account(mut)]
   pub quarry: CpiAccount<'info, Quarry>, 
     /// Vault of the miner.
    // #[account(mut)]
     pub miner_vault: CpiAccount<'info, TokenAccount>,
     /// User's staked token account
    #[account(mut)]
     pub token_account: CpiAccount<'info, TokenAccount>,
    /// Token program
    pub token_program: AccountInfo<'info>,
      /// Rewarder
      pub rewarder: CpiAccount<'info, Rewarder>,
     /// Clock
     pub clock: Sysvar<'info, Clock>,
     //quarryProgram id 
    pub quarry_program:AccountInfo<'info>,
     //programAddress 
     pub program_address:AccountInfo<'info>,
      //programAddress 
      pub account_program_address:AccountInfo<'info>,
//program id 
pub program_id:AccountInfo<'info>,

 
}
