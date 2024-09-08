<template>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="chat in chatStore.chats" :key="chat.uuid" @click="selectChat(chat)">
        {{ getCompanionName(chat) }}
      </li>
    </ul>
  </template>
  
  <script setup>
  import { useChatStore } from '~/stores/chat';
  import { useUserStore } from '~/stores/user';
  import { onMounted, ref } from 'vue';
  import { defineEmits } from 'vue';
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  
  const loading = chatStore.loading;
  const chats = chatStore.chats;
  const companions = ref({});
  const emit = defineEmits(['chatSelected']);
  
  onMounted(async () => {
    await chatStore.fetchChats();
    await fetchCompanions();
  });
  
  // Функция для получения имени собеседника
  function getCompanionName(chat) {
    const companionUuid = chat.first_user === userStore.currentUser.uuid ? chat.second_user : chat.first_user;
    return companions.value[companionUuid] || 'Unknown User';
  }
  
  // Функция для получения данных о собеседниках
  async function fetchCompanions() {
    for (const chat of chats) {
      const companionUuid = chat.first_user === userStore.currentUser.uuid ? chat.second_user : chat.first_user;
      if (!companions.value[companionUuid]) {
        const companion = await userStore.getUserById(companionUuid);
        companions.value[companionUuid] = companion.email; // или другое поле, содержащее имя
      }
    }
  }
  
  // Выбор чата
  function selectChat(chat) {
    // Эмитируем событие выбора чата
    emit('chatSelected', chat);


    const isCurrentUserFirst = chat.first_user === userStore.currentUser.uuid;
  const companionUuid = isCurrentUserFirst ? chat.second_user : chat.first_user;

  // Передаем uuid чата в initializeSocket
    chatStore.disconnectSocket();
    chatStore.initializeSocket(companionUuid);
  }
  </script>
  