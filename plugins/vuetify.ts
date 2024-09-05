// plugins/vuetify.ts
import { createVuetify, IconAliases } from 'vuetify';
import { aliases as mdiAliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Import the CSS for the mdi icons

//Import my custom icons
import work from '@/assets/images/icons/work.svg'; // <- custom icon

const aliases: IconAliases = {
  ...mdiAliases,    // Оставляем стандартные mdi иконки
  work,             // Добавляем свою иконку
};

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#604D9E', /** dark purple */
            secondary: '#865CFF', /** яркий насыщенный фиолетовый */
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#FDFCFF',
            purplefresh: '#AA9FEF',
            purplelight: '##d8d4f1'
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',   // Используем mdi как стандартный набор
      aliases,             // Добавляем объединенные алиасы
      sets: {
        mdi,               // Стандартный набор иконок mdi
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
