<template>
  <div>
    <b-jumbotron> </b-jumbotron>
    <b-container>
      <b-row class="row justify-content-center align-items-center h-100">
        <b-col class="login-block col-sm-6 col-md-6 col-lg-5 col-xl-5">
          <h2 class="text-center">Sign up</h2>
          <b-form @submit.stop.prevent="onSubmit" novalidate>
            <ValidationObserver ref="observer">
              <ValidationProvider
                rules="alpha|required"
                vid="name"
                name="Name"
                v-slot="{ errors }"
              >
                <b-form-group>
                  <b-form-input
                    class="input"
                    name="name"
                    v-model="form.name"
                    type="text"
                    placeholder="First name"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider
                vid="last_name"
                rules="alpha|required"
                name="Last name"
                v-slot="{ errors }"
              >
                <b-form-group>
                  <b-form-input
                    class="input"
                    name="last_name"
                    v-model="form.last_name"
                    type="text"
                    placeholder="Last name"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>

                  <b-form-invalid-feedback></b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider
                rules="email|required"
                vid="email"
                name="Email"
                v-slot="{ errors }"
              >
                <b-form-group>
                  <b-form-input
                    class="input"
                    name="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Email"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>

                  <b-form-invalid-feedback> </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider
                vid="password"
                name="Password"
                v-slot="{ errors }"
              >
                <b-form-group>
                  <b-form-input
                    class="input"
                    name="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Password"
                  ></b-form-input>
                  <div class="error">{{ errors[0] }}</div>
                </b-form-group>
              </ValidationProvider>

              <b-button type="submit" block variant="info"
                >Sign up <b-spinner small v-if="isLoading"></b-spinner>
              </b-button>
            </ValidationObserver>
            <br />
            <b-alert variant="success" :show="registered"
              >Congratulations! your account has been created</b-alert
            >
            <b-alert variant="danger" :show="!!errorMessage">{{
              errorMessage
            }}</b-alert>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        name: "",
        last_name: "",
        email: "",
        password: "",
      },
      isLoading: false,
      registered: false,
      errorMessage: "",
    };
  },

  methods: {
    onSubmit() {
      this.isLoading = true;
      this.registerUser();
    },
    registerUser() {
      this.$store
        .dispatch("register", { ...this.form })
        .then(() => {
          this.registered = true;
          this.isLoading = false;

          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        })
        .catch((err) => {
          if (!err.status && !err.response) {
            this.errorMessage = "Connection failed to server.";
          } else if (err.response.data.errors) {
            this.$refs.observer.setErrors(err.response.data.errors);
          }
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
.error {
  color: rgb(255, 79, 79);
}
</style>
