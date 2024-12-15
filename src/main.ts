import '@/styles/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import '@mdi/font/css/materialdesignicons.css' // Importa los iconos de MDI

// Apexcharts
import VueApexCharts from 'vue3-apexcharts'

// Vue Toastification
import Toast, { POSITION } from "vue-toastification";
import type { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, //1000 * 60, // 1 minuto
    },
  },
})

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

// Configuración de opciones de Toast
const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};


app.use(VueQueryPlugin, {
  queryClient,
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueApexCharts)
app.use(Toast, options) // Agrega Toastification aquí
app.mount('#app')


// import '@/styles/global.scss'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// // Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// import App from './App.vue'
// import router from './router'
// import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

// import '@mdi/font/css/materialdesignicons.css'; // Importa los iconos de MDI

// // Apexcharts
// import VueApexCharts from "vue3-apexcharts";

// const app = createApp(App)

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0 //1000 * 60, // 1 minuto
//     }
//   }
// });

// const vuetify = createVuetify({
//   components,
//   directives,
//   icons: {
//     defaultSet: 'mdi',
//   },
// })

// app.use(VueQueryPlugin, {
//   queryClient,
// });

// app.use(createPinia())
// app.use(router)
// app.use(vuetify).mount('#app')
// app.use(VueApexCharts)
