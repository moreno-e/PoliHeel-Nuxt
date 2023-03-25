<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-wrap justify-evenly">
    <div
      class="card mb-10 scale-90 transition duration-500 ease-in-out hover:scale-100">
      <!-- eslint-disable-next-line max-len -->
      <img
        class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        :src="props.officeMember.portrait.source"
        alt="" />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ props.officeMember.name }}
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['office-member']);

  console.log('*** props ***'.toUpperCase(), props.officeMember);
</script>

<style scoped>
  h2 {
    font-size: 32px;
  }
</style>
