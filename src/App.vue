<template> 
    <div class="main-header container">
        <div class="header-container">
            <Header @toggle-view="toggleViewHeidi" horseProfile="Herd member 1"/>
        </div>
        <div class="header-container">
            <Header @toggle-view="toggleViewCandor" horseProfile="Herd member 2"/>
        </div>
        <div class="header-container">
            <Header @toggle-view="toggleViewDelavie" horseProfile="Herd member 3"/>
        </div>
        <div class="header-container" >
            <Header horseProfile="Herd member 4" action="More Info"/>
        </div>

         <div class="header-container" >
            <Header horseProfile="Herd member 5" action="More Info"/>
        </div>
        
        <div v-show="showViewHeidi">
            <Profile horseName="Heidi"/>
        </div>

        <div v-show="showViewCandor">
            <Profile2 horseName="Candor"/>
        </div>

        <div v-show="showViewDelavie">
            <Profile3 horseName="Delavie"/>
        </div>
    </div>

</template>

<script>
import Header from './Header.vue'
import Profile from './Profile.vue'
import Profile2 from './Profile2.vue'
import Profile3 from './Profile3.vue'

export default {
    name: 'App',
    components: {
        Header,
        Profile,
        Profile2,
        Profile3
    },
    data () {
        return {
            showViewHeidi: false,
            showViewCandor: false,
            showViewDelavie: false
        }
    },
    methods:{
        toggleViewHeidi() {
            this.showViewHeidi = !this.showViewHeidi
        },
        toggleViewCandor() {
            this.showViewCandor = !this.showViewCandor
        },
        toggleViewDelavie() {
            this.showViewDelavie = !this.showViewDelavie
        }
    }

}

</script>

<style>
#app {
    margin: auto;
    margin-bottom: 100px;
   
}
.header-container {
    width: auto;
    display: inline-flex;
    margin: 50px;
}
.main-header-container {
    flex: 1;
    min-width: 200px;
}

</style>