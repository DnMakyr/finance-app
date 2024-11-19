<template>
  <div>
    <div class="font-bold" :class="{}">
      {{ title }}
    </div>
    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <div v-else>{{ currency }}</div>
    </div>
    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon :name="icon" class="w-6 h-6" :class="{'green': trendingUp, 'red': !trendingUp}" />
        <div>{{ percentageTrend }}% vs last period</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: String;
  amount: number;
  lastAmount: number;
  color: String;
  loading: Boolean;
}>();

const trendingUp = computed(() => Number(props.amount) >= Number(props.lastAmount));
const icon = computed(() => trendingUp.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down');
const { currency } = useCurrency(props.amount);

const percentageTrend = computed(() => {
  if (props.amount === 0 || props.lastAmount === 0) return '∞';

  const bigger = Math.max(props.amount, props.lastAmount);
  const smaller = Math.min(props.amount, props.lastAmount);

  const ratio = ((bigger - smaller) / smaller)*100;
  return Math.ceil(ratio);
});
</script>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}

.red {
  @apply text-red-600 dark:text-red-400;
}

.white {
  @apply text-white;
}
</style>
