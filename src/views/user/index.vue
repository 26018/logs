<template>
    <div class="index ">
        <div class="options">
            <div @click="changeMode(true)">登录</div>
            <div @click="changeMode(false)">注册</div>
        </div>
        <div class="option-view">
            <div v-if="loginMode">
                <Login/>
            </div>
            <div v-else>
                <Register/>
            </div>
        </div>
    </div>
</template>

<script setup>

import Login from "@/views/user/login.vue";
import Register from "@/views/user/register.vue";
import {ref} from "vue";

let loginMode = ref(true)

function changeMode(mode) {
    loginMode.value = mode
}
</script>

<style scoped>
.index {
    width: 100vw;
}

.slogan {
    font-weight: 600;
    font-size: 1.4rem;
    box-sizing: border-box;
    padding: 0.5rem;
}

.options {
    display: flex;
    align-items: center;
    justify-content: right;
}

.options > :first-child, .options > :last-child {
    box-sizing: border-box;
    margin: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.3rem;
    border-radius: 0.2rem;
    color: black;
    font-size: 18px;
    user-select: none;
}

.options > :first-child:hover, .options > :last-child:hover {
    background-color: gainsboro;
}

.option-view {
    display: flex;
    height: 100%;
}

</style>