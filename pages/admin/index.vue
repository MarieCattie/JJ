<template>
    <div class="flex flex-wrap justify-between gap-5 p-5">
        <!-- Block 1: Статьи -->
        <NuxtLink to="/admin/articles" class="admin-block">
          <h2 class="admin-title">Статьи</h2>
          <p class="admin-subtitle">Создать, редактировать, удалить статьи</p>
        </NuxtLink>
    
        <!-- Block 2: Вакансии -->
        <NuxtLink to="admin/vacancies" class="admin-block">
          <h2 class="admin-title">Вакансии</h2>
          <p class="admin-subtitle">Модерация, добавление вакансий</p>
        </NuxtLink>
    
        <!-- Block 3: Проф пробы -->
        <NuxtLink to="admin/professional" class="admin-block">
          <h2 class="admin-title">Проф пробы</h2>
          <p class="admin-subtitle">Создание, редактирование, удаление профессиональных проб</p>
        </NuxtLink>
    
        <!-- Block 4: Пользователи -->
        <NuxtLink to="/admin/users" class="admin-block">
          <h2 class="admin-title">Пользователи</h2>
          <p class="admin-subtitle">Просмотреть, заблокировать, разблокировать</p>
        </NuxtLink>
      </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>