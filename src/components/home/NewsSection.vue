<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';
import SectionsHeader from "./utilities/SectionsHeader.vue"

const news = ref()
onBeforeMount(async () => {
    try {
        const response = await api.get('/news')
        console.log(response.data.data)
        news.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})

</script>

<template>
    <section class="lg:py-[80px] lg:px-[75px] px-3 py-5">
        <SectionsHeader path="/all-news">
            <template #title>
                أخر الأخبار
            </template>
        </SectionsHeader>
        <div class="lg:flex lg:gap-[30px]">
            <div class="grow pb-[100px] hidden lg:block">
                <template v-for="(n, index) in news">
                    <base-card :img="n?.image_url" v-if="index == 0">
                        <template #title>
                            {{ n?.title }}
                        </template>
                        <template #description>
                            {{ n?.content }}
                        </template>
                    </base-card>
                </template>
            </div>
            <div class="lg:w-[570px] overflow-hidden h-max shrink-0">
                <h2 class="bg-green-600 text-white text-right mb-2 px-3 py-4 lg:text-[30px] hidden lg:block">مقالات ذات صلة
                </h2>
                <div class="w-full">
                    <ul class="flex flex-row lg:flex-col gap-3 lg:gap-[40px] overflow-scroll lg:overflow-hidden pb-3">
                        <template v-for="(n, index) in news">
                            <router-link class="shrink-0 w-full" :to="`/single-news/${n?.id}`" :key="n?.id"
                                v-if="index < 2">
                                <base-card :cw="570" :imgh="346" :img="n?.image_url">
                                    <template #title>
                                        {{ n?.title }}
                                    </template>
                                </base-card>
                            </router-link>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>