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
const evtStore  = useEventStore()

if (user.value) {
  const { data } = await supabase
      .from('users')
      .select()
      .eq('id', user.value.id)
  const foundUser = data ? data[0] : null
  await userStore.setUser(foundUser)
}

const { data: itemData } = await supabase.from('items').select()
await itemStore.setAllItems(itemData)

const { data: evtData } = await supabase.from('events').select()
await evtStore.setAllEvents(evtData)
</script>