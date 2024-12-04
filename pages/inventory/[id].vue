<template>
    <div>
        <Tabs v-model:value="value">
            <TabList>
                <Tab value="0">Your Items</Tab>
                <Tab value="1">Liked Items</Tab>
                <Tab value="2">All Items</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <ItemsTable />
                </TabPanel>
                <TabPanel value="1">
                    liked items here
                </TabPanel>
                <TabPanel value="2">
                    <ItemsAllTable />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})
const value = ref('0')
</script>

<style scoped>

</style>