<template>
    <div>
        <Card>
            <template #title>New Sale Event</template>
            <template #content>
                <Fluid>
                    <div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                            <DatePicker id="new-event-start" v-model="day" fluid />
                            <label for="new-event-start" class="block mb-2"> Day</label>
                            </FloatLabel>
                        </div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                            <DatePicker id="new-event-start" v-model="start" timeOnly fluid hourFormat="12" />
                            <label for="new-event-start" class="block mb-2"> Start Time</label>
                            </FloatLabel>
                        </div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                            <label for="new-event-end" class="block mb-2"> End Time</label>
                            <DatePicker id="new-event-end" v-model="end" timeOnly fluid hourFormat="12" />
                            </FloatLabel>
                        </div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                                <Textarea id="notes" v-model="notes" rows="3" />
                                <label for="notes">Notes for shoppers (e.g. "Ample parking in alleyway.")</label>
                            </FloatLabel>
                        </div>
                    </div>
                </Fluid>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button
                    @click="addEvent"
                    label="Add Event"
                    severity="success"
                    class="w-full"
                    :loading="loading"
                    ></Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">

const day = ref()
const start = ref()
const end = ref()
const notes = ref()
const loading = ref(false)
const categories = ref([
    'Electronics & Media',
    'Toys, Games, Hobbies',
    'Sports & Outdoors',
    'Clothing, Shoes, & Accessories',
    'Sports & Outdoors',
    'Collectibles & Art',
    'Cooking & Appliances',
    'Office',
    'Furniture'
])

const addEvent = () => {
    console.log('adding event!')
}
</script>

<style scoped>

</style>