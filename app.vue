<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const supabase  = useSupabaseClient()
const user      = useSupabaseUser()
const userStore = useUserStore()
const itemStore = useItemStore()

if (user.value) {
  const { data } = await supabase
      .from('users')
      .select()
      .eq('id', user.value.id)
  const foundUser = data ? data[0] : null
  await userStore.fetchUser(foundUser)
}

const { data: itemData } = await supabase.from('items').select()
await itemStore.setAllItems(itemData)
</script>