<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style="background-color: rgba(0, 0, 0, 0.5);">
        <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <!-- Кнопка закрытия модального окна -->
            <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Заголовок -->
            <h3 class="text-xl font-bold text-center mb-4">Отклик на вакансию </h3>
            <h4 class="text-lg font-semibold text-gray-900">Напишите сопроводительное письмо</h4>
            <p class="text-sm text-gray-500">Вакансия: {{vacancy.title}}</p>

            
            <!-- Текстовое поле для сообщения -->
            <AppTextarea v-model="message" class="w-full" rows="5" placeholder="Расскажите о ваших навыках, достижениях, опыте">
            </AppTextarea>

            <!-- Кнопка отправки -->
            <div class="flex justify-center">
                <button @click="sendMessage"
                    class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg">
                    Откликнуться
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import useStorage from '~/composables/useStorage';
import { useChatStore } from '~/stores/chat';
import { io } from 'socket.io-client';
import { useAuthStore } from '~/stores/auth';

const chatStore = useChatStore();
const authStore = useAuthStore();
const props = defineProps({
    isVisible: Boolean,
    vacancy: Object
});

const emit = defineEmits(['update:isVisible', 'sendMessage']);

const message = ref('');

const storage = useStorage();

const closeModal = () => {
    emit('update:isVisible', false);
};

const sendMessage = () => {
    emit('sendMessage', { status: "success", message: message.value, uuid: props.vacancy?.uuid  });
    closeModal();
};

onMounted(() => {

});

</script>

<style scoped>
textarea {
    resize: none;
}
</style>