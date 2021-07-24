import {
    REQUEST_OTP,
    REQUEST_OTP_SUCCESS,
    REQUEST_OTP_FAILED,
    OTP_ENTERED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS,
} from './types';

export const requestOTP = payload => {
    return { type: REQUEST_OTP, payload };
};

export const requestOTPSuccess = payload => {
    return { type: REQUEST_OTP_SUCCESS, payload };
};

export const requestOTPFailed = payload => {
    return { type: REQUEST_OTP_FAILED, payload };
};

export const otpEntered = payload => {
    return { type: OTP_ENTERED, payload };
};

export const loginSuccess = payload => {
    return { type: LOGIN_SUCCESS, payload };
};

export const logout = payload => {
    return { type: LOGOUT, payload };
};

export const logoutSuccess = payload => {
    return { type: LOGOUT_SUCCESS, payload };
};

export const loginFailed = payload => {
    return { type: LOGIN_FAILED, payload };
};
