import Vue from 'vue'
import Vuex from 'vuex'
import DataWorker from 'worker-loader!../workers/fetch-data.worker.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "dataURL":"/data/monitors-status.jsonl",
    "dataLoaded":false,
    "data":null
  },
  mutations: {
    setData(state,data){
        if(data!=null){
            state.data = data;
            state.dataLoaded = true;
        }
    }
  },
  actions: {
    loadData({commit,state}){
        return new Promise((resolve,reject)=>{
            if(!state.dataLoaded){
                const worker = new DataWorker();    
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
