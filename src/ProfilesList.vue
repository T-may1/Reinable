<template>
    <div class="main-container">
        <h1>Horses</h1>
        <div class="profile-links">
            <ul>
                <li v-for="horse in horses" :key="horse.id">
                    <router-link :to="{ name: 'profile', params: { id: horse.id } }">
                        {{ horse.name }}
                    </router-link>
                </li>
            </ul>
        </div>
        
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue'

const horses = ref([])

onMounted(async () => {
    const res = await fetch('/horses')
    horses.value = await res.json()
})
</script>

<style scoped>

.main-container{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
}

.profile-links li a{
    text-decoration: none;
    font-family:fantasy;
    font-size: 100px;
    color: rgb(93, 138, 83);
    transition: all .3s ease;
}

.profile-links li a:hover{
    color: #ffffff;
}

.profile-links ul{
    list-style: none;
}


</style>