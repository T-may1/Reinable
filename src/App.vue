<template> 
  
    <div>
        <Header horseName="Heidi" action="More Info"/>
    </div>
    <div>
        <Header horseName="Candor" action="More Info"/>
    </div>
     <div>
        <Header horseName="Delavie" action="More Info"/>
    </div>
     <div>
        <Header horseName="Namaqua" action="More Info"/>
    </div>
     
    <div>
        <Profile horseProfile="Herd Memeber 1"/>
    </div>


</template>

<script>
import Header from './Header.vue'
import Profile from './Profile.vue'
import image from './heidi.jpeg'

export default {
    name: 'App',
    components: {
        Header,
        Profile
    },
    methods:{
    }

}

</script>

<style>
#app {
    margin: auto;
    margin-bottom: 100px;
   
}

</style>