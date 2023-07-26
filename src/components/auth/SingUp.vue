<script setup lang='ts'>
import { ref, defineAsyncComponent } from "vue"
import api from "../composables/api";
const AuthWrapper = defineAsyncComponent(() => import("./AuthWrapper.vue"))

const emits = defineEmits(['close-singup', 'open-singin'])
const idNum = ref()
const phone = ref<string>()
const activationCode = ref<string>()
const showedForm = ref('f1')
function handelClose(data: Boolean) {
    console.log(data)
    emits('close-singup', data)
}

const toastMsg = ref<string>()
const toastType = ref<boolean>()

async function singUp1() {
    try {
        const response = await api.get(`/users/${idNum.value}/validate`)
        console.log(response.data)
        if (response.data.status == 200) {
            toastType.value = true
            toastMsg.value = response.data.message
            showedForm.value = 'f2'
        } else {
            toastType.value = false
            toastMsg.value = response.data.message
        }
        setTimeout(() => {
            toastMsg.value = ''
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}
async function singUp2() {
    try {
        const response = await api.post('/activation-code', {
            pin: idNum.value,
            phone: phone.value
        })
        console.log(response)
        if (response.data.status == 200) {
            toastType.value = true
            toastMsg.value = response.data.message
            showedForm.value = 'f3'
        } else {
            toastType.value = false
            toastMsg.value = response.data.message
        }
        setTimeout(() => {
            toastMsg.value = ''
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}
async function singUp3() {
    try {
        const response = await api.post('/verify-activation-code', {
            pin: idNum.value,
            activation_code: activationCode.value
        })
        console.log(response.data)
        if (response.data.status == 200) {
            toastType.value = true
            toastMsg.value = response.data.message
            showedForm.value = 'f3'
        } else {
            toastType.value = false
            toastMsg.value = response.data.message
        }
        setTimeout(() => {
            toastMsg.value = ''
        }, 3000)
    } catch (error) {
        console.log(error)
    }
}

async function sendMeCode() {
    try {
        const response = await api.post('/activation-code', {
            pin: idNum.value,
            phone: phone.value
        })
        console.log(response)
    } catch (error) {

    }
}
</script>

<template>
    <AuthWrapper @close-auth="handelClose">
        <template #title>إنشاء حساب جديد</template>
        <template #form>
            <div class="flex mb-[60px] gap-3">
                <p class="p-[5px] lg:p-[30px] text-[16px] lg:text-[20px] cursor-pointer opacity-25 pointer-events-none"
                    :class="{ 'border-b-2 text-[#058041] border-b-[#058041] !opacity-100 pointer-events-auto': showedForm == 'f1' }"
                    @click="showedForm = 'f1'">طلب
                    كلمة المرور</p>
                <p class="p-[5px] lg:p-[30px] text-[16px] lg:text-[20px] cursor-pointer opacity-25 pointer-events-none"
                    :class="{ 'border-b-2 text-[#058041] border-b-[#058041] !opacity-100 pointer-events-auto': showedForm == 'f2' }"
                    @click="showedForm = 'f2'">رمز
                    التفعيل</p>
                <p class="p-[5px] lg:p-[30px] text-[16px] lg:text-[20px] cursor-pointer opacity-25 pointer-events-none"
                    :class="{ 'border-b-2 text-[#058041] border-b-[#058041] !opacity-100 pointer-events-auto': showedForm == 'f3' }"
                    @click="showedForm = 'f3'">
                    تفعيل الإشتراك
                </p>
            </div>
            <FormKit v-if="showedForm == 'f1'" type="form" :actions="false"
                form-class="flex flex-col gap-3 lg:gap-[40px] lg:w-[570px] pb-[40px]">
                <FormKit type="text" wrapper-class="flex p-[20px] border rounded-lg" inner-class="grow w-full"
                    input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="رقم الهوية"
                    label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                    v-model="idNum" />
                <FormKit type="button" label="طلب كلمة المرور" input-class="text-[18px lg:text-[22px] w-full text-white"
                    wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg bg-[#058041]" @click="singUp1()" />
            </FormKit>
            <FormKit v-else-if="showedForm == 'f2'" type="form" :actions="false"
                form-class="flex flex-col gap-[40px] w-full lg:w-[570px] pb-[40px]">
                <div>
                    <p class="mb-[20px] text-[#1C1939]">الرجاء إدخال رقم هاتفك المحمول لإرسال رمز تفعيل الحساب.</p>
                    <FormKit type="text" wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg"
                        inner-class="grow w-full" input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3"
                        label="رقم الهاتف المحمول" label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2"
                        validation="required" v-model="phone" />
                </div>
                <FormKit type="button" label="إرسال رمز التفعيل" input-class="text-[18px] lg:text-[22px] w-full text-white"
                    wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg bg-[#058041]" @click="singUp2()" />
                <div class="border-t-2 pt-[40px] w-full lg:w-[570px] text-center" @click="showedForm = 'f1'">
                    <p class="underline underline-offset-1 cursor-pointer">رجوع للخطوة السابقة</p>
                </div>
            </FormKit>
            <FormKit v-else type="form" :actions="false"
                form-class="flex flex-col gap-[40px] w-full lg:w-[570px] pb-[40px]">
                <div>
                    <p class="mb-[20px] text-[#1C1939]">ادخل زر التفعيل المُرسل على رقم الموبايل {{ phone }}</p>
                    <FormKit type="text" wrapper-class="flex p-[20px] border rounded-lg mb-[20px]" inner-class="grow w-full"
                        input-class="text-[18px] lg:text-[22px] w-full outline-none ps-3" label="أدخِل رمز تفعيل الإشتراك"
                        label-class="text-[18px] lg:text-[22px] shrink-0 pe-[20px] border-l-2" validation="required"
                        v-model="activationCode" />

                    <p>لم تستقبل رمز تفعيل الإشتراك؟<span class="text-[#058041] underline underline-offset-1 cursor-pointer"
                            @click="sendMeCode()"> إعادة الإرسال</span></p>
                </div>
                <FormKit type="button" label="إكمال الإجراء" input-class="text-[18px] lg:text-[22px] w-full text-white"
                    wrapper-class="flex p-[10px] lg:p-[20px] border rounded-lg bg-[#058041]" @click="singUp3()" />
                <div class="border-t-2 pt-[40px] w-full lg:w-[570px] text-center" @click="showedForm = 'f2'">
                    <p class="underline underline-offset-1 cursor-pointer">رجوع للخطوة السابقة</p>
                </div>
            </FormKit>
        </template>
        <template v-if="showedForm == 'f1'" #cta>لديك حساب سابق ؟ <span
                class="text-[#058041] underline underline-offset-1 cursor-pointer "
                @click="emits('open-singin', true)">تسجيل
                الدخول</span></template>
    </AuthWrapper>
    <toast v-if="toastMsg" :type="toastType">{{ toastMsg }}</toast>
</template>

<style scoped></style>