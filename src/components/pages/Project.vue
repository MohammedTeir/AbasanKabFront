<script setup lang='ts'>
import { ref, onBeforeMount, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import api from '../composables/api';


const project = ref<{}>()
const relatedProjects = ref<[]>()

onBeforeMount(async () => {
    await nextTick()
})

onBeforeMount(async () => {
    console.log(useRoute().params)
    try {
        const response = await api.get(`/projects/${useRoute().params?.id}`)
        project.value = response.data.data.project;
        relatedProjects.value = response.data.data.related_projects
        console.log(response.data.data)
    } catch (error) {

    }
})
</script>

<template>
    <section class="lg:py-[80px] lg:px-[75px] pb-5">
        <article class="w-full flex items-start gap-[30px] lg:flex-row flex-col lg:mb-[70px]">
            <img class="block w-[720px] h-[380px] lg:h-[480px]" :src="project?.images[0]" alt="">
            <div class="grow text-right">
                <h3 class="text-[18px] lg:text-[33px] mb-[20px] px-2 lg:px-0">{{ project?.title }}</h3>
                <p class="px-2 lg:px-0">{{ $useFormattedDate(project?.created_at) }}</p>
            </div>
        </article>
        <article class="w-full flex gap-0 lg:gap-[60px] mb-[70px] px-2 lg:px-0">
            <social-media />
            <div class="grow">
                <p class="w-full text-start">
                    {{ project?.content }}
                </p>
            </div>
        </article>
        <article class="px-2 lg:px-0">
            <h4 class="text-right mb-4 lg:mb-[70px] text-[18px] lg:text-[30px]">مزيد من المشاريع الحالية</h4>
            <Grid :cols="4" :gapx="30">
                <router-link v-for="n in relatedProjects" :to="`/project/${n?.id}`" :key="n?.id">
                    <base-card :img="n?.image">
                        <template #title>
                            {{ n?.title }}
                        </template>
                        <template #description>
                            {{ $useFormattedDate(project?.created_at) }}
                        </template>
                    </base-card>
                </router-link>
            </Grid>
        </article>
    </section>
</template>

<style scoped></style>