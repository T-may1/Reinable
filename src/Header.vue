<template>

    <header v-show="headerview" class="name-header-container">
        <h1 class="name-header">{{ horseName }}</h1>
        <button>{{ action }}</button>
    </header>


</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
            headerview: true
        }
    },
    props: {
        horseName: String,
        action: String,
    },
    methods: {

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