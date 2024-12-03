<template>
    <div>
        <Card style="width: 50rem; overflow: hidden">
            <template #title>
                User Data
            </template>
            <template #content>
                <!--  hello, user.
                user data here
                
                COMPONENT:
                    show upcoming event/prompt user to create

                COMPONENT:
                    Item gallery.
                -->
                <div v-if="user">{{ user }}</div>
            </template>
        </Card>
        <Divider />
    </div>
</template>

<script setup lang="ts">
const store = useUserStore()
const user = ref(store.user)
console.log('store.user: ', store.user)
</script>

<style scoped>

</style>