<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';

// interface Job {
//     id?: number,
//     title?: string,
//     content?: string,
//     created_at?: string,
//     updated_at?: string,
//     image_url?: string,
// }

const jobs = ref(); // array that have five objects

onBeforeMount(async () => {
    try {
        const response = await api.get('/vacancies')
        console.log(response.data.data)

        jobs.value = response.data.data
        console.log(jobs.value)
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section>
        <Grid :cols="2" :gapx="30" :gapy="30">
            <router-link v-for="job in jobs" :to="`/single-job/${job?.id}`" :key="job?.id">
                <base-card cdd="row" :img="job?.image_url" :imgw="270" :imgh="180">
                    <template #card-body>
                        <h4 class="lg:mb-[20px] lg:text-[20px] py-4">{{ job?.title }}</h4>
                        <p class="hidden lg:block">السبت 24 أكتوبر 2020</p>
                    </template>
                </base-card>
            </router-link>
        </Grid>
    </base-section>
</template>

<style scoped></style>