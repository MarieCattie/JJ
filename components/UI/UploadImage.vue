<template>
    <label class="image-upload">
        <div
      v-if="preview"
      class="image-upload__avatar rounded-full overflow-hidden mr-4"
    >
      <img
        :src="preview"
        alt="Avatar Preview"
        class="w-full h-full object-cover"
      />
    </div>
    <span class="image-upload__caption">Загрузите фото</span>
    <input
      @input="handleFileChange"
      type="file"
      accept="image/*"
      class="hidden"
      ref="fileInput"
    />
    </label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import photoIcon from "@/assets/images/icons/photo.svg";
const preview = ref(photoIcon);
const selectedFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.value;
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &__caption {
    max-width: 190px;
    color: #aaa2d8;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }

  &__avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
}
</style>