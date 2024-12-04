<template>
    <div class="ma-2">
        <DataTable :value="saleItems" tableStyle="width: 100%">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Items Nearby</span>
                </div>
            </template>
            <Column field="name" header="Name" sortable></Column>
            <Column header="Image">
                <template #body="{ data }">
                    <img :src="data.image_url" :alt="data.image_name" class="w-24 h-24 rounded" />
                </template>
            </Column>
            <Column field="price" header="Price" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="description" header="Description" style="max-width: 20rem;"></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column :exportable="false">
                <template #body="slotProps">
                    <Button icon="pi pi-heart" outlined rounded severity="danger" @click="likeItem(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <ErrorDialog v-if="errDialog" :errType="errType" :errMsg="errMsg" @errorClose="errDialog = false" />

        <v-snackbar
          v-model="snackbar"
          timeout="6000"
        >
          {{ snacktext }}

          <template v-slot:actions>
            <v-btn
              color="#000022"
              variant="text"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </div>
</template>

<script setup lang="ts">
const supabase     = useSupabaseClient()
const userStore    = useUserStore()
const itemStore    = useItemStore()
const user         = ref(userStore.user)
const saleItems    = itemStore.getallItems
const errDialog    = ref(false)
const errMsg       = ref()
const errType      = ref()
const loading      = ref(true)
const snackbar     = ref(false)
const snacktext    = ref('')
const coordinates  = ref()

onMounted(async () => {
  const locRes = await getLocationFromUser()
  await userStore.setUserLocation({
    lat: locRes ? locRes.latitude : 34.0549, // Use DTLA lat. as fallback
    lng: locRes ? locRes.longitude : 118.2426 // Use DTLA lat. as fallback
  })

  coordinates.value = userStore.getUserLocation
  console.log('user coordinates: ', coordinates.value)
  loading.value = false
})

const getLocationFromUser = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      }, reject);
    } else {
      reject('Geolocation not supported');
    }
  });
}

const throwErr = (title: any, msg: any) => {
    errType.value = title
    errMsg.value = msg
    errDialog.value = true
}
const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
const likeItem = async (item:any) => {
    console.log('item: ', item)
}
</script>

<style scoped>

</style>