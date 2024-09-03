<template>
    <div>
        <div class="form mx-auto">
            <h1 class="main-title mb-5">Создайте аккаунт</h1>

            <AppUploadImage @change="uploadImage" />

            <AppSwitcher class="my-4" name="role" firstValue="corporate" secondValue="individual" firstLabel="Юр.лицо"
                secondLabel="Физ.лицо" v-model="selectedRole" />

            <!-- ЮР ЛИЦО -->
            <template v-if="selectedRole === 'corporate'">
                <AppInput class="w-full" id="title" name="title" label="Название" type="text" v-model="corporate.title"
                    required placeholder="Введите название вашей организации" />
                <AppInput class="w-full" id="company_inn" name="company_inn" label="ИНН" type="text"
                    v-model="corporate.inn" required />
                <AppTextarea class="w-full" id="company_inn" name="company_inn" label="Контактная информация" rows="5"
                    maxlength="500" v-model="corporate.contact_info" required
                    placeholder="Укажите контакты, по которым с вами могут связаться (например, телефон, WhatsApp, электронная почта, ссылки на соц.сети)" />
                <AppInput class="w-full" id="company_email" name="company_email" label="Рабочий e-mail" type="email"
                    v-model="corporate.email" required autocomplete="email" placeholder="Введите e-mail" />
                <AppInput class="w-full" id="company_password" name="company_password" label="Пароль" type="password"
                    v-model="corporate.password" required placeholder="Придумайте пароль" />
                <AppSelect id="company_city" name="company_city" class="w-full" label="Город" v-model="corporate.city_uuid"
                    :options="citiesStore.cities" placeholder="Выберите город" required />
                <AppTextarea class="w-full" id="company_description" name="company_description"
                    label="Краткая информация" v-model="corporate.summary" required
                    placeholder="Опишите, какая помощь вам необходима, чем занимается ваша компания, каких сотрудников вы ищете"
                    rows="5" maxlength="500" />
                <button type="submit"
                    class="mt-5 flex w-full justify-center rounded-xl bg-[#AAA2D8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9A8CEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A8CEA]">Зарегистрироваться</button>
            </template>

            <!-- ФИЗ ЛИЦО -->

            <template v-if="selectedRole === 'individual'">
                <AppInput class="w-full" id="individual_surname" name="individual_surname" label="Фамилия" type="text"
                    v-model="individual.surname" required placeholder="Введите вашу фамилию" />
                <AppInput class="w-full" id="individual_name" name="individual_name" label="Имя" type="text"
                    v-model="individual.name" required placeholder="Введите ваше имя" />
                <AppInput class="w-full" id="individual_patronymic" name="individual_patronymic" label="Отчество"
                    type="text" v-model="individual.patronymic" required placeholder="Введите ваше отчество" />
                <AppInput class="w-full" id="individual_email" name="individual_email" label="Email" type="email"
                    v-model="individual.email" required autocomplete="email" placeholder="Введите ваш email" />
                <AppInput class="w-full" id="individual_password" name="individual_password" label="Пароль"
                    type="password" v-model="individual.password" required
                    placeholder="Придумайте пароль (не менее 5 символов)" />
                <AppSelect id="individual_city" name="individual_city" class="w-full" label="Город" v-model="individual.city_uuid"
                    :options="citiesStore.cities" placeholder="Выберите город" required />
                    <AppTextarea class="w-full" id="individual_description" name="individual_description"
                    label="Краткая информация" v-model="individual.summary" required
                    placeholder="Опишите вашу сферу деятельности, какая помощь вам необходима, каких сотрудников вы ищете"
                    rows="5" maxlength="500" />
            </template>
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "empty",
});

import { ref } from 'vue';
import { useCitiesStore } from '~/stores/city';

const selectedRole = ref('corporate');

const citiesStore = useCitiesStore();

const avatar = ref(null);

const corporate = ref({
    title: '',
    inn: '',
    contact_info: '',
    email: '',
    password: '',
    city_uuid: '',
    role: "legal_entity",
    summary: ''
})

const individual = ref({
    surname: '',
    name: '',
    patronymic: '',
    email: '',
    password: '',
    city_uuid: '',
    summary: '',
    role: "individual",
})

const uploadImage = (e) => {
    avatar.value = e.target.files[0];
};

onMounted(async () => {
    await citiesStore.fetchCities();
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