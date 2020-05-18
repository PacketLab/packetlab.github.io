self.addEventListener("message",(e)=>{
    const heatmapConfig = e.data;
    const dataSummary = heatmapConfig.dataSummary;
    const hiddenStatus = heatmapConfig.hiddenStatus;
    const statusChart = [];
    const statusLabel = [];
    // Generate date intervals for x-axis
    dataSummary.dates = [];
    // Divide parent data into groups based off of number of workers
    const maxWorkers = navigator.hardwareConcurrency || 4;
    const totalRows = dataSummary.groupedData.length;
    let completedRows = 0;
    const parentGroupSize = Math.ceil(totalRows/maxWorkers);
    const parentGroups = [];
    const workerPromises = [];
    for(let i=0;i<maxWorkers;i++){
        parentGroups.push(dataSummary.groupedData.slice(i*parentGroupSize,(i+1)*parentGroupSize));
    }
    // Delegate data processing to child workers
    parentGroups.forEach((group,i)=>{
        // Only start worker if data is available
        if(group.length>0){
            workerPromises.push(new Promise((resolve,reject)=>{    
                const worker = new Worker("./process-heatmap-group.js");
                // End thread when worker finishes
                worker.addEventListener("message",function(e){
                    const data = e.data;
                    if(data.status=="finished"){    
                        worker.terminate();
                        statusChart[i] = data.statusChart;
                        statusLabel[i] = data.statusLabel;
                        if(i==0){
                            dataSummary.dates = data.dates;
                        }
                        resolve();
                    }else if(data.status=="update"){
                        completedRows++;
                        self.postMessage({
                            "status":"update",
                            "body":Math.ceil(completedRows/totalRows*100),
                        })
                    }
                })
                // Only add dates for first set of buckets
                worker.postMessage({
                    "parentGroup":group,
                    "heatmapConfig":heatmapConfig,
                    "hiddenStatus":hiddenStatus,
                    "dataSummary":dataSummary,
                    "datesSet":i!=0,
                });
            }));
        }
    })
    // Wait till all workers have finished processing before returning status chart  
    Promise.all(workerPromises).then(()=>{
        self.postMessage({
            "status":"finished",
            "statusChart":[].concat(...statusChart),
            "statusLabel":[].concat(...statusLabel),
            "dates":dataSummary.dates,
        });
    })
})