<script setup lang='ts'>
import { defineAsyncComponent, ref } from 'vue';
import api from '../composables/api';
import { userStore } from "../../store/user"
const AuthWrapper = defineAsyncComponent(() => import("./AuthWrapper.vue"))
const ForgetPass = defineAsyncComponent(() => import("./ForgetPass.vue"))

const showRestPass = ref<boolean>(false)
const idNum = ref()
const password = ref()
const showToast = ref<boolean>(false)
const responseMsg = ref<string>()
const toastType = ref<boolean>(true)
const singIn = async () => {

    const response = await api.post('/auth/login', {
        pin: idNum.value,
        password: password.value
    })
    console.log(response.data.status)
    if (response.data.status == 200) {
        toastType.value = true
        showToast.value = true
        responseMsg.value = response.data.message
        setTimeout(() => {
            showToast.value = false
        }, 3000)
        userStore().updateUser(response.data.data?.token, response.data.data?.name, response.data.data?.phone)
        await userStore().fetchUserData()
        setTimeout(() => {
            emits('close-singin', false)
        }, 3000)
    } else if (response.data.status == 400) {
        toastType.value = false
        responseMsg.value = response.data.message
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 3000)
    }
}
    ;
const emits = defineEmits(['close-singin', 'open-singup'])


function handelClose(data: Boolean) {
    emits('close-singin', data)
}
function handelCloseForget(data: boolean) {
    showRestPass.value = data
}
</script>

<template>
    <AuthWrapper @close-auth="handelClose" v-if="!showRestPass">
        <template #title>تسجيل الدخول</template>
        <template #form>
            <FormKit type="form" @submit.prevent() :actions="false"
                form-class="flex flex-col gap-[40px] w-full lg:w-[570px] pb-[40px]">
                <FormKit type="text" wrapper-class="flex p-[20px] border rounded-lg" inner-class="grow w-full"
                    input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="رقم الهوية"
                    label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                    v-model="idNum" />
                <div>
                    <FormKit type="password" wrapper-class="flex p-[20px] border rounded-lg mb-3" inner-class="grow w-full"
                        input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="كلمة المرور"
                        label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                        v-model="password" placeholder="***********************" />
                    <p class="text-[18px] underline underline-offset-1 cursor-pointer"
                        @click="showRestPass = !showRestPass">هل نسيت كلمة
                        المرور؟</p>
                </div>
                <FormKit type="button" label="تسجيل دخول" input-class="text-[18px] lg:text-[22px] w-full text-white"
                    wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg bg-[#058041]" @click="singIn" />
            </FormKit>
        </template>
        <template #cta>
            <p class="mb-3 lg:mb-0">ليس لديك أي حساب لدى البلدية ؟ <span
                    class="text-[#058041] underline underline-offset-1 cursor-pointer"
                    @click="emits('open-singup', true)">إنشاء
                    حساب
                    جديد</span></p>
        </template>
    </AuthWrapper>
    <toast v-if="showToast" :type="toastType">{{ responseMsg }}</toast>
    <ForgetPass v-if="showRestPass" @close-forget="handelCloseForget" />
</template>

<style scoped></style>

