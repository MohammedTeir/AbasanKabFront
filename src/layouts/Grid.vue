<script setup lang='ts'>
import { computed } from 'vue';
const props = defineProps<{
    gap?: number
    cols?: 2 | 3 | 4
    gapx?: number
    gapy?: number
    flow?: string,
    cflow?: string,
    mvgap?: string
}>()

const customColNum = computed(() => {
    if (props.cols === undefined) {
        return `md:grid-cols-${props.cols}`
    } else if (props.cols === 2) {
        return 'md:grid-cols-2'
    } else if (props.cols === 3) {
        return 'md:grid-cols-3'
    } else if (props.cols === 4) {
        return 'md:grid-cols-4'
    }
})
</script>

<template>
    <article :class="['grid-template grid grid-cols-1 pb-3 lg:pb-0', customColNum]"
        :style="{ gap: `${props.gap}px`, rowGap: `${props.gapy}px`, columnGap: `${props.gapx}px` }">
        <slot />
    </article>
</template>

<style scoped>
@media (width <=640px) {
    .grid-template {
        grid-auto-flow: v-bind(props.flow);
        grid-auto-columns: v-bind(props.cflow);
        /* gap: v-bind(props.mvgap) !important; */
    }
}
</style>