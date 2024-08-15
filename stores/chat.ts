import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '~/composables/api';
import { io } from 'socket.io-client';
import { useUserStore } from './user';
import { useAuthStore } from './auth';

interface ChatMessage {
    uuid: string;
    content: string;
    user: string;
    chat: string;
    created_at: string;
    read: boolean;
}

interface Chat {
    uuid: string;
    first_user: string;
    second_user: string;
    created_at: string;
    updated_at: string;
    messages: ChatMessage[];
}

export const useChatStore = defineStore('chat', () => {
    const chats = ref<Chat[]>([]);
    const currentChat = ref<Chat | null>(null);
    const messages = ref<ChatMessage[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const socket = ref<any>(null);

    const userStore = useUserStore();
    const authStore = useAuthStore();

    // Инициализация Socket.IO
    function initializeSocket(companionUuid: string) {
        const token = authStore.token;
        if (token && !socket.value) {
            socket.value = io("wss://socket.junior-job.ru", {
                query: {
                    user_uuid: companionUuid,
                },
                extraHeaders: {
                    authorization: token,
                },
            });

            socket.value.on("connect", () => {
                console.log("Connected to socket.io server");
            });

            socket.value.on("incoming", (data: ChatMessage) => {
                messages.value.unshift(data);
                fetchMessages(currentChat.value?.uuid)
                scrollToBottom();
            });

            socket.value.on("disconnect", (reason: string) => {
                console.log(`Disconnected: ${reason}`);
            });
        } 
    }

    async function fetchChats() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.chat.fetchMyChats();
            chats.value = data;
        } catch (err) {
            error.value = 'Failed to fetch chats';
            console.error('Error fetching chats', err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchMessages(chatUuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
           const data = await api.chat.fetchMessagesByChatUuid(chatUuid);
            messages.value = data;
            currentChat.value = chats.value.find(chat => chat.uuid === chatUuid) || null;
        } catch (err) {
            error.value = 'Failed to fetch messages';
            console.error('Error fetching messages', err);
        } finally {
            loading.value = false;
        }
    }

    async function sendMessage(content: string) {
        if (!currentChat.value || !socket.value) return;

        const newMessage = {
            content,
            chat: currentChat.value.uuid,
            user: userStore.currentUser.uuid,
            created_at: new Date().toISOString(),
            read: false,
        };

        // Отправка сообщения на сервер через сокет
        socket.value.emit("message", {body: content});

        // Локально добавляем сообщение в список
        messages.value.push({
            uuid: new Date().getTime().toString(), // Временный UUID до получения от сервера
            content,
            user: userStore.currentUser.uuid,
            chat: currentChat.value.uuid,
            created_at: new Date().toISOString(),
            read: false,
        });

        scrollToBottom();
    }

    async function fetchAllMessages() {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            const data = await api.chat.fetchAllMessages();
            messages.value = data;
        } catch (err) {
            error.value = 'Failed to fetch all messages';
            console.error('Error fetching all messages', err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteMessage(uuid: string) {
        loading.value = true;
        error.value = null;
        try {
            const api = useApi();
            await api.chat.deleteMessageByUuid(uuid);
            messages.value = messages.value.filter(message => message.uuid !== uuid);
        } catch (err) {
            error.value = 'Failed to delete message';
            console.error('Error deleting message', err);
        } finally {
            loading.value = false;
        }
    }

    async function markMessageAsRead(uuid: string) {
        try {
            const api = useApi();
            const updatedMessage = await api.chat.markMessageAsRead(uuid);
            const message = messages.value.find(m => m.uuid === uuid);
            if (message) {
                message.read = updatedMessage.read;
            }
        } catch (err) {
            error.value = 'Failed to mark message as read';
            console.error('Error marking message as read', err);
        }
    }

    function scrollToBottom() {
        // Ваш метод прокрутки до последнего сообщения
    }

    return {
        chats,
        currentChat,
        messages,
        loading,
        error,
        initializeSocket,
        fetchChats,
        fetchMessages,
        sendMessage,
        fetchAllMessages, // новый метод для получения всех сообщений
        deleteMessage, // новый метод для удаления сообщения
        markMessageAsRead,
    };
}, {
    persist: process.client ? {
        storage: window.localStorage,
        paths: ['chats', 'messages'],
    } : false,
});
