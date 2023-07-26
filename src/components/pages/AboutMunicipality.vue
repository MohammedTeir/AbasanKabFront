<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';

const about = ref<{}>()
onBeforeMount(async () => {
    try {
        const response = await api.get('/municipality-about')
        about.value = response.data.data
    } catch (error) {

    }
})
</script>

<template>
    <base-section>
        <article class="mb-8">
            <img :src="about?.image_url" alt="" class="w-[720px] h-[480px]">
        </article>
        <article>
            <p class="text-right leading-10 text-[18px]">{{ about?.content }}</p>
        </article>
    </base-section>
</template>

<style scoped></style>