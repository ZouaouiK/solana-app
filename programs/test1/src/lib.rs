use anchor_lang::prelude::*;
use quarry_mine::{Quarry,Rewarder,Miner};
use anchor_spl::token::TokenAccount;
use anchor_spl::token::Token;
use anchor_spl::token::Mint;
declare_id!("EEfcqbR54VKgweeyRmNNjSH4iutV4EpSHRbJ8ZvXPHXC");

#[program]
pub mod test1 {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
    pub fn sey_hello(ctx:Context<AccountH>,nonce:u8)-> ProgramResult{
        let owner=*ctx.accounts.owner.key;
        msg!("hello karima owner {:?}",owner);
        let program_id=*ctx.accounts.program_id.key;
        msg!("hello karima program_id {:?}",program_id);
        let program_id_info=ctx.accounts.program_id.clone( );
        let cpi_accounts=test2::cpi::accounts::StructAccount{
            owner:ctx.accounts.owner.clone()
        };
        let program_address=ctx.accounts.program_address.clone();
        let account_program_address=ctx.accounts.account_program_address.clone();
        let program_principal=ctx.accounts.program_principal.clone();
        let expected_allocated_key =Pubkey::create_program_address(&[&account_program_address.key.to_bytes()[..32], &[nonce]], program_principal.key)?;
    if *program_address.key != expected_allocated_key {
    // allocated key does not match the derived address
    return Err(ProgramError::InvalidArgument);
    }
    let seeds=&[&account_program_address.key.to_bytes()[..32], &[nonce]];
    let signer_seeds = &[&seeds[..]];
    //let signer_seeds =[&[&[&account_program_address.key.to_bytes()[..32], &[nonce]]]];
        let cpi_ctx = CpiContext::new_with_signer(program_id_info, cpi_accounts,signer_seeds);
        test2::cpi::hello(cpi_ctx);

        Ok(())
    }
    pub fn stake(ctx:Context<StakeUser>,amount:u64,_nonce:u64)->ProgramResult{
        let _authority=ctx.accounts.authority.clone();
        let quarry_program=ctx.accounts.quarry_program.clone( );
 
         let cpi_accounts=quarry_mine::cpi::accounts::UserStake{
            authority:ctx.accounts.authority.to_account_info(),
            miner:ctx.accounts.miner.to_account_info(),
            quarry:ctx.accounts.quarry.to_account_info(),
            miner_vault:ctx.accounts.miner_vault.to_account_info(),
            token_account:ctx.accounts.token_account.to_account_info(),
            token_program:ctx.accounts.token_program.to_account_info(),
            rewarder:ctx.accounts.rewarder.to_account_info(),
            unused_clock:ctx.accounts.unused_clock.to_account_info(),
        }; 
        let cpi_ctx = CpiContext::new(quarry_program, cpi_accounts);
        quarry_mine::cpi::stake_tokens(cpi_ctx,amount);
       
     Ok(())
    }
    pub fn withdrow(ctx:Context<StakeUser>,amount:u64)->ProgramResult{
        let _authority=ctx.accounts.authority.clone();
        let quarry_program=ctx.accounts.quarry_program.clone( );
 
         let cpi_accounts=quarry_mine::cpi::accounts::UserStake{
            authority:ctx.accounts.authority.to_account_info(),
            miner:ctx.accounts.miner.to_account_info(),
            quarry:ctx.accounts.quarry.to_account_info(),
            miner_vault:ctx.accounts.miner_vault.to_account_info(),
            token_account:ctx.accounts.token_account.to_account_info(),
            token_program:ctx.accounts.token_program.to_account_info(),
            rewarder:ctx.accounts.rewarder.to_account_info(),
            unused_clock:ctx.accounts.unused_clock.to_account_info(),
        }; 
        let cpi_ctx = CpiContext::new(quarry_program, cpi_accounts);
        quarry_mine::cpi::withdraw_tokens(cpi_ctx,amount);
       
     Ok(())
    }

    pub fn claim(ctx:Context<ClaimUser>)->ProgramResult{
        let quarry_program=ctx.accounts.quarry_program.clone( );
        let stake=quarry_mine::cpi::accounts::UserClaim{
            authority:ctx.accounts.authority.to_account_info(),
            miner:ctx.accounts.miner.to_account_info(),
            quarry:ctx.accounts.quarry.to_account_info(),
            unused_miner_vault:ctx.accounts.unused_miner_vault.to_account_info(),
            unused_token_account:ctx.accounts.unused_token_account.to_account_info(),
            token_program:ctx.accounts.token_program.to_account_info(),
            rewarder:ctx.accounts.rewarder.to_account_info(),
            unused_clock:ctx.accounts.unused_clock.to_account_info(),
        };
        let cpi_accounts=quarry_mine::cpi::accounts::ClaimRewards{
            mint_wrapper:ctx.accounts.mint_wrapper.to_account_info(),
            mint_wrapper_program:ctx.accounts.mint_wrapper_program.to_account_info(),
            minter:ctx.accounts.minter.to_account_info(),
            rewards_token_mint:ctx.accounts.rewards_token_mint.to_account_info(),
            rewards_token_account:ctx.accounts.rewards_token_account.to_account_info(),
            claim_fee_token_account:ctx.accounts.claim_fee_token_account.to_account_info(),
            stake
        };
        let cpi_ctx = CpiContext::new(quarry_program, cpi_accounts);
        quarry_mine::cpi::claim_rewards(cpi_ctx);
        
     Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct AccountH <'info>{
    pub owner: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    pub program_address:AccountInfo<'info>,
    pub token_program1: Program<'info, Token>,
    pub account_program_address:AccountInfo<'info>,
    pub token_program2: Program<'info, Token>,
    pub program_principal:AccountInfo<'info>,
    pub token_program3: Program<'info, Token>,
    pub program_id:AccountInfo<'info>,
}
#[derive(Accounts)]
pub struct AccountSeeds <'info>{
    pub program_address:AccountInfo<'info>,
    pub token_program1: Program<'info, Token>,
    pub account_program_address:AccountInfo<'info>,
    pub token_program2: Program<'info, Token>,
    pub program_principal:AccountInfo<'info>,
  
}

#[derive(Accounts)]
pub struct StakeUser<'info>{
    pub authority: Signer<'info>,
    /// Miner.
    #[account(mut)]
    pub miner: Account<'info, Miner>,
    /// Quarry to claim from.
    #[account(mut)]
    pub quarry: Account<'info, Quarry>,
    /// Vault of the miner.
    #[account(mut)]
    pub miner_vault: Account<'info, TokenAccount>,
    /// User's staked token account
    #[account(mut)]
    pub token_account: Account<'info, TokenAccount>,
    /// Token program
    pub token_program: Program<'info, Token>,
    /// Rewarder
    pub rewarder: Account<'info, Rewarder>,
    /// Unused variable that held the clock. Placeholder.
    pub unused_clock: UncheckedAccount<'info>,
    //quarryProgram id 
    pub quarry_program:AccountInfo<'info>,
}


#[derive(Accounts)]
pub struct ClaimUser<'info>{
    /// Mint wrapper.
    #[account(mut)]
    pub mint_wrapper: Box<Account<'info, quarry_mint_wrapper::MintWrapper>>,
    /// Mint wrapper program.
    pub mint_wrapper_program: Program<'info, quarry_mint_wrapper::program::QuarryMintWrapper>,
    /// [quarry_mint_wrapper::Minter] information.
    #[account(mut)]
    pub minter: Box<Account<'info, quarry_mint_wrapper::Minter>>,

    /// Mint of the rewards token.
   #[account(mut)]
   pub rewards_token_mint: Account<'info, Mint>, 

   /// Account to claim rewards for.
    #[account(mut)]
    pub rewards_token_account: Box<Account<'info, TokenAccount>>,

    /// Account to send claim fees to.
    #[account(mut)]
    pub claim_fee_token_account: Box<Account<'info, TokenAccount>>, 
    /// Miner authority (i.e. the user).
    pub authority: Signer<'info>,

    /// Miner.
    #[account(mut)]
    pub miner: Account<'info, Miner>,
     /// Quarry to claim from.
     #[account(mut)]
     pub quarry: Account<'info, Quarry>,
 
     /// Placeholder for the miner vault.
     #[account(mut)]
     pub unused_miner_vault: UncheckedAccount<'info>,
  /// Placeholder for the user's staked token account.
  #[account(mut)]
  pub unused_token_account: UncheckedAccount<'info>,

  /// Token program
  pub token_program: Program<'info, Token>,
     /// Rewarder
     pub rewarder: Account<'info, Rewarder>,

     /// Unused variable that held the clock. Placeholder.
     pub unused_clock: UncheckedAccount<'info>,

 //quarryProgram id 
 pub quarry_program:AccountInfo<'info>,

}