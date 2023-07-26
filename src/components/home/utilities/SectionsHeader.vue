<script setup lang='ts'>
const props = defineProps<{
    path: string
}>()
</script>

<template>
    <div class="flex justify-between align-middle items-center mb-4">
        <h3 class="font-bold text-black text-start text-[16px] lg:text-[30px]">
            <slot name="title"></slot>
        </h3>
        <router-link :to="props.path" class="bg-slate-600 text-white lg:px-[22px] lg:py-[12px] p-2 text-end">عرض
            الكل</router-link>
    </div>
</template>

<style scoped></style>