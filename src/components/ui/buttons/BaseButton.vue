<script setup lang='ts'>
const { fill = true } = defineProps<{
    fill?: boolean
}>()
</script>

<template>
    <button type="button" :class="[
        fill ? 'bg-[#A7A465]' : 'bg-white',
        fill ? 'text-white' : 'text-[#A7A465]',
        'border-[3px] border-[#A7A465] rounded-[10px] text-center w-[320px] h-[60px] text-[20px]'
    ]">
        <slot />
    </button>
</template>

<style scoped></style>