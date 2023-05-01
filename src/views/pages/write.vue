<template>
    <textarea autocomplete="off"
              v-model="useWriter.writeText"
              placeholder="record something there..."
              class="write">
    </textarea>
</template>

<script setup>

import {onBeforeMount, ref, watch} from "vue";
import {navTo} from "@/api/utils.js";
import {globalStatus} from "@/store/GlobalStatus.js";
import {UseWriter} from "@/store/useWriter.js";
import {recordPush} from "@/api/record.js";
import Message from "@/components/Message/index.js";

let global = globalStatus();
let useWriter = UseWriter();
let textareaHeight = ref(Math.max(useWriter.writeText.length, 200));
const back = {
    icon: '<-',
    action: function () {
        navTo('/list');
    },
}
const clear = {
    icon: '×',
    action: function () {
        useWriter.writeText = '';
    }
}
const save = {
    icon: '✔',
    action: function () {
        recordPush(useWriter.writeText).then(result => {
            if (result.data.code === 200) {
                Message({
                    message: '保存成功',
                    type: 'success',
                })
                useWriter.writeText = '';
            } else {
                Message({
                    message: '保存失败',
                    type: 'error',
                })
            }
        });
    }
}

watch(useWriter, (n, o) => {
    if (useWriter.writeText.length % 4 === 0) {
        textareaHeight.value += 30;
    }
    let length = global.currentMode.buttons.length;
    let textLength = useWriter.writeText.length;

    if (textLength === 0) {
        global.currentMode.buttons = []
        global.currentMode.buttons.push(back)
    } else {
        if (length !== 3) {
            global.currentMode.buttons = []
            global.currentMode.buttons.push(back)
            global.currentMode.buttons.push(clear)
            global.currentMode.buttons.push(save);
        }
    }
});

onBeforeMount(() => {
    let textLength = useWriter.writeText.length;
    global.currentMode.buttons = []
    if (textLength !== 0) {
        global.currentMode.buttons.push(back)
        global.currentMode.buttons.push(clear)
        global.currentMode.buttons.push(save);
        return true;
    }
    global.currentMode.buttons.push(back)
})

</script>

<style scoped>
.write {
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: .8rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-family: 仿宋, sans-serif;
    font-size: 1rem;
    resize: none;
}

.confirm {
    border-radius: 0.8rem;
    background-color: #738fd5;
}

</style>