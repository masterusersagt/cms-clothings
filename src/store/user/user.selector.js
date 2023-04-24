export const selectCurrentUser = (state) => {
    console.log('@@@@1', state.user);
    console.log('@@@@2', state.user.currentUser);
    return state.user.currentUser;
};
