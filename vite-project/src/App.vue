<script setup>
import HelloWorld from './components/HelloWorld.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import FetchPokeApi from './components/FetchPokeApi.vue'
import IndexedDBCRUD from './components/IndexedDBCRUD.vue';
import IndexedDBAssignment from './components/IndexedDBAssignment.vue';
</script>

<template>
  <!-- <div>
    <h1>Bubble Tea 3000000</h1>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <ReloadPrompt></ReloadPrompt>
  <FetchPokeApi></FetchPokeApi> -->
  <!-- <IndexedDBCRUD></IndexedDBCRUD> -->
  <IndexedDBAssignment></IndexedDBAssignment>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
