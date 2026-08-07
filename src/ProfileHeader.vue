<template>
    <div class="profile-header-container">
        <header v-show="headerview" >
            <h1 id="profile-header">{{ horseProfile }}</h1>
            <button @click="handleClick" >{{ buttonText }}</button>
        </header>
    </div>
    


</template>

<script>

export default {
    name: 'ProfileHeader',
    data() {
        return {
            headerview: true,
            isToggled: false
        }
    },
    computed: {
        buttonText() {
            return this.isToggled ? 'Show' : 'Hide'
    }
    },
    props: {
        horseProfile: String,
    },
    methods: {
        handleClick() {
            this.$emit('toggle-view')
            this.isToggled = !this.isToggled

        },
        
    }
}

</script>

<style>


.profile-header-container {
    text-align: center;
    background-color: white;
    font-family:fantasy;
    color: gray;
    font-size: 20px;
    width: 60%;
    margin: auto;
}

button {
    padding: 5px;
    color: white;
    border: none;
    border-radius: 5px;
    background: darkgray;
    width: 70px;
    margin-left: 10px;
}

button:hover {
    cursor: pointer;
    background-color: white;
    color: black;
}

#profile-header {
    display: inline;
    margin-right: 10px;
}

header {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>