<template>
    <div class="nav-container">
       <div class="nav-links">
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Profiles</a></li>
                    <li><a href="">About</a></li>
                </ul>
            </div>
    </div>


</template>

<script>

export default {
    name: 'NavBar',

}

</script>

<style>


.nav-container {
    text-align: center;
    background-color: rgb(32, 32, 32);
    font-family:fantasy;
    color: #ffffff ;
    font-size: 20px;
    box-shadow: 5px 5px 10px 2px rgba(75, 75, 75, 0.3);
    display: flex;
    padding: 10px;

}

.nav-links{
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    margin: auto;
    max-width: 550px;
    
}

.nav-links ul{
    list-style: none;
    display: flex;
    justify-content: space-between;
    color: #000000;
    width: 100%;
}

.nav-links li a{
    color: rgb(93, 138, 83);
    text-decoration: none;
    transition: all .2s ease;
}

.nav-links li a:hover{
    color:rgb(197, 218, 216);

}


</style>