<template>
    <div class="profile-page">
        <p v-if="!loaded" class="loading">Loading...</p>

        <div v-else-if="!isEditMode" class="profile-container">
            <div class="heading-container">
                <h1>{{ name }}</h1>
                <img :src="image">
            </div>
            <div class="info-container">
                <div>
                    <span>Name: </span> <b>{{ name }}</b>
                    <hr>
                    <span>Role: </span> <b>{{ role }}</b>
                    <hr>
                    <span>Schooling: </span> <b>{{ schooling }}</b>
                    <hr>
                    <span>Height: </span> <b>{{ height }}</b>
                    <hr>
                    <span>Weight: </span> <b>{{ weight }}</b>
                    <hr>
                    <button @click="handleEditProfile" id="edit-button">Edit</button>
                </div>
            </div>
        </div>

        <div v-else class="profile-container">
            <div class="heading-container">
                <h1>{{ name }}</h1>
                <img :src="image">
            </div>
            <div class="info-container">
                <div>
                    <span>Name: </span>
                    <input v-model="name" type="text" />
                    <hr>
                    <span>Role: </span>
                    <input v-model="role" type="text" />
                    <hr>
                    <span>Schooling: </span>
                    <input v-model="schooling" type="text" />
                    <hr>
                    <span>Height: </span>
                    <input v-model="height" type="text" />
                    <hr>
                    <span>Weight: </span>
                    <input v-model="weight" type="text" />
                    <hr>
                    <button @click="handleUpdateProfile" id="update-button">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import image from './heidi.png'

export default {
    name: 'Profile',
    props: {
        id: {
            type: String,
            required: true
        }
    },

    data() {
        return{
            image: image,
            name: "",
            role: "",
            schooling:"",
            height: "",
            weight: "",
            isEditMode: false,
            loaded: false,
            isMounted: false
        }
    },

    mounted() {
    this.isMounted = true
    },
    
    beforeUnmount() {
        this.isMounted = false
    },
    watch: {
        // Re-fetch if the user navigates from /profile/heidi to /profile/shadow
        id: {
            immediate: true,
            handler() {
                this.loadProfile()
            }
        }
    },
    methods: {
        
        async loadProfile() {
            
            if (!this.id) {
                console.warn('Profile loaded without an id — check the route and props')
                this.loaded = true
                return
            }
            this.loaded = false
            const data = await this.fetchProfileData(this.id)
            if (!this.isMounted) return
            this.name = data.name
            this.role = data.role
            this.schooling = data.schooling
            this.height = data.height
            this.weight = data.weight
            this.image = data.image || image
            this.loaded = true
        },

        handleEditProfile() {
            this.isEditMode = true
            },
        async handleUpdateProfile() {
            const payload = {
                id: this.id,
                name: this.name,
                role: this.role,
                schooling: this.schooling,
                height: this.height,
                weight: this.weight
            }
            const resJson = await this.updateProfileData(payload)
            console.log(resJson)
            
            this.isEditMode = false
        },
        async fetchProfileData(id) {
            try {
                const res = await fetch(`/get-profile?id=${encodeURIComponent(id)}`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return await res.json()
            } catch (err) {
                console.error('Failed to fetch profile:', err)
                return { name: '', role: '', schooling: '', height: '', weight: '' }
            }
        },
        async updateProfileData(payload) {
            const res = await fetch('/update-profile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            return await res.json()
        }
        
    },
    
}

</script>

<style scoped>
img {
    max-width: 350px;
    width: 100%;
    object-fit: contain;
    display:block;
    margin: auto;
    margin-bottom: 40px;
}

.profile-container {
    background-color:rgb(123, 155, 116);
    width: 50%;
    margin: auto;
    margin-top: 30px;
    border-radius: 10px;
}

.heading-container {
    margin-bottom: 5px;
    text-align:center;
    width: 70%;
    margin: auto;

}

.heading-container h1{
    padding: 10px
}

.info-container {
   
    width: 70%;
    margin: auto;

}

hr {
    margin: 25px 0px;
    color: rgb(0, 0, 0);
   
}
input {
    width: 50%;
    font-size: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: rgb(245, 243, 243);
    border: none;
    -webkit-box-shadow: 5px 4px 8px -2px rgba(32,36,42,0.36);
    -moz-box-shadow: 5px 4px 8px -2px rgba(32,36,42,0.36);
    box-shadow: 5px 4px 8px -2px rgba(32,36,42,0.36);
}

input:focus{
    outline: none;
}

b {
    font-family: sans-serif;
    font-size: 15px;
}

span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
}

#update-button {
    margin-bottom: 20px;
}
#edit-button {
    margin-bottom: 20px;
}

button{
    background-color:rgb(32, 32, 32);
    color: rgb(93, 138, 83);
    padding: 8px;
    border: none;
    border-radius: 5px;
}

button:hover{
    cursor: pointer;
    transition: all .3s ease;
    background-color:#ffffff;
    color: rgb(32, 32, 32);
}

</style>