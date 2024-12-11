<template>
    <div class="ma-2">
        <DataTable :value="userEvents" tableStyle="width: 100%">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Sale Events</span>
                    <Button
                        outlined
                        severity="secondary"
                        icon="pi pi-plus-circle"
                        @click="addDialog = true"
                    />
                </div>
            </template>
            <Column header="Date">
                <template #body="slotProps">
                    {{ new Date(slotProps.data.start).toLocaleDateString('en-US') }}
                </template>
            </Column>
            <Column header="Time">
                <template #body="slotProps">
                    {{ new Date(slotProps.data.start).toLocaleTimeString('en-US') }} -
                    {{ new Date(slotProps.data.end).toLocaleTimeString('en-US') }}
                </template>
            </Column>
            <Column field="item_categories" header="Item Categories" style="max-width: 16rem;">
                <template #body="slotProps">
                    <Badge class="mx-1" v-for="(i, index) in slotProps.data.item_categories" :key="`${i}-${index}`">{{ i }}</Badge>
                </template>
            </Column>
            <Column field="location_address" header="Location" style="max-width: 16rem;"></Column>
            <Column field="payment_options" header="Payment Options">
                <template #body="slotProps">
                    <Chip class="ma-1" :icon="getIcon(i)" v-for="(i, index) in slotProps.data.payment_options" :key="`${i}-${index}`" />
                </template>
            </Column>
            <Column field="notes" header="Notes" style="max-width: 20rem;"></Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEditDialog(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="promptDeletion(slotProps.data)" />
                </template>
            </Column>
            <template #footer>
                <span class="font-medium text-surface-500 dark:text-surface-400 text-sm" style="color: gray;">
                    {{ userEvents ? userEvents.length : 0 }} sales events.
                </span>
            </template>
        </DataTable>

        <!-- ADD SALE -->
        <Dialog v-model:visible="addDialog" modal header="New Sale" :style="{ width: '50rem' }">
            <SaleAdd :id="user.id" @created="saleSuccess" @errored="saleErrored" />
        </Dialog>

        <!-- EDIT ITEM -->
        <Dialog v-model:visible="editDialog" modal header="Edit Item" :style="{ width: '50rem' }">
            edit dialog
            <!-- <ItemsEdit :item="itemToEdit" @edited="itemSuccess" @errored="itemErrored" /> -->
        </Dialog>

        <DeleteDialog v-if="deleteDialog" :itemType="'Inventory Item'" @deleteConfirm="confirmDelete" @deleteCancel="cancelDelete" />
        <ErrorDialog v-if="errDialog" :errType="'Sale Creation'" :errMsg="errMsg" @errorClose="errDialog = false" />

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
const eventStore   = useEventStore()
const user         = ref(userStore.user)
const userEvents   = ref(await eventStore.getUserEvents(user.value.id))
const addDialog    = ref(false)
const editDialog   = ref(false)
const itemToEdit   = ref(null)
const itemToDelete = ref(null)
const deleteDialog = ref(false)
const errDialog    = ref(false)
const errMsg       = ref()
const layout       = ref('grid')
const loading      = ref(false)
const snackbar     = ref(false)
const snacktext    = ref('')

const openEditDialog = () => {
    editDialog.value = true
}
const promptDeletion = () => {
    console.log('prompt delete!')
}
const getIcon = (str:any) => {
    switch(str) {
        case 'Cash': return 'pi pi-money-bill';
        case 'Credit/Debit': return 'pi pi-credit-card';
        case 'Venmo': return 'pi pi-paypal';
        case 'Apple Pay': return 'pi pi-apple';
    }
}
const saleSuccess = async () => {
    const { data: evtData } = await supabase.from('events').select()
    await eventStore.setAllEvents(evtData)
    userEvents.value = await eventStore.getUserEvents(user.value.id)
    snacktext.value = 'Sales event created!'
    snackbar.value = true
    addDialog.value = false
}
const saleErrored = async (str:any) => {
    errMsg.value = str
    errDialog.value = true
}
</script>

<style scoped>

</style>