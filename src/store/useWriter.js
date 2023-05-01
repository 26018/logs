import {defineStore} from 'pinia';

export const UseWriter = defineStore('UseWriter', {
    state: () => {
        return {
            writeText: '',
        }
    },
    persist: {
        enabled: true, //开启存储
        storage: localStorage,
    },
    getters: {},
    actions: {}
})