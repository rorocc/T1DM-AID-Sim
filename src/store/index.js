import { createStore } from 'vuex'
import * as util from "../common/util.js";

export default createStore({
    state: {
        timeRange: {
            "t0": new Date(2022,5,1,6,0,0),
            "tmax": new Date(2022,5,1,18,0,0),
        },
        results: [{ "t": "2022-06-01T04:00:00.000Z", "x": { "Gp": 180, "Gt": 136.18855213996963, "Ip": 2.1160867725422206, "Il": 2.156181048232494, "Qsto1": 0, "Qsto2": 0, "Qgut": 0, "XL": 42.32173545084441, "I_": 42.32173545084441, "X": 0, "Isc1": 56.320463330739095, "Isc2": 50.75030761670995 }, "u": { "iir": 0.7687743244645887, "ibolus": 0, "carbs": 0, "meal": null }, "y": { "Gp": 95.74468085106383, "G": 95.74468085106383 } }],
        computedStats: {}
    },
    mutations: {
        SET_RESULTS(state, results){
            state.results = results;
        },
        RESET_COMPUTEDSTATS(state){
            state.computedStats.G = [];
            state.computedStats.tir_veryhigh = 0;
            state.computedStats.tir_high = 0;
            state.computedStats.tir_target = 0;
            state.computedStats.tir_low = 0;
            state.computedStats.tir_verylow = 0;
            state.computedStats.t_total = 0;

            state.computedStats.averageGlucose = 0;
            state.computedStats.GMI = 0;
            state.computedStats.glucoseVariability = 0;
            state.computedStats.totalBolus = 0;

        },
        PUSH_RECORD(state, result){
            const { t, x, u, y, logData } = result;
            state.computedStats.totalBolus += u.ibolus;
            state.computedStats.G.push(y.G);
            state.computedStats.t_total++;
            let G = y.G;
            if (G < 54) {
                state.computedStats.tir_verylow++;
            } else if (G < 70) {
                state.computedStats.tir_low++;
            } else if (G > 250) {
                state.computedStats.tir_veryhigh++;
            } else if (G > 180) {
                state.computedStats.tir_high++;
            } else {
                state.computedStats.tir_target++;
            }
        },
        CALC_AVG_STATS(state){
            state.computedStats.averageGlucose = Math.round(util.mean(state.computedStats.G));
            state.computedStats.GMI = Math.round((3.38 + 0.02345 * state.computedStats.averageGlucose) * 10) / 10;
            state.computedStats.glucoseVariability = Math.round(
                100 * util.coefficientOfVariation(state.computedStats.G)
            );
        }
    },
    actions: {
        setResults({commit}, newValue){
            commit("SET_RESULTS", newValue);
            commit("RESET_COMPUTEDSTATS");

            for (const result of newValue) {
                commit("PUSH_RECORD", result);
            }

            commit("CALC_AVG_STATS");

        },
        resetComputedStats({commit}){
            commit("RESET_COMPUTEDSTATS");
        }
    },
    getters: {
        timeRange (state){
            return state.timeRange;
        },
        results(state){
            return state.results;
        },
        computedStats(state){
            return state.computedStats;
        }
    }
})