import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// import App from './App.vue'
import webRoute from '../router/web/index.js'
// import apiRoute from '../router/api/userRoutes.js'



const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
})

app.use(createPinia())
app.use(vuetify);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

//api
// app.use('/api', apiRoute);

//web
app.use(webRoute);

app.mount('#app')
