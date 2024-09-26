predicate;

configurable {
    LOAN_CONTRACT: ContractId = ContractId::from(0xb0cbfd0b047f11dadee3a830c2f5978b4a128242bd7f3f266214dbe99de147ca),
}

fn main(address: Address) -> bool {
    let loan_repaid = check_loan_repaid(address, LOAN_CONTRACT);
    loan_repaid
}

fn check_loan_repaid(address: Address, loan_contract: ContractId) -> bool {
    let repayment_status: bool = abi(loan_contract).is_loan_repaid(address);
    repayment_status
}
