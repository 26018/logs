<template>
    <div class="write_box line.">
        <Header :mode="global.currentMode"/>
        <router-view name="v_content"/>
    </div>
</template>

<script setup>

import Header from "@/components/Header.vue";
import {globalStatus} from "@/store/GlobalStatus.js";
let global = globalStatus();

</script>

<style scoped>
.write_box {
    max-width: 400px;
    min-width: 100vw;
    height: 100vh;
    overflow: auto;
    padding-top: 50px;
    box-sizing: border-box;
    position: relative;
}
</style>