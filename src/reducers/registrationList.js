import {
    FETCH_REGISTERED_USERS_SUCCESS,
    FETCH_REGISTERED_USERS_FAILED,
    RESET_REGISTERED_USERS,
} from '../actions/types';

const initialState = {
    loading: true,
    error: undefined,
};

const registrationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REGISTERED_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case FETCH_REGISTERED_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: 'Error occurred when fetching the registered users',
            };
        case RESET_REGISTERED_USERS:
            return {
                 ...state,
                loading: false,
                data: [],
            };
        default:
            return state;
    }
};

export default registrationListReducer;
