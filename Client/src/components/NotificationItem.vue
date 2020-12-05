<template>
  <div @click="redirectToLink" class="notification" :class="notificationClass">
    {{ notification.message }}
  </div>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "NotificationItem",
  props: ["notification"],
  methods: {
    ...mapActions(["removeNotification"]),
    redirectToLink() {
      this.$router.push({
        path: "link" in this.notification ? this.notification.link : "",
      });
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    notificationClass() {
      return this.notification.type == "success"
        ? "notification-success"
        : "notification-error";
    },
  },

  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification-success {
  background: #21d47b;
}
.notification-error {
  background: #ff7e7e;
}
.notification {
  margin-top: 2px;
  padding: 10px;
}
</style>
