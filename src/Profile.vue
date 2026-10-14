<template>
    <div class="profile-page">
        <p v-if="!loaded" class="loading">Loading...</p>

         <Transition v-else name="profile-fade" mode="out-in">
            <div v-if="!isEditMode && !isNew" class="profile-container" key="view">
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
                        <button @click="handleDeleteProfile" id="delete-button">Delete</button>
                    </div>
                </div>
            </div>

            <div v-else class="profile-container" key="edit">
                <div class="heading-container">
                    <h1>{{ name || 'New Horse'  }}</h1>
                    <div class="image-wrapper">
                        <Transition name="image-fade" mode="out-in">
                            <img :src="image" :key="image" alt="Profile" />
                        </Transition>
                        <Transition name="image-fade">
                            <div v-if="isUploading" class="upload-overlay">Uploading…</div>
                        </Transition>
                    </div>
                    <input id="upload-input" type="file" accept="image/*" @change="handleFileChange" />
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
                        <button v-if="isNew" @click="handleCreateProfile" id="create-button">Create</button>
                        <button v-else @click="handleUpdateProfile" id="update-button">Update</button>
                        <button v-if="isNew" @click="handleCancel" id="cancel-button">Cancel</button>
                    </div>
                </div>
            </div>
        </Transition>
        

        <ConfirmDialogue
            v-if="showDeleteConfirm"
            title="Delete this horse?"
            message="This cannot be undone."
            @confirm="confirmDelete"
            @cancel="showDeleteConfirm = false"
        />

    </div>
</template>

<script>
import image from './heidi.png'
import { showToast } from './toastStore'
import ConfirmDialogue from './ConfirmDialogue.vue'

export default {
    name: 'Profile',
    props: {
        id: {
            type: String,
            default: null
        }
    },
    components: {
        ConfirmDialogue
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
            isMounted: false,
            showDeleteConfirm: false,
            isUploading: false
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
    computed: {
        isNew() {
            return !this.id
        }
    },
    methods: {
        async loadProfile() {
            if (!this.id) {
                this.loaded = true
                return
            }

            this.loaded = false
            const data = await this.fetchProfileData(this.id)

            if (!this.isMounted) return

            if (data.error) {
                showToast(data.error, 'error')
                this.loaded = true
                return
            }

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

        handleDeleteProfile() {
            this.showDeleteConfirm = true
        },
        
        async handleFileChange(event) {
            
            const file = event.target.files[0]
            if (!file) return
            this.isUploading = true
            const resJson = await this.uploadProfile(file)
            this.isUploading = false

            if (resJson.error) {
                showToast(resJson.error, 'error')
                return
            }

            this.image = resJson.imageUrl
            showToast('Image uploaded — click Save to apply', 'info')
    
        },

        async confirmDelete() {
            this.showDeleteConfirm = false

            const resJson = await this.deleteProfileData(this.id)

            if (resJson.error) {
                showToast(resJson.error, 'error')
                return
            }

            showToast('Profile deleted', 'success')
            this.$router.push('/profiles')
        },

        async handleCreateProfile() {
            const payload = {
                name: this.name,
                role: this.role,
                schooling: this.schooling,
                height: this.height,
                weight: this.weight,
                image: this.image
            }
            const resJson = await this.createNewProfile(payload)
            if (resJson.error) {
                showToast(resJson.error, 'error')
                return
            }
            showToast('Profile created!', 'success')
            this.$router.push({ name: 'profile', params: { id: resJson.id } })
            
        },

        async handleUpdateProfile() {
            const payload = {
                id: this.id,
                name: this.name,
                role: this.role,
                schooling: this.schooling,
                height: this.height,
                weight: this.weight,
                image: this.image
            }
            const resJson = await this.updateProfileData(payload)
            if (resJson.error) {
                showToast(resJson.error, 'error')
                return
            }
            showToast('Profile updated successfully!', 'success')
            
            this.isEditMode = false
        },

        async fetchProfileData(id) {
            try {
                const res = await fetch(`/get-profile?id=${encodeURIComponent(id)}`)
                const data = await res.json()

                if (res.status === 404) {
                    return { error: 'Profile not found' }
                }
                if (!res.ok) {
                    return { error: data.error || `Server error (${res.status})` }
                }
                return data
            } catch (err) {
                console.error('Failed to fetch profile:', err)
                return { error: 'Could not reach server' }
            }
        },

        async updateProfileData(payload) {
            try {
                const res = await fetch('/update-profile', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload) 
                })

                const data = await res.json()

                if (!res.ok) {
                    return { error: data.error || `Server error (${res.status})` }
                }

                return data
            } catch (err) {
                console.log('Failed to update profile', err)
                return { error: 'Could not reach server. Please try again.' }
            }
        },

        async createNewProfile(payload) {
            try {
                const res = await fetch('/new-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                const data = await res.json()

                if (!res.ok) {
                    return { error: data.error || `Server error (${res.status})` }
                }

                return data
            } catch (err) {
                console.log('Failed to create profile', err)
                return { error: 'Could not reach server. Please try again.' }
            }
        },
        async deleteProfileData(id) {
            try {
                const res = await fetch('/delete-profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                })

                const data = await res.json()

                if (!res.ok) {
                    return { error: data.error || `Server error (${res.status})` }
                }

                return data
            } catch (err) {
                console.log('Failed to delete profile', err)
                return { error: 'Could not reach server. Please try again.' }
            }
        },

        async uploadProfile(file) {
            const formData = new FormData()
            formData.append('image', file)

            try {
                const res = await fetch('/upload-image', {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json()
                if (!res.ok) return { error: data.error || `Server error (${res.status})` }
                return data
            } catch (err) {
            console.log('Failed to upload image', err)
            return { error: 'Could not upload image. Please try again.' }
            }
        },

        handleCancel(){
            this.$router.push('/profiles')
        }
        
    }
}
    

</script>

<style scoped>
img {
    max-width: 330px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: auto;
    margin-bottom: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    border: 1px solid white;
}

.image-wrapper:hover img {
    box-shadow: 0 0 0 4px rgba(93, 138, 83, 0.3);
}

.image-wrapper {
    position: relative;
    width: 200px;
    margin: auto;
    margin-bottom: 40px;
}

.image-wrapper img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
}


.image-fade-enter-active {
    transition: opacity 0.3s ease;
}

.image-fade-leave-active {
    transition: opacity 0.2s ease;
}

.image-fade-enter-from,
.image-fade-leave-to {
    opacity: 0;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
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

#upload-input{
    margin-bottom: 20px;
    background-color: transparent;
    box-shadow: none;
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
    margin-right: 10px;
}
#create-button {
    margin-bottom: 20px;
    margin-right: 10px;
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
#delete-button:hover{
    cursor: pointer;
    transition: all .3s ease;
    background-color:#ff0000;
    color: rgb(255, 255, 255);
}

.profile-fade-enter-active {
    transition: opacity 0.3s ease;
}

.profile-fade-leave-active {
    transition: opacity 0.2s ease;
}

.profile-fade-enter-from,
.profile-fade-leave-to {
    opacity: 0;
}


</style>