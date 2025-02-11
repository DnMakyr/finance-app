<script lang="ts" setup>
import { z } from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { toastError, toastSuccess } = useAppToast()
const pending = ref(false)

const state = ref(
  {
    name: user.value?.user_metadata?.full_name || '',
    email: user.value?.email || '',
  }
)

const schema = z.object({
  name: z.string().min(2, 'Name is too short').optional(),
  email: z.string().email('Invalid email address'),
})

const saveProfile = async () => {
  pending.value = true
  try {
    const data: { data: { full_name: any }, email?: string } = {
      data: {
        full_name: state.value.name
      }
    }
    if (state.value.email !== user.value?.email) {
      data.email = state.value.email
    }
    console.log(data)
    const { error } = await supabase.auth.updateUser(data)
    if (error) throw error
    toastSuccess({
      title: 'Profile updated',
      description: 'Your profile has been updated'
    })
  } catch (error: Error | any) {
    toastError({
      title: 'Error updating profile',
      description: error.message
    })
  } finally {
    pending.value = false
  }
}

useHead({
  title: 'Settings | Profile',
  meta: [
    {
      name: 'description',
      content: 'Update your profile information'
    }
  ]
})
</script>

<template>
  <UForm :state="state" :schema="schema" @submit.prevent="saveProfile">
    <UFormGroup class="mb-4" label="Full Name" name="name">
      <UInput v-model="state.name" label="name" />
    </UFormGroup>
    <UFormGroup class="mb-4" label="Email" name="email" help="You will receive a confirmation email on both old and new email addresses if you change the email address.">
      <UInput v-model="state.email" label="Email" />
    </UFormGroup>
    <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending" :disabled="pending"/>
  </UForm>
</template>

<style></style>