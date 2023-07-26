<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';
import { useRoute } from 'vue-router';
const ad = ref<object>()
onBeforeMount(async () => {
    const id = useRoute().params.id
    try {
        const response = await api.get(`/ads/${id}`)
        ad.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section>
        <article class="w-full flex items-start gap-[30px] lg:flex-row flex-col lg:mb-[70px]">
            <img class="block grow-[3] h-[350px] lg:h-[462px]" :src="ad?.image_url" alt="">
            <div class="grow text-right px-3 lg:px-0">
                <p class="mb-[20px]  text-green-600 font-semibold hidden lg:block">أخر الأخبار</p>
                <h3 class="text-[18px] lg:text-[33px] mb-[20px]">{{ ad?.title }}</h3>
                <p>السبت 24 أكتوبر 2020</p>
            </div>
        </article>
        <article class="w-full flex lg:gap-[60px] lg:mb-[70px] px-3 lg:px-0">
            <social-media />
            <div class="grow">
                <p class="w-full text-start">
                    {{ ad?.content }}
                </p>
            </div>
        </article>
    </base-section>
</template>

<style scoped></style>