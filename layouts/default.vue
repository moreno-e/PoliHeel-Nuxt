<template>
  <div>
    <header class="bg-carolina-blue shadow-sm">
      <nav
        class="container mx-auto flex justify-between p-4 text-carolina-navy">
        <NuxtLink
          to="/"
          class="font-bold">
          PoliHeel
        </NuxtLink>
        <ul class="flex gap-4">
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">
              Contact
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <!-- here is where we want to output page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup></script>

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
