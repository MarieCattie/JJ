<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold text-purple-900 text-center mb-8">Создать вакансию</h1>
        <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Название вакансии -->
            <div>
                <AppInput class="w-full" id="title" name="title" label="Название вакансии" type="text"
                    v-model="title" required placeholder="Название вакансии" />
            </div>

            <!-- Категория вакансии -->
            <div>
                <AppSelect id="category-select" name="category-select" class="w-full" label="Выберите категорию:" 
                    v-model="selectedCategoryUuid" :options="categories" placeholder="Выберите категорию" required />
            </div>

            <!-- Описание вакансии -->
            <div>
                <AppTextarea class="w-full" id="description" name="description" label="Описание вакансии" rows="5"
                    maxlength="500" v-model="description" required
                    placeholder="Расскажите о требованиях к соискателю, обязанностях, необходимых навыках, графике работы и т.д." />
            </div>

            <!-- Время работы -->
            <div>
                <AppInput class="w-full" id="time" name="time" label="Время работы" type="text"
                    v-model="time" required placeholder="Например, Понедельник-Пятница, 9:00-18:00" />
            </div>

            <!-- Место работы -->
            <div>
                <AppInput class="w-full" id="place" name="place" label="Место работы" type="text"
                    v-model="place" required placeholder="Например, Москва, офис или удалённо" />
            </div>

            <!-- Требуемый опыт работы -->
            <div>
                <label class="block text-sm font-medium leading-6 text-gray-900 mb-3">Требуется опыт работы</label>
                <input type="checkbox" v-model="required_experience" />
            </div>

            <!-- Возможность отклика для нескольких соискателей -->
            <div>
                <label class="block text-sm font-medium leading-6 text-gray-900 mb-3">Вакансия для нескольких соискателей</label>
                <input type="checkbox" v-model="several_applicants" />
            </div>

            <!-- Изображение вакансии -->
            <div>
                <label for="image" class="block text-sm font-medium leading-6 text-gray-900 mb-3">
                    Изображение вакансии
                </label>
                <AppUploadImage class="update-avatar justify-start" @change="handleImageFile" />
            </div>

            <!-- Кнопка отправки -->
            <button type="submit"
                class="btn bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700">
                Создать вакансию
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';
import { useCategoriesStore } from '~/stores/categories';
import { useRouter } from 'vue-router';

const title = ref('');
const category_uuid = ref('');
const description = ref('');
const time = ref('');                  // Новое поле времени работы
const place = ref('');                 // Новое поле места работы
const required_experience = ref(false); // Новое поле: требуется опыт
const several_applicants = ref(false);  // Новое поле: для нескольких соискателей
const imageFile = ref(null);
const vacanciesStore = useVacanciesStore();
const router = useRouter();
const categoriesStore = useCategoriesStore();
const selectedCategoryUuid = ref(null);

// Загружаем категории при загрузке компонента
onMounted(() => {
    categoriesStore.fetchCategories();
});

// Получаем список категорий из store
const categories = categoriesStore.categories;

const handleImageFile = (event) => {
    imageFile.value = event.target.files[0];
};

const submitForm = async () => {
    const vacancyData = {
        title: title.value,
        category_uuid: selectedCategoryUuid.value, // Установить UUID выбранной категории
        description: description.value,
        time: time.value,
        place: place.value,
        required_experience: required_experience.value,
        several_applicants: several_applicants.value
    };

    const newVacancy = await vacanciesStore.createVacancy(vacancyData, imageFile.value);

    if (newVacancy) {
        router.push('/profile'); // Переход на страницу со списком вакансий
    }
};

</script>

<style>
.btn {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
}
</style>
