<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue';
import api from '../composables/api';


const AuthWrapper = defineAsyncComponent(() => import("./AuthWrapper.vue"))
const emits = defineEmits(['close-forget'])
const responseMsg = ref<string>()
const toastType = ref<boolean>()
const idNum = ref<string>()
const phone = ref<string>()
async function sendMeCode() {
    try {
        const response = await api.post('/reset-password', {
            pin: idNum.value,
            phone: phone.value
        })
        console.log(response.data)
        if (response.data.status == 200) {
            toastType.value = true
            responseMsg.value = response.data.message
        } else {
            toastType.value = false
            responseMsg.value = response.data.message
        }
        setTimeout(() => {
            responseMsg.value = ''
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}


function handelClose(data: Boolean) {
    emits('close-forget', data)
}
</script>

<template>
    <AuthWrapper @close-auth="handelClose">
        <template #title>إستعادة كلمة المرور</template>
        <template #form>
            <FormKit type="form" @submit.prevent() :actions="false"
                form-class="flex flex-col gap-[40px] w-full lg:w-[570px] pb-[40px]">
                <FormKit type="text" wrapper-class="flex p-[20px] border rounded-lg" inner-class="grow w-full"
                    input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="رقم الهوية"
                    label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                    v-model="idNum" />
                <div>
                    <FormKit type="text" wrapper-class="flex p-[20px] border rounded-lg mb-3" inner-class="grow w-full"
                        input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="رقم الهاتف"
                        label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                        v-model="phone" />
                </div>
                <FormKit type="button" label="إستعادة كلمة المرور"
                    input-class="text-[18px] lg:text-[22px] w-full text-white"
                    wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg bg-[#058041]" @click="sendMeCode()" />
            </FormKit>
        </template>
    </AuthWrapper>
    <toast v-if="responseMsg" :type="toastType">{{ responseMsg }}</toast>
</template>

<style scoped></style>