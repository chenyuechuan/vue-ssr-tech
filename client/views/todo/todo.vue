<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么"
            @keyup.enter="addTodo"/>
        <Item
            v-for="todo in filterTodos"
            :todo="todo"
            :key="todo.id"
            @del="deleteTodo"/>
        <Tabs @clearAllCompleted="clearAllCompleted" @toggle="toggleFilter" :todos="todos" :filter="filter"/>
        <router-view></router-view>
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    metaInfo: {
        title: 'OldRiver todo App'
    },
    data () {
        return {
            todos: [
                {
                    id: 0,
                    content: 'this is todo',
                    completed: false
                }
            ],
            filter: 'all'
        }
    },
    components: {Item, Tabs},
    computed: {
        filterTodos () {
            if (this.filter === 'all') {
                return this.todos
            }
            const completed = this.filter === 'completed'
            return this.todos.filter(item => item.completed === completed)
        }
    },
    methods: {
        addTodo (e) {
            if (e.target.value.trim()) {
                this.todos.unshift({
                    id: ++id,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            } else {
                console.log('内容不能为空 !-_-')
            }
        },
        deleteTodo (id) {
            this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
        },
        toggleFilter (state) {
            this.filter = state
        },
        clearAllCompleted () {
            this.todos = this.todos.filter(todo => todo.completed === false)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
    .tab-container
        background-color #fff
        padding 0 15px
</style>
