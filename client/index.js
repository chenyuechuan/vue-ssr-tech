import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.use(Vuex)
Vue.use(Router)

const router = createRouter()
const store = createStore()

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#root')
