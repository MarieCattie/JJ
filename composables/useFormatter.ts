// ~/composables/useFormatter.ts

export default function useFormatter() {
    // Функция форматирования даты в формате дд.мм.гггг
    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }
    function formatMessageTime(messageTime: string): string {
        const messageDate = new Date(messageTime);
        const now = new Date();
      
        const isToday =
          messageDate.getDate() === now.getDate() &&
          messageDate.getMonth() === now.getMonth() &&
          messageDate.getFullYear() === now.getFullYear();
      
        const isSameYear = messageDate.getFullYear() === now.getFullYear();
      
        // Если сообщение отправлено сегодня
        if (isToday) {
          return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      
        // Если сообщение отправлено в этом году
        if (isSameYear) {
          return `${messageDate.getDate().toString().padStart(2, '0')}.${(messageDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')} в ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
      
        // Если сообщение отправлено в прошлом году или ранее
        return `${messageDate.getDate().toString().padStart(2, '0')}.${(messageDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}.${messageDate.getFullYear()} в ${messageDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      }

    // Дополнительные функции форматирования могут быть добавлены здесь

    return {
        formatDate, formatMessageTime
    };
}
