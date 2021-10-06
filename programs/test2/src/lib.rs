use anchor_lang::prelude::*;

declare_id!("4WuRWELk6a9Ztzc6xehTem6twQxKPxQUoo8jDs7QqmvA");

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