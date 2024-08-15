<template>
    <div class="chat-container">
      <div class="chat-list">
        <!-- Компонент для списка чатов -->
        <ChatList @chatSelected="handleChatSelected" />
      </div>
      <div class="chat-window">
        <!-- Компонент для текущего чата -->
        <ChatWindow v-if="currentChat" :chat="currentChat" />
        <div v-else class="no-chat-selected">
          Выберите чат, чтобы начать общение
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useChatStore } from '~/stores/chat';
  import ChatList from '~/components/ChatList.vue';
  import ChatWindow from '~/components/ChatWindow.vue';
  
  const chatStore = useChatStore();
  const currentChat = ref();
  
  onMounted(() => {
    // Инициализируем соединение через сокет при загрузке страницы
    // chatStore.initializeSocket();
  
    // Загружаем список чатов
    chatStore.fetchChats();
  });
  
  async function handleChatSelected(chat) {
    await chatStore.fetchMessages(chat.uuid);
    currentChat.value = {...chat}
    // Устанавливаем текущий выбранный чат
    // Загружаем сообщения для выбранного чата
    
  }
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    height: 100vh;
  }
  
  .chat-list {
    width: 30%;
    border-right: 1px solid #ccc;
    overflow-y: auto;
  }
  
  .chat-window {
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .no-chat-selected {
    text-align: center;
    color: #999;
    font-size: 18px;
    margin-top: 50px;
  }
  </style>
  