<template>
  <div>
    <div v-if="loading"></div>
    <template v-else>
      <div class="flex flex-col lg:flex-row gap-4 px-4 lg:px-16 py-8 my-10">
        <!-- Левая колонка (40% ширины) -->
        <div class="w-full lg:w-2/5 p-8 flex flex-col items-center shadow-md rounded-lg bg-white">
          <v-avatar size="112" class="border border-primary avatar">
            <img :src="storage?.showUserImage(userStore?.currentUser?.image)" alt="User Avatar">
          </v-avatar>
          <div class="mt-4 text-center">
            <h2 class="text-2xl font-bold text-gray-900">{{ name }}</h2>
            <p class="text-gray-500 text-sm">{{ role }}</p>
          </div>

          <div class="mt-8 w-full">
            <h3 class="text-lg font-semibold mb-4 text-gray-700">Контакты</h3>
            <p class="text-gray-800"><strong>Email:</strong> {{ email }}</p>
            <p class="text-gray-800"><strong>Город:</strong> {{ city }}</p>
          </div>

          <div class="mt-8 w-full" v-if="authStore?.isApplicant">
            <h3 class="text-lg font-semibold mb-4 text-gray-700">Навыки</h3>
            <div class="flex flex-wrap gap-2" v-if="userStore.currentUser.competencies">
              <v-chip v-for="competency in userStore.currentUser.competencies"
                class="bg-purplefresh text-gray-700">{{ competency.title }}</v-chip>
            </div>
          </div>

        </div>

        <!-- Правая колонка (60% ширины) -->
        <div class="w-full lg:w-3/5 p-8 shadow-md rounded-lg bg-white pt-0">
          <!-- Вкладки -->
          <div class="border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li class="me-2">
                <a href="#" @click="setActiveTab('profile')"
                  :class="activeTab === 'profile' ? activeTabClass : defaultTabClass" class="group">
                  <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>Основная информация
                </a>
              </li>
              <li class="me-2">
                <a href="#" @click="setActiveTab('dashboard')"
                  :class="activeTab === 'dashboard' ? activeTabClass : defaultTabClass" class="group">
                  <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 18">
                    <path
                      d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>{{ dashboardTitle }}
                </a>
              </li>
              <li class="me-2">
                <a href="#" @click="setActiveTab('settings')"
                  :class="activeTab === 'settings' ? activeTabClass : defaultTabClass" class="group">
                  <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                  </svg>Настройки профиля
                </a>
              </li>
            </ul>
          </div>

          <!-- Контент вкладок -->
          <div class="p-4 text-gray-800">
            <div v-if="activeTab === 'profile'">
              <template v-if="currentRole === 'applicant'">
                <div class="mt-2 w-full">
                  <p class="text-gray-800"><strong class="text-primary">Возраст:</strong> {{ age }}</p>
                  <p class="text-gray-800"><strong class="text-primary">Место учебы:</strong> {{ studyPlace }}</p>
                </div>
                <div class="mt-2 w-full">
                  <h3 class="text-lg font-semibold mb-1 text-primary">Резюме</h3>
                  <p v-html="summary"></p>
                </div>
              </template>
              <template v-if="currentRole === 'individual'">

              </template>
              <template v-if="currentRole === 'legal_entity'">

              </template>
            </div>
            <div v-if="activeTab === 'dashboard'">
              <template v-if="currentRole === 'applicant'">
                <VacancyResponseCard v-for="response in vacancyResponsesStore.applicantResponses" :key="response.uuid" :response="response" @deleteResponse="deleteResponse" />
              </template>
            </div>
            <div v-if="activeTab === 'settings'">
              <div class="pb-6 w-full border-b border-gray-300">
                <h3 class="text-lg font-semibold mb-3 text-primary">Обновить аватарку</h3>
                <AppUploadImage class="update-avatar" @change="uploadImage" />
                <button @click="updateAvatar" class="btn btn-primary btn-mini btn-update mt-[25px]">Обновить
                  аватарку</button>
              </div>
              <div class="pb-6 w-full border-b border-gray-300 pt-5">
                <h3 class="text-lg font-semibold mb-3 text-primary">Обновить e-mail</h3>
                <AppInput class="w-full" id="email" name="email" label="Новый e-mail" type="email"
                  v-model="newEmail.email" required autocomplete="email" placeholder="Введите новый email" />
                <AppInput class="w-full" id="password" name="password" label="Пароль для подтверждения" type="password"
                  v-model="newEmail.password" required placeholder="Введите ваш пароль для подтверждения смены email" />
                <button @click="updateEmail" class="btn btn-primary btn-mini btn-update mt-3">Обновить e-mail</button>
              </div>
              <div class="pb-6 w-full border-b border-gray-300 pt-5">
                <h3 class="text-lg font-semibold mb-3 text-primary">Обновить пароль</h3>
                <AppInput class="w-full" id="oldPassword" name="oldPassword" label="Текущий пароль" type="password"
                  v-model="newPassword.oldPassword" required placeholder="Введите ваш пароль от аккаунта" />
                <AppInput class="w-full" id="newPassword" name="newPassword" label="Новый пароль" type="password"
                  v-model="newPassword.newPassword" required placeholder="Введите новый пароль" />
                <button @click="updatePassword" class="btn btn-primary btn-mini btn-update mt-3">Обновить
                  пароль</button>

                <!-- Модальные окна -->
                <ModalSuccess
                @update:isVisible="closeModal"
                :isVisible="showSuccessModal"
                :message="userStore.message"
                @close="showSuccessModal = false"
              />
                <!-- <ErrorModal :isVisible="showErrorModal" :message="errorMessage" @close="showErrorModal = false" /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>


  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';
