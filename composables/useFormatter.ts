// ~/composables/useFormatter.ts

export default function useFormatter() {
    // Функция форматирования даты в формате дд.мм.гггг
    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    // Дополнительные функции форматирования могут быть добавлены здесь

    return {
        formatDate,
    };
}
