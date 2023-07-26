<script setup lang='ts'>
import { defineAsyncComponent, onBeforeMount } from 'vue';
import api from '../components/composables/api';

const Hero = defineAsyncComponent(() => import('../components/home/Hero.vue'));
const NewsSection = defineAsyncComponent(() => import('../components/home/NewsSection.vue'));
const AdsSection = defineAsyncComponent(() => import('../components/home/AdsSection.vue'));
const MapSection = defineAsyncComponent(() => import('../components/home/MapSection.vue'));


onBeforeMount(async () => {
    try {
        const response = await api.get('/municipality-settings');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});


</script>

<template>
    <Hero />
    <NewsSection />
    <AdsSection />
    <!-- <MapSection /> -->
</template>

<style scoped></style>