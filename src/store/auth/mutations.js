export default {
  setUser(state, paylaod) {
    state.token = paylaod.token;
    state.userId = paylaod.userId;
    state.tokenExpiration = paylaod.tokenExpiration;
  },
};
