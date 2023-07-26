<script setup lang='ts'>
import { ref, onBeforeMount, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import api from '../composables/api';

const route = useRoute()
const projects = ref<[]>()
let project = useRoute().params.slug

onBeforeMount(async () => {
    await nextTick()
})

const getProjects = async () => {
    try {
        const response = await api.get(`/projects/${project}`)
        projects.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}
onBeforeMount(async () => {
    getProjects()
})

watch(
    () => route.params.slug,
    (newParams) => {
        project = newParams
        getProjects()
    }
);
</script>

<template>
    <base-section>
        <Grid :cols="3" :gap="50">
            <template v-for="proj in projects">
                <RouterLink :to="`/project/${proj?.id}`">
                    <base-card :img="proj?.image">
                        <template #title>
                            {{ proj?.title }}
                        </template>
                        <template #description>
                            {{ proj?.content }}
                        </template>
                    </base-card>
                </RouterLink>
            </template>
        </Grid>
    </base-section>
</template>

<style scoped></style>