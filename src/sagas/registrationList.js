import { call, all, put, takeLatest } from 'redux-saga/effects';

import registrationListApi from '../services/registrationApi';

import { FETCH_REGISTERED_USERS } from '../actions/types';

import {
    fetchRegisteredUsersSuccess,
    fetchRegisteredUsersFailed,
} from '../actions/registrationList';

function* fetchRegisteredUsersForSession({ payload }) {
    try {
        const data = yield call(
            registrationListApi.users.getRegisteredUsers,
            payload
        );
        yield put(fetchRegisteredUsersSuccess(data));
    } catch (err) {
        yield put(fetchRegisteredUsersFailed(err));
    }
}

function* watchRegistrationListActions() {
    yield takeLatest(FETCH_REGISTERED_USERS, fetchRegisteredUsersForSession);
}

export default function* registrationListSaga() {
    yield all([watchRegistrationListActions()]);
}
