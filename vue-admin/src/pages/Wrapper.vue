<template>
  <Nav />
  <div class="container-fluid">
    <div class="row">
      <Menu />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
import Menu from "@/components/Menu.vue";
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Wrapper",
  components: { Nav, Menu },
  setup() {
    const router = useRouter();
    const store = useStore();
    onMounted(async () => {
      // triggered when all html is rendered
      try {
        const { data } = await axios.get("user");
        await store.dispatch("User/setUser", data);
      } catch (e) {
        await router.push("/login");
      }
    });
  },
};
</script>

<style scoped></style>
