
use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;


//solana_program::declare_id!("4D5m2qRsaVNgmpmcCQgKr7t87nibswG4FSVrVnvhxCDB");

#[program]
pub mod hello_world {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        msg!("msg hello karima");
        Ok(())
    }
}
#[derive(Accounts)]
pub struct Initialize {}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
