<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import { userStore } from '../../store/user';
import router from '../../router/router';
import api from '../composables/api';

const user = ref<any>()
const tostMsg = ref<string>()
const toastType = ref<boolean>()
onBeforeMount(async () => {
    user.value = userStore().getUser
})
const services = ref<[]>()
onBeforeMount(async () => {
    const { data } = await api.get(
        '/auth/service-requests',
        {
            headers: {
                Authorization: `Bearer ${userStore().token}`,
                'Content-Type': 'application/json'
            },
        }
    );
    services.value = data.data
});


async function logOut() {
    const user = userStore();

    try {
        await api.post('/auth/logout', null, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        }).then(() => {
            user.$reset()
            router.push('/');
        });

    } catch (error) {
        console.error('Logout error:', error);
    }
}

async function restPassword() {
    try {
        await api.post('/auth/reset-password', null , {
            headers: {
                Authorization: `Bearer ${userStore().token}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            tostMsg.value = response.data.message;
            setTimeout(() => {
                tostMsg.value = ''
            }, 3000)
        })
    } catch (error) {
        console.log(error)
    }
}
const address = ref<string>()
const showAddress = ref<boolean>(false)
async function addAddress() {
    try {
        await api.post('/auth/address', {
            address: address.value
        }, {
            headers: {
                Authorization: `Bearer ${userStore().token}`,
            }
        }).then((response) => {
            if (response.data.status == 200) {
                tostMsg.value = response.data.message
                showAddress.value = false
            } else {

            }
            setTimeout(() => {
                tostMsg.value = ''
            }, 3000)
        })
    } catch (error) {
        console.log(error)
    }
}


const showChangeImg = ref<boolean>(false)
const files = ref<[]>()

function handleFileInputChange(event) {
    files.value = Array.from(event.target.files);
}

async function upImage() {
    const formData = new FormData();

    for (let i = 0; i < files.value?.length; i++) {
        formData.append('avatar', files?.value[i]);
    }
    try {
        await api.post('/auth/update-profile-image', formData, {
            headers: {
                Authorization: `Bearer ${userStore().getToken}`,
            }
        }).then((response) => {
            console.log(response)
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <base-section>
        <article class="flex gap-[70px] mb-[70px]">
            <div class="w-[420px] flex flex-col gap-[35px] lg:ps-[40px]">
                <div class="flex gap-[10px] justify-start mb-3 lg:mb-[50px]">
                    <div class="h-[80px] w-[80px] overflow-hidden rounded-sm shrink relative">
                        <img class="w-full h-full" :src="user?.image_url" alt="">
                        <font-awesome-icon icon="fa-solid fa-camera" @click="showChangeImg = !showChangeImg"
                            class="absolute w-[20px] h-[20px] bottom-0 translate-x-[-10px] bg-black text-white p-1 rounded-full" />
                    </div>
                    <div class="grow text-right">
                        <p class="text-[22px]">{{ user?.name }}</p>
                        <p class="text-[22px] text-[#058041]">رقم الهوية <strong class="underline">:{{ user?.pin }}</strong>
                        </p>
                    </div>
                </div>
                <div>
                    <div class="flex gap-2 items-center cursor-pointer hover:text-[#058041] hover:underline"
                        @click="showAddress = !showAddress">
                        <div class="w-[32px] h-[32px]">
                            <font-awesome-icon icon="fa-solid fa-user" class="h-full w-full font-light text-[#058041]" />
                        </div>
                        <p class="text-[20px]">إضافة عنوان شخصي</p>
                    </div>
                    <div v-if="showAddress">
                        <FormKit type="form" :actions="false">
                            <FormKit type="text" wrapper-class="py-[10px] text-right" inner-class="w-full"
                                input-class="text-[22px] w-full border rounded-lg text-[18px] px-3 py-4 outline-none"
                                validation="required" v-model="address" />
                            <FormKit type="button" wrapper-class="py-[10px]"
                                input-class="w-full text-white border-[3px] border-[#A7A465] rounded-[10px] text-center w-[320px] h-[60px] text-[20px] bg-[#A7A465]"
                                label="حفظ" @click="addAddress()" />
                        </FormKit>
                    </div>
                </div>
                <div class="flex gap-2 items-center cursor-pointer hover:text-[#058041] hover:underline"
                    @click="restPassword()">
                    <div class="w-[32px] h-[32px]">
                        <font-awesome-icon icon="fa-solid fa-fingerprint" class="h-full w-full font-light text-[#058041]" />
                    </div>
                    <p class="text-[20px]">طلب رمز تفعيل جديد /كلمة مرور</p>
                </div>
                <div class="flex gap-2 items-center cursor-pointer hover:text-[#058041] hover:underline" @click="logOut">
                    <div class="w-[32px] h-[32px]">
                        <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"
                            class="h-full w-full font-light text-[#058041]" />
                    </div>
                    <p class="text-[20px]">تسجيل الخروج</p>
                </div>
            </div>
        </article>
        <article>
            <div class="flex lg:flex-row lg:justify-between mb-8 flex-col-reverse">
                <h3 class="text-[26px] mb-4 lg:mb-0">الخدمات المطلوبة من طرفك</h3>
                <router-link to="/services" class="py-[18px] px-[30px] rounded-md text-white bg-[#A7A465] mb-4 lg:mb-0">
                    طلب خدمة جديدة
                </router-link>
            </div>
            <div class="w-full">
                <div class="rounded-lg">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="w-[25%] bg-gray-200 p-1 lg:p-4 rounded-tr-lg rounded-br-lg text-right lg:ps-10">
                                    إسم
                                    الخدمة
                                </th>
                                <th class="w-[25%] bg-gray-200 p-1 lg:p-4">نوع الخدمة</th>
                                <th class="w-[25%] bg-gray-200 p-1 lg:p-4">تاريخ الطلب</th>
                                <th class="w-[25%] bg-gray-200 p-1 lg:p-4 rounded-tl-lg rounded-bl-lg text-left lg:pe-10">
                                    حالة
                                    الطلب</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="serv in services">
                                <tr>
                                    <td class="px-2 py-2 lg:py-4 text-[18px] lg:ps-10 text-right text-[#058041]">{{
                                        serv?.service_id }}</td>
                                    <td class="px-2 py-2 lg:py-4 text-[18px] ">{{ serv?.service_category_id }}</td>
                                    <td class="px-2 py-2 lg:py-4 text-[18px] ">{{ $useFormattedDate(serv?.requested_date) }}
                                    </td>
                                    <td class="px-2 py-2 lg:py-4 text-[18px] lg:pe-10 text-left text-[#058041]">{{
                                        serv?.status }}</td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    </base-section>
    <Teleport to="body">
        <div class="fixed inset-0 flex items-center justify-center" v-if="showChangeImg">
            <div class="bg-white rounded-lg p-6 shadow-xl">
                <div class="w-full flex">
                    <button @click="showChangeImg = !showChangeImg" class="w-[24px] h-[24px] shrink-0">
                        <font-awesome-icon icon="fa-solid fa-xmark" class="w-full h-full" />
                    </button>
                </div>
                <form @submit.prevent="upImage()">
                    <div class="mb-4">
                        <label for="file-input" class="block mb-2">Choose File:</label>
                        <input type="file" id="file-input" class="w-full" v-on:change="handleFileInputChange">
                    </div>
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">حفظ</button>
                </form>
            </div>
        </div>
    </Teleport>
    <toast v-if="tostMsg" :type="toastType">{{ tostMsg }}</toast>
</template>

<style scoped></style>