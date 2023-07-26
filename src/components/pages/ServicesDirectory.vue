<script setup lang='ts'>
import { ref, onBeforeMount } from 'vue';
import api from '../composables/api';
const content = ref<[]>()
onBeforeMount(async () => {
    try {
        const response = await api.get('/documents/public-services-directory-document')
        console.log(response.data.data)
        content.value = response.data.data
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <base-section>
        <article>
            <h2 class="text-right mb-10 text-[28px]">دليل خدمات الجمهور</h2>
            <div>
                <a :href="content?.doc_url" class="text-center underline cursor-pointer">اضغط لتحميل دليل خدمات الجمهور</a>
            </div>
        </article>
    </base-section>
</template>

<style scoped></style>