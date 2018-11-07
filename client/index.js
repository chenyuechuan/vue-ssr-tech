import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'

const router = createRouter()

router.beforeEach((to, from, next) => {
    console.log('beforeEach')
})

router.beforeResolve((to, from, next) => {
    console.log('beforeResolve')
})

router.afterEach((to, from) => {
    console.log('before')
})

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#root')
