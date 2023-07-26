<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';

const members = ref<[]>()

onBeforeMount(async () => {
    try {
        const response = await api.get('/council-members')
        console.log(response.data.data)
        members.value = response.data.data
    } catch (error) {

    }
})
</script>

<template>
    <base-section>
        <Grid :cols="4" :gap="30">
            <base-card :imgh="450" v-for="m in  members " :img="m?.image_url" class="bg-transparent">
                <template #float>
                    <h3 class="px-[35px] py-[25px] bg-gray-400 rounded-br-md rounded-bl-md text-white mb-2"><span>{{ m?.name
                    }}</span> <span>{{ m?.position }}</span></h3>
                    <div class="flex items-center justify-between">
                        <p>رقم الجوال: {{ m?.mobile_number }}</p>
                        <a :href="m?.cv_url" class="underline">عرض السيرة الذاتية</a>
                    </div>
                </template>
            </base-card>
        </Grid>
    </base-section>
</template>

<style scoped>
:deep(.card) {
    box-shadow: none;
}
</style>