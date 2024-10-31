<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold text-purple-900 text-center mb-8">Редактировать вакансию</h1>
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
                    placeholder="Опишите требования, обязанности и навыки" />
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

            <!-- Изображение вакансии с превью -->
            <div>
                <label for="image" class="block text-sm font-medium leading-6 text-gray-900 mb-3">
                    Изображение вакансии
                </label>
                <p class="mb-3">Загрузите новое изображение или оставьте поле пустым, чтобы осталось предыдущее изображение</p>
                <div v-if="imagePreview" class="mb-4">
                    <img :src="imagePreview" alt="Preview" class="w-32 h-32 object-cover rounded-md" />
                </div>
                <AppUploadImage class="update-avatar justify-start" @change="handleImageFile" />
            </div>

            <!-- Кнопка отправки -->
            <button type="submit"
                class="btn bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700">
                Сохранить изменения
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useVacanciesStore } from '~/stores/vacancies';
import { useCategoriesStore } from '~/stores/categories';
import { useRouter, useRoute } from 'vue-router';

const title = ref('');
const category_uuid = ref('');
const description = ref('');
const time = ref('');
const place = ref('');
const required_experience = ref(false);
const several_applicants = ref(false);
const imageFile = ref(null);
const imagePreview = ref(null);
const selectedCategoryUuid = ref(null);

const vacanciesStore = useVacanciesStore();
const categoriesStore = useCategoriesStore();
const router = useRouter();
const route = useRoute();

// Загружаем категории и информацию о вакансии при загрузке компонента
onMounted(async () => {
    await categoriesStore.fetchCategories();
    const vacancyId = route.params.uuid;

    // Убедитесь, что вакансия получена правильно
    const vacancy = await vacanciesStore.getVacancyById(vacancyId);
    if (vacancy) {
        title.value = vacancy.title || '';
        selectedCategoryUuid.value = vacancy.category?.uuid || '';
        description.value = vacancy.description || '';
        time.value = vacancy.time || '';
        place.value = vacancy.place || '';
        required_experience.value = vacancy.required_experience || false;
        several_applicants.value = vacancy.several_applicants || false;
        imagePreview.value = vacancy.image_url || null;
    } else {
        console.error(`Vacancy with ID ${vacancyId} not found.`);
    }
});

const categories = categoriesStore.categories;

const handleImageFile = (event) => {
    imageFile.value = event.target.files[0];
    imagePreview.value = URL.createObjectURL(imageFile.value);
};

const submitForm = async () => {
    const vacancyData = {
        uuid: route.params.uuid,
        title: title.value,
        category_uuid: selectedCategoryUuid.value,
        description: description.value,
        time: time.value,
        place: place.value,
        required_experience: required_experience.value,
        several_applicants: several_applicants.value
    };
    let updatedVacancy;
    if(imageFile.value !== null) {
        updatedVacancy = await vacanciesStore.updateVacancy(vacancyData, imageFile.value);
    } else {
        updatedVacancy = await vacanciesStore.updateVacancy(vacancyData);
    }
    

    if (updatedVacancy) {
        router.push('/profile');
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
