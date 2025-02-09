<script lang="ts" setup>

const success = ref<boolean>(false)
const email = ref<string>('')
const pending = ref<boolean>(false)
const toast = useToast()

const supabase = useSupabaseClient()

useRedirectIfAuthenticated()

const handleLogin = async () => {
  pending.value = true
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value, options: {
        emailRedirectTo: 'http://localhost:3000/confirm',
      }
    })
    if (error) {
      toast.add({
        title: 'Error',
        description: "Something went wrong. Please try again.",
        icon: 'i-heroicons-exclamation-circle',
        color: 'red',
        timeout: 5000,
      })
      throw error
    }
    success.value = true
  } catch (error) {
    toast.add({
      title: 'Error',
      description: "Something went wrong. Please try again.",
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
      timeout: 5000,
    })
  } finally {
    pending.value = false
  }
}

useHead({
  title: 'Login',
  meta: [
    {
      name: 'description',
      content: 'Login to your account',
    },
  ],
})
</script>
<template>
  <UCard v-if="!success">
    <template #header>
      <h1>Login</h1>
    </template>

    <form @submit.prevent="handleLogin">
      <UFormGroup class="space-y-2 mb-4" label="Email" name="email" :required="true"
        help="You will receive an email with a confirmation link.">
        <UInput type="email" placeholder="Email" required v-model="email" />
      </UFormGroup>
      <UButton type="submit" variant="solid" color="black" :loading="pending" :disabled="pending">
        Login
      </UButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header>
      <p class="font-bold">Email has been sent</p>
    </template>
    <div class="text-center">
      <p class="mb-4 underline">
        Please check your email for a confirmation link.
      </p>
      <p>
        <strong class="font-bold text-red-500">Important:</strong> The link will expire in 5 hours.
      </p>
    </div>
  </UCard>
</template>