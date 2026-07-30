<template>

    <header v-show="headerview" class="name-header-container">
        <h1 class="name-header">{{ horseProfile }}</h1>
        <button @click="handleClick" >{{ buttonText }}</button>
    </header>


</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            headerview: true,
            isToggled: false
        }
    },
    computed: {
        buttonText() {
            return this.isToggled ? 'Hide Info' : 'More Info'
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

.name-header-container {
    text-align: center;
}

.name-header {
    font-family:fantasy;
    color: gray;
    font-size: 30px;
}

button {
    padding: 5px;
    color: white;
    border: none;
    border-radius: 5px;
    background: darkgray;
    display: block;
    margin: auto;
    width: 70px;
}

button:hover {
    cursor: pointer;
    background-color: white;
    color: black;
}

</style>