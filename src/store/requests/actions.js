export default {
  async contactCoach(context, payload) {
    const newRequest = {
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message,
    };
    const res = await fetch(
      `https://vue-http-request-a18e7-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to send request");
    }

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;
    context.commit("addRequest", newRequest);
  },

  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(
      `https://vue-http-request-a18e7-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }

    const requests = [];

    for (const key in data) {
      const request = {
        id: key,
        coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };
      requests.push(request);
    }

    context.commit("setRequests", requests);
  },
};
