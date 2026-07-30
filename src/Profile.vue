<template>
    <div v-show="!isEditMode">
        <div class="heading-container">
            <h1>{{ horseName }}</h1>
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

    <div v-show="isEditMode">
        <div class="heading-container">
            <h1>{{horseProfile}}</h1>
            <img :src="image">
        </div>
        <div class="info-container">
            <div>
                <span>Name: </span> 
                <input id="input-name" v-model="name" type="text" />
                <hr>
                <span>Role: </span> 
                <input id="input-role" v-model="role" type="text" />
                <hr>
                <span>Schooling: </span> 
                <input id="input-svhooling" v-model="schooling" type="text" />
                <hr>
                <span>Height: </span> 
                <input id="input-height" v-model="height" type="text" />
                <hr>
                <span>Weight: </span> 
                <input id="input-weight" v-model="weight" type="text" />
                <hr>

                <button @click="handleUpdateProfile" id="update-button">Update</button>

            </div>
        </div>
    </div>
    

</template>

<script>
import image from './heidi.jpeg'
export default {
    name: 'Profile',
    data() {
        return{
            image: image,
            name: "",
            role: "",
            schooling:"",
            height: "",
            weight: "",
            isEditMode: false
        }
       
    },
    async created() {
        const profileData = await this.fetchProfileData()
        this.name = profileData.name
        this.role = profileData.role
        this.schooling = profileData.schooling
        this.height = profileData.height
        this.weight = profileData.weight
    },
    methods: {
        handleEditProfile() {
            this.isEditMode = true
            },
        async handleUpdateProfile() {
            const payload = {
                name: this.name,
                role: this.role,
                shcooling: this.schooling,
                height: this.height,
                weight: this.weight
            }
            const resJson = await this.updateProfileData(payload)
            console.log(resJson)
            this.isEditMode = false
        },
        async fetchProfileData() {
            const res = await fetch('get-profile')
            return await res.json()
        },
        async updateProfileData(payload) {
            const res = await fetch('update-profile', {
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
    props: {
        horseName: String
    }
        
    
}

</script>

<style>
img {
    width: 320px;
    height: 270px;
    object-fit: contain;
    display:block;
    margin: auto;
    margin-bottom: 40px;
}

.heading-container {
    margin-bottom: 5px;
    text-align:center;

}
.info-container {
   
    width: 40%;
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
}

b {
    font-family: sans-serif;
    font-size: 15px;
}

span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
}

</style>