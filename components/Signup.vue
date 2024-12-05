<template>
    <div class="flex items-center justify-center p-5">
        <Card style="width: 30rem; overflow: hidden">
            <template #title>
                <div class="flex items-center justify-center">Sign Up</div>
            </template>
            <template #content>
                <Fluid>
                    <div>
                        <div class="col-span-full ma-2">
                            <InputText v-if="!user" placeholder="Email" v-model="email" type="text" class="w-32 sm:w-auto" />
                        </div>
                        <div class="col-span-full ma-2">
                            <Password v-if="!user" placeholder="Password" v-model="password" class="w-32 sm:w-auto" />
                        </div>
                    </div>
                </Fluid>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button
                    @click="addAuthUser"
                    label="Submit"
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
const supabase  = useSupabaseClient()
const user      = useSupabaseUser()

const email     = ref()
const password  = ref()
const loading   = ref(false)

const snackbar  = ref(false)
const snacktext = ref()
const errDialog = ref(false)
const errMsg    = ref()

const addAuthUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    if ( data && !error) {
        // if no user auth error, create new user in db.
         const userObj = {
            id: data.user?.id,
            created_at: new Date(),
            is_admin: true,
            email: email.value,
            available_for_contact: true,
            liked_items: []
         }
        const { error: userErr } = await supabase.from('users').insert(userObj)
        if (!userErr) {
            snackbar.value = true
            snacktext.value = "New user registered! Sign In."

            await navigateTo('/confirmEmail')
        }
    }
    else {
        errMsg.value = error.message
        errDialog.value = true
    }
}
</script>

<style scoped>

</style>