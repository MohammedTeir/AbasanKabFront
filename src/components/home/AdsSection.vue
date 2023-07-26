<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import api from '../composables/api';
import SectionsHeader from "./utilities/SectionsHeader.vue";

const ads = ref()
onBeforeMount(async () => {
    try {
        const response = await api.get('/ads')
        console.log(response.data.data)
        ads.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <section class="lg:py-[80px] lg:px-[75px] px-3 py-5">
        <SectionsHeader path="/all-ads">
            <template #title>إعلانات البلدية</template>
        </SectionsHeader>
        <Grid :cols="3" flow="column" cflow="100%" class="lg:overflow-hidden overflow-scroll lg:gap-[30px]">
            <div v-for="ad in ads" class="px-2 lg:px-0">
                <router-link :to="`/ad/${ad?.id}`">
                    <base-card :cw="570" ch="max-content" :img="ad?.image_url">
                        <template #title>
                            {{ ad?.title }}
                        </template>
                        <template #description>
                            {{ ad?.content }}
                        </template>
                    </base-card>
                </router-link>
            </div>
        </Grid>
    </section>
</template>

<style scoped></style>