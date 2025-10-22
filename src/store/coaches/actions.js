export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const newData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const res = await fetch(
      `https://vue-http-request-a18e7-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
      }
    );

    context.commit("registerCoach", {
      ...newData,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh & !context.getters.shouldUpdate) {
      return;
    }
    const res = await fetch(
      `https://vue-http-request-a18e7-default-rtdb.firebaseio.com/coaches.json`
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch");
    }

    let coaches = [];

    for (const key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
      };
      coaches.push(coach);
    }

    console.log(coaches);

    context.commit("setCoaches", coaches);
    context.commit("setLastFetch");
  },
};
