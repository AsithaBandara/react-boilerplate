import signInSaga from './signIn';
import sessionSaga from './session';
import registrationListSaga from './registrationList';
import tokenSaga from './token';

/**
 * Add new sagas here
 */
const sagas = [signInSaga, sessionSaga, registrationListSaga, tokenSaga];

/**
 * Combine sagas for redux middleware
 */
export default sagaMiddleware => {
    sagas.forEach(saga => {
        sagaMiddleware.run(saga);
    });
};
