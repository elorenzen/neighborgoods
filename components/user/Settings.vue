<template>
    <div>
        <!-- 
            PERSONAL INFO FIELDS -->
        <v-row class="flex items-center justify-center p-5">
            <Card class="ma-2">
                <template #title>Settings</template>
                <template #content>
                    <v-row>
                        <v-col cols="3">
                            <img :src="imageUrl" class="w-full rounded" />
                            <FileUpload
                                class="mt-2"
                                mode="basic"
                                accept="image/*"
                                :maxFileSize="1000000"
                                @upload="updateImage($event, imageName)"
                                :auto="true"
                                chooseLabel="Upload New Image"
                            />
                        </v-col>
                        <v-col>
                            <Fluid>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                    <FloatLabel variant="on">
                                        <InputText id="name" v-model="user.first_name" :fluid="true" />
                                        <label for="name">First Name</label>
                                    </FloatLabel>
                                    </div>
                                    <div>
                                    <FloatLabel variant="on">
                                        <InputText id="name" v-model="user.last_name" :fluid="true" />
                                        <label for="name">Last Name</label>
                                    </FloatLabel>
                                    </div>

                                    <!-- ADDRESS -->
                                    <!-- <div>
                                    <FloatLabel variant="on">
                                        <div class="p-iconfield">
                                        <span class="p-inputicon pi pi-map-marker"></span>
                                        <input
                                            class="p-inputtext p-component p-filled"
                                            id="address"
                                            ref="streetRef"
                                            :placeholder="merchant.formatted_address ? merchant.formatted_address : 'Enter address'"
                                        />
                                        </div>
                                        <label for="phone">Location Address</label>
                                    </FloatLabel>
                                    </div> -->


                                    <!-- PHONE -->
                                    <div>
                                    <FloatLabel variant="on">
                                        <IconField>
                                            <InputIcon class="pi pi-phone" />
                                            <InputText id="phone" v-model="user.phone" placeholder="Phone" />
                                        </IconField>
                                        <label for="phone">Phone</label>
                                    </FloatLabel>
                                    </div>

                                    <!-- EMAIL -->
                                    <div>
                                    <FloatLabel variant="on">
                                        <IconField>
                                            <InputIcon class="pi pi-envelope" />
                                            <InputText id="email" v-model="user.email" placeholder="Email" />
                                        </IconField>
                                        <label for="email">Email</label>
                                    </FloatLabel>
                                    </div>
                                </div>
                            </Fluid>
                        </v-col>
                    </v-row>
                    <v-row class="pa-2">
                        <v-btn @click="submitEdits" block :loading="loading">Submit Edits</v-btn>
                    </v-row>
                </template>
            </Card>
        </v-row>
            <!--

            ITEM SETTINGS
                Address restriction duration
                Address restriction range
                Allow messaging
                Auto-import all items to new event
                Show all items

            
        -->
        <!-- <DeleteDialog v-if="deleteDialog" :itemType="'Inventory Item'" @deleteConfirm="confirmDelete" @deleteCancel="cancelDelete" /> -->
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
import { v4 } from 'uuid'
const supabase  = useSupabaseClient()
const store     = useUserStore()
const user      = ref(store.user)
const loading   = ref(false)
const uploading = ref(false)
const errDialog = ref()
const errType   = ref()
const errMsg    = ref()
const imageUrl  = ref(user.value.image_url ? user.value.image_url : null)
const imageName = ref(user.value.image_name ? user.value.image_name : null)
const snackbar  = ref(false)
const snacktext = ref('')

const updateImage = async (e: any, prevFile: any) => {
    uploading.value = true
    const file = e.files[0]
    const oldFileName = prevFile

    if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${v4()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage.from('user_avatars').upload(filePath, file)

        if (!uploadError) {
            // 1. Upload new file to storage
            const { data } = supabase.storage.from('user_avatars').getPublicUrl(filePath)
            if (data) user.value.image_url = data.publicUrl

            // 2. Replace fields on menu document in Db
            const { error: dbErr } = await supabase
                .from('users')
                .update({
                    updated_at: new Date(),
                    image_url: data.publicUrl,
                    image_name: filePath })
                .eq('id', user.value.id)      
            // 3. Finally, if a previous image exists, delete old file from storage
            if (!dbErr && oldFileName) {
                const { error: storageDeleteErr } = await supabase
                    .storage
                    .from('user_avatars')
                    .remove([oldFileName])      
                if (storageDeleteErr) throwErr('Menu Item Image Upload', storageDeleteErr.message)
            }
            await resetFields('Settings Updated!')
        } else throwErr('Menu Item Image Upload', uploadError.message)
    }
    uploading.value = false
}
const submitEdits = async () => {
    loading.value = true
    const itemObj = {
        updated_at: new Date(),
        first_name: user.value.first_name,
        last_name: user.value.last_name,
        email: user.value.email,
        phone: user.value.phone,
        image_url: imageUrl.value,
        image_name: imageName.value,
    }

    const { error } = await supabase
        .from('users')
        .update(itemObj)
        .eq('id', user.value.id)

    if (!error) {
        snackbar.value = true
        snacktext.value = 'User settings updated!'

        const { data: menuData } = await supabase
            .from('users')
            .select()
            .eq('id', user.value.id)
        await store.setUser(menuData)
    } else throwErr('Menu Item Update(s)', error.message)
    loading.value = false
}
const throwErr = (title: any, msg: any) => {
    errType.value = title
    errMsg.value = msg
    errDialog.value = true
}
const resetFields = async (action:any) => {
    const { data } = await supabase.from('users').select().eq('id', user.value.id)
    const foundUser = data ? data[0] : null
    await store.setUser(foundUser)
    user.value = store.user
    imageUrl.value = user.value.image_url
    imageName.value = user.value.image_name

    snacktext.value = action
    snackbar.value = true
}
</script>

<style scoped>

</style>