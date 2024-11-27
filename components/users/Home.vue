<template>
    <div>
        USERSHOME
        <Divider />
        {{ sessionUser }}
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()
const sessionUser = ref(user)

const seshId = sessionUser.value?.id
const seshEmail = sessionUser.value?.email


</script>

<style scoped>

</style>