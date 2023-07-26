<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';
const content = ref<[]>()
onBeforeMount(async () => {
    try {
        const response = await api.get('/documents/internal-and-external-oversight-documents')
        content.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section>
        <article>
            <h2 class="text-right mb-10 text-[28px]">الرقابة الداخلية والخارجية</h2>
            <Grid :cols="2" :gap="60">
                <div class="flex justify-between items-center" v-for="c in content">
                    <h2 class="text-[22px]">{{ c?.name }}</h2>
                    <a :href="c?.doc_url"
                        class="block px-[58px] py-[12px] border border-[#A7A465] text-[#A7A465] rounded-md text-[16px] hover:bg-[#A7A465] hover:text-white">تحميل
                    </a>
                </div>
            </Grid>
        </article>
    </base-section>
</template>

<style scoped></style>