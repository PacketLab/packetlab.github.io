import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "dataURL":{
      "data":{
        "url":"https://corsanywhere.herokuapp.com/http://pktlab.caida.org:20557/data.jsonl",
        "format":"jsonl"
      },
      "experiments":{
        "url":"/data/experiments.jsonl",
        "format":"jsonl"
      }
    },
    "dataLoaded":false,
    "data":null,
    "experiments":null
  },
  mutations: {
    setData(state,data){
        Object.keys(data).forEach((key)=>{
          state[key] = data[key]
        })
        state.dataLoaded = true;
    },
  },
  actions: {
    loadData({commit,state}){
        return new Promise((resolve,reject)=>{
            if(!state.dataLoaded){
                const worker = new Worker("workers/fetch-data.worker.js");    
                worker.addEventListener("message",function(e){
                    worker.terminate();
                    const data = e.data;
                    if(data.status=="finished"){
                        commit('setData',data.message);
                        resolve();
                    }else{
                        reject();
                    }
                })
                worker.postMessage({"status":"load","url":state.dataURL})
            }else{
                resolve();
            }
        })
    }
  },
  modules: {
  }
})
