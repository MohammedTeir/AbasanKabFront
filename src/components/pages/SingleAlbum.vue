<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import api from '../composables/api';

const media = ref<[]>()
onBeforeMount(async () => {
    console.log(useRoute().params?.id)
    try {
        const response = await api.get(`albums/${useRoute().params?.id}`)
        console.log(response.data.data)
        media.value = response.data.data
    } catch (error) {

    }
})
</script>

<template>
    <base-section>
        <div class="w-full mb-6">
            <h2 class="text-[18px] lg:text-[28px] text-start font-semibold">{{ media?.title }}</h2>
        </div>
        <Grid :cols="3" gap="20">
            <template v-for="img in media?.images_url">
                <base-card :img="img" ch="280px">

                </base-card>
            </template>
        </Grid>
    </base-section>
</template>

<style scoped></style>