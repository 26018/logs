<template>
    <div class="record-card">
        <div>{{ record.title }}</div>
        <div class="record-desc">
            <div>{{ record['createTime'] }} 时</div>
            <div>{{ record['numberOfContent'] }} 词</div>
        </div>
    </div>
</template>

<script setup>

let props = defineProps(['record']);

</script>

<style>

.record-card {
    margin: 1rem;
    padding: .8rem;
    border-radius: .4rem;
    box-sizing: border-box;
    box-shadow: rgba(17, 17, 26, 0.1) 0 0 16px;
    overflow: hidden;
}


.record-card > * {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

.record-card > *:first-child {
    font-size: 1.1rem;
    font-family: 仿宋, sans-serif;
    font-weight: 600;
    user-select: none;
}

.record-card > *:last-child {
    margin-top: 8px;
    font-size: .8rem;
    display: flex;
}

.record-card > *:last-child > *:last-child {
    margin-left: auto;
}

@keyframes scaleAnimation {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(0.99);
    }
    50% {
        transform: scale(.98);
    }
    75% {
        transform: scale(1);
    }
    85% {
        transform: scale(1.1)
    }
    100% {
        transform: scale(1.11)
    }
}
</style>