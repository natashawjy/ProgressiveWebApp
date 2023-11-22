<template>
    <div>
        <h1 id="title">
            {{ title }}
        </h1>
        <ul>
            <li v-for="item in items" :key="item.name">
                {{ item.name }} 
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

// define reactive variables
const title = ref('Fetching Poke Data');
const items = ref([]);

// Define a function to fetch data
const fetchData = async () => {
    try {
        const pokedex = await fetch('https://pokeapi.co/api/v2/pokemon');
        if(pokedex.ok){
            const data = await pokedex.json();
            items.value = data.results;
        } else{
            console.error('Failed to fetch data');
        }
        
    } catch (error){
        console.error('An error occured: ', error);
    }
    
};



// Call fetchData when the component is mounted
onMounted(fetchData);

</script>

<style scoped>
#title{
    color:mediumpurple;
}
</style>