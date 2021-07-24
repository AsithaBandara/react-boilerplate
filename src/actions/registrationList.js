import {
    FETCH_REGISTERED_USERS,
    FETCH_REGISTERED_USERS_SUCCESS,
    FETCH_REGISTERED_USERS_FAILED,
    RESET_REGISTERED_USERS,
} from './types';

export const fetchRegisteredUsers = payload => {
    return { type: FETCH_REGISTERED_USERS, payload };
};

export const fetchRegisteredUsersSuccess = payload => {
    return { type: FETCH_REGISTERED_USERS_SUCCESS, payload };
};

export const fetchRegisteredUsersFailed = payload => {
    return { type: FETCH_REGISTERED_USERS_FAILED, payload };
};

export const fetchRegisteredUsersReset = payload => {
    return { type: RESET_REGISTERED_USERS, payload };
};
