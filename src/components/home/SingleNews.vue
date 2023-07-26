<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';
import { useRoute } from 'vue-router';



const news = ref()
const relatedNews = ref()
onBeforeMount(async () => {
    try {
        const response = await api.get(`/news/${useRoute().params.id}`)
        news.value = response.data.data.news
        relatedNews.value = response.data.data.related_news
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <section class="pb-7 lg:py-[80px] lg:px-[75px]">
        <article class="w-full flex items-start gap-[30px] lg:flex-row flex-col lg:mb-[70px]">
            <img class="block grow-[3] h-[350px] lg:h-[462px]" :src="news?.image_url" alt="">
            <div class="grow text-right px-3 lg:px-0">
                <p class="mb-[20px]  text-green-600 font-semibold hidden lg:block">أخر الأخبار</p>
                <h3 class="text-[18px] lg:text-[33px] mb-[20px]">{{ news?.title }}</h3>
                <p>السبت 24 أكتوبر 2020</p>
            </div>
        </article>
        <article class="w-full flex lg:gap-[60px] lg:mb-[70px] px-3 lg:px-0">
            <social-media />
            <div class="grow">
                <p class="w-full text-start">
                    {{ news?.content }}
                </p>
            </div>
        </article>
        <article class="hidden lg:block">
            <h4 class="text-right mb-[70px] text-[30px]">أخبار ذات صلة </h4>
            <Grid :cols="4" :gapx="30">
                <router-link v-for="n in relatedNews" :to="`/single-news/${n?.id}`" :key="n?.id">
                    <base-card :img="n?.image_url">
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
    </section>
</template>

<style scoped></style>