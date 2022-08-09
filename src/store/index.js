import { createStore } from 'vuex'
import * as util from "../common/util.js";

export default createStore({
    state: {
        runSimFlag: false,
        input: {
            patient: {

            },
          meals: [{
                edit: false,
              actual: {
                  start: new Date(2022,5,1,8,0,0),
                  duration: 15,
                  carbs: 20,
              },
              announcement: {
                  start: new Date(2022,5,1,8,0,0),
                  carbs: 20,
                  time: new Date(2022,5,1,7,0,0),
              },
          },
              {
                  edit: false,
                  actual: {
                      start: new Date(2022,5,1,9,0,0),
                      duration: 15,
                      carbs: 10,
                  }
              }],
            timeRange: {
                "hours": 8,
                "t0": new Date(2022,5,1,6,0,0),
                "tmax": new Date(2022,5,1,18,0,0),
            },
        },
        results: [],
        computedStats: {},
        defaultTime: {
            date: new Date('2022-06-01T06:00:00').toISOString().split('T')[0],
            time: new Date('2022-06-01T06:00:00').toLocaleTimeString(),
        }
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
        },
        SET_TIME(state, val){

            state.input.timeRange.t0 = new Date(val[0].valueOf());

            state.input.meals[0].actual.start = state.input.timeRange.t0;

            let date = val[0];

            let tMax = new Date(date.setTime(date.getTime() + val[1] * 60 * 60 * 1000));

            state.input.timeRange.tmax = new Date(tMax.valueOf())

            state.runSimFlag = true; // SETTING FLAG

        },
        SET_FLAG(state,bool){
            state.runSimFlag = bool;
        },
        SET_MEALS(state, meals){
            console.log("SET_MEALS", meals)
            state.input.meals = meals;
            state.runSimFlag = true; // SETTING FLAG
        },
        SET_TIMERANGE(state, tr){
            state.input.timeRange = tr;
            state.runSimFlag = true; // SETTING FLAG
        }
    },
    actions: {
        setTimeRange({commit}, tr){
          commit("SET_TIMERANGE",tr)
        },
        setMeals({commit},meals){
          commit("SET_MEALS",meals);
          commit("CALC_AVG_STATS");
        },
        setTime({commit}, val){
            commit("SET_TIME", val)
        },
        setSimFlag({commit}, bool){
          commit("SET_FLAG", bool);
        },
        setResults({commit}, newValue){
            commit("RESET_COMPUTEDSTATS");
            commit("SET_RESULTS", newValue);

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
        simFlag(state){
          return state.runSimFlag;
        },
        input(state){
            return state.input
        },
        timeRange (state){
            return state.input.timeRange;
        },
        results(state){
            return state.results;
        },
        computedStats(state){
            return state.computedStats;
        },
        defaultTime(state){
            return state.defaultTime;
        }
    }
})