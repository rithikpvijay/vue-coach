import { createStore } from "vuex";
import coachesModule from "./coaches";
import requestsModule from "./requests";
import authModules from "./auth";

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModules,
  },
});

export default store;
