<template>
  <div class="container mx-auto max-w-4xl">
    <AppHeader />
    <main class="mt-10">
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
      crossorigin: '',
    }
  ]
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}

body {
  @apply dark:bg-gray-900 bg-white;
}
</style>