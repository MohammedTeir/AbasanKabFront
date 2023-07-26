<script setup lang='ts'>
</script>

<template>
    <section class="py-[80px] px-[75px]">
        <article class="flex items-start">
            <div class="sidebar w-[200px] border-s-2">
                <ul class="w-full flex flex-col gap-[60px]">
                    <div class="flex items-center">
                        <h3>الصور</h3>
                    </div>
                    <div class="flex items-center">
                        <h3>فيديوهات</h3>
                    </div>
                    <div class="flex items-center">
                        <h3>إصدارات</h3>
                    </div>

                </ul>
            </div>
            <Grid class="grow">
                <base-card></base-card>
            </Grid>
        </article>
    </section>
</template>

<style scoped></style>