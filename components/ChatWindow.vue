<template>
    <div v-if="loading">Loading...</div>
    <div v-else class="chat-window-content">
      <ul class="message-list" ref="messageList">
        <li
          v-for="message in sortedMessages"
          :key="message.uuid"
          :class="{
            'my-message': isMyMessage(message),
            'companion-message': !isMyMessage(message),
            'flex justify-end': isMyMessage(message),
            'flex justify-start': !isMyMessage(message)
          }"
        >
          <p class="message-content d-flex justify-content-end flex-column"><span>{{ message.content }}</span><span class="message-time">{{ formatter.formatMessageTime(message.created_at) }}</span></p>
        </li>
      </ul>
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="message-input"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useChatStore } from '~/stores/chat';
  import { useUserStore } from '~/stores/user';
  import { useAuthStore } from '~/stores/auth';
  import useFormatter from '~/composables/useFormatter';

  const formatter = useFormatter();
  
  const props = defineProps({
    chat: Object, // Текущий выбранный чат
  });
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const messages = chatStore.messages;
  const loading = chatStore.loading;

  const socket = ref(null);
  
  const newMessage = ref('');
  const messageList = ref(null); // Ссылка на список сообщений
  
  function sendMessage() {
    if (newMessage.value.trim()) {
      chatStore.sendMessage(newMessage.value);
      newMessage.value = '';
      chatStore.fetchMessages(props.chat.uuid)
    }
  }

  const sortedMessages = computed(() => {
  return [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
});
  
  // Определение, является ли сообщение отправленным текущим пользователем
  function isMyMessage(message) {
    return message.user === userStore.currentUser.user_uuid;
  }


  
  // Watch для отслеживания изменений в списке сообщений
  watch(chatStore.messages, (newMessages) => {
    // Прокручиваем вниз, чтобы показать последние сообщения
    messages.value = newMessages
  });
  
  // Автоматическая прокрутка вниз при первой загрузке сообщений
  onMounted(() => {
    if (messageList.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight;
    }
    if(authStore.token) {
     
      // socket.value = io("wss://socket.junior-job.ru", {
      //     query: {
      //       user_uuid: "092a4671-2544-468c-8da0-2cd4c96c2a6c",
      //     },
      //     extraHeaders: {
      //       authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM2Q5ZWU3N2EtY2IzYi00NmJjLTlhMjktM2MzYTJiOWFlYzJlIiwiZW1haWwiOiJ0ZXN0dGVzdHRlc3RAbWFpbC5ydSIsInJvbGUiOiJhcHBsaWNhbnQiLCJpYXQiOjE3MjM2OTc5MDYsImV4cCI6MTcyMzY5ODgwNn0.9IPZBfO9PXJZibBjeLYD1e-MMZWk_OQbzREwjoSxChs",
      //     },
      //   });
    }
  });
  </script>
  
  <style scoped>
  .chat-window-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .message-list {
    list-style-type: none;
    padding: 0;
    flex-grow: 1;
    overflow-y: auto;
  }
  
  .message-list li {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 100%;
    display: flex;
  }

  /* Сообщения текущего пользователя */
.my-message .message-content {
  padding: 8px 15px;
  background-color: #8a2be2; /* Фиолетовый фон */
  color: white;
  border-radius: 10px 10px 0 10px;
  text-align: right;
}

.my-message .message-time {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: right;
  margin-top: 5px;
}

/* Сообщения собеседника */
.companion-message .message-content {
  padding: 8px 15px;
  background-color: #f1f1f1; /* Светло-серый фон */
  color: black;
  border-radius: 10px 10px 10px 0;
  text-align: left;
}

.companion-message .message-time {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
  margin-top: 5px;
}
  
  
  .message-input {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
  }
  </style>
  