<template>
    <div class="chat-messages">
      <ul>
        <li v-for="message in messages" :key="message.uuid">
          <div>{{ message.content }}</div>
          <div>{{ message.sent_at }}</div>
        </li>
      </ul>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  
  export default defineComponent({
    data() {
      return {
        newMessage: '',
      };
    },
  
    computed: {
      ...mapGetters({
        messages: (state) => state.messages[this.$route.params.chatUuid] || [],
        currentChatUuid: 'currentChatUuid',
      }),
    },
  
    methods: {
      ...mapActions(['fetchMessages', 'sendMessage']),
      async sendMessage() {
        if (this.newMessage.trim()) {
          await this.sendMessage({ chatUuid: this.currentChatUuid, content: this.newMessage.trim() });
          this.newMessage = '';
        }
      },
    },
  
    created() {
      this.fetchMessages(this.$route.params.chatUuid);
    },
  });
  </script>
  
  <style scoped>
  /* Добавьте стили для списка сообщений */
  </style>
  