predicate;

configurable {
    LOAN_CONTRACT: ContractId = ContractId::from(0x0000000000000000000000000000000000000000000000000000000000000000),
}

fn main(address: Address) -> bool {
    // Check if the loan has been repaid
    let loan_repaid = check_loan_repaid(address, LOAN_CONTRACT);
    loan_repaid
}

fn check_loan_repaid(address: Address, loan_contract: ContractId) -> bool {
    // Call the loan contract to check repayment status
    let repayment_status: bool = abi(loan_contract).is_loan_repaid(address);
    repayment_status
}
