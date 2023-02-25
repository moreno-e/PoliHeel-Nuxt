<template>
  <div>
    <h1 class="text-center">
      Welcome to PoliHeel
    </h1>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
    const { data } = await useFetch('/api/googlecivic');
</script>

<style scoped>
h1 {
    font-size: 5rem;
    font-weight: 300;
}
</style>
