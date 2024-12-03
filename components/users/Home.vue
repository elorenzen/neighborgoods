<template>
    <div>
        <Card class="ma-2">
            <template #title>
                Welcome, {{
                    (user.first_name && user.last_name) ?
                    `${user.first_name} ${user.last_name}` :
                    'User'
                }}!
            </template>
            <template #content>
                {{ user }}
            </template>
        </Card>
        <Card class="ma-2">
            <template #title>
                Upcoming Sales Events
            </template>
        </Card>
        <Card class="ma-2">
            <template #title>
                Item Gallery
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
const store = useUserStore()
const user = ref(store.user)
console.log('store.user: ', store.user)
</script>

<style scoped>

</style>