<template>
  <div>
      <UButton @click="toggleMode" class="text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white" variant="ghost" :icon="nextModeIcon"/>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const modes = [
  'light',
  'dark',
]
const nextModeIcons = {
light: 'i-heroicons-moon',
dark: 'i-heroicons-sun',
}

const nextMode = computed<string>( () => {
  const currentModeIndex = modes.indexOf(colorMode.preference)
  const nextModeIndex = (currentModeIndex + 1) % modes.length
  return modes[nextModeIndex] || 'light'
})

const nextModeIcon = computed(() => nextModeIcons[nextMode.value as keyof typeof nextModeIcons])

const toggleMode = () => colorMode.preference = nextMode.value

</script>