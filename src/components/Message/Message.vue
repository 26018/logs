<template>
    <transition @before-leave="onClose" @after-leave="onDestroy" name="message-fade">
        <div v-show="visiable" :class="messageStyle" :style="{ top: `${top}px` }">
            <div class="messageBox">
                <img class="icon" src="/src/assets/icon/sucess.png" alt="">
                <span>{{ message }}</span>
            </div>
        </div>
    </transition>
</template>

<script setup>
import types from './types'

import { onMounted, ref, computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'info',
        validator(value) {
            return Object.values(types).includes(value)
        }
    },
    top: {
        type: Number,
        default: 50
    },
    message: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 3000
    },
    onDestroy: Function,
    onClose: Function
})

const visiable = ref(false)

const messageStyle = computed(() => ['message', props.type])

const close = () => {
    visiable.value = false
}

onMounted(() => {
    visiable.value = true
})

setTimeout(close, props.duration)
</script>

<style scoped>
.message {
    position:fixed;
    z-index: 9999;
    top: 50px;
    left:50%;
    transform: translate(-50%,100%);
    padding: 0.3rem .6rem;
    border-radius: .3rem;box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
    box-sizing: border-box;
    transition: .5s;
}

.message.info {
    color: #73767a;
    background: #f4f4f5;
}

.message.danger {
    color: #c45656;
    background: #fde2e2;
}

.message.success {
    color: #529b2e;
    background: #e1f3d8;
}

.message.warning {
    color: #b88230;
    background: #faecd8;
}

.message-fade-enter-from,
.message-fade-leave-to {
    /*@apply transform -translate-x-1/2 -translate-y-20px opacity-0*/
    transform: translate(-50%,0);
    opacity: 0;
}
.messageBox {
    display: flex;
    align-items: center;
}
.icon {
    width: 20px;
    margin-right: 5px;
}
</style>