<template>
  <div class="container mx-auto p-4">
    <div v-if="vacancy" class="bg-white shadow-lg rounded-lg p-6 mb-8">
      <!-- Изображение вакансии -->
      <img :src="`/storage/vacancies/${vacancy.image}`" alt="vacancy image" class="w-full h-64 object-cover rounded-lg mb-4">
      
      <!-- Название вакансии и работодатель -->
      <h1 class="text-3xl font-bold text-[#3d337e] mb-2">{{ vacancy.title }}</h1>
      <NuxtLink :to="`/user/${vacancy.employer.uuid}`" class="text-lg font-medium text-purple-600 hover:underline mb-6 block">
        {{ getEmployerName(vacancy.employer.role[vacancy.employer.role.current]) }}
      </NuxtLink>
      
      <!-- Описание вакансии -->
      <p class="text-gray-700 text-lg mb-4">{{ vacancy.description }}</p>
      
      <!-- Дополнительная информация -->
      <div class="text-gray-500 text-sm space-y-2 mb-6">
        <p>Место работы: {{ vacancy.place }}</p>
        <p>График: {{ vacancy.time }}</p>
        <p>Требуемый опыт: {{ vacancy.required_experience ? 'Да' : 'Нет' }}</p>
        <p>Вакансия для нескольких соискателей: {{ vacancy.several_applicants ? 'Да' : 'Нет' }}</p>
        <p>Дата создания: {{ formatDate(vacancy.created_at) }}</p>
      </div>

      <!-- Действия: Откликнуться и Чат -->
      <div v-if="!hasResponded" class="space-x-4 mb-6">
        <v-btn color="primary" @click="applyToVacancy" class="w-full md:w-auto">
          Откликнуться на вакансию
        </v-btn>
        <v-btn @click="openChat" color="secondary" class="w-full md:w-auto">
          Написать в чат
        </v-btn>
        <ModalMessage
    :isVisible="isModalVisible"
    :recipient="vacancy.employer"
    :vacancyTitle="vacancy.title"
    @update:isVisible="isModalVisible = $event"
    @sendMessage="handleSendMessage"
  />
  <ModalMessageSuccess 
    :companion="vacancy.employer.uuid"
    :isVisible="isModalMessageSuccessVisible" 
    @update:isVisible="isModalMessageSuccessVisible = $event" 
  />
      </div>

      <!-- Сообщение об отклике -->
      <div v-if="hasResponded" class="text-green-600 font-semibold">
        Вы уже откликнулись на вакансию
      </div>
      
      <!-- Отмена отклика -->
      <v-btn v-if="hasResponded" color="error" @click="deleteResponse" class="mt-4">
        Отменить отклик
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVacanciesStore } from '~/stores/vacancies';
import { useVacancyResponsesStore } from '~/stores/vacancy_responses';
import { useUserStore } from '~/stores/user';
import { useChatStore } from '~/stores/chat';

const route = useRoute();
const vacanciesStore = useVacanciesStore();
const vacancyResponseStore = useVacancyResponsesStore();
const userStore = useUserStore();
const chatStore = useChatStore();
const vacancy = ref(null);
const hasResponded = ref(false);

const isModalVisible = ref(false);
const isModalMessageSuccessVisible = ref(false);

const openChat = () => {
  isModalVisible.value = true;
};

const handleSendMessage = (data: any) => {
  if (data.status === "success") {
    isModalMessageSuccessVisible.value = true;

    chatStore.loading = true;
    let interval;
    interval = setInterval(() => {
      if (chatStore.loading === true) {
        console.log("interval working");
        chatStore.sendMessageShort(data.message);
      } else {
        clearInterval(interval);
        console.log("interval not working");
      }
    }, 100);
  }
};

// Получение вакансии
const fetchVacancy = async () => {
  const uuid = route.params.uuid as string;
  try {
    vacancy.value = await vacanciesStore.getVacancyById(uuid);

    // Проверка, откликался ли пользователь на вакансию
    if (userStore.currentUser?.uuid) {
      const responses = await vacancyResponseStore.fetchResponsesByApplicant(userStore.currentUser.user_uuid);
      hasResponded.value = responses.some(response => response.vacancy.uuid === uuid);
    }
  } catch (error) {
    console.error('Ошибка при получении вакансии:', error);
  }
};

// Форматирование даты
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Определение имени работодателя
const getEmployerName = (employer) => {
  if (employer.title) {
    return employer.title;
  } else {
    return `${employer.surname} ${employer.name} ${employer.patronymic}`;
  }
};

// Отклик на вакансию
const applyToVacancy = async () => {
  if (!vacancy.value) return;

  try {
    await vacancyResponseStore.createVacancyResponse({
      uuid: vacancy.value.uuid,
      message: 'Ваше сообщение к вакансии',
    });
    alert('Вы успешно откликнулись на вакансию');
    hasResponded.value = true;
  } catch (error) {
    console.error('Ошибка при отклике на вакансию:', error);
    alert(error);
  }
};

// Удаление отклика
const deleteResponse = async () => {


  try {
    const responses = await vacancyResponseStore.fetchResponsesByApplicant(userStore.currentUser.uuid);
    const responseToDelete = responses.find(r => r.vacancy.uuid === vacancy.value.uuid);
    if (responseToDelete) {
      await vacancyResponseStore.deleteResponse(responseToDelete.uuid);
      alert('Ваш отклик был отменен');
      hasResponded.value = false;
    }
  } catch (error) {
    console.error('Ошибка при отмене отклика:', error);
    alert('Произошла ошибка при отмене отклика');
  }
};

onMounted(fetchVacancy);
</script>

<style scoped>
.container {
  max-width: 800px;
}

img {
  border-radius: 10px;
}

.v-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-btn.secondary {
  background-color: #f0f0f5;
  color: #3d337e;
}

.v-btn.primary {
  background-color: #3d337e;
  color: white;
}

.v-btn.error {
  background-color: #f44336;
  color: white;
}
button {
  background-color: #a99fef;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7b69ff;
  }
}
</style>
