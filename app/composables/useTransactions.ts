import type { Transaction } from '~/types/transaction'
export const useTransactions = () => {

  const supabase = useSupabaseClient()
  const transactions = ref<Transaction[]>([])
  const pending = ref(false)

  const income = computed(() => {
    return transactions.value.filter(t => t.type === 'Income')
  })
  const expense = computed(() => {
    return transactions.value.filter(t => t.type === 'Expense')
  })
  
  const incomeCount = computed(() => {
    return income.value.length
  })
  const expenseCount = computed(() => {
    return expense.value.length
  })
  
  const incomeTotal = computed(() => {
    return income.value.reduce((acc, t) => acc + (t.amount ?? 0), 0)
  })
  const expenseTotal = computed(() => {
    return expense.value.reduce((acc, t) => acc + (t.amount ?? 0), 0)
  })

  const fetchTransactions = async () => {
    pending.value = true
    try {
      const { data } = await useAsyncData<Transaction[]>('transactions', async () => {
        const { data, error } = await supabase.from('transactions').select().order('created_at', { ascending: false })
        if (error) return []
        return data
      })
      transactions.value = data.value || []
    }
    finally {
      pending.value = false
    }
  }

  const byDate = computed(() => {
    let grouped: { [key: string]: Transaction[] } = {}
  
    for (const transaction of transactions.value) {
      const date = new Date(transaction.created_at as string).toISOString().split('T')[0] as string
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(transaction)
    }
    return grouped
  })

  const refresh = async () => {
    await fetchTransactions()
  }

  return {
    transactions: {
      income,
      expense,
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal,
      grouped: byDate,
    },
    pending,
    fetchTransactions,
    refresh,
  }
}
