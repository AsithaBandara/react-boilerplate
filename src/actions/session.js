import {
    FETCH_CENTERS,
    FETCH_CENTERS_SUCCESS,
    FETCH_CENTERS_FAILED,
    SUBMIT_FORM_SESSION,
    SUBMIT_FORM_SESSION_SUCCESS,
    SUBMIT_FORM_SESSION_FAILED,
    FETCH_SESSIONS,
    FETCH_SESSIONS_SUCCESS,
    FETCH_SESSIONS_FAILED,
    RESET_FORM_SESSION,
    RESET_FORM_SESSION_SUCCESS,
    UPDATE_FORM_SESSION,
    UPDATE_FORM_SESSION_SUCCESS,
    UPDATE_FORM_SESSION_FAILED,
    DELETE_FORM_SESSION,
    DELETE_FORM_SESSION_SUCCESS,
    DELETE_FORM_SESSION_FAILED,
} from './types';

export const fetchCenters = payload => {
    return { type: FETCH_CENTERS, payload };
};

export const fetchCentersSuccess = payload => {
    return { type: FETCH_CENTERS_SUCCESS, payload };
};

export const fetchCentersFailed = payload => {
    return { type: FETCH_CENTERS_FAILED, payload };
};

export const fetchSessions = payload => {
    return { type: FETCH_SESSIONS, payload };
};

export const fetchSessionsSuccess = payload => {
    return { type: FETCH_SESSIONS_SUCCESS, payload };
};

export const fetchSessionsFailed = payload => {
    return { type: FETCH_SESSIONS_FAILED, payload };
};

// Create
export const submitFormSessionCreate = payload => {
    return { type: SUBMIT_FORM_SESSION, payload };
};

export const submitFormSessionCreateSuccess = payload => {
    return { type: SUBMIT_FORM_SESSION_SUCCESS, payload };
};

export const submitFormSessionCreateFailed = payload => {
    return { type: SUBMIT_FORM_SESSION_FAILED, payload };
};

// Reset
export const resetSessionCreateForm = payload => {
    return { type: RESET_FORM_SESSION, payload };
};

export const restFormSessionSuccess = payload => {
    return { type: RESET_FORM_SESSION_SUCCESS, payload };
};

// Update
export const submitFormSessionUpdate = payload => {
    return { type: UPDATE_FORM_SESSION, payload };
};

export const submitFormSessionUpdateSuccess = payload => {
    return { type: UPDATE_FORM_SESSION_SUCCESS, payload };
};

export const submitFormSessionUpdateFailed = payload => {
    return { type: UPDATE_FORM_SESSION_FAILED, payload };
};

// Delete
export const submitFormSessionRemove = payload => {
    return { type: DELETE_FORM_SESSION, payload };
};

export const deleteFormSessionSuccess = payload => {
    return { type: DELETE_FORM_SESSION_SUCCESS, payload };
};

export const deleteFormSessionFailed = payload => {
    return { type: DELETE_FORM_SESSION_FAILED, payload };
};
