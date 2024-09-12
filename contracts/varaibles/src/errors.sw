library;

pub enum InitError {
    CannotReinitialize:(),
    NotInitialize:(),
}

pub enum DepositError {
    NotBaseAsset:(),
    ZeroAmount:(),
}

pub enum AccessControlError {
    UnauthorizedError:(),
}



