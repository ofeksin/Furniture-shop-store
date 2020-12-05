<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
    <NotificationsList />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import NotificationsList from "./components/NotificationsList";
export default {
  name: "App",
  components: {
    NavBar,
    NotificationsList,
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style>
</style>
