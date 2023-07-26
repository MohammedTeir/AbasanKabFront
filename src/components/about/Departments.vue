<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';

const departments = ref()

onBeforeMount(async () => {
    try {
        const response = await api.get('/departments')
        console.log(response.data.data)
        departments.value = response.data.data
    } catch (error) {

    }
})

</script>

<template>
    <base-section>
        <div class="w-full h-full">
            <ul class="h-full w-full flex flex-col gap-[40px]">
                <div class="flex items-center gap-[15px]" v-for="d in departments">
                    <div class="w-[24px] h-[24px] bg-green-700"></div>
                    <router-link to="" class="text-[24px] ">{{ d.name }}</router-link>
                </div>
            </ul>
        </div>
    </base-section>
</template>

<style scoped></style>