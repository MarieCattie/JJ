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

  //Транслитерация из русских символов в английские, функция переводит русские символы в английские, используется для URL категорий
  function transliterate(text: string): string {
    const translitMap: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
      'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
      'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
      'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'I', 'К': 'K', 'Л': 'L', 'М': 'M',
      'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
      'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
      'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
  
    return text.replace(/[ъь]/g, '').replace(/[А-Яа-яЁё]/g, (char) => translitMap[char] || char);
}

  // Дополнительные функции форматирования могут быть добавлены здесь

  return {
    formatDate, formatMessageTime, transliterate
  };
}
