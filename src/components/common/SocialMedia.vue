<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';

const { flow = "column" } = defineProps<{
    flow?: string
}>();

const sm = ref()

onBeforeMount(async () => {
    try {
        const response = await api.get('/municipality-settings')
        console.log(response.data.data)
        sm.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div>
        <ul class="sm list-none hidden lg:flex gap-[30px]">
            <a class="w-[55px] h-[55px] rounded-full overflow-hidden " :href="sm?.facebook">
                <img class="w-full h-full" src="../../assets/images/facebook.png" alt="">
            </a>
            <a class="w-[55px] h-[55px] rounded-full overflow-hidden " :href="sm?.instagram">
                <img class="w-full h-full" src="../../assets/images/instagram.png" alt="">
            </a>
            <a class="w-[55px] h-[55px] rounded-full overflow-hidden " :href="sm?.youtube">
                <img class="w-full h-full" src="../../assets/images/youtube.png" alt="">
            </a>
        </ul>
    </div>
</template>

<style scoped>
.sm {
    flex-direction: v-bind(flow);
}
</style>