<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="pr-5">
      <b-navbar-brand to="/">FURNITURE STORE</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">HOME</b-nav-item>
          <b-nav-item to="/">ABOUT US</b-nav-item>

          <b-nav-item to="/cart">CART</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav
          class="ml-auto"
          v-if="this.$store.getters.isLoggedIn"
          right
        >
          <b-nav-item @click="logout">
            <b-icon icon="person-fill"></b-icon>
            <b style="text-transform: capitalize">
              Hello {{ this.$store.getters.getUser.name }},</b
            >
            LOGOUT
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else right>
          <b-nav-item to="/login" right>
            <b-icon icon="person-fill"></b-icon>
            SIGN IN
          </b-nav-item>
          <b-nav-item to="/register" right> REGISTER </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  methods: {
    async logout() {
      this.$store.commit("logout");
      this.$store.commit("resetCart");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #f3f3f3;
}
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
.nav-link {
  font-size: 0.8rem;
  font-weight: 500;
  color: #2f3337;
}
.navbar-nav {
  margin-left: 2px;
}
</style>
