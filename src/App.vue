<template> 
    <div id="main-container">
        <div>
            <Header/>
        </div>
        <div>
            <NavBar/>
        </div>
        <div v-show="showViewHeidi">
            <Profile horseName="Heidi"/>
        </div>
    </div>

</template>

<script>
import Footer from './Footer.vue'
import ProfileHeader from './ProfileHeader.vue'
import NavBar from './NavBar.vue'
import Profile from './Profile.vue'
import Header from './Header.vue'

export default {
    name: 'App',
    components: {
        Profile,
        NavBar,
        Header
    },
    data () {
        return {
            showViewHeidi: true
        }
    },
    methods:{
        toggleViewHeidi() {
            this.showViewHeidi = !this.showViewHeidi
        }
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


