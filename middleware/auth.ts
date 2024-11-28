export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    // if user exists and is signed in, set user data in store
    if (user.value) return
    return await navigateTo('/')
  })
  