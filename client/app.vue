<template>
    <div id="app">
        <div id="cover"></div>
        <VHeader/>
        <router-link :to="{name: 'app'}">app</router-link>
        <router-link to="/login">login</router-link>
        <transition name="fade">
            <router-view/>
        </transition>
        <Footer/>
    </div>
</template>

<script>
import VHeader from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
    metaInfo: {
        title: 'OldRiver App'
    },
    components: {VHeader, Footer, Todo},
    mounted () {
        console.log(this.$store.state)
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
}
#cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.3);
    opacity .9
    z-index -1
}
#loading{
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(255,255,255,.3)
    z-index 99
    display flex
    align-items center
    justify-content center
}
</style>
