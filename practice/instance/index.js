import Vue from 'vue'

const app = new Vue({
    // el: '#root',
    template: '<div>{{text}}</div>',
    data: {
        text: 0
    }
})

app.$mount('#root')

setInterval(() => {
    app.text += 1
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
console.log(app.$options)
console.log(app.$root)
console.log(app.$children)
console.log(app.$slots)
console.log(app.$scopedSlots)
console.log(app.$scopedSlots)
console.log(app.$isServer)
app.$watch('text', (newVal, oldVal) => {
    console.log(newVal, oldVal)
})
