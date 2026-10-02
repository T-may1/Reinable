<template>
    <div class="main-container">
        <div class="heading">
            <h1>Horses</h1>
            <div class="add-new-link">
                <router-link :to="{ name: 'new-profile', params: { id: 'new' } }">Add new Profile
                </router-link>
            </div>
        </div>
        
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const horses = ref([])
let isMounted = false

onMounted(async () => {
    isMounted = true
    const res = await fetch('/horses')
    if (!isMounted) return
    horses.value = await res.json()
})

onBeforeUnmount(() => {
    isMounted = false
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
    transition: all .5s ease;
}

.profile-links li a:hover{
    color: #ffffff;
}

.profile-links ul{
    list-style: none;
}

.heading{
    display:flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 500px;
    justify-content: right;
    margin-top: 70px;
    
}

.add-new-link{
    border: 1px solid #000000;
    margin-left: 50px;
    padding: 8px;
    transition: all .3s ease;
    
}
.add-new-link a{
    text-decoration: none;
    color: #000000;
    font-size: 20px;
}
.add-new-link:hover{
    background-color: rgb(93, 138, 83);
    cursor: pointer;
}

</style>