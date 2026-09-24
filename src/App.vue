<template> 
    <div id="main-container">
       
        <Header/>
        <NavBar/>
        <router-view v-slot="{ Component, route }">
            <Transition
                :name="route.meta.transition || 'fade'"
                mode="out-in"
                :duration="{ enter: 300, leave: 250 }">
                <component :is="Component" :key="route.path" />
            </Transition>
        </router-view>
    </div>

</template>

<script>
import Header from './Header.vue'
import NavBar from './NavBar.vue'

export default {
    name: 'App',
    components: {
        Header,
        NavBar
    }

}

</script>

<style>
#main-container {
    background-color:rgb(200, 214, 194);
    margin: 0;
    min-height: 100vh
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.fade-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;      /* 300ms */
}

.fade-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;    /* 250ms */
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

</style>


