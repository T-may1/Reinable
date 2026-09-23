<template>
    <div class="nav-container">
       <div class="nav-links">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/profiles">Horses</router-link></li>
                
            </ul>
        </div>
    </div>


</template>

<script>

export default {
    name: 'NavBar'
}

</script>

<style scoped>

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
    margin: auto;
    max-width: 550px;
    
}

.nav-links ul{
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    margin: 0;
}

.nav-links li a{
    color: rgb(93, 138, 83);
    text-decoration: none;
    transition: all .3s ease;
}

.nav-links li a:hover{
    color:rgb(197, 218, 216);

}

.nav-links li a.router-link-active {
    color: rgb(197, 218, 216);
}



</style>