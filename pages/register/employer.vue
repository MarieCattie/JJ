<template>
    <div>
        <h1 class="main-title mb-8 text-center mt-10">Регистрация заказчика (работодателя)</h1>
        <form @submit.prevent="register" class="form mx-auto">


            <AppUploadImage @change="uploadImage" />

            <AppSwitcher class="my-8 mt-12" name="role" firstValue="corporate" secondValue="individual"
                firstLabel="Юр.лицо" secondLabel="Физ.лицо" v-model="selectedRole" />

            <!-- ЮР ЛИЦО -->
            <template v-if="selectedRole === 'corporate'">
                <AppInput class="w-full" id="title" name="title" label="Название" type="text" v-model="corporate.userData.title"
                    required placeholder="Введите название вашей организации" />
                <AppInput class="w-full" id="company_inn" name="company_inn" label="ИНН" type="text"
                    v-model="corporate.userData.inn" required />
                <AppTextarea class="w-full" id="company_inn" name="company_inn" label="Контактная информация" rows="5"
                    maxlength="500" v-model="corporate.userData.contact_info" required
                    placeholder="Укажите контакты, по которым с вами могут связаться (например, телефон, WhatsApp, электронная почта, ссылки на соц.сети)" />
                <AppInput class="w-full" id="company_email" name="company_email" label="Рабочий e-mail" type="email"
                    v-model="corporate.email" required autocomplete="email" placeholder="Введите e-mail" />
                <AppInput class="w-full" id="company_password" name="company_password" label="Пароль" type="password"
                    v-model="corporate.password" required placeholder="Придумайте пароль" />
                <AppSelect id="company_city" name="company_city" class="w-full" label="Город"
                    v-model="corporate.city_uuid" :options="citiesStore.cities" placeholder="Выберите город" required />
                <AppTextarea class="w-full" id="company_description" name="company_description"
                    label="Краткая информация" v-model="corporate.userData.summary" required
                    placeholder="Опишите, какая помощь вам необходима, чем занимается ваша компания, каких сотрудников вы ищете"
                    rows="5" maxlength="500" />
                    <div v-if="authStore.errorMessage" class="text-red-500 text-sm">
                        {{ authStore.errorMessage }}
                    </div>
                <button type="submit"
                    class="mt-5 flex w-full justify-center rounded-xl bg-[#AAA2D8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9A8CEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A8CEA]">Зарегистрироваться</button>
            </template>

            <!-- ФИЗ ЛИЦО -->

            <template v-if="selectedRole === 'individual'">
                <AppInput class="w-full" id="individual_surname" name="individual_surname" label="Фамилия" type="text"
                    v-model="individual.userData.surname" required placeholder="Введите вашу фамилию" />
                <AppInput class="w-full" id="individual_name" name="individual_name" label="Имя" type="text"
                    v-model="individual.userData.name" required placeholder="Введите ваше имя" />
                <AppInput class="w-full" id="individual_patronymic" name="individual_patronymic" label="Отчество"
                    type="text" v-model="individual.userData.patronymic" required placeholder="Введите ваше отчество" />
                <AppInput class="w-full" id="individual_email" name="individual_email" label="Email" type="email"
                    v-model="individual.email" required autocomplete="email" placeholder="Введите ваш email" />
                <AppInput class="w-full" id="individual_password" name="individual_password" label="Пароль"
                    type="password" v-model="individual.password" required
                    placeholder="Придумайте пароль (не менее 5 символов)" />
                <AppSelect id="individual_city" name="individual_city" class="w-full" label="Город"
                    v-model="individual.city_uuid" :options="citiesStore.cities" placeholder="Выберите город"
                    required />
                <AppTextarea class="w-full" id="individual_description" name="individual_description"
                    label="Краткая информация" v-model="individual.userData.summary" required
                    placeholder="Опишите вашу сферу деятельности, какая помощь вам необходима, каких сотрудников вы ищете"
                    rows="5" maxlength="500" />
                    <div v-if="authStore.errorMessage" class="text-red-500 text-sm">
                        {{ authStore.errorMessage }}
                    </div>
                <button type="submit"
                    class="mt-5 flex w-full justify-center rounded-xl bg-[#AAA2D8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9A8CEA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A8CEA]">Зарегистрироваться</button>
            </template>
        </form>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "empty",
});

import { ref } from 'vue';
import { useCitiesStore } from '~/stores/city';
import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';
import { useRoleStore } from '~/stores/roles';
import { useRouter } from 'vue-router';

const selectedRole = ref('corporate');

const citiesStore = useCitiesStore();

const authStore = useAuthStore();

const userStore = useUserStore();

const roleStore = useRoleStore();

const avatar = ref<File | null>(null);

const router = useRouter();

const corporate = ref({
    email: '',
    password: '',
    city_uuid: '',
    role: "legal_entity",
    userData: {
        title: '',
        inn: '',
        contact_info: '',
        summary: ''
    }
})

const individual = ref({
    email: '',
    password: '',
    city_uuid: '',
    role: "individual",
    userData: {
        surname: '',
        name: '',
        patronymic: '',
        summary: ''
    }
})

const uploadImage = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        avatar.value = input.files[0];
    }
};

const register = async () => {
    if (selectedRole.value === 'corporate') {
        const result = await authStore.signUp(corporate.value.email, corporate.value.password, corporate.value.city_uuid);

        await authStore.signIn(corporate.value.email, corporate.value.password);
        if (avatar.value) {
            await userStore.uploadUserImage(avatar.value)
        }
        if (!authStore.errorMessage) {
            router.push('/profile');

            await roleStore.changeCurrentUserRole({ role: corporate.value.role })
            await roleStore.fetchRolesForCurrentUser();
            const roleUuid = roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current].uuid;
            await roleStore.updateLegalEntityByUuid(roleUuid, corporate.value.userData)
            await roleStore.fetchRolesForCurrentUser();
            userStore.currentUser = { ...userStore.currentUser, ...roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current] }
        }
    }

    if (selectedRole.value === 'individual') {
        const result = await authStore.signUp(individual.value.email, individual.value.password, individual.value.city_uuid);

        await authStore.signIn(individual.value.email, individual.value.password);
        if (avatar.value) {
            await userStore.uploadUserImage(avatar.value)
        }
        if (!authStore.errorMessage) {
            router.push('/profile');

            await roleStore.changeCurrentUserRole({ role: individual.value.role })
            await roleStore.fetchRolesForCurrentUser();
            const roleUuid = roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current].uuid;
            await roleStore.updateIndividualByUuid(roleUuid, individual.value.userData)
            await roleStore.fetchRolesForCurrentUser();
            userStore.currentUser = { ...userStore.currentUser, ...roleStore.rolesByCurrentUser[roleStore.rolesByCurrentUser?.current] }
        }
    }
    // const result = await useAuthStore.signUp([selectedRole.value].value.email, [selectedRole.value].value.password, [selectedRole.value].value.city_uuid)
}

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