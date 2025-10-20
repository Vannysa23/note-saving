<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/NavbarComponent.vue';
import Toast from 'primevue/toast';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
    <Toast />
  </main>
  <footer></footer>
</template>

<style scoped>

.container .card .game-link {
  height: 300px;
}

.game-link .card-img {
  object-fit: fill;
  object-position: center;
}




</style>
