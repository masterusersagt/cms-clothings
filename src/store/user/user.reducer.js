import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
    currentUser   :  null
}

export const userReducer = (state = INITIAL_STATE,
                            action) => {
    console.log('dispatched', action);

    const { type, payload } = action;

    switch(type) {
        case 'SET_CURRENT_USER':
            return {
                ...state, // alle variablen zuruckgeben nur currentUser ändern
                currentUser: payload
            }
        default:
            return state;
    }
}
