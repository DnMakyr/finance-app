<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trend color="white" title="Income" :amount="1000" :lastAmount="900" :loading="false"/>
    <Trend color="white" title="Expenses" :amount="500" :lastAmount="600" :loading="false"/>
    <Trend color="white" title="Profit" :amount="100" :lastAmount="10" :loading="false"/>
    <Trend color="white" title="Revenue" :amount="10000" :lastAmount="9000" :loading="false"/>
  </section>
</template>

<script lang="ts" setup>
import { transactionViewOptions} from '~/constants'
const selectedView = ref(transactionViewOptions[0])
</script>

<style>

</style>