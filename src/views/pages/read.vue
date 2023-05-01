<template>
    <div :class="`read ${up?'readUp':''}`">
        <div class=""></div>
        <div class="read-head">{{ record.title }}</div>
        <div class="read-content" v-html="record.content"></div>
        <div class="read-time">{{ record.createTime }} 时</div>
    </div>
</template>

<script setup>

import {onMounted, onUpdated, ref} from "vue";

let props = defineProps([
    "record"
])
let up = ref(false)
onMounted(() => {
    if (props.record != null && props.record.content != null) {
        props.record.content = props.record.content.replaceAll("\n", "<br/>");
    }
    setTimeout(()=>{
        up.value=true
    },0)
})

</script>

<style scoped>
.read {
    width: 100%;
    padding: .8rem;
    box-sizing: border-box;
    font-family: 仿宋, sans-serif;
    font-size: 1rem;
    position: absolute;
    top: 50px;
    background-color: #fff;
    z-index: 1;
    transition: .3s;
    transform: translateY(150vh);
}
.readUp {
    transform: translateY(0);
}
.read-head {
    font-size: 1.4rem;
    font-family: deyihei, sans-serif;
}

.read-content {
    margin-top: 8px;
    color: black;
}

.read-time {
    margin-top: 4px;
    font-size: .8rem;
    color: gray;
}
</style>