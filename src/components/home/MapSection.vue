<script setup lang='ts'>
import { ref } from 'vue';
const center = ref({ lat: 51.093048, lng: 6.84212 });

const markers = ref([
    {
        position: {
            lat: 51.093048,
            lng: 6.84212,
        },
    },
    {
        position: {
            lat: 51.198429,
            lng: 6.69529,
        },
    },
    {
        position: {
            lat: 51.165218,
            lng: 7.067116,
        },
    },
    {
        position: {
            lat: 51.09256,
            lng: 6.84074,
        },
    },
]);
</script>

<template>
    <base-section>
        <h2 class="text-[30px] mb-[60px] font-bold ">الخريطة التفاعلية لبلدة عبسان الكبيرة</h2>
        <grid :cols="3">
            <div class="px-2">
                <h2 class="mb-[40px] text-[28px]">نوع الخدمة </h2>
                <select name="" id="" class="border rounded-lg w-full p-[25px]">
                    <option value="" class="text-[22px] p-[25px]">شحن عداد كهرباء</option>
                </select>
            </div>
            <div class="border-x border-black flex flex-col">
                <div class="flex gap-[20px] pt-3 ps-[40px] pb-[30px] border-b-[1px] border-black">
                    <div class="w-[30px] lg:w-[56px] h-[30px] lg:h-[56px]">
                        <font-awesome-icon icon="fa-solid fa-location-dot" class="w-full h-full text-green-700" />
                    </div>
                    <div>
                        <p class="text-black text-[18px] lg:text-[24px]">معرض الهدى للأجهزة الكهربائية</p>
                        <p class="text-gray text-[18px]">مقابل مسجد التوبة- شارع طبش</p>
                    </div>
                </div>
                <div class="flex gap-[20px] pt-3 ps-[40px] pb-[30px] border-b-[1px] border-black">
                    <div class="w-[30px] lg:w-[56px] h-[30px] lg:h-[56px]">
                        <font-awesome-icon icon="fa-solid fa-location-dot" class="w-full h-full text-green-700" />
                    </div>
                    <div>
                        <p class="text-black text-[18px] lg:text-[24px]">معرض الهدى للأجهزة الكهربائية</p>
                        <p class="text-gray text-[18px]">مقابل مسجد التوبة- شارع طبش</p>
                    </div>
                </div>
                <div class="flex gap-[20px] pt-3 ps-[40px] pb-[30px] ">
                    <div class="w-[30px] lg:w-[56px] h-[30px] lg:h-[56px]">
                        <font-awesome-icon icon="fa-solid fa-location-dot" class="w-full h-full text-green-700" />
                    </div>
                    <div>
                        <p class="text-black text-[18px] lg:text-[24px]">معرض الهدى للأجهزة الكهربائية</p>
                        <p class="text-gray text-[18px]">مقابل مسجد التوبة- شارع طبش</p>
                    </div>
                </div>
            </div>
            <!-- <div class="px-2">
                <GMapMap :center="center" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px">
                    <GMapCluster>
                        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                            :draggable="true" @click="center = m.position" />
                    </GMapCluster>
                </GMapMap>
            </div> -->
        </grid>
    </base-section>
</template>

<style scoped></style>