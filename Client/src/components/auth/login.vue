<template>
  <div>
    <b-jumbotron class="login-banner">
      <div class="overlay"></div>
    </b-jumbotron>
    <b-container>
      <b-row class="row justify-content-center align-items-center h-100">
        <b-col class="login-block col-sm-6 col-md-6 col-lg-5 col-xl-5">
          <h2 class="text-center">Sign in</h2>
          <ValidationObserver ref="observer">
            <b-form @submit.stop.prevent @submit="login" novalidate>
              <ValidationProvider vid="email" name="Email" v-slot="{ errors }">
                <b-form-group>
                  <b-form-input
                    class="input"
                    v-model="form.email"
                    type="email"
                    placeholder="Email address"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider
                vid="password"
                name="Password"
                v-slot="{ errors }"
              >
                <b-form-group>
                  <b-form-input
                    v-model="form.password"
                    class="input"
                    type="password"
                    data-vv-as="Password"
                    placeholder="Password"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>
                </b-form-group>
              </ValidationProvider>

              <b-button type="submit" block variant="info"
                >Sign in <b-spinner small v-if="isLoading"></b-spinner>
              </b-button>
              <br />
              <b-alert variant="danger" :show="!!errorMessage">{{
                errorMessage
              }}</b-alert>
            </b-form>
          </ValidationObserver>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
      isLoading: false,
    };
  },

  methods: {
    login() {
      this.isLoading = true;
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.isLoading = false;
          this.$router.push(sessionStorage.getItem("redirectPath") || "/");
          sessionStorage.removeItem("redirectPath");
        })
        .catch((err) => {
          if (!err.status && !err.response) {
            this.errorMessage = "Connection failed to server.";
          } else {
            if (err.response.data.errors) {
              this.$refs.observer.setErrors(err.response.data.errors);
            } else {
              if (err.response.status == 500) {
                this.errorMessage = "Error. Please try again later.";
              } else if (err.response.status == 422) {
                this.errorMessage = err.response.data.message
                  ? err.response.data.message
                  : "Error. Please try again later.";
              } else if (err.response.status == 401) {
                this.errorMessage = "Invalid credetials";
              }
            }
          }
          // Handeling auth issues
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
.login-block {
  border: 1px solid #e9e9e9;
  background: #f3f3f3;
  padding: 40px;
}

.input {
  border-radius: 30px !important;
}
.btn {
  border-radius: 30px !important;
}
</style>
