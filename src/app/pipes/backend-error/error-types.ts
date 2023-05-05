export enum EMAIL {
    EMAIL_ALREADY_EXISTS = 'This email is already registered.',
    EMAIL_NOT_REGISTERED = 'Email is not registered',
    ACCOUNT_BLOCKED = 'Your account has been temporarily blocked.Please contact with admin support.',
}

export enum PASSWORD {
    INCORRECT_PASSWORD = 'Invalid Credentials.',
    BLOCKED_EMAIL = 'This email is blocked.',
    INCORRECT_OLD_PASSWORD = 'Invalid older password'
}

export enum MOBILE {
    NOT_FOUND_USER = 'User account is not registered.',
    ACCOUNT_BLOCKED = 'User has been blocked.',
    PHONE_NOT_VERIFIED = 'Phone is not verified.',
    PHONE_NO_ALREADY_EXISTS = 'This phone no is already registered.',
    PHONE_NO_NOT_REGISTERED = 'Phone no is not registered.',
}

export enum LOGIN {
    INVALID_CRED = 'EMAIL or password does not match.',
}
export enum OTP {
    OTP_EXPIRED = 'OTP expired.',
    OTP_INVALID = 'You have entered wrong OTP.'
}

export enum RESET_PASSWORD {
    INVALID_RESET_TOKEN = 'is required.',
    TOKEN_EXPIRED = 'This link has been expired',
    ACCOUNT_BLOCKED = 'Your account has been temporarily blocked.Please contact with admin support.'
}

export enum IMAGE {
    IMG_REQUIRED = 'is required.',
}
