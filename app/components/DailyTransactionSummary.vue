<template>
  <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
    <div class="flex items-center justify-between">
      {{ formatedDate }}
    </div>
    <div class="flex items-center justify-end mr-10">
      {{ currency }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  date: String;
  transactions: Object[];
}>()
const formatedDate = computed(() => {
  const date = new Date(props.date)
  return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`
})
const sum = computed(() => {
  let sum = 0
  for (const transaction of props.transactions) {
    transaction.type === 'Income' ? sum += transaction.amount : sum -= transaction.amount
  }
  return sum
})
const {currency} = useCurrency(sum)
</script>

<style></style>