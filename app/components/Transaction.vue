<template>
  <div class="grid grid-cols-3 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200">
    <div class="flex items-center justify-between col-span-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center space-x-1">
          <UIcon :name="icon" :class="[iconColor]" />
          <div>{{ props.transaction.description }}</div>
        </div>
      </div>
      <div>
        <UBadge v-if="props.transaction.category" color="white" variant="outline">
          {{ props.transaction.category }}
        </UBadge>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-1">
      <div>
        {{ currency }}
      </div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal" :loading="isLoading" />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Transaction } from '~/types/transaction';

const props = defineProps<{
  transaction: Transaction;
}>()

const emit = defineEmits(['deleted'])

const { currency } = useCurrency(props.transaction.amount ?? 0);

const isIncome = computed(() => props.transaction.type === 'Income')
const icon = computed(() => isIncome.value ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down')
const iconColor = computed(() => isIncome.value ? 'text-green-600' : 'text-red-600')

const supabase = useSupabaseClient()
const isLoading = ref(false)
const { toastError, toastSuccess } = useAppToast()

const deleteTransaction = async () => {
  isLoading.value = true
  try {
    const { error } = await supabase.from('transactions').delete().eq('id', props.transaction.id)
    if (error) throw error
    toastSuccess({
      title: 'Transaction deleted',
    })
    emit('deleted', props.transaction.id)
  }
  catch (error) {
    toastError({
      title: 'Failed to delete transaction',
    })
  }
  finally {
    isLoading.value = false
  }
}

const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('edit')
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => deleteTransaction()
    }
  ]
]
</script>