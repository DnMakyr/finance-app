import { startOfYear, endOfYear, sub, startOfMonth, endOfMonth, startOfDay, endOfDay } from 'date-fns'

export const useSelectedTimePeriod = (period: Ref<String|undefined, String|undefined>) => {
  const current = computed(() => {
    switch (period.value) {
      case 'Yearly':
        return {
          from: startOfYear(new Date()),
          to: new Date()
        }
      case 'Monthly':
        return {
          from: startOfMonth(new Date()),
          to: new Date()
        }
      case 'Daily':
        return {
          from: startOfDay(new Date()),
          to: new Date()
        }
    }
  })

  const previous = computed(() => {
    switch (period.value) {
      case 'Yearly':
        return {
          from: startOfYear(new Date(sub(new Date(), { years: 1 }))),
          to: endOfYear(new Date(sub(new Date(), { years: 1 })))
        }
      case 'Monthly':
        return {
          from: startOfMonth(new Date(sub(new Date(), { months: 1 }))),
          to: endOfMonth(new Date(sub(new Date(), { months: 1 })))
        }
      case 'Daily':
        return {
          from: startOfDay(new Date(sub(new Date(), { days: 1 }))),
          to: endOfDay(new Date(sub(new Date(), { days: 1 })))

        }
    }
  })

  return { current, previous }
}
