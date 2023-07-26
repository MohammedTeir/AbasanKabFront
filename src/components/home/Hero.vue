<script setup lang='ts'>
import { ref } from 'vue';


</script>

<template>
    <section class="lg:px-[75px]">
        <figure class="w-full lg:h-[100vh] mb-3">
            <img class="w-full h-full" src="../../assets/images/hero-image.png" alt="">
        </figure>
        <article class="slider-container px-4 lg:py-[40px] ">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:gap-[100px] gap-2">
                <router-link to="/complaint"
                    class="w-full flex gap-[20px] items-center mb-3 justify-center text-center text-black py-2 lg:py-[25px] border border-black rounded-md hover:bg-black hover:text-white">
                    <div class="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]">
                        <font-awesome-icon icon="fa-solid fa-person" class="w-full h-full" />
                    </div>
                    <p class="text-[18px] lg:text-[28px]">صندوق الشكاوي</p>
                </router-link>
                <router-link to=""
                    class="w-full flex gap-[20px] items-center mb-3 justify-center text-center text-black py-2 lg:py-[25px] border border-black rounded-md hover:bg-black hover:text-white">
                    <div class="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]">
                        <font-awesome-icon icon="fa-solid fa-phone" class="w-full h-full" />
                    </div>
                    <p class="text-[18px] lg:text-[28px]">تواصل معنا</p>
                </router-link>
                <router-link to="/control"
                    class="w-full flex gap-[20px] items-center mb-3 justify-center text-center text-black py-2 lg:py-[25px] border border-black rounded-md hover:bg-black hover:text-white">
                    <div class="w-[20px] lg:w-[30px] h-[20px] lg:h-[30px]">
                        <font-awesome-icon icon="fa-solid fa-box" class="w-full h-full" />
                    </div>
                    <p class="text-[18px] lg:text-[28px]">الرقابة الداخلية و الخارجية</p>
                </router-link>
            </div>
        </article>
    </section>
</template>

<style scoped></style>
