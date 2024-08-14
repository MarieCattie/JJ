import { AxiosInstance } from "axios";

export interface Chat {
  uuid: string;
  created_at: string;
  updated_at: string;
  banned: boolean;
  deleted: string | null;
  first_user: string;
  second_user: string;
}

export interface Message {
  uuid: string;
  created_at: string;
  updated_at: string;
  banned: boolean;
  deleted: string | null;
  content: string;
  chat: string;
  user: string;
  replied: string | null;
  read: boolean;
}

export default ($chatapiClient: AxiosInstance) => ({
    async fetchMyChats(): Promise<Chat[]> {
       
            const response = await $chatapiClient.get<Chat[]>('/chats/my');
            return response.data;
    },

    async fetchChatByUuid(uuid: string): Promise<Chat> {
        try {
            const response = await $chatapiClient.get<Chat>(`/chats/${uuid}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch chat by uuid: ${error}`);
        }
    },

    async fetchChatByCompanionUuid(companionUuid: string): Promise<Chat> {
        try {
            const response = await $chatapiClient.get<Chat>(`/chats/with/${companionUuid}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch chat by companion uuid: ${error}`);
        }
    },

        // Новый метод для получения всех сообщений (для теста)
        async fetchAllMessages(): Promise<Message[]> {
          const response = await $chatapiClient.get<Message[]>('/messages/all');
          return response.data;
      },
  
      // Новый метод для получения сообщения по UUID
      async fetchMessageByUuid(uuid: string): Promise<Message> {
          const response = await $chatapiClient.get<Message>(`/messages/${uuid}`);
          return response.data;
      },
  
      // Новый метод для удаления сообщения по UUID
      async deleteMessageByUuid(uuid: string): Promise<Message> {
          const response = await $chatapiClient.delete<Message>(`/messages/${uuid}`);
          return response.data;
      },
  
      // Новый метод для отметки сообщения как прочитанное
      async markMessageAsRead(uuid: string): Promise<Message> {
          const response = await $chatapiClient.post<Message>(`/messages/read/${uuid}`);
          return response.data;
      },

      async fetchMessagesByChatUuid(uuid: string, page: number = 0, row: number = 100): Promise<ChatMessage[]> {
        const response = await $chatapiClient.get<ChatMessage[]>(`/chats/dialog/${uuid}`, {
            params: {
                page,
                row
            }
        });
        return response.data;
    }
});
