import {defineStore} from 'pinia';

export const globalStatus = defineStore('globalStatus', {
    state: () => {
        return {
            currentMode: {
                buttons: []
            },
        }
    },
    getters: {},
    actions: {}
})