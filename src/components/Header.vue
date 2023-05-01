<template>
    <div class="header line.">
        <transition>
            <div class="poem" v-show="sentenceView">{{ sentence }}</div>
        </transition>
        <div>
            <div v-for="button in mode.buttons">
                <div @click="button.action()">{{ button.icon }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {onBeforeMount, onMounted, ref, watch} from "vue";
import useRandomBackImage from "@/hooks/useRandomBackImage.js";
import {poems} from "@/api/poems.js";

defineProps(['mode']);

let sentences = []
let sentence = ref('');
let sentenceView = ref(true);
let sentenceStyle = ref('');
let sentenceIndex = 0;
let duration = 6000;

watch(sentence, () => {
    sentenceView.value = true
    setTimeout(() => {
        sentenceView.value = false;
    }, duration - 500)
})

onBeforeMount(() => {
    let savedSentences = localStorage.getItem('sentences');
    let savedIndex = localStorage.getItem('sentenceIndex');
    sentenceIndex = savedIndex === null || isNaN(savedIndex) ? 0 : parseInt(savedIndex);
    if (savedSentences !== null) {
        sentences = JSON.parse(savedSentences);
        return;
    }
    localStorage.removeItem('sentences');
    let poemsConfig = localStorage.getItem("poemsConfig");
    if (poemsConfig === null) {
        poemsConfig = {
            page: 1,
            size: 50
        }
    }
    poems(poemsConfig.page, poemsConfig.size).then(result => {
        if (result.data.code === 200) {
            let remoteSentences = result.data.data['records'];
            remoteSentences.forEach(st => {
                sentences.push(st['sentence'])
            })
            localStorage.setItem("sentences", JSON.stringify(sentences));
        }
    });
});

onMounted(() => {
    let lastIntervalId = localStorage.getItem("intervalId");
    let lastBackImage = localStorage.getItem("backImage");
    sentenceStyle.value = lastBackImage === null ? "linear-gradient(90deg, #7209d4, #2832d4 33%, #00a5b2)" : lastBackImage
    clearInterval(lastIntervalId);
    let intervalId = setInterval(setPoem(), duration);
    localStorage.setItem("intervalId", intervalId.toString());
})

function setPoem() {
    sentence.value = sentences[sentenceIndex];
    sentenceIndex = (sentenceIndex + 1) % sentences.length

    let randomBackImage = useRandomBackImage();

    sentenceStyle.value = randomBackImage.image
    localStorage.setItem("backImage", sentenceStyle.value)
    localStorage.setItem("sentenceIndex", sentenceIndex);

    return setPoem;
}

</script>

<style scoped>

.v-enter-active, .v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from, .v-leave-to {
    opacity: 0;
}

.header {
    display: flex;
    height: 50px;
    width: 100vw;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0,
    rgba(0, 0, 0, 0.06) 0 1px 2px 0;
    font-family: deyihei, sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: white;
}

.header > * {
    -webkit-tap-highlight-color: transparent;
}

.header > *:first-child {
    padding: 0 .5rem;
}

.header > *:last-child {
    margin-left: auto;
    padding: 0 .5rem;
    box-sizing: border-box;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.header > *:last-child > * {
    box-sizing: border-box;
    padding: 0 1rem;
    cursor: pointer;
}

.poem {
    user-select: none;
    cursor: pointer;
    font-family: deyihei, serif;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-overflow: ellipsis;
    background-image: v-bind(sentenceStyle);
}

</style>