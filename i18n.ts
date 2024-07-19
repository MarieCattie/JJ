export default defineI18nConfig(() => ({
  locale: 'ru',
  defaultLocale: 'ru',
  fallbackLocale: 'ru',
  pluralRules: {
    ru: (choice: number, choicesLength: number): number => {
      if (choice === 0) {
        return 0;
      }

      const teen = choice > 10 && choice < 20;
      const endsWithOne = choice % 10 === 1;

      if (choicesLength < 4) {
        return !teen && endsWithOne ? 1 : 2;
      }
      if (!teen && endsWithOne) {
        return 1;
      }
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
        return 2;
      }

      return choicesLength < 4 ? 2 : 3;
    },
  },
  messages: {
    ru: {
      hour: 'до часа | {n} час | {n} часа | {n} часов',
      place: 'нет мест | {n} место | {n} места | {n} мест',
      lesson: 'нет занятий | {n} занятие | {n} занятия | {n} занятий',
      product: 'нет товаров | {n} товар | {n} товара | {n} товаров',
      review: 'нет отзывов | {n} отзыв | {n} отзыва | {n} отзывов',
      person: '0 персон | {n} персону | {n} персоны | {n} персон',
    },
  },
}));
