<template>
    <div v-if="category">
      <h1>{{ category.title }}</h1>
      <!-- Display category-related content -->
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const slug = route.params.slug;
  
  const categories = [
    // Same categories array as in the card component
  ];
  
  const category = categories.find(cat => slugify(cat.title) === slug);
  
  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  </script>
  