import {
    REQUEST_OTP,
    REQUEST_OTP_SUCCESS,
    REQUEST_OTP_FAILED,
    OTP_ENTERED,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../actions/types';

const initialState = {
    requestedOTP: false,
    loading: false,
    error: undefined,
    loginSuccess: false,
    otpRequestedTime: null,
    mobile: '',
    otp: '',
};

const signinReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_OTP:
            return {
                ...state,
                loading: true,
                mobile: action.payload,
            };
        case REQUEST_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                requestedOTP: true,
                otpRequestedTime: new Date().valueOf(),
            };
        case REQUEST_OTP_FAILED:
            return {
                ...state,
                loading: false,
                error:
                    'Sending OTP to mobile number failed. Please check the mobile number and try again.',
            };
        case OTP_ENTERED:
            return {
                ...state,
                loading: true,
                otp: action.payload.otp,
            };

        case LOGIN_SUCCESS:
            sessionStorage.setItem('mobile', state.mobile);
            sessionStorage.setItem('token', action.payload.key.token);
            sessionStorage.setItem('loginSuccess', true);
            sessionStorage.setItem('loginSuccessTime', new Date());
            return {
                ...state,
                loginSuccess: true,
            };

        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: 'OTP validation failed. Please refresh and try again.',
                loginSuccess: false,
            };

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                loginSuccess: false,
            };

        default:
            return state;
    }
};

export default signinReducer;
