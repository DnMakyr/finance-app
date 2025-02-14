export const useAvatarUrl = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getPublicUrl = (): string | null => {
    if (!user.value?.user_metadata?.avatar_url) {
      return null
    }
    const {data} = supabase.storage.from('avatars').getPublicUrl(user.value?.user_metadata.avatar_url)
    return data.publicUrl
  }

  const url = ref<string | null>(getPublicUrl())

  watch(user, () => url.value = getPublicUrl(), {immediate: true})
  return {url}
}
