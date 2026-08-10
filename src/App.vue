<template> 
    <div id="main-container">
        <div>
            <Header/>
        </div>
        <div>
            <NavBar/>
        </div>
        <div >
            <ProfileHeader @toggle-view="toggleViewHeidi" horseProfile="Herd member 1"/>
        </div>
        <div v-show="showViewHeidi">
            <Profile horseName="Heidi"/>
        </div>
        <div>
            <Footer/>
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
        ProfileHeader,
        Profile,
        NavBar,
        Footer,
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
    background-color: rgb(214, 214, 214);
}


body {
    margin: 0;
}
html {
    margin: 0;
}

h1 {
    margin: 0;
}


</style>


