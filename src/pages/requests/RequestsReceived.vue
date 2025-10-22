<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Something went wrong"
      @close="handleClose"
    >
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul v-if="hasRequest && !isLoading">
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-if="!hasRequest && !isLoading">
          You haven't received any request yet.
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";

export default {
  components: {
    RequestItem,
  },
  created() {
    this.loadRequest();
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },

    hasRequest() {
      return this.$store.getters["requests/hasRequest"];
    },
  },

  methods: {
    handleClose() {
      this.error = null;
    },
    async loadRequest() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("requests/fetchRequest");
        this.isLoading = false;
      } catch (error) {
        this.error = error.message || "Something went wrong";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
