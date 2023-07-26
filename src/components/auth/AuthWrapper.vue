<script setup lang='ts'>
const emits = defineEmits(['close-auth'])

const closeAuth = () => {
    emits('close-auth', false)
}

</script>

<template>
    <teleport to="body">
        <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[999] p-2">
            <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div
                class="relative w-full  lg:w-[1170px] h-max lg:h-[775px] bg-white rounded-lg overflow-hidden flex flex-col ">
                <div class="w-full bg-slate-200 flex py-4 lg:py-[40px] items-center">
                    <button @click="closeAuth" class="w-[24px] h-[24px] shrink-0 ms-10">
                        <font-awesome-icon icon="fa-solid fa-xmark" class="w-full h-full" />
                    </button>
                    <h3 class="text-[18px] lg:text-[28px] font-bold text-green-600 text-center grow">
                        <slot name="title"></slot>
                    </h3>
                </div>
                <div class="grow w-full pt-[40px] flex flex-col items-center justify-start p-2">
                    <slot name="form"></slot>
                    <div class="border-t-2 pt-[40px] w-full lg:w-[570px] text-center" v-if="$slots['cta']">
                        <slot name="cta"></slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style scoped></style>