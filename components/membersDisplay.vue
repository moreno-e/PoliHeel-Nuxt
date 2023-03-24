<template>
  <div>
    <div class="grid grid-cols-2">
      <h3 class="col-span-2 text-center ml-80 mr-80 text-3xl bg-carolina-navy w-auto rounded-md text-white">
        U.S. President & Vice President
      </h3>
      <member-card :office-member="props.partialOffices[0]" />
      <member-card :office-member="props.partialOffices[1]" />
      <h3 class="col-span-2 text-center ml-80 mr-80 text-3xl bg-carolina-navy w-auto rounded-md text-white">
        Federal North Carolina State Senators
      </h3>
      <member-card :office-member="props.partialOffices[2]" />
      <member-card :office-member="props.partialOffices[3]" />
      <h3 class="col-span-2 text-center ml-80 mr-80 text-3xl bg-carolina-navy w-auto rounded-md text-white">
        Federal North Carolina Representative
      </h3>
      <member-card class="col-span-2" :office-member="props.partialOffices[4]" />
      <h3 class="col-span-2 text-center ml-80 mr-80 text-3xl bg-carolina-navy w-auto rounded-md text-white">
        North Carolina State Governor
      </h3>
      <member-card class="col-span-2" :office-member="props.partialOffices[5]" />
    </div>
  </div>
</template>

  <script setup>
    const props = defineProps(['partial-offices']);

    console.log('*** props ***'.toUpperCase(), props);
    console.log('*** withing ***'.toUpperCase());
  </script>

  <style  scoped>
  .router-link-exact-active {
      color: white
  }


  </style>

  <style>
  body {
      font-family: 'Oxygen', sans-serif;

  }
  </style>

