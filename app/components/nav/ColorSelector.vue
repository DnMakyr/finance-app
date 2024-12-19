<template>
  <div>
      <button @click="toggleMode" class="hover:bg-slate-700 dark:hover:bg-slate-300 text-gray-500 rounded-full">{{ nextModeIcon }}</button>
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const modes = [
  'light',
  'dark',
]
const nextModeIcons = {
light: '🌕',
dark: '☀️'
}

const nextMode = computed<string>( () => {
  const currentModeIndex = modes.indexOf(colorMode.preference)
  const nextModeIndex = (currentModeIndex + 1) % modes.length
  return modes[nextModeIndex] || 'light'
})

const nextModeIcon = computed(() => nextModeIcons[nextMode.value as keyof typeof nextModeIcons])

const toggleMode = () => colorMode.preference = nextMode.value

</script>