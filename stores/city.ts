import { defineStore } from "pinia";

export const useCitiesStore = defineStore('cities', {
    state() {
        return {
            cities: []
        }
    },
    actions: {
        
    }
}, {
    persist: true
})