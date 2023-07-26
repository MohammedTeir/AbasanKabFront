<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';

const ads = ref()
onBeforeMount(async () => {
    try {
        const response = await api.get('/ads')
        ads.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section>

        <Grid :cols="2" :gap="60">
            <template v-for="(n, index) in ads">
                <router-link class="shrink-0 w-full" :to="`/single-news/${n?.id}`">
                    <base-card :imgh="440" :img="n?.image_url">
                        <template #title>
                            {{ n?.title }}
                        </template>
                    </base-card>
                </router-link>
            </template>
        </Grid>

    </base-section>
</template>

<style scoped></style>