<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="grid grid-cols-2">
      <!-- eslint-disable-next-line max-len -->
      <h3
        class="col-span-2 ml-80 mr-80 w-auto rounded-md bg-carolina-navy text-center text-3xl text-white">
        U.S. President & Vice President
      </h3>
      <member-card :office-member="props.partialOffices[0]" :index="0" />
      <member-card :office-member="props.partialOffices[1]" :index="1" />
      <!-- eslint-disable-next-line max-len -->
      <h3
        class="col-span-2 ml-80 mr-80 w-auto rounded-md bg-carolina-navy text-center text-3xl text-white">
        Federal North Carolina State Senators
      </h3>
      <member-card :office-member="props.partialOffices[2]" :index="2" />
      <member-card :office-member="props.partialOffices[3]" :index="3" />
      <!-- eslint-disable-next-line max-len -->
      <h3
        class="col-span-2 ml-80 mr-80 w-auto rounded-md bg-carolina-navy text-center text-3xl text-white">
        Federal North Carolina Representative
      </h3>
      <member-card
        class="col-span-2"
        :office-member="props.partialOffices[4]"
        :index="4" />
      <!-- eslint-disable-next-line max-len -->
      <h3
        class="col-span-2 ml-80 mr-80 w-auto rounded-md bg-carolina-navy text-center text-3xl text-white">
        North Carolina State Governor
      </h3>
      <member-card
        class="col-span-2"
        :office-member="props.partialOffices[5]"
        :index="5" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['partial-offices']);
</script>

<style scoped>
  .router-link-exact-active {
    color: white;
  }
</style>

<style>
  body {
    font-family: 'Oxygen', sans-serif;
  }
</style>
