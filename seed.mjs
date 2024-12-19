import { createClient } from "@supabase/supabase-js"
import { faker } from '@faker-js/faker'
import 'dotenv/config'

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY, {
    auth: { persistSession: false }
})

const categories = ['Housing', 'Salary', 'Commission', 'Rent', 'Grocery', 'Transport', 'Entertainment', 'Others']

async function seedTransactions() {
    const { error: deleteError } = await supabase.from('transactions').delete().gte('id', 0)

    if (deleteError) {
        console.error('Errors when deleting transactions', deleteError)
        return
    }

    let transactions = []

    for (let year = new Date().getFullYear(); year > new Date().getFullYear() - 2; year--) {
        for (let i = 0; i < 10; i++) {
            const date = new Date(
                year,
                faker.number.int({ min: 0, max: 11 }),
                faker.number.int({ min: 1, max: 28 })
            )


            let type, category
            const typeBias = Math.random()

            if (typeBias < 0.75) {
                type = 'Expense'
                category = faker.helpers.arrayElement(categories)
            }

            else if (typeBias < 0.9) {
                type = 'Income'
                category = 'Salary'
            }
            else {
                type = faker.helpers.arrayElement(['Saving', 'Investment'])
            }

            let amount

            switch (type) {
                case 'Income':
                    amount = faker.number.int({ min: 2000, max: 5000 })
                    break
                case 'Expense':
                    amount = faker.number.int({ min: 100, max: 1000 })
                    break
                case 'Saving':
                case 'Investment':
                    amount = faker.number.int({ min: 800, max: 9000 })
                    break
                default: amount = 0
            }

            transactions.push({
                amount,
                type,
                description: faker.lorem.sentence(),
                category: type === 'Expense' ? category : null,
                created_at: date,
            })
        }
    }       
       const { error: insertError } = await supabase.from('transactions').upsert(transactions)

    if (insertError) {
        console.error('Errors when inserting transactions', insertError)
        return
    }
    else console.log('Transactions seeded successfully')

}
    seedTransactions().catch(console.error)