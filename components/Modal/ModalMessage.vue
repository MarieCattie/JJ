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
            <h3 class="text-xl font-bold text-center mb-4">Написать новое сообщение</h3>

            <!-- Блок с информацией о человеке -->
            <div class="mb-4 flex items-center gap-2">
                <v-avatar size="48" class="border border-primary">
                    <img :src="storage?.showUserImage(recipient.image)" alt="Recipient Avatar">
                </v-avatar>
                <div>
                    <h4 class="text-lg font-semibold text-gray-900">{{ nameRecipient }}</h4>
                    <p class="text-sm text-gray-500">Вакансия: {{ vacancyTitle }}</p>
                </div>
            </div>

            <!-- Текстовое поле для сообщения -->
            <AppTextarea v-model="message" class="w-full" rows="5" placeholder="Введите ваше сообщение...">
            </AppTextarea>

            <!-- Кнопка отправки -->
            <div class="flex justify-center">
                <button @click="sendMessage"
                    class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg">
                    Написать
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
    recipient: Object,
    vacancyTitle: String
});

const emit = defineEmits(['update:isVisible', 'sendMessage']);

const message = ref('');
let socket = null;

const storage = useStorage();

const nameRecipient = computed(() => {
    let name = '';
    if (props.recipient.surname) {
        name += props.recipient.surname;
    }
    if (props.recipient.name) {
        name += ` ${props.recipient.name}`
    }
    if (props.recipient.patronymic) {
        name += ` ${props.recipient.patronymic}`
    }
    if (props.recipient.title) {
        name = props.recipient.title
    }
    return name;
})

const closeModal = () => {
    emit('update:isVisible', false);
};

const sendMessage = () => {
    chatStore.disconnectSocket();
    // Проверяем, что сообщение не пустое
    if (message.value.trim()) {
        // Если сокет еще не создан, инициализируем его
        if (!chatStore.socket) {
            chatStore.initializeSocket(props.recipient?.user_uuid);

            // Проверяем успешное подключение к сокету
            chatStore.socket.on('connect', () => {
                console.log('Socket connected');
                // Отправляем сообщение только после успешного подключения
                if(chatStore.socket) {
                    
                    chatStore.sendMessage(message.value);
                } else {
                    
                }
                
                 // Очищаем поле после отправки
                emit('sendMessage', { status: "success", message: message.value });
                closeModal();
            });

            // Обрабатываем ошибку подключения
            chatStore.socket.on('connect_error', (error) => {
                console.error('Failed to connect to socket:', error);
                emit('sendMessage', { status: "failed" });
            });
        } else {
            
            // Если сокет уже есть, сразу отправляем сообщение
            chatStore.sendMessage(message.value);
            // Очищаем поле после отправки
            emit('sendMessage', { status: "success", message: message.value  });
            closeModal();
        }
    } else {
        emit('sendMessage', { status: "failed" });
    }
};

onMounted(() => {

});

</script>

<style scoped>
textarea {
    resize: none;
}
</style>