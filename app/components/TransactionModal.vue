<script lang="ts" setup>
import { transactionTypeOptions, categoryOptions } from '~/constants';
import {z} from 'zod';
import type { FormSubmitEvent} from "#ui/types"

const model = defineModel<boolean>()

const form = ref()


const initialState = {
  amount: 0,
  description: undefined,
  type: undefined,
  category: undefined,
  created_at: undefined
}

const state = ref({...initialState})

const defaultSchema = z.object({
  amount: z.number().positive("Amount must greater than 0"),
  description: z.string().optional(),
  created_at: z.string()
})

const incomeSchema = z.object({
  type: z.literal("Income"),
})

const expenseSchema = z.object({
  type: z.literal("Expense"),
  category: z.enum(categoryOptions)
})
const investmentSchema = z.object({
  type: z.literal("Investment"),
})

const savingSchema = z.object({
  type: z.literal("Saving"),
})

const schema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
  defaultSchema,
)

type Schema = z.output<typeof schema>

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  console.log(event)
}
const resetForm = () => {
  Object.assign(state.value, initialState)
}

onMounted(() => {
  const unwatch = watch(model, (value) => {
    if (!value) {
      resetForm()
    }
  })

  onUnmounted(() => {
    unwatch()
  })
})

</script>

<template>
  <div>
    <UModal v-model="model">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          Add Transaction
        </template>
        <div>
          <UForm :state="state" :schema="schema" :ref="form" class="space-y-2" @submit="onSubmit">
            <UFormGroup label="Type" name="type" :required="true">
              <USelectMenu v-model="state.type" :options="transactionTypeOptions" />
            </UFormGroup>

            <UFormGroup label="Amount" name="amount" :required="true">
              <UInput type="number" v-model.number="state.amount" aria-autocomplete="none" autocomplete="false"/>
            </UFormGroup>

            <UFormGroup label="Description" name="description" hint="Optional">
              <UInput type="text" v-model.trim="state.description" placeholder="Description" aria-autocomplete="none" />
            </UFormGroup>

            <UFormGroup label="Category" name="category" hint="Optional" v-if="state.type === 'Expense'">
              <USelectMenu v-model="state.category" :options="categoryOptions" placeholder="Category"/>
            </UFormGroup>

            <UFormGroup label="Date" name="created_at" :required="true">
              <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
            </UFormGroup>
            <UDivider />
            <div class="flex justify-end">
              <UButton color="white" type="submit" label="Save" />
            </div>
          </UForm>
        </div>
      </UCard>
    </UModal>
  </div>
</template>