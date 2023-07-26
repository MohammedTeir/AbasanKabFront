<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';
import { useRoute } from 'vue-router';
interface Job {
    id?: number,
    title?: string,
    content?: string,
    created_at?: string,
    updated_at?: string,
    image_url?: string,
}
const job = ref<Job>()
const relatedJobs = ref()
onBeforeMount(async () => {
    try {
        const response = await api.get(`/vacancies/${useRoute().params.id}`)
        console.log(response.data.data)
        job.value = response.data.data.vacancy
        relatedJobs.value = response.data.data.others_vacancies
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section class="px-0 pt-0">
        <article class="w-full flex items-start gap-[30px] lg:flex-row flex-col mb-3 lg:mb-[70px]">
            <img class="block h-[280px] lg:h-[400px] w-full lg:w-[720px]" :src="job?.image_url" alt="">
            <div class="grow text-right px-2">
                <h3 class="text-[20px] lg:text-[28px] mb-[20px]">{{ job?.title }}</h3>
                <p class="hidden lg:block">السبت 24 أكتوبر 2020</p>
            </div>
        </article>
        <div class="w-full bg-[#F5F6FA] p-4 lg:p-[30px] lg:mb-[50px] hidden lg:block">
            <h2 class="text-[18px] lg:text-[24px] text-start">الوصف الوظيفي</h2>
        </div>
        <article class="w-full flex lg:gap-[60px] mb-[70px] px-2">
            <social-media></social-media>
            <div class="grow">
                <p class="w-full text-start">
                    {{ job?.content }}
                </p>
            </div>
        </article>
        <article class="px-2 hidden lg:block">
            <h4 class="text-right mb-4 lg:mb-[70px] text-[20px] lg:text-[30px]">وظائف أخرى</h4>
            <Grid :cols="4" :gap="30">
                <router-link v-for="n in relatedJobs" :to="`/single-news/${n?.id}`" :key="n?.id">
                    <base-card :img="n?.image_url" ch="460px">
                        <template #title>
                            {{ n?.title }}
                        </template>
                        <template #description>
                            السبت 24 أكتوبر 2020
                        </template>
                    </base-card>
                </router-link>
            </Grid>
        </article>
    </base-section>
</template>

<style scoped></style>