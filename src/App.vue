<template> 
    <div id="main-container">
       
        <Header/>
        <NavBar/>
        <router-view/>
       
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
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

</style>


