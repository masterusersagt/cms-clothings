import USER_ACTION_TYPES from './user.types';

const INITIAL_STATE = {
    currentUser   :  null
}

export const userReducer = (state = INITIAL_STATE,
                            action) => {
    console.log('User dispatched action: ', action, ' state ', state);

    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state, // alle variablen zuruckgeben nur currentUser ändern
                currentUser: payload
            }
        default:
            return state;
    }
}