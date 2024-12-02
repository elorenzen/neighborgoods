<template>
    <div class="ma-2">
        <v-row dense class="flex justify-center pa-2 text-xl"><h3>Items to Sell</h3></v-row>

        <DataTable :value="saleItems" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Sale Items</span>
                    <Button
                        outlined
                        severity="secondary"
                        icon="pi pi-plus-circle"
                        @click="addDialog = true"
                    />
                </div>
            </template>
            <Column field="name" header="Name"></Column>
            <Column header="Image">
                <template #body="{ data }">
                    <img :src="data.image_url" :alt="data.image_name" class="w-24 h-24 rounded" />
                </template>
            </Column>
            <Column field="price" header="Price">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="category" header="Category"></Column>
            <!-- <Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
            </Column>
            <Column header="Status">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column> -->
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="openEditDialog(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="promptDeletion(slotProps.data)" />
                </template>
            </Column>
            <!-- <template #footer> Total: {{ saleItems ? saleItems.length : 0 }} items. </template> -->
        </DataTable>

        <!-- ADD ITEM -->
        <Dialog v-model:visible="addDialog" modal header="New Menu Item" :style="{ width: '50rem' }">
            <ItemsAdd :id="user.id" @created="itemSuccess" @errored="itemErrored" />
        </Dialog>

        <!-- EDIT ITEM -->
        <Dialog v-model:visible="editDialog" modal header="Edit Item" :style="{ width: '50rem' }">
            <ItemsEdit :item="itemToEdit" @edited="itemSuccess" @errored="itemErrored" />
        </Dialog>

        <DeleteDialog v-if="deleteDialog" :itemType="'Inventory Item'" @deleteConfirm="confirmDelete" @deleteCancel="cancelDelete" />
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
const saleItems    = ref(await itemStore.getUserItems(user.value.id))
const addDialog    = ref(false)
const editDialog   = ref(false)
const itemToEdit   = ref(null)
const itemToDelete = ref(null)
const deleteDialog = ref(false)
const errDialog    = ref(false)
const errMsg       = ref()
const errType      = ref()
const layout       = ref('grid')
const loading      = ref(false)
const snackbar     = ref(false)
const snacktext    = ref('')
const sortKey      = ref();
const sortOrder    = ref();
const sortField    = ref();
const sortOptions  = ref([
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'},
]);

const onSortChange = (event:any) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
const openEditDialog = (item:any) => {
    itemToEdit.value = item
    editDialog.value = true
}
const promptDeletion = (item:any) => {
    itemToDelete.value = item
    deleteDialog.value = true
}
const confirmDelete = async () => {
    const { error: itemErr } = await supabase
        .from('items')
        .delete()
        .eq('id', itemToDelete.value.id)
    const { error: imgErr } = await supabase
        .storage
        .from('inventory_photos')
        .remove([itemToDelete.value.image_name])
    
    if (!itemErr && !imgErr) {
        snackbar.value = true
        snacktext.value = 'Menu item deleted.'

        // const { data: menuData } = await getsaleItems(vendor.value.id)
        // await menuStore.setsaleItems(menuData)

        deleteDialog.value = false
        itemToDelete.value = null
    } else throwErr('Item Deletion', itemErr ? itemErr.message : imgErr?.message)
}
const cancelDelete = () => {
    deleteDialog.value = false
    itemToDelete.value = null
}
const throwErr = (title: any, msg: any) => {
    errType.value = title
    errMsg.value = msg
    errDialog.value = true
}
const itemSuccess = async (str:any) => {
    const { data: itemData } = await supabase
        .from('items')
        .select()
        .eq('creator_id', user.value.id)
    await itemStore.setAllItems(itemData)
    saleItems.value = itemData

    addDialog.value = false
    editDialog.value = false
    snacktext.value = `Item ${str}!`
    snackbar.value = true
}
const itemErrored = (str:any) => {
    errType.value = 'Item Save'
    errMsg.value = str
    errDialog.value = true
}
const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<style scoped>

</style>