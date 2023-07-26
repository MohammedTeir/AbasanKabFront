<script setup lang='ts'>
import { ref, onBeforeMount, watch } from "vue"
import api from "../composables/api";
import { userStore } from "../../store/user";

const departmentID = ref<string>()
const complaintTitle = ref<string>()
const complaintContent = ref<string>()
const toastMsg = ref<string>()
const toastType = ref<boolean>()
const address = ref<string>()
const phoneNum = ref<string>()
const userName = ref<string>()
interface Department {
    label: string;
    value: number;
}

const departments = ref<Department[]>([]);
async function makeComplaint() {
    await api.post('/auth/complaint', {
        department_id: departmentID.value,
        complaint_title: complaintTitle.value,
        complaint_content: complaintContent.value
    }, {
        headers: {
            Authorization: `Bearer ${userStore().token}`,
        }
    }).then((response) => {
        toastMsg.value = response.data.message
        if (response.data.status == 200) {
            toastType.value = true
        } else {
            toastType.value = false
        }
        setTimeout(() => {
            toastMsg.value = ''
        }, 3000)
        console.log(response.data)
    })
}

onBeforeMount(async () => {
    try {
        const response = await api.get('/departments')
        departments.value = response.data.data?.map((item) => ({ label: item.name, value: item.id }))
    } catch (error) {

    }
})
watch(departmentID, (newValue) => {
    console.log((newValue))
})
</script>

<template>
    <base-section>
        <h3 class="lg:mb-[70px] text-[20px] lg:text-[28px] text-right">تقديم طلب شكوى</h3>
        <FormKit type="form" :actions="false" form-class="w-full grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-4">
            <FormKit type="select" wrapper-class="py-2 lg:p-[20px] text-right" inner-class="w-full"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="إسم الدائرة" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]" validation="required"
                :options="departments" v-model="departmentID" />
            <FormKit type="text" wrapper-class="py-2 lg:p-[20px] text-right" inner-class="w-full"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="نوع الخدمة" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]" validation="required"
                v-model="complaintTitle" />
            <FormKit type="text" wrapper-class="py-2 lg:p-[20px] text-right" inner-class="w-full"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="إسم صاحب الشكوى" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]"
                validation="required" v-model="userName" />
            <FormKit type="text" wrapper-class="py-2 lg:p-[20px] text-right" inner-class="w-full"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="رقم الجوال" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]" validation="required"
                v-model="phoneNum" />
            <FormKit type="text" wrapper-class="py-2 lg:p-[20px] text-right" inner-class="w-full"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="العنوان" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]" validation="required"
                v-model="address" />


            <FormKit type="textarea" wrapper-class="py-2 lg:p-[20px] text-right col-span-2" inner-class="w-full" rows="10"
                input-class="lg:text-[22px] w-full border rounded-lg text-[18px] p-2 lg:px-3 lg:py-4 outline-none"
                label="نص الشكوى" label-class="block text-[18px] lg:text-[22px] mb-2 lg:mb-[25px]" validation="required"
                v-model="complaintContent" />

            <FormKit type="button" wrapper-class="p-[20px]"
                input-class="w-full text-white border-[3px] border-[#A7A465] rounded-[10px] text-center w-[320px] h-[60px] text-[20px] bg-[#A7A465]"
                label="تقديم الشكوى" @click="makeComplaint()" />
            <FormKit type="button" wrapper-class="p-[20px]"
                input-class="w-full text-[#A7A465] border-[3px] border-[#A7A465] rounded-[10px] text-center w-[320px] h-[60px] text-[20px] bg-white"
                label="إلغاء الأمر" />
        </FormKit>
    </base-section>
    <toast v-if="toastMsg" :type="toastType">{{ toastMsg }}</toast>
</template>

<style scoped></style>