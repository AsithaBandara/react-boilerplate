import { call, all, put, takeLatest } from 'redux-saga/effects';

import signInApi from '../services/signInApi';

import { REQUEST_OTP, OTP_ENTERED, LOGOUT } from '../actions/types';

import {
    requestOTPSuccess,
    requestOTPFailed,
    loginFailed,
    loginSuccess,
    logoutSuccess,
} from '../actions/signin';

/**
 * sign in saga implementation
 */
function* requestOTPSaga({ payload }) {
    try {
        yield call(signInApi.otp.requestOTP, {
            mobileno: payload,
            nic: '',
        });
        yield put(requestOTPSuccess());
    } catch (err) {
        yield put(requestOTPFailed(err));
    }
}

function* processOTPSaga({ payload }) {
    try {
        const data = yield call(signInApi.otp.verifyOtp, payload);
        if (data.status === 'validotp') {
            yield put(loginSuccess(data));
        } else {
            yield put(loginFailed());
        }
    } catch (err) {
        yield put(loginFailed(err));
    }
}

function* logout() {
    try {
        yield put(logoutSuccess());
    } catch (err) {}
}

function* watchSignInActions() {
    yield takeLatest(REQUEST_OTP, requestOTPSaga);
    yield takeLatest(OTP_ENTERED, processOTPSaga);
    yield takeLatest(LOGOUT, logout);
}

export default function* signInSaga() {
    yield all([watchSignInActions()]);
}
