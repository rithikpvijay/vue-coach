<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Something went wrong"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating....">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isFormValid">Please enter a valid email and password</p>
        <base-button>{{ buttonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isFormValid: true,
      authMode: "login",
      isLoading: false,
      error: null,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async submitForm() {
      this.isFormValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.isFormValid = false;
        return;
      }

      try {
        if (this.authMode === "signup") {
          this.isLoading = true;
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        } else {
          this.isLoading = true;
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        }
        const redirect = "/" + (this.$route.query.redirect || "coaches");
        console.log(redirect);
        this.$router.replace(redirect);
      } catch (error) {
        this.error = error.message || "Failed to authenticate";
      } finally {
        this.isLoading = false;
      }
    },
    switchAuthMode() {
      if (this.authMode === "login") {
        this.authMode = "signup";
        return;
      }
      this.authMode = "login";
    },
  },

  computed: {
    buttonCaption() {
      if (this.authMode === "login") {
        return "Login";
      }
      return "Sign Up";
    },

    switchButtonCaption() {
      if (this.authMode === "login") {
        return "Sign Up instead";
      }
      return "Login instead";
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;

  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
