import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment"

Vue.use(Vuex)
const base = (process.env.NODE_ENV == "development") ? "/" : "/~vspillai/packet-lab/";
export default new Vuex.Store({
  state: {
    "dataWeekURL":{
      "data":{
        "url":"https://corsanywhere.herokuapp.com/http://pktlab.caida.org:20557/data_week.jsonl",
        "format":"jsonl"
      },
      "experiments":{
        "url":base + "data/experiments.jsonl",
        "format":"jsonl"
      }
    },
    "dataURL":{
      "data":{
        "url":"https://corsanywhere.herokuapp.com/http://pktlab.caida.org:20557/data.jsonl",
        "format":"jsonl"
      },
      "experiments":{
        "url":base + "data/experiments.jsonl",
        "format":"jsonl"
      }
    },
    "dataLoaded":{
      "week":false,
      "all":false,
    },
    "data":null,
    "experiments":null
  },
  mutations: {
    setData(state,dataMessage){
        const data = dataMessage.data;
        const timeframe = dataMessage.timeframe;
        Object.keys(data).forEach((key)=>{
          state[key] = data[key]
        })
        state.dataLoaded[timeframe] = true;
    },
  },
  actions: {
    loadData({commit,state}, fromTime){
        const SECONDS_PER_WEEK = 604800;
        const currentTime = moment().format("X")
        const weekPassed = (currentTime-fromTime) > SECONDS_PER_WEEK;
        console.log(weekPassed);
        const timeframe = (weekPassed)?"all":"week";
        return new Promise((resolve,reject)=>{
            if(!state.dataLoaded[timeframe]){
                const worker = new Worker("workers/fetch-data.worker.js");    
                worker.addEventListener("message",function(e){
                    worker.terminate();
                    const data = e.data;
                    if(data.status=="finished"){
                        commit('setData',{
                          "data":data.message,
                          "timeframe":timeframe
                        });
                        resolve();
                    }else{
                        reject();
                    }
                })
                if(weekPassed){
                  worker.postMessage({"status":"load","url":state.dataURL})
                }else{
                  worker.postMessage({"status":"load","url":state.dataWeekURL})
                }
            }else{
                resolve();
            }
        })
    }
  },
  modules: {
  }
})
