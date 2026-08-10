<template>
    <div class="header-container">
       <h1 id="header">Welcome to the Ranch</h1>
    </div>


</template>

<script>

export default {
    name: 'Header',

}

</script>

<style>

#header {
    text-align: center;
    margin: 20px;
}

.header-container {
    display: flex;
    justify-content: center;
    text-align: center;
    background-color: white;
    font-family:fantasy;
    color: rgb(20, 20, 20);
    font-size: 20px;
    margin: 0;
    height: 100px;

}


</style>