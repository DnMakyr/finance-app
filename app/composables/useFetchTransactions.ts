import type { Transaction } from "~/types/transaction";
export const useFetchTransactions = (period: ComputedRef) => {
  const supabase = useSupabaseClient();
  const transactions = ref<Transaction[]>([]);
  const pending = ref(false);

  let refreshData: Function;
  const income = computed(() => {
    return transactions.value.filter((t) => t.type === "Income");
  });
  const expense = computed(() => {
    return transactions.value.filter((t) => t.type === "Expense");
  });

  const incomeCount = computed(() => {
    return income.value.length;
  });
  const expenseCount = computed(() => {
    return expense.value.length;
  });

  const incomeTotal = computed(() => {
    return income.value.reduce((acc, t) => acc + (t.amount ?? 0), 0);
  });
  const expenseTotal = computed(() => {
    return expense.value.reduce((acc, t) => acc + (t.amount ?? 0), 0);
  });

  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const { data, refresh } = await useAsyncData<Transaction[]>(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
          const { data, error } = await supabase
            .from("transactions")
            .select()
            .gte("created_at", period.value.from.toISOString())
            .lte("created_at", period.value.to.toISOString())
            .order("created_at", { ascending: false });
          if (error) return [];
          transactions.value = data ?? [];
          return data;
        }
      );
      refreshData = refresh;
      return data.value;
    } finally {
      pending.value = false;
    }
  };

  const transactionsGroupedByDate = computed(() => {
    let grouped: { [key: string]: Transaction[] } = {};

    for (const transaction of transactions.value) {
      const date = new Date(transaction.created_at as string)
        .toISOString()
        .split("T")[0] as string;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    }
    return grouped;
  });

  const refresh = async () => {
    if (refreshData) {
      await refreshData();
    } else transactions.value = (await fetchTransactions()) ?? [];
  };

  watch(period, async (previousVal, currentVal) => {
    if (!previousVal || !currentVal) return;

    if (
      previousVal.from.toISOString() !== currentVal.from.toISOString() ||
      previousVal.to.toISOString() !== currentVal.to.toISOString()
    ) {
      await nextTick();
      await refresh();
    }
  });

  return {
    transactions: {
      all: transactions,
      income,
      expense,
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
    },
    pending,
    refresh,
    fetchTransactions,
  };
};
