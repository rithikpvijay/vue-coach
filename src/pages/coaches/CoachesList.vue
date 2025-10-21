<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleClose">
      <p>{{ error }}</p>
    </base-dialog>
    <section><coach-filter @change-filter="setFilter"></coach-filter></section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/register" v-if="!isCoach && !isLoading"
            >Register as coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches && !isLoading">
          <coach-item
            v-for="coach in filterCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-if="!hasCoaches && !isLoading">No Coaches</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilters.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },

  data() {
    return {
      error: null,
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filterCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },

  methods: {
    handleClose() {
      this.error = null;
    },
    setFilter(filter) {
      this.activeFilters = filter;
      console.log(this.activeFilters);
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong";
        console.log(this.error);
      }
      this.isLoading = false;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
