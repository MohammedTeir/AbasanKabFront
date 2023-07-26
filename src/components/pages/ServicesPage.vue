<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import { userStore } from '../../store/user';
import api from '../composables/api';
import BaseButton from "../ui/buttons/BaseButton.vue"


const departmentsServices = ref<[]>()

onBeforeMount(async () => {
    try {
        const response = await api.get('/service-categories')
        departmentsServices.value = response.data.data
        console.log(departmentsServices.value)
    } catch (error) {
        console.log(error)
    }
})

onBeforeMount(async () => {
    try {
        const response = await api.get('/services/category/1')
        console.log(response)
        // departmentsServices.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})



const depServices = ref<[]>()
const selectedCat = ref()
async function getDepServices(event: any) {
    const id = event.target.value;
    selectedCat.value = event.target.value;
    try {
        const response = await api.get(`services/category/${id}`)
        console.log(response.data.data)
        depServices.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}
const isDropdownOpen = ref(false);
const selectedService = ref(null);

const selectService = (service) => {
    console.log(service)
    selectedService.value = service;
    isDropdownOpen.value = false;
};

const files = ref<[]>()
const toastMsg = ref<string>()
const toastType = ref<boolean>()
function handleFileInputChange(event) {
    files.value = Array.from(event.target.files);
}

async function sendServe() {
    const formData = new FormData();

    // for (let i = 0; i < files.value?.length; i++) {
    //     formData.append('attached_files', files?.value[i]);
    // }
    files.value?.forEach((fileItem) => {
        formData.append("attached_files[]", fileItem);
    })
    console.log(files.value)
    formData.append("service_id", selectedService.value?.id);
    formData.append("service_category_id", selectedCat.value)
    console.log(formData)
    const response = await api.post(`/auth/service-request`, formData, {
        headers: {
            Authorization: `Bearer ${userStore().token}`,
        }
    })
    console.log(response.data)
    if (response.data.status == 200) {
        toastType.value = true
        toastMsg.value = response.data.message
    } else {
        toastType.value = false
        toastMsg.value = response.data.message
    }
    setTimeout(() => {
        toastMsg.value = ''
    }, 3000)
}
</script>

<template>
    <base-section>
        <h2 class="text-[28px] font-bold text-start">تقديم طلب خدمة جديدة</h2>
        <article class="w-full">
            <form action="">
                <div class="grid grid-cols-1 lg:gap-x-10 lg:gap-y-4">

                    <div class="text-start w-full">
                        <label for="dep-name" class="text-[18px] lg:text-[22px] mb-2 block lg:mb-[30px]">إسم الدائرة</label>
                        <select class="px-4 py-3 rounded-xl border w-full" id="dep-name" @change="getDepServices">
                            <option disabled selected>اختر الدائرة</option>
                            <template v-for="dep in departmentsServices">
                                <option :value="dep?.id">{{ dep?.name }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="text-start">
                        <label for="dep-name" class="text-[18px] lg:text-[22px] mb-2 block lg:mb-[30px]">نوع الخدمة</label>
                        <div class="relative" @click="isDropdownOpen = !isDropdownOpen">
                            <input type="text" class="px-4 py-3 rounded-xl border w-full cursor-pointer" id="dep-name"
                                :value="selectedService?.service_name" readonly />
                            <div v-if="isDropdownOpen" class="absolute z-10 mt-1 py-1 w-full bg-white rounded-md shadow-lg">
                                <template v-for="serv in depServices">
                                    <div class="flex flex-col px-4 py-2 cursor-pointer hover:bg-gray-100 border border-gray-600 rounded-md odd:mb-2"
                                        @click="() => { selectService(serv), isDropdownOpen = !isDropdownOpen }">
                                        <p class="font-semibold">اسم الخدمة: {{ serv.service_name }}</p> <!-- Add Arabic title for 'service_name' -->
                                        <p>السعر: {{ serv.price }}</p> <!-- Add Arabic title for 'price' -->
                                        <p>الوقت المطلوب: {{ serv.required_time }}</p> <!-- Add Arabic title for 'required_time' -->
                                        <p>المستندات المطلوبة: {{ serv?.required_documents }}</p> <!-- Add Arabic title for 'required_documents' -->
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-start">
                        <label for="customer-name" class="text-[18px] lg:text-[22px] mb-2 block lg:mb-[30px]">أرفق
                            ملفات</label>
                        <input type="file" id="customer-name" required class="p-2 border rounded-xl w-full text-[18px]"
                            v-on:change="handleFileInputChange" multiple>
                    </div>
                    <div class="flex flex-col items-start">
                        <label for="customer-name" class="text-[18px] lg:text-[22px] mb-2 block lg:mb-[30px]">إسم
                            المستفيد</label>
                        <input type="text" id="customer-name"  required class="p-2 border rounded-xl w-full text-[18px]" readonly v-model="userStore().name">
                    </div>
                    <div class="flex flex-col items-start">
                        <label for="phone" class="text-[18px] lg:text-[22px] mb-2 block lg:mb-[30px]">رقم الجوال</label>
                        <input type="text" id="phone" required class="p-2 border rounded-xl w-full text-[18px]" readonly v-model="userStore().phone">
                    </div>
                   
                    <div class="flex gap-2 lg:gap-x-10 mt-3 lg:mt-0">
                        <base-button @click="sendServe()">طلب الخدمة</base-button>
                        <base-button :fill="false">إلغاء الأمر</base-button>
                    </div>
                </div>

            </form>
        </article>
    </base-section>
    <toast v-if="toastMsg" :type="toastType">{{ toastMsg }}</toast>
</template>

<style scoped></style>