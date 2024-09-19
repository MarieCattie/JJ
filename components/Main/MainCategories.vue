<template>
    <div class="main-categories">
        <NuxtLink 
      v-for="category in categoriesStore.categories" 
      :key="category.uuid" 
      class="main-categories__item" :to="`/categories/${ formatter.transliterate(category.title).toLowerCase()}`"
    >
      <div class="main-categories__item-img">
        <img :src="storage.showCategoryImage(category.image)" alt="Category Image" class="category-image" />
      </div>
      <span class="main-categories__item-title">{{ category.title }}</span>
    </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCategoriesStore } from '~/stores/categories';
import useStorage from '~/composables/useStorage';
import useFormatter from '~/composables/useFormatter';

const categoriesStore = useCategoriesStore();
const storage = useStorage();
const formatter = useFormatter();
// Загрузка категорий при монтировании компонента
onMounted(() => {
  categoriesStore.fetchCategories();
});
</script>

<style lang="scss" scoped>
.main-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    &__item {
        cursor: pointer;
        min-width: 230px;
    width: calc(25% - 16px);
    height: 94px;
    display: flex;
    align-items: center;
    padding: 20px;
    gap: 15px;
    box-shadow: 0 4px 20px 0 rgba(96, 77, 158, 0.08);
    background: #fff;
    border: 1px solid #e6e0ff;
    border-radius: 10px;
    transition: 0.5s;
    &:hover {
        box-shadow: 0 4px 20px 0 rgba(57, 5, 134, 0.286);
    }
     &-img {
        width: 55px;
        height: 55px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
     }
     @media screen and (max-width: 520px) {
      width: 100%;
     }
    }
}
</style>