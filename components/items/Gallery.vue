<template>
    <div>
        <Card class="ma-2">
            <template #title>
                Item Gallery
            </template>
            <template #content>
                <Carousel :value="saleItems" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
                    <template #item="slotProps">
                        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
                            <div class="mb-4">
                                <div class="relative mx-auto">
                                    <img :src="slotProps.data.image_url" :alt="slotProps.data.image_name" class="w-48 h-48 rounded" />
                                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" class="absolute" style="left:5px; top: 5px"/>
                                </div>
                            </div>
                            <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
                            <div class="flex justify-between items-center">
                                <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                            </div>
                        </div>
                    </template>
                </Carousel>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
const supabase  = useSupabaseClient()
const userStore = useUserStore()
const itemStore = useItemStore()
const user      = ref(userStore.user)
const saleItems = ref(await itemStore.getUserItems(user.value.id))

const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
const getStatusLabel = (status: any) => {
    switch (status) {
        case 'For Sale':
            return 'secondary';

        case 'On Hold':
            return 'warn';
        
        case 'Not For Sale':
            return 'danger';

        case 'Sold':
            return 'success';

        default:
            return null;
    }
};
</script>
