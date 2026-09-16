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
    background-color: rgb(147, 158, 143);;
    font-family:fantasy;
    color: #000000;
    font-size: 20px;
    margin: 0;
    height: 100px;

}


</style>