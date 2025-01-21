<script lang="ts" setup>
import type { Transaction } from '~/types/transaction';
import { transactionViewOptions } from '~/constants'
const selectedView = ref(transactionViewOptions[1])

const isOpen = ref(false)

const { current, previous } = useSelectedTimePeriod(selectedView)

const { transactions: {
  incomeCount,
  expenseCount,
  incomeTotal,
  expenseTotal,
  grouped: { byDate } },
  fetchTransactions,
  refresh,
  pending } = useFetchTransactions(current)

const { transactions: {
  incomeTotal: prevIncomeTotal,
  expenseTotal: prevExpenseTotal,
}, refresh: refreshPrevious } = useFetchTransactions(previous)

await refresh()

await refreshPrevious()

await fetchTransactions()


useSeoMeta({
  title: 'Home',
  description: 'This is the home page'
})
</script>

<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trend color="white" title="Income" :amount="incomeTotal" :lastAmount="prevIncomeTotal" :loading="pending" />
    <Trend color="white" title="Expenses" :amount="expenseTotal" :lastAmount="prevExpenseTotal" :loading="pending" />
    <Trend color="white" title="Profit" :amount="0" :lastAmount="0" :loading="pending" />
    <Trend color="white" title="Revenue" :amount="0" :lastAmount="0" :loading="pending" />
  </section>

  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">
        Transactions
      </h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
      </div>
    </div>
    <div>
      <UButton icon="i-heroicons-plus-circle" color="white" variant="outline" @click="isOpen = true" :loading="pending"
        label="Add" />
      <TransactionModal v-model="isOpen" @saved="refresh" />
    </div>
  </section>

  <section v-if="!pending">
    <div v-for="(transactionsOnDay, date) in byDate" :key="date" class="mb-10">
      <DailyTransactionSummary :date="date as string" :transactions="transactionsOnDay" />
      <Transaction v-for="transaction in transactionsOnDay as Transaction[]" :key="transaction.id"
        :transaction="transaction" @deleted="fetchTransactions()" />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>