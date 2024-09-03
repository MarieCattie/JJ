<template>
    <div>
        <form @submit.prevent="register" class="form mx-auto">
            <h1 class="main-title mb-5">Создайте аккаунт</h1>

            <AppUploadImage @change="uploadImage" />
            <AppInput class="w-full" id="surname" name="surname" label="Фамилия" type="text" v-model="applicant.userData.surname"
                required placeholder="Введите вашу фамилию" />

            <AppInput class="w-full" id="name" name="name" label="Имя" type="text" v-model="applicant.userData.name" required
                placeholder="Введите ваше имя" />

            <AppInput class="w-full" id="patronymic" name="patronymic" label="Отчество" type="text"
                v-model="applicant.userData.patronymic" required placeholder="Введите ваше отчество" />

            <AppInput class="w-full" id="email" name="email" label="Email" type="email" v-model="applicant.email"
                required autocomplete="email" placeholder="Введите ваш email" />

            <AppInput class="w-full" id="password" name="password" label="Пароль" type="password"
                v-model="applicant.password" required placeholder="Придумайте пароль (не менее 5 символов)" />

            <AppInput class="w-full" id="birthday" name="birthday" label="Дата рождения" type="date"
                v-model="applicant.userData.birthday" required />

            <AppSelect id="city" name="city" class="w-full" label="Город" v-model="applicant.city_uuid"
                :options="citiesStore.cities" placeholder="Выберите город" required />

            <AppInput class="w-full" id="study" name="study" label="Место учебы" type="text" v-model="applicant.userData.study_place"
                placeholder="Введите название вашего учебного заведения" required />

            <AppInput class="w-full" id="inn" name="inn" label="Ваш номер ИНН" type="text" v-model="applicant.userData.inn"
                placeholder="Введите ваш номер ИНН (12 цифр)" required />

            <AppMultiSelectTag v-model="applicant.userData.competencies_titles" :options="competenciesStore.competencies"
                label="Компетенции" class="w-full mt-3" />

            <AppTextarea class="w-full" id="description" name="description" label="Резюме" v-model="applicant.userData.summary"
                required placeholder="Резюме (расскажите о своих навыках, достижениях, качествах)" rows="5"
                maxlength="500" />
            <button type="submit"
                class="mt-5 flex w-full justify-center rounded-xl bg-[#AAA2D8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9A8CEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A8CEA]">Зарегистрироваться</button>
        </form>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "empty",
});
import { ref } from 'vue';
import { useCitiesStore } from '~/stores/city';
import { useCompetenciesStore } from '~/stores/competencies';
import { useAuthStore } from '~/stores/auth';
import { useRoleStore } from '~/stores/roles';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const applicant = ref({
    email: '',
    password: '',
    city_uuid: '',
    avatar: '',

    userData: {
        name: '',
        surname: '',
        patronymic: '',
        birthday: '',
        study_place: '',
        inn: '',
        summary: '',
        competencies_titles: [] as string[],
    }
})

const router = useRouter();

const userStore = useUserStore();
const citiesStore = useCitiesStore();
const competenciesStore = useCompetenciesStore();
const authStore = useAuthStore();
const roleStore = useRoleStore();

const uploadImage = (e) => {
    applicant.value.avatar = e.target.files[0];
};

const register = async () => {
    const result = await authStore.signUp(applicant.value.email, applicant.value.password, applicant.value.city_uuid);

    await authStore.signIn(applicant.value.email, applicant.value.password)
    if (!authStore.errorMessage) { // Проверка, что ошибки нет
    router.push('/profile'); // Переход на страницу профиля

    await roleStore.fetchRolesForCurrentUser();
    const roleUuid = roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current].uuid;
    console.log(roleUuid)
    await roleStore.updateApplicantByUuid(roleUuid, applicant.value.userData)
    await roleStore.fetchRolesForCurrentUser();
    userStore.currentUser = {...userStore.currentUser, ...roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current]}
  }
}

onMounted(async () => {
    await citiesStore.fetchCities();
    await competenciesStore.fetchCompetencies();
})
</script>

<style scoped lang="scss">
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 450px;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
}
</style>