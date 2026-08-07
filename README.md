# Reinable

App description

Reinable is a Vue.js app to manage and track and store information on individual horse profiles.


## Developer information

To serve frontend from backend execute :

    npm run start

app runs on port 3000


async created() {
        const profileData = await this.fetchProfileData()
        this.name = profileData.name
        this.role = profileData.role
        this.schooling = profileData.schooling
        this.height = profileData.height
        this.weight = profileData.weight
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