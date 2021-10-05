use anchor_lang::prelude::*;

declare_id!("Bbodx4EkzjUTJaFoqkBn85tDagALRpqGqXhcBQZxkwmb");

#[program]
pub mod test2 {
    use super::*;
    pub fn hello(ctx: Context<StructAccount>) -> ProgramResult {
        let owner =ctx.accounts.owner.key;
        msg!("karima test 2owner is {:?}",owner);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub account:AccountInfo<'info>,
}
#[derive(Accounts)]
pub struct StructAccount<'info>{
 pub owner:AccountInfo<'info>,
}