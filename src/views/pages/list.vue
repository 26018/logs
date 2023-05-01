<template>
    <div class="list">
        <div v-show="mode" v-for="rec in records">
            <RecordCard :record='rec' @click="openText(rec)"/>
        </div>
        <div v-if="!mode">
            <Read :record="nowRead"></Read>
        </div>
    </div>
</template>

<script setup>
import RecordCard from "@/components/RecordCard.vue";
import {onBeforeMount, ref, watch} from "vue";
import {globalStatus} from "@/store/GlobalStatus.js";
import {navTo} from "@/api/utils.js";
import {recordList} from "@/api/record.js";
import Read from "@/views/pages/read.vue";

let global = globalStatus();
let records = ref([]);
let mode = ref(true)
let nowRead = ref({})

watch(mode, (value, oldValue, onCleanup) => {
    // list mode
    if (value) {
        global.currentMode = {
            buttons: [{
                icon: "+",
                action: function () {
                    navTo("/write");
                }
            }]
        };
    } else {
        global.currentMode = {
            buttons: [{
                icon: "<-",
                action: function () {
                    navTo("/list");
                    mode.value = !mode.value;
                }
            }]
        };
    }

}, {
    immediate: true,

})

function openText(clickedItem) {
    nowRead.value = clickedItem
    mode.value = !mode.value
}

onBeforeMount(() => {
    recordList().then(result => {
        if (result.data.code === 200) {
            let list = result.data.data;
            list.forEach(record => {
                records.value.push(record)
            })
        }
    })
});

</script>

<style scoped>

</style>