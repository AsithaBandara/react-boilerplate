import { call, all, put, takeLatest } from 'redux-saga/effects';

import sessionApi from '../services/sessionApi';

import {
    FETCH_CENTERS,
    SUBMIT_FORM_SESSION,
    RESET_FORM_SESSION,
    FETCH_SESSIONS,
    UPDATE_FORM_SESSION,
    DELETE_FORM_SESSION,
} from '../actions/types';
import {
    fetchCentersFailed,
    fetchCentersSuccess,
    fetchSessionsSuccess,
    fetchSessionsFailed,
    submitFormSessionCreateSuccess,
    submitFormSessionCreateFailed,
    restFormSessionSuccess,
    fetchSessions,
    submitFormSessionUpdateSuccess,
    submitFormSessionUpdateFailed,
    deleteFormSessionSuccess,
    deleteFormSessionFailed,
} from 'actions/session';

function* fetchCenters() {
    try {
        const data = yield call(sessionApi.centers.getCenters);
        yield put(fetchCentersSuccess(data));
    } catch (err) {
        yield put(fetchCentersFailed(err));
    }
}

function* fetchSessionsData() {
    try {
        const data = yield call(sessionApi.sessions.getAll);
        yield put(fetchSessionsSuccess(data));
    } catch (err) {
        yield put(fetchSessionsFailed(err));
    }
}

function* submitFormSession({ payload }) {
    try {
        const data = yield call(sessionApi.sessions.submit, payload);
        if(data.id === 0){
            yield put(submitFormSessionCreateFailed(data));
        }else{
            yield put(fetchSessions());
            yield put(submitFormSessionCreateSuccess(data));
        }
    } catch (err) {
        yield put(submitFormSessionCreateFailed(err));
    }
}

function* updateSessionForm({ payload }) {
    try {
        const data = yield call(sessionApi.sessions.update, payload);
        if(data.id === 0){
            yield put(submitFormSessionUpdateFailed(data));
        }else{
            yield put(fetchSessions());
            yield put(submitFormSessionUpdateSuccess(data));
        }
    } catch (err) {
        yield put(submitFormSessionUpdateFailed(err));
    }
}

function* deleteSessionFormData({ payload }) {
    try {
        const data = yield call(sessionApi.sessions.delete, payload);
        yield put(fetchSessions());
        yield put(deleteFormSessionSuccess(data));
    } catch (err) {
        yield put(deleteFormSessionFailed(err));
    }
}

function* resetSessionForm() {
    yield put(restFormSessionSuccess());
}

function* watchSessionActions() {
    // takeevery
    yield takeLatest(FETCH_CENTERS, fetchCenters);
    yield takeLatest(FETCH_SESSIONS, fetchSessionsData);
    yield takeLatest(SUBMIT_FORM_SESSION, submitFormSession);
    yield takeLatest(RESET_FORM_SESSION, resetSessionForm);
    yield takeLatest(UPDATE_FORM_SESSION, updateSessionForm);
    yield takeLatest(DELETE_FORM_SESSION, deleteSessionFormData);
}

export default function* SessionSaga() {
    yield all([watchSessionActions()]);
}
