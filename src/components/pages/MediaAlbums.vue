<script setup lang='ts'>
import { ref, computed, onBeforeMount } from 'vue';
import api from '../composables/api';


const mediaData = ref<[]>()
const activeTab = ref('');
async function getData(data: string) {
    try {
        const response = await api.get(`/${data}`)
        console.log(response.data.data)
        mediaData.value = response.data.data
    } catch (error) {
        console.log(error)
    }
}
onBeforeMount(() => getData("albums"))
function setActiveTab(tab) {
    activeTab.value = tab;
    getData(tab);
}

onBeforeMount(() => {
    setActiveTab('albums');
});
</script>

<template>
    <base-section>
        <article class="flex flex-col gap-4 lg:flex-row lg:gap-5">
            <div class="side__bar lg:border-l w-full lg:w-[330px] shrink-0 pe-2">
                <ul class="w-full h-full list-none flex flex-col lg:gap-y-[60px] ">
                    <div class="text-right text-[24px] pb-3 w-full cursor-pointer flex items-center gap-2"
                        :class="{ 'text-green-500 border-b-2 border-green-500': activeTab === 'albums' }"
                        @click="setActiveTab('albums')">
                        <font-awesome-icon icon="fa-solid fa-image" />
                        <h4>الصور</h4>
                    </div>
                    <div class="text-right text-[24px] pb-3 w-full cursor-pointer flex items-center gap-2"
                        :class="{ 'text-green-500 border-b-2 border-green-500': activeTab === 'videos' }"
                        @click="setActiveTab('videos')">
                        <font-awesome-icon icon="fa-solid fa-video" />
                        <h4>الفيديوهات</h4>
                    </div>
                </ul>
            </div>
            <div class="albums flex-grow">
                <Grid :cols="3" :gapx="50" :gapy="50">
                    <template v-for="media in mediaData">
                        <RouterLink :to="`/media-albums/album/${media?.id}`">
                            <base-card v-if="media.images_url" ch="280px">
                                <template #img>
                                    <img :src="media?.images_url[0]" alt="" class="grow object-cover">
                                </template>
                                <template #float>
                                    <div
                                        class="w-full absolute left-0 right-0 bottom-0 bg-black bg-opacity-25 text-center p-4">
                                        <p class="text-white">{{ media?.title }}</p>
                                    </div>
                                </template>
                            </base-card>
                            <base-card v-if="!media.images_url">
                                <template #float>
                                    <div class="video-container w-[480px] h-[280px]">
                                        <div v-html="media?.video_url" class="video-frame relative w-full h-full"></div>
                                    </div>
                                    <div
                                        class="w-full absolute left-0 right-0 bottom-0 bg-black bg-opacity-25 text-center p-4">
                                        <p class="text-white">{{ media?.title }}</p>
                                    </div>
                                </template>
                            </base-card>
                        </RouterLink>
                    </template>
                </Grid>
            </div>
        </article>
    </base-section>
</template>

<style>
.video-frame iframe {
    position: absolute;
    width: 100% !important;
    height: 100% !important;
}
</style>
<style scoped>
:deep(.card)img {
    height: 280px !important;
}
</style>