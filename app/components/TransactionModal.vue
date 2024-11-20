<template>
  <div>
    <UModal v-model="model">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          Add Transaction
        </template>
        <div>
          <UForm :state="state" class="space-y-2">
            <UFormGroup label="Type" name="type" :required="true">
              <USelectMenu v-model="state.type" :options="transactionTypeOptions" />
            </UFormGroup>

            <UFormGroup label="Amount" name="amount" :required="true">
              <UInput type="number" v-model.number="state.amount" aria-autocomplete="none" autocomplete="false"/>
            </UFormGroup>

            <UFormGroup label="Description" name="description" hint="Optional">
              <UInput type="text" v-model.trim="state.description" placeholder="Description" aria-autocomplete="none" />
            </UFormGroup>

            <UFormGroup label="Category" name="category" hint="Optional">
              <USelectMenu v-model="state.category" :options="categoryOptions" placeholder="Category"/>
            </UFormGroup>

            <UFormGroup label="Date" name="created_at" :required="true">
              <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
            </UFormGroup>
          </UForm>

        </div>
        <template #footer>
          <div class="space-x-2 flex justify-end">
            <UButton color="white" variant="outline" @click="model = false" label="Cancel" />
            <UButton color="white" @click="" label="Add" />
          </div>
        </template>

      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import { transactionTypeOptions, categoryOptions } from '~/constants';
const model = defineModel<boolean>()

const options = ref()

const state = reactive({
  amount: 0,
  description: undefined,
  type: undefined,
  category: undefined,
  created_at: undefined
})
</script>