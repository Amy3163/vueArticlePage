export default {
    LOGIN(state, {token,user}) {
        state.token = token;
        state.user = user;
        window.sessionStorage.setItem('token', token);
        window.sessionStorage.setItem('user', user);
    },
    LOGOUT(state) {
        state.token = null;
        state.user = null;
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
    }
}