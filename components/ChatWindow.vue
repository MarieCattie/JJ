<template>
    <div v-if="loading">Loading...</div>
    <div v-else class="chat-window-content">
      <ul class="message-list" ref="messageList">
        <li
          v-for="message in chatStore.messages"
          :key="message.uuid"
          :class="{'my-message': isMyMessage(message), 'companion-message': !isMyMessage(message)}"
        >
          <span class="message-content">{{ message.content }}</span>
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
  
  const props = defineProps({
    chat: Object, // Текущий выбранный чат
  });
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  const messages = chatStore.messages;
  const loading = chatStore.loading;
  
  const newMessage = ref('');
  const messageList = ref(null); // Ссылка на список сообщений
  
  function sendMessage() {
    if (newMessage.value.trim()) {
      chatStore.sendMessage(newMessage.value);
      newMessage.value = '';
    }
  }
  
  // Определение, является ли сообщение отправленным текущим пользователем
  function isMyMessage(message) {
    return message.user === userStore.currentUser.uuid;
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
    max-width: 60%;
  }
  
  .my-message {
    background-color: #8a2be2; /* Фиолетовый фон */
    color: white;
    align-self: flex-end;
    text-align: right;
  }
  
  .companion-message {
    background-color: #f1f1f1; /* Светло-серый фон */
    color: black;
    align-self: flex-start;
    text-align: left;
  }
  
  .message-input {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
  }
  </style>
  