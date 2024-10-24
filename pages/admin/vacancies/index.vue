<template>
    <div class="p-5">
      <h1 class="text-2xl font-bold mb-5">Управление вакансиями</h1>
      
      <!-- Поиск -->
      <div class="mb-4">
        <input 
          v-model="searchQuery" 
          @input="handleSearch" 
          type="text" 
          placeholder="Поиск по названию вакансии..." 
          class="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
  
      <!-- Таблица вакансий -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2 border">Название вакансии</th>
              <th class="px-4 py-2 border">Автор</th>
              <th class="px-4 py-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vacancy in paginatedVacancies" :key="vacancy.uuid" class="hover:bg-gray-100">
              <td class="px-4 py-2 border">{{ vacancy.title }}</td>
              <td class="px-4 py-2 border">{{ vacancy.employer.role[vacancy.employer.role.current]?.title || `${vacancy.employer.role[vacancy.employer.role.current]?.surname} ${vacancy.employer.role[vacancy.employer.role.current]?.name} ${vacancy.employer.role[vacancy.employer.role.current]?.patronymic}` }}</td>
              <td class="px-4 py-2 border">
                <button @click="toggleBan(vacancy)" class="px-3 py-1 mr-2 bg-red-500 text-white rounded">
                  {{ vacancy.banned ? 'Разбанить' : 'Забанить' }}
                </button>
                <button @click="editVacancy(vacancy.uuid)" class="px-3 py-1 mr-2 bg-blue-500 text-white rounded">
                  Изменить
                </button>
                <button @click="confirmDeleteVacancy(vacancy.uuid)" class="px-3 py-1 bg-gray-700 text-white rounded">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Пагинация -->
      <div class="mt-4 flex justify-between items-center">
        <button 
          :disabled="currentPage === 1" 
          @click="previousPage" 
          class="px-4 py-2 bg-gray-300 rounded-md"
        >
          Назад
        </button>
  
        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
  
        <button 
          :disabled="currentPage === totalPages" 
          @click="nextPage" 
          class="px-4 py-2 bg-gray-300 rounded-md"
        >
          Вперед
        </button>
      </div>
  
      <!-- Модальное окно подтверждения удаления -->
      <div v-if="showDeleteModal" class="fixed z-[1000] inset-0 flex justify-center items-center" style="background-color: rgba(0, 0, 0, 0.5); z-index:2000;" @click.self="cancelDelete">
        <div class="bg-white p-5 pt-10 rounded-lg relative">
            <button @click="cancelDelete" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✕
              </button>
          <h2 class="text-xl font-semibold mb-4">Вы уверены, что хотите удалить эту вакансию?</h2>
          <div class="flex justify-between">
            <button @click="handleDeleteVacancy" class="px-4 py-2 bg-red-500 text-white rounded">Да</button>
            <button @click="cancelDelete" class="px-4 py-2 bg-gray-500 text-white rounded">Нет</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';
import { useRouter } from 'vue-router';

const router = useRouter();
const vacanciesStore = useVacanciesStore();

const searchQuery = ref<string>('');
const currentPage = ref(1);
const itemsPerPage = 10;

// Загрузка вакансий
onMounted(() => {
  vacanciesStore.fetchVacancies();
});

// Фильтрация вакансий по поисковому запросу
const filteredVacancies = computed(() => {
  if (!searchQuery.value) return vacanciesStore.vacancies;
  return vacanciesStore.vacancies.filter(vacancy => 
    vacancy.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Пагинация
const paginatedVacancies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredVacancies.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredVacancies.value.length / itemsPerPage));

// Действия с вакансиями
const toggleBan = async (vacancy) => {
  if (vacancy.banned) {
    await vacanciesStore.unbanVacancy({ uuid: vacancy.uuid });
  } else {
    await vacanciesStore.banVacancy({ uuid: vacancy.uuid });
  }
};

const editVacancy = (uuid) => {
  router.push(`/admin/vacancies/edit/${uuid}`);
};

const deleteVacancy = async (uuid: string) => {
  if (confirm('Вы уверены, что хотите удалить эту вакансию?')) {
    await vacanciesStore.deleteVacancy(uuid);
  }
};

// Переход по страницам
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Обработка поиска
const handleSearch = () => {
  currentPage.value = 1; // Сбрасываем пагинацию на первую страницу при новом поиске
};


const showDeleteModal = ref(false); // Управление модальным окном
const vacancyToDelete = ref<string | null>(null); // Хранение UUID вакансии, которую хотят удалить

// Открыть модальное окно для подтверждения удаления
const confirmDeleteVacancy = (uuid: string) => {
  vacancyToDelete.value = uuid;
  showDeleteModal.value = true;
};

// Подтверждение удаления
const handleDeleteVacancy = async () => {
  if (vacancyToDelete.value) {
    await vacanciesStore.deleteVacancy(vacancyToDelete.value);
    showDeleteModal.value = false;
    vacancyToDelete.value = null;
  }
};

// Отмена удаления
const cancelDelete = () => {
  showDeleteModal.value = false;
  vacancyToDelete.value = null;
};
</script>
<style scoped>

</style>