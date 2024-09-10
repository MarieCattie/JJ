<template>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="chat in chatStore.chats" :key="chat.uuid" :class="{'bg-purple-200': chatStore.currentChat?.uuid === chat.uuid, 'cursor-pointer': true, 'p-4': true, 'rounded-md': true}"
      @click="selectChat(chat)">
        {{ getCompanionName(chat) }}
      </li>
    </ul>
  </template>
  
  <script setup>
  import { useChatStore } from '~/stores/chat';
  import { useUserStore } from '~/stores/user';
  import { onMounted, ref } from 'vue';
  import { defineEmits } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const uuidFromQuery = route.query.uuid;
  
  const chatStore = useChatStore();
  const userStore = useUserStore();
  
  const loading = chatStore.loading;
  const chats = chatStore.chats;
  const companions = ref({});
  const emit = defineEmits(['chatSelected']);
  
  onMounted(async () => {
    await chatStore.fetchChats();
    await fetchCompanions();
    //Если в url есть параметр uuid, то выбираем чат
    if (uuidFromQuery) {
    const chat = chatStore.chats.find(
      (c) => c.first_user === uuidFromQuery || c.second_user === uuidFromQuery
    );
    if (chat) {
      selectChat(chat);
    }
  }
  });
  
  // Функция для получения имени собеседника
  function getCompanionName(chat) {
    
    const companionUuid = chat.first_user === userStore.currentUser.user_uuid ? chat.second_user : chat.first_user;
    return companions.value[companionUuid] || 'Unknown User';
  }
  
  // Функция для получения данных о собеседниках
  async function fetchCompanions() {
    for (const chat of chats) {
      const companionUuid = chat.first_user === userStore.currentUser.uuid ? chat.first_user : chat.second_user;
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
if(uuidFromQuery) {
// Передаем uuid чата в initializeSocket
chatStore.disconnectSocket();
    chatStore.initializeSocket(uuidFromQuery);
} else {
// Передаем uuid чата в initializeSocket
chatStore.disconnectSocket();
    chatStore.initializeSocket(companionUuid);
}
  
  }
  </script>
  