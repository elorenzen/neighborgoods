<template>
    <div>
        <Card>
            <template #content>
                <Fluid>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <FloatLabel variant="on" class="my-4">
                            <DatePicker id="new-event-start" v-model="date" fluid />
                            <label for="new-event-start" class="block mb-2"> Date</label>
                            </FloatLabel>
                        </div>
                        <div>
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
                          <FloatLabel variant="on">
                            <div class="p-iconfield">
                              <span class="p-inputicon pi pi-map-marker"></span>
                              <input
                                class="p-inputtext p-component p-filled"
                                id="address"
                                ref="streetRef"
                              />
                            </div>
                            <label for="phone">Address</label>
                          </FloatLabel>
                        </div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                                <MultiSelect
                                    id="categories"
                                    v-model="categories"
                                    display="chip"
                                    :options="allCategories"
                                    filter
                                    :maxSelectedLabels="3"
                                />
                                <label for="categories">Item Categories</label>
                            </FloatLabel>
                        </div>
                        <div class="flex-auto">
                            <FloatLabel variant="on" class="my-4">
                                <MultiSelect
                                    id="payment_options"
                                    v-model="payOptions"
                                    display="chip"
                                    :options="allPaymentOptions"
                                    :maxSelectedLabels="3"
                                />
                                <label for="payment_options">Payment Options</label>
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
        <ErrorDialog v-if="errDialog" :errType="'Event Creation'" :errMsg="errMsg" @errorClose="errDialog = false" />
    </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'
import { Loader } from '@googlemaps/js-api-loader'
const supabase  = useSupabaseClient()
const userStore = useUserStore()

const user        = ref(userStore.user)
const loading     = ref(false)
const date        = ref()
const start       = ref()
const end         = ref()
const notes       = ref()
const streetRef   = ref()
const addrComps   = ref()
const address     = ref()
const url         = ref()
const coordinates = ref()
const categories  = ref([])
const payOptions  = ref([])
const snackbar    = ref(false)
const snacktext   = ref()
const errMsg      = ref()
const errDialog   = ref(false)

const allCategories = ref([
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
const allPaymentOptions = ref([
    'Cash',
    'Credit/Debit',
    'Venmo',
    'Apple Pay'
])


onMounted(async () => {
    await sdkInit()
})

const sdkInit = async () => {
  //initialize google sdk
  const config = useRuntimeConfig()
  const loader = new Loader({
    apiKey: config.public.gMapKey,
    version: 'beta',
    libraries: ['places'],
  })
  loader.load().then((google) => {
    const options = {
      componentRestrictions: { country: 'us' },
      fields: ['geometry/location', 'name', 'formatted_address', 'types'],
      strictBounds: false,
    }
    // attaches it to the input field with this ref
    const autocomplete = new google.maps.places.Autocomplete(
      streetRef.value,
      options
    )
    autocomplete.addListener('place_changed', () => {
      const placeResponse = autocomplete.getPlace()
      const lat = placeResponse.geometry.location.lat()
      const lng = placeResponse.geometry.location.lng()

      addrComps.value = placeResponse
        ? placeResponse.address_components
        : ''
      coordinates.value = placeResponse ? { lat: lat, lng: lng } : ''
      address.value = placeResponse
        ? placeResponse.formatted_address
        : ''
      url.value = placeResponse ? placeResponse.url : ''
    })
  })
}


const confirmed = async (str: any) => {
    snacktext.value = str
    snackbar.value = true
    await navigateTo(`/users/${user.value.id}`)
}
const errored = async (str: any) => {
    errMsg.value = str
    errDialog.value = true
}
const addEvent = async () => {
    const startHours = new Date(start.value).getHours()
    const endHours   = new Date(end.value).getHours()
    const day        = date.value
    const eventStart = day.setHours(startHours)
    const eventEnd   = day.setHours(endHours)

    const obj = {
        id: v4(),
        created_at: new Date(),
        start: new Date(eventStart),
        end: new Date(eventEnd),
        location_address: address.value,
        location_coordinates: coordinates.value,
        location_url: url.value,
        status: 'created',
        notes: notes.value,
        item_categories: categories.value,
        associated_users: [user.value.id],
        payment_options: payOptions.value
    }
    console.log('event object: ', obj)
    const { error } = await supabase.from('events').insert(obj)
    if (!error) await confirmed('Sale created!')
    else await errored(error.message)
}
</script>

<style scoped>
</style>