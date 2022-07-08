import { createStore } from 'vuex'

export default createStore({
    state: {
        timeRange: {
            "t0": new Date(2022,5,1,6,0,0),
            "tmax": new Date(2022,5,1,18,0,0),
        },
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        timeRange (state){
            return state.timeRange;
        }
    }
})