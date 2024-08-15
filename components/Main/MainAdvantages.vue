<template>
    <div class="advantages-container">
        <div class="advantage-card">
          <div class="advantage-number">1</div>
          <h3 class="advantage-title">Зарегистрируйтесь</h3>
          <img src="@/assets/images/main-advantages-1.png" alt="Advantage Image 1" class="advantage-image" />
          <p class="advantage-text">Зарегистрируйтесь и войдите в личный кабинет</p>
        </div>
        <div class="advantage-card">
          <div class="advantage-number">2</div>
          <h3 class="advantage-title">Найдите вакансию</h3>
          <img src="@/assets/images/main-advantages-2.png" alt="Advantage Image 2" class="advantage-image" />
          <p class="advantage-text">Нажмите на категорию и выберите подходящую вакансию</p>
        </div>
        <div class="advantage-card">
          <div class="advantage-number">3</div>
          <h3 class="advantage-title">Нажмите “Откликнуться”</h3>
          <img src="@/assets/images/main-advantages-3.png" alt="Advantage Image 3" class="advantage-image" />
          <p class="advantage-text">Откройте вакансию, нажмите “Откликнуться” и напишите немного о ваших навыках</p>
        </div>
      </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.advantages-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
    max-width: 1200px; /* Ограничение ширины контейнера */
  }
  
  .advantage-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: calc(33.333% - 20px); /* Три карточки в ряд с учетом промежутка */
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fff;
  }
  
  .advantage-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #AAA2D8; /* Черный фон кружка */
    color: #fff; /* Белый цвет цифры */
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .advantage-title {
    font-size: 24px;
    color: #000;
    margin-bottom: 20px;
    
  }
  
  .advantage-image {
    width: 100%;
    height: 255px;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 20px;
    border: 5px solid #cfc8fa;
  }
  
  .advantage-text {
    font-size: 14px;
    color: #555;
  }
  
  /* Адаптация для мобильных устройств */
  @media (max-width: 768px) {
    .advantage-card {
      width: 100%; /* Одна колонка */
    }
  }
</style>