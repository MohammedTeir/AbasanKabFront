<script setup lang='ts'>
import AppLogo from '../common/AppLogo.vue';
</script>

<template>
    <footer class="bg-[#058041] lg:py-[70px] lg:px-[75px] px-3 py-5 h-fit w-fill hidden lg:block">
        <Grid :cols="4">
            <div class="px-4 w-full">
                <div class="w-full h-auto">
                    <AppLogo class="mb-[24px]" />
                    <p class="text-center">
                        جميع الحقوق محفوظة بلدية
                        <br>
                        عبسان الكبيرة © 2020
                    </p>
                </div>
            </div>
            <div class="px-4 w-full">
                <div class="w-full h-auto">
                    <h3 class="pb-[16px] mb-[36px] inline-block border-b-4">معلومات التواصل</h3>
                    <ul class="flex flex-col gap-2">
                        <p>082073505-082073044</p>
                        <p>0599418406</p>
                        <p> عبسان الكبيرة الشارع العام بجانب مسجد أبو بكر
                            الصديق</p>
                    </ul>
                </div>
            </div>
            <div class="px-4 w-full">
                <div class="w-full h-auto ">
                    <h3 class="pb-[16px] mb-[36px] inline-block border-b-4">تابعنا عبر وسائل التواصل الإجتماعي</h3>
                    <social-media flow="row"></social-media>
                </div>
            </div>
            <div class="px-4 w-full">
                <div class="w-full h-auto ">
                    <h3 class="pb-[16px] mb-[36px] inline-block border-b-4">اشترك بقائمتنا البريدية</h3>
                    <div>
                        <form>
                            <div class="flex w-full">
                                <input class="grow p-4 outline-none text-black" type="email"
                                    placeholder="عنوان البريد الإلكتروني">
                                <button class="p-4 bg-black text-white" type="submit">إشترك</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Grid>
    </footer>
</template>

<style scoped>
footer {
    color: #fff;
    text-align: start;
}

h3 {
    font-size: 24px;
}

p {
    font-size: 18px;
    font-weight: 400;
}
</style>