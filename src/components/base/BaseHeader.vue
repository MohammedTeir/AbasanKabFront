<script setup lang='ts'>
import { ref, defineAsyncComponent } from 'vue';
import { userStore } from '../../store/user';
import AppLogo from '../common/AppLogo.vue';

const SingIn = defineAsyncComponent(() => import("../auth/SingIn.vue"))
const SingUp = defineAsyncComponent(() => import("../auth/SingUp.vue"))

const navLinks = ref<any[]>([
    {
        name: "الرئيسية",
        path: '/',
        icon: 'fa-solid fa-house'
    },
    {
        path: '/services',
        name: "خدمات البلدية",
        icon: 'fa-solid fa-hand-holding-hand'
    },
    {
        path: "/",
        name: "مشاريع البلدية",
        icon: 'fa-solid fa-list',
        dropdown: [
            { name: "مشاريع تم تنفيذها", path: "/projects/completed-projects" },
            { name: "مشاريع حالية", path: "/projects/in-progress-projects" },
            { name: "مشاريع مستقبلية", path: "/projects/future-projects" },
            { name: "مشاريع تحتاج تمويل", path: "/projects/funding-projects" },
        ]
    },
    {
        path: '/',
        name: "عن البلدية",
        icon: 'fa-solid fa-leaf',
        dropdown: [
            { name: "نبذة عن البلدية", path: "/about" },
            { name: "دوائر و أقسام", path: "/departments" },
            { name: "أعضاء المجلس البلدي", path: "/members" },
            { name: "المخطط الهيكلي للبلدية", path: "/organization-chart" },
            { name: "مكتبة الوسائط", path: "/media-albums" },
        ]
    },
    {
        name: "وظائف شاغرة",
        path: '/jobs',
        icon: 'fa-solid fa-briefcase'
    },
    {
        path: '/services-directory',
        name: "دليل خدمات الجمهور",
        icon: 'fa-solid fa-people-group'
    },
    {
        path: '/urban-planning-documents',
        name: "التخطيط العمراني",
        icon: 'fa-solid fa-building'
    }
])

const showSingUP = ref<boolean>(false)
const showSingIn = ref<boolean>(false)
function handelCloseSingUp(data: boolean) {
    showSingUP.value = data
}
function handelOpenSingUp(data: boolean) {
    showSingUP.value = data
    showSingIn.value = !data
}
function handelOpenSingIn(data: boolean) {
    showSingIn.value = data
    showSingUP.value = !data
}
function handelCloseSingIn(data: boolean) {
    showSingIn.value = data
}

const isMobileMenuOpen = ref<boolean>(false)

const openDropdown = ref<string | null>(null);

function toggleDropdown(dropdownName: string) {
    if (openDropdown.value === dropdownName) {
        openDropdown.value = null;
    } else {
        openDropdown.value = dropdownName;
    }
}
</script>

<template>
    <header class="w-full sticky top-0 drop-shadow">
        <div class="top-header px-3 py-3 lg:px-[75px] lg:py-[20px] bg-[#058041] flex items-center justify-between">
            <!-- Mobile menu toggle button -->
            <button class="lg:hidden w-[40px] h-[40px]" @click="isMobileMenuOpen = !isMobileMenuOpen">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <button class="flex gap-2 items-center" @click="showSingIn = !showSingIn" v-if="!userStore().getToken">
                <div class="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]">
                    <font-awesome-icon icon="fa-solid fa-user" class="w-full h-full" />
                </div>
                <p class="text-[20px]">حسابي</p>
            </button>
            <router-link to="/profile" class="flex gap-2 items-center" v-else>
                <div class="w-[30px] h-[30px]">
                    <img :src="userStore()?.user?.image_url" alt="" class="w-full h-full" />
                </div>
                <p class="text-[20px] hidden lg:block">{{ userStore()?.name }}</p>
            </router-link>
            <p>الموقع الرسمي لبلدية عبسان الكبيرة</p>
            <div></div>
        </div>
        <!-- Mobile navigation menu -->
        <nav class="lg:hidden bg-[#058041]" v-show="isMobileMenuOpen">
            <ul class="flex flex-col gap-2 py-4 px-2 space-y-2 ">
                <template v-for="link in navLinks">
                    <li class="relative">
                        <router-link :to="link.path" class="flex items-center gap-3">
                            <div>
                                <font-awesome-icon :icon="link?.icon" />
                            </div>
                            <div class="flex items-center">
                                <p class="text-[18px]">{{ link.name }}</p>
                                <font-awesome-icon icon="fa-solid fa-chevron-down" class="ms-2" v-if="link.dropdown"
                                    @click="toggleDropdown(link.name)" />
                            </div>
                        </router-link>
                        <template v-if="link.dropdown && openDropdown === link.name">
                            <ul class="w-full bg-white" v-show="isMobileMenuOpen">
                                <li v-for="dropdownItem in link.dropdown" :key="dropdownItem.name">
                                    <router-link :to="dropdownItem.path"
                                        class="block px-4 py-2 text-black hover:bg-gray-200 text-right">
                                        {{ dropdownItem.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </template>
                    </li>
                </template>
            </ul>
        </nav>
        <!-- Desktop navigation menu -->
        <nav class="hidden lg:flex justify-between items-center gap-2 py-[27px] px-5 bg-white">
            <AppLogo class="grow-1" />
            <ul class="flex items-center justify-between list-none w-full">
                <template v-for="link in navLinks">
                    <router-link :to="link.path" class="text-[20px] text-black relative group">
                        <div>
                            <font-awesome-icon :icon="link?.icon" />
                        </div>
                        <div class="flex items-center">
                            <p>{{ link.name }}</p>
                            <font-awesome-icon icon="fa-solid fa-chevron-down" class="ms-2" v-if="link.dropdown" />
                        </div>
                        <template v-if="link.dropdown">
                            <div
                                class="absolute top-0 left-0 mt-7 bg-white rounded shadow-lg z-10 whitespace-nowrap text-right opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                                <ul class="py-2">
                                    <li v-for="dropdownItem in link.dropdown" :key="dropdownItem.name">
                                        <router-link :to="dropdownItem.path"
                                            class="block px-4 py-2 text-black hover:bg-gray-200">
                                            {{ dropdownItem.name }}
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </router-link>
                </template>
            </ul>
        </nav>
    </header>
    <SingIn v-if="showSingIn" @close-singin="handelCloseSingIn" @open-singup="handelOpenSingUp" />
    <SingUp v-if="showSingUP" @close-singup="handelCloseSingUp" @open-singin="handelOpenSingIn" />
</template>

<style scoped>
header {
    color: #fff;
    z-index: 900;
}
</style>