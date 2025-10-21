export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;

    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequest(state, getters) {
    return !!getters.requests.length;
  },
};