import useStorage from '~/composables/useStorage';
import { useVacancyResponsesStore } from '~/stores/vacancy_responses';
import VacancyResponseCard from '~/components/Cards/VacancyResponseCard.vue';

const loading = ref(true);
const error = ref(null);

const avatar = ref<File | null>(null)

  

const newEmail = ref({
  email: '',
  password: ''
})

const newPassword = ref({
  newPassword: '',
  oldPassword: ''
})


const storage = useStorage();

const activeTab = ref('profile');

const userStore = useUserStore();
const authStore = useAuthStore();
const vacancyResponsesStore = useVacancyResponsesStore();

const showSuccessModal = ref<boolean | null>(false);

const uploadImage = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    avatar.value = input.files[0];
  }
};

const updateAvatar = async () => {
  if (avatar.value) {
    await userStore.uploadUserImage(avatar.value)
  }
}

const updateEmail = async () => {
  await userStore.changeEmail(newEmail.value.email, newEmail.value.password)
}

const updatePassword = async () => {
  await userStore.changePassword(newPassword.value.oldPassword, newPassword.value.newPassword)
}

watch(() => userStore.message, (newMessage) => {
  if(newMessage === '' || newMessage === null) {
    showSuccessModal.value = false;
  } else {
    showSuccessModal.value = true;
  }
});

const closeModal = () => {
  showSuccessModal.value = false;
}

// Классы для активных и неактивных вкладок
const activeTabClass = 'inline-flex items-center justify-center p-4 text-primary border-b-2 border-secondary rounded-t-lg active dark:text-secondary dark:border-secondary group';
const defaultTabClass = 'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group';

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

onMounted(async () => {
  try {
    //Пример запроса из store
    // await authStore.refresh()

    //Пример запроса, где авторизация не нужна
    // const response = await $apiClient.get('/cities');

    //Пример запроса, для которого нужна авторизация
    // const response = await $apiClient.get('/roles/my');
    if(currentRole.value === 'applicant') {
      await vacancyResponsesStore.fetchResponsesByApplicant(userStore.currentUser.user_uuid)
    }

  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const deleteResponse = (async(data: any) => {
  await vacancyResponsesStore.deleteResponse(data.uuid);
  await vacancyResponsesStore.fetchResponsesByApplicant(userStore.currentUser.user_uuid)
  
})

const name = computed(() => {
  if (userStore.currentUser.name) {
    if (userStore.currentUser.surname) {
      return `${userStore.currentUser.name} ${userStore.currentUser.surname}`
    } else {
      return `${userStore.currentUser.name}`
    }
  } else if (userStore.currentUser.title) {
    return `${userStore.currentUser.title}`
  }
  else {
    return `Пользователь ${userStore.currentUser.email}`
  }
});


const role = computed(() => {
  switch (userStore.currentUser.role.current) {
    case 'individual':
      return 'Заказчик/работодатель (физ.л.)';
    case 'legal_entity':
      return 'Заказчик/работодатель (юр.л.)';
    case 'applicant':
      return 'Соискатель/исполнитель';
    default:
      return '';
  }
})

const currentRole = computed(() => {
  switch (userStore.currentUser.role.current) {
    case 'individual':
      return 'individual';
    case 'legal_entity':
      return 'legal_entity';
    case 'applicant':
      return 'applicant';
    default:
      return '';
  }
})

const email = computed(() => {
  if (userStore.currentUser.email) {
    return userStore.currentUser.email;
  }
  return '';
})

const city = computed(() => {
  return userStore.currentUser?.city?.title || '';
})

const studyPlace = computed(() => {
  return userStore.currentUser.study_place === '' ? 'Не указано' : userStore.currentUser.study_place;
})

const summary = computed(() => {
  if (userStore.currentUser.summary) {
    return userStore.currentUser.summary;
  } else {
    return '<span class="text-primary">Напишите резюме, чтобы получать больше предложений от работодателей. Вы можете написать о своих качествах, навыках, опыте или собственных проектах</span>';
  }
})

const age = computed(() => {
  const birthdate = new Date(userStore.currentUser.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();

  // Check if the birthday has occurred this year
  const hasBirthdayOccurred =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());

  if (!hasBirthdayOccurred) {
    age--;
  }

  // Determine the correct word based on the age
  let word = "лет";
  if (age % 10 === 1 && age % 100 !== 11) {
    word = "год";
  } else if (
    (age % 10 === 2 || age % 10 === 3 || age % 10 === 4) &&
    (age % 100 < 10 || age % 100 >= 20)
  ) {
    word = "года";
  }

  return `${age} ${word}`;
});

const dashboardTitle = computed(() => {
  if (currentRole.value === 'applicant') {
    return 'Мои отклики'
  } else {
    return 'Мои вакансии'
  }
})
</script>

<style scoped>
.me-2 {
  margin-right: 0.5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.update-avatar {
  justify-content: flex-start;
}

.update-avatar::v-deep .image-upload__avatar {
  width: 90px;
  height: 90px;
}

.update-avatar::v-deep .image-upload__caption {
  font-family: sans-serif;
  font-size: 14px;
}

.btn-update {
  font-size: 14px;
  line-height: 16px;

}
</style>