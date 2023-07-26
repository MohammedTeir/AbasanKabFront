<script setup lang='ts'>
import { computed } from 'vue';
const { bg = '#fff', cw, ch, cdd = 'column', imgw, imgh, img } = defineProps<{
    bg?: string
    cw?: number
    ch?: string
    cdd?: string
    imgw?: number
    imgh?: number
    img?: string
}>()

const cardW = computed(() => `${cw}px`)
const imgW = computed(() => `${imgw}px`)
const imgH = computed(() => `${imgh}px`)
</script>

<template>
    <div class="card flex rounded-[20px] lg:rounded overflow-hidden shadow-lg relative" :style="{ width: cardW }">
        <img class="w-full" :style="{ width: imgW, height: imgH }" :src="img" alt="" v-if="img">
        <slot name="img" v-if="$slots['img']">

        </slot>
        <div class="py-4 px-2 text-right" :style="{ backgroundColor: bg }" v-if="$slots['title'] || $slots['description']">
            <h3 class="card-title lg:text-xl text-[16px] mb-2 font-semibold p-2" v-if="$slots['title']">
                <slot name="title"></slot>
            </h3>
            <p class="card-description text-gray-700 text-base hidden lg:block" v-if="$slots['description']">
                <slot name="description"></slot>
            </p>
        </div>
        <div class="px-2 text-right" v-if="$slots['card-body']">
            <slot name="card-body"></slot>
        </div>
        <slot name="float"></slot>
    </div>
</template>

<style scoped>
.card {
    flex-direction: v-bind(cdd);
    height: v-bind(ch);
}

img {
    aspect-ratio: 12/8;
    flex-shrink: 1;
}

.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

@media (width < 640px) {
    .card {
        width: 100% !important;
        flex-direction: column;
    }

    img {
        height: 140px !important;
        width: 100% !important;
    }

    .card-description {
        display: none !important;
    }
}
</style>