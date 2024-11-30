<template>
    <Card style="overflow: hidden;">
        <template #content>
            EDIT ITEM
            {{ item }}
            <!-- <v-row>
                <v-col cols="4">
                    <Avatar v-if="imageUrl == ''" icon="pi pi-image" class="mr-2" size="xlarge" />
                    <img v-else :src="imageUrl" alt="Image" class="w-full rounded" />
                    
                    <FileUpload
                        class="mt-2"
                        mode="basic"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @upload="updateImage($event, imageName)"
                        :auto="true"
                        chooseLabel="Replace Image"
                    />
                </v-col>
                <v-col cols="8">
                    <Fluid>
                        <div class="my-2">
                            <FloatLabel variant="on">
                                <InputText id="item_name" v-model="name" />
                                <label for="item_name">Item Name</label>
                            </FloatLabel>
                        </div>
                        <div class="my-2">
                            <AutoComplete v-model="type" :suggestions="['Appetizer', 'Entree', 'Dessert', 'Side', 'Beverage']" placeholder="Menu Category"></AutoComplete>
                        </div>
                        <div class="my-2">
                            <FloatLabel variant="on">
                                <Textarea id="desc" v-model="description" rows="5" cols="50" style="resize: none" />
                                <label for="desc">Description</label>
                            </FloatLabel>
                        </div>
                        <div class="my-2">
                            <FloatLabel variant="on">
                                <InputNumber v-model="price" inputId="item_price" mode="currency" currency="USD" locale="en-US" />
                                <label for="item_price">Price</label>
                            </FloatLabel>
                        </div>
                        <div class="ma-2">
                            <v-switch density="compact" label="Seasonal/Limited Edition" v-model="special"></v-switch>
                        </div>
                    </Fluid>
                </v-col>
            </v-row>
            <v-row class="pa-2">
                <v-btn @click="submitEdits" block :loading="loading">Submit Edits</v-btn>
            </v-row> -->
        </template>
    </Card>
</template>

<script setup lang="ts">
const props = defineProps(['item'])
const item = ref(props.item)

    // const openEditDialog = (item) => {
    //     itemToEdit.value = item
    //     imageUrl.value = item.image_url
    //     imageName.value = item.image_name
    //     editId.value = item.id
    //     editVendorId.value = item.vendor_id
    //     name.value = item.name
    //     description.value = item.description
    //     type.value = item.type
    //     price.value = item.price
    //     special.value = item.special
    //     editDialog.value = true
    // }
    // const submitEdits = async () => {
    //     const itemObj = {
    //         updated_at: new Date(),
    //         name: name.value,
    //         description: description.value,
    //         price: price.value,
    //         type: type.value, // 'appetizer', 'entree', etc.,
    //         image_url: imageUrl.value,
    //         image_name: imageName.value,
    //         special: special.value // default: FALSE, set to TRUE if item is seasonal/limited edition
    //     }

    //     const { error } = await supabase
    //         .from('menu_items')
    //         .update(itemObj)
    //         .eq('id', editId.value)

    //     if (!error) {
    //         snackbar.value = true
    //         snacktext.value = 'Menu item edited!'

    //         const { data: menuData } = await supabase
    //             .from('menu_items')
    //             .select()
    //             .eq('vendor_id', idParam.value)
    //         await menuStore.setsaleItems(menuData)

    //         // reset fields
    //         editId.value = ''
    //         editVendorId.value = ''
    //         name.value = ''
    //         description.value = ''
    //         type.value = ''
    //         imageUrl.value = ''
    //         imageName.value = ''
    //         price.value = 0
    //         special.value = false

    //         editDialog.value = false
    //     } else throwErr('Menu Item Update(s)', error.message)
    // }

    const updateImage = async (e: any, prevFile: any) => {
    //     const file = e.files[0]
    //     const oldFileName = prevFile

    //     if (file) {
    //         const fileExt = file.name.split('.').pop()
    //         const fileName = `${v4()}.${fileExt}`
    //         const filePath = `${fileName}`

    //         const { error: uploadError } = await supabase.storage.from('menu_images').upload(filePath, file)

    //         if (!uploadError) {
    //             // 1. Upload new file to storage
    //             const { data } = supabase.storage.from('menu_images').getPublicUrl(filePath)
    //             console.log('new url: ', data.publicUrl)
    //             if (data) imageUrl.value = data.publicUrl

    //             // 2. Replace fields on menu document in Db
    //             const { error: dbErr } = await supabase
    //                 .from('menu_items')
    //                 .update({ image_url: data.publicUrl, image_name: filePath })
    //                 .eq('id', editId.value)
                
    //             // 3. Finally, delete old file from storage
    //             if (!dbErr) {
    //                 const { error: storageDeleteErr } = await supabase
    //                     .storage
    //                     .from('menu_images')
    //                     .remove([oldFileName])
                    
    //                 if (storageDeleteErr) throwErr('Menu Item Image Upload', storageDeleteErr.message)
    //             }
    //         } else throwErr('Menu Item Image Upload', uploadError.message)
    //     }
    }
</script>

<style scoped>

</style>