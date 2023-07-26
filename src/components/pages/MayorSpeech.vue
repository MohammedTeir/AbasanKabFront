<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';
import useFormattedDate from '../composables/formatDate';
const ms = ref()

onBeforeMount(async () => {
    try {
        const response = await api.get('/mayor-speech')
        console.log(response.data.data)
        ms.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section class="py-0 px-0">
        <article class="w-full flex items-start gap-[30px] lg:flex-row flex-col lg:mb-[70px]">
            <img class="block w-[720px] h-[280px] lg:h-[480px]" :src="ms?.mayor_image" alt="">
            <div class="grow text-content px-3 text-start mb-4">
                <h3 class="text-[20px] lg:text-[28px] text-right mb-2 lg:mb-[28px]">{{ ms?.title }}</h3>
                <p>{{ useFormattedDate(ms?.created_at) }}</p>
            </div>
        </article>
        <article class="w-full flex lg:gap-[60px] mb-[70px] px-3 lg:px-0">
            <social-media></social-media>
            <div class="grow">
                <p class="w-full text-start">
                    {{ ms?.content }}
                </p>
            </div>
        </article>
    </base-section>
</template>

<style scoped>
/* img {
    shape-outside: linear-gradient(50deg, rgb(77, 26, 103), transparent 80%, transparent);
    shape-image-threshold: .2;
} */

/* .text-content {
    shape-outside: circle();
} */
</style>