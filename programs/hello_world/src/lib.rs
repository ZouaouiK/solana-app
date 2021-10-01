
use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;


solana_program::declare_id!("4CruKf2nxgZeJXTua6QLFXHQBfymeg9PxoQvsqiJxBHA");

#[program]
pub mod hello_world {
    use super::*;
   
    pub fn hello(ctx: Context<AccountHello>)->ProgramResult{
      //  let owner=ctx.accounts.owner.to_account_info();
     //   msg!("owner is {:?}",owner);
        msg!("HELLO BACEM");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AccountHello<'info>{
    //owner account info 
    #[account(mut)]
    pub owner:AccountInfo<'info>,
}

#[account]
pub struct HelloWorld {
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
