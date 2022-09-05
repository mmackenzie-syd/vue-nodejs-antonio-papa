<template>
  <label class="btn btn-primary">
    Upload <input type="file" hidden @change="upload($event.target.files)" />
  </label>
</template>

<script lang="ts">
import axios from "axios";
import { SetupContext } from "vue";

export default {
  name: "ImageUpload",
  emits: ["uploaded"],
  setup(_: any, context: SetupContext) {
    const upload = async (files: FileList) => {
      if (files === null) return;

      // const file = files.item(0);

      const formData = new FormData();
      formData.append("image", files[0]); // use directly or cast by using file as Blob

      const { data } = await axios.post("upload", formData);

      context.emit("uploaded", data.url);
    };

    return {
      upload,
    };
  },
};
</script>

<style scoped></style>
