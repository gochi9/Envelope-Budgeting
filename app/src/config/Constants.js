export const API_BASE = 'http://localhost:3000'
export const DEFAULT_THEME = true

export const MAX_USERNAME_LENGTH = 64
export const MAX_PASSWORD_LENGTH = 32
export const MIN_PASSWORD_LENGTH = 8

export const MIN_AMOUNT = 0

export const THEME_TRANSITION_TIMEOUT = 400;

export const ERRORS = {
    USERNAME_EXISTS: 'There already exists an account with this username',
    MISSING_FIELDS: 'Username and/or password missing',
    WRONG_CREDENTIALS: 'Wrong username and/or password',
    PASSWORD_SHORT: `Password must be ${MIN_PASSWORD_LENGTH}+ chars`,
    TOO_MANY_ATTEMPTS: 'Too many attempts, wait 1 minute',
    UNEXPECTED: 'Unexpected error',
    SERVER_UNREACHABLE: 'Cannot reach server',

    INVALID_AMOUNT: 'Amount must be positive',
    NOT_ENOUGH_INCOME: 'Not enough income',
    NOT_ENOUGH_FUNDS: 'Not enough funds in envelope'
}

export const PLACEHOLDERS ={
    NEW_ENVELOPE_NAME: 'New envelope name',
    INPUT: 'Amount',
    ADD_INCOME: 'Add income',
    ADD_ENVELOPE: 'Add',
    USERNAME: 'Username',
    PASSWORD: 'Password',
    CARD_TITLE: 'Envelope Budgeting',
    LOGOUT: 'Logout',
    INCOME: 'Income: $'
}
