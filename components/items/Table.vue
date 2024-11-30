<template>
    <div class="ma-2">
        <v-row dense class="flex justify-center pa-2 text-xl"><h3>Items to Sell</h3></v-row>    
        <DataView :value="saleItems" :sortOrder="sortOrder" :sortField="sortField" >
            <template #header>
                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6 ma-2">
                    <div>
                        <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />     
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                        <Button
                            outlined
                            severity="secondary"
                            icon="pi pi-plus-circle"
                            @click="addDialog = true"
                        />
                    </div>
                </div>
            </template>
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <div class="md:w-40 relative">
                                <img class="block xl:block mx-auto rounded w-full" :src="item.image_url" :alt="item.image_name" />
                                <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                                    <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)"></Tag> -->
                                </div>
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                        <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">{{ item.description }}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="flex flex-col md:items-end gap-8">
                                    <span class="text-xl font-semibold">${{ item.price }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <!-- <Button icon="pi pi-heart" outlined></Button> -->
                                        <!-- <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></Button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>

        <!-- ADD ITEM -->
        <Dialog v-model:visible="addDialog" modal header="New Menu Item" :style="{ width: '50rem' }">
            <ItemsAdd :id="user.id" @created="itemCreated" @errored="itemErrored" />
        </Dialog>

        <!-- EDIT ITEM -->
        <Dialog v-model:visible="editDialog" modal header="Edit Item" :style="{ width: '50rem' }">
            ItemsEdit /> goes here
        </Dialog>

        <DeleteDialog v-if="deleteDialog" :itemType="'menu item'" @deleteConfirm="confirmDelete" @deleteCancel="cancelDelete" />
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
const itemToDelete = ref(null)
const deleteDialog = ref(false)
const errDialog    = ref(false)
const errMsg       = ref()
const errType      = ref()
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
const promptDeletion = (item:any) => {
    itemToDelete.value = item
    deleteDialog.value = true
}
const confirmDelete = async () => {
    const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', itemToDelete.value.id)
    if (!error) {
        snackbar.value = true
        snacktext.value = 'Menu item deleted.'

        // const { data: menuData } = await getsaleItems(vendor.value.id)
        // await menuStore.setsaleItems(menuData)

        deleteDialog.value = false
        itemToDelete.value = null
    } else throwErr('Item Deletion', error.message)
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
const itemCreated = async () => {
    // const { data: itemData } = await supabase.from('items').select()
    // await itemStore.setAllItems(itemData)
    saleItems.value = await itemStore.getUserItems(user.value.id)
    addDialog.value = false
    snacktext.value = 'New item created!'
    snackbar.value = true
}
const itemErrored = (str:any) => {
    errType.value = 'Item Creation'
    errMsg.value = str
    errDialog.value = true
}
</script>

<style scoped>

</style>