<script setup lang="ts">
  function handleClick (nombre: string) {
    console.log("Bienvenido " + nombre);
  }

  const handleClickDos = () => {
    console.log("Funcion flecha!");
  }

</script>

<template class="container">

  <button v-on:click="handleClick('Lucas')">Funcion convencional</button>
  <br>
  <br>
  <button v-on:click="handleClickDos()">Funcion Flecha</button>
</template>

<style scoped>
.container {
  border: 1px solid red;
}
</style>
