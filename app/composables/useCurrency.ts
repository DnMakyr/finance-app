export const useCurrency = (amount: number | Ref<number>) => {
    const formattedAmount = computed(() => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(unref(amount)))

    return { currency: formattedAmount }
}
