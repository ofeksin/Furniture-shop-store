<template>
  <div class="notifications">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NotificationItem from "./NotificationItem";

export default {
  name: "notifications-list",
  computed: mapState(["notifications"]),
  components: {
    NotificationItem,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notifications {
  position: fixed;
  bottom: 5vh;
  right: 10vh;
  width: 40vw;
  background: #fff;
  color: #1d1d1d;
  font-weight: bold;
  cursor: pointer;
}
</style>
