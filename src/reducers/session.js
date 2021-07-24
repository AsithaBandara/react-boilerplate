import {
    FETCH_CENTERS_SUCCESS,
    FETCH_CENTERS_FAILED,
    SUBMIT_FORM_SESSION_SUCCESS,
    SUBMIT_FORM_SESSION_FAILED,
    RESET_FORM_SESSION_SUCCESS,
    FETCH_SESSIONS_SUCCESS,
    FETCH_SESSIONS_FAILED,
    UPDATE_FORM_SESSION_SUCCESS,
    UPDATE_FORM_SESSION_FAILED,
    DELETE_FORM_SESSION_SUCCESS,
    DELETE_FORM_SESSION_FAILED,
} from '../actions/types';

const initialState = {
    centers: {
        loading: true,
        error: undefined,
        data: [],
    },
    sessions: {
        loading: true,
        error: undefined,
        data: [],
    },
    confirmation: {
        loading: false,
        error: undefined,
        payload: '',
    },
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CENTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                centers: {
                    ...state.centers,
                    loading: false,
                    data: action.payload.organisationUnits,
                },
            };
        case FETCH_CENTERS_FAILED:
            return {
                ...state,
                centers: {
                    ...state.centers,
                    loading: false,
                    error:
                        'Error occurred when fetching the vaccination centers. Please refresh and try again',
                },
            };
        case FETCH_SESSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                sessions: {
                    ...state.sessions,
                    loading: false,
                    data: action.payload,
                },
            };
        case FETCH_SESSIONS_FAILED:
            return {
                ...state,
                sessions: {
                    ...state.sessions,
                    loading: false,
                    error:
                        'Error occurred when fetching the sessions. Please refresh and try again',
                },
            };
        case SUBMIT_FORM_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    payload: action.payload,
                },
            };
        case SUBMIT_FORM_SESSION_FAILED:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    error: action.payload.status,
                },
            };
        case RESET_FORM_SESSION_SUCCESS:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    error:undefined,
                    loading: false,
                    payload: '',
                },
            };
        case UPDATE_FORM_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    payload: action.payload,
                },
            };
        case UPDATE_FORM_SESSION_FAILED:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    error: action.payload.status,
                },
            };
        case DELETE_FORM_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    payload: action.payload,
                },
            };
        case DELETE_FORM_SESSION_FAILED:
            return {
                ...state,
                confirmation: {
                    ...state.confirmation,
                    loading: false,
                    error:
                        'Error deleting the session. Please refresh and try again',
                },
            };
        default:
            return state;
    }
};

export default sessionReducer;
