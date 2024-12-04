<template>
    <div>
        <Card style="overflow: hidden;">
            <template #content>
                <v-row>
                    <v-col cols="4">
                        <Avatar v-if="imageUrl == ''" icon="pi pi-image" class="mr-2" size="xlarge" />
                        <img v-else :src="imageUrl" alt="Image" class="w-full rounded" />
                        
                        <FileUpload
                            class="mt-2"
                            mode="basic"
                            accept="image/*"
                            :maxFileSize="1000000"
                            @upload="addImage($event, imageName)"
                            :auto="true"
                            chooseLabel="Upload Image"
                        />
                        <div v-if="uploading" class="card flex justify-center mt-4">
                            <ProgressSpinner class="p-progress-spinner-circle" />
                        </div>
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
                                <AutoComplete
                                    v-model="category"
                                    :suggestions="filteredCats"
                                    placeholder="Item Category"
                                    @complete="search($event)"
                                ></AutoComplete>
                            </div>
                            <div class="my-2">
                                <FloatLabel variant="on">
                                    <Textarea id="desc" v-model="description" rows="5" cols="50" style="resize: none" />
                                    <label for="desc">Description</label>
                                </FloatLabel>
                            </div>
                            <div class="grid grid-cols-2 gap-4 my-2">
                                <FloatLabel variant="on">
                                    <InputNumber v-model="price" inputId="item_price" mode="currency" currency="USD" locale="en-US" />
                                    <label for="item_price">Price</label>
                                </FloatLabel>
                                <FloatLabel variant="on">
                                    <InputNumber v-model="qty" inputId="item_qty" />
                                    <label for="item_qty">Quantity</label>
                                </FloatLabel>
                            </div>
                        </Fluid>
                    </v-col>
                </v-row>
                <v-row class="pa-2">
                    <v-btn @click="addItem" block :loading="loading">Save</v-btn>
                </v-row>
            </template>
        </Card>

        <ErrorDialog v-if="errDialog" :errType="errType" :errMsg="errMsg" @errorClose="errDialog = false" />
    </div>
</template>

<script setup lang="ts">
import { v4 } from 'uuid'
const supabase     = useSupabaseClient()
const props        = defineProps(['id'])
const emit         = defineEmits(['created', 'errored'])
const creatorId    = props.id
const name         = ref()
const description  = ref()
const imageUrl     = ref()
const imageName    = ref()
const price        = ref(0)
const qty          = ref(1)
const category     = ref('')
const errType      = ref()
const errMsg       = ref()
const uploading    = ref(false)
const loading      = ref(false)
const errDialog    = ref(false)
const filteredCats = ref()
const allCats      = ref([
    'Electronics & Media',
    'Toys, Games, Hobbies',
    'Clothing, Shoes, & Accessories',
    'Sports & Outdoors',
    'Collectibles & Art',
    'Cooking & Appliances',
    'Office',
    'Furniture',
    'Books'
])

const addItem = async () => {
    loading.value = true
    const itemObj = {
        id: v4(),
        creator_id: creatorId,
        name: name.value,
        description: description.value,
        category: category.value,
        image_url: imageUrl.value,
        image_name: imageName.value,
        qty: qty.value,
        likes: 0,
        status: 'For Sale',
        created_at: new Date(),
        updated_at: new Date(),
        price: price.value,
    }
    const { error } = await supabase.from('items').insert(itemObj)
    if (!error) emit('created', 'Created')
    else emit('errored', error.message)
    loading.value = false
}
const addImage = async (e: any) => {
    uploading.value = true
    const file = e.files[0]

    if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${v4()}.${fileExt}`
        imageName.value = fileName
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage.from('inventory_photos').upload(filePath, file)

        if (!uploadError) {
            const { data } = supabase.storage.from('inventory_photos').getPublicUrl(filePath)
            if (data) imageUrl.value = data.publicUrl
        } else throwErr('Menu Item Image Upload', uploadError.message)
    }
    uploading.value = false
}
const throwErr = (title: any, msg: any) => {
    errType.value = title
    errMsg.value = msg
    errDialog.value = true
}
const search = (event:any) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredCats.value = [...allCats.value];
        } else {
            filteredCats.value = allCats.value.filter((category) => {
                return category.toLowerCase().includes(event.query.toLowerCase());
            });
        }
    }, 250);
}
</script>

<style scoped>

</style>