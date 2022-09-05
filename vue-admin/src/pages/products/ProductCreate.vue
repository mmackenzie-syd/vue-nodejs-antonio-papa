<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label>Title</label>
      <input v-model="data.title" class="form-control" name="title" />
    </div>
    <div class="mb-3">
      <label>Description</label>
      <textarea
        v-model="data.description"
        class="form-control"
        name="description"
      />
    </div>
    <div class="mb-3">
      <label>Image</label>
      <div class="input-group">
        <input v-model="data.image" class="form-control" name="image" />
        <ImageUpload @uploaded="data.image = $event" />
      </div>
    </div>
    <div class="mb-3">
      <label>Price</label>
      <input
        v-model="data.price"
        type="number"
        class="form-control"
        name="price"
      />
    </div>
    <button class="btn btn-outline-secondary" type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "ProductCreate",
  components: { ImageUpload },
  setup() {
    const data = reactive({
      title: "",
      description: "",
      image: "",
      price: "",
    });
    const router = useRouter();

    const submit = async () => {
      await axios.post("products", data);
      await router.push("/products");
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style scoped></style>
