<script setup lang='ts'>
import { Transition } from 'vue';
const { type = true } = defineProps<{
    type?: boolean
}>()
</script>

<template>
    <teleport to='body'>
        <Transition name="toast">
            <div :class="[type ? 'bg-green-700' : 'bg-red-700',
                'fixed w-[300px] px-[20px] py-[15px]  bottom-5 translate-x-1/2 right-[50%] rounded-md z-[1000]']">
                <p class="text-white text-center lg:text-[20px]">
                    <slot></slot>
                </p>
            </div>
        </Transition>
    </teleport>
</template>

<style scoped>
.toast-enter-from,
.toast-leave-to {
    opacity: 0;
}

.toast-enter-to,
toast-leave-from {
    opacity: 1;
}

.toast-enter-active,
toast-leave-active {
    transition: all 2s;
}
</style>