<script setup lang='ts'>
import { onBeforeMount } from 'vue';
import BaseHeader from '../components/base/BaseHeader.vue';
import BaseFooter from '../components/base/BaseFooter.vue';
import { userStore } from '../store/user';
onBeforeMount(() => {
    userStore().fetchUserData()
})
</script>

<template>
    <div class="flex flex-col h-full">
        <BaseHeader />
        <main class="grow">
            <router-view>
            </router-view>
        </main>
        <BaseFooter />
    </div>
</template>

<style scoped></style>