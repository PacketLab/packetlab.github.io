self.addEventListener("message",(e)=>{
    const heatmapConfig = e.data;
    const dataSummary = heatmapConfig.dataSummary;
    const visibleStatusTypes = heatmapConfig.visibleStatusTypes;
    const visibleStatuses = visibleStatusTypes.map(status=>status.type);
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
    // Track the number of valid buckets per experiment to sort traces
    const compiledStatusBucketCounts = {}
    for(let i=0;i<maxWorkers;i++){
        parentGroups.push(dataSummary.groupedData.slice(i*parentGroupSize,(i+1)*parentGroupSize));
    }
    // Delegate data processing to child workers
    parentGroups.forEach((group,i)=>{
        // Only start worker if data is available
        if(group.length>0){
            workerPromises.push(new Promise((resolve,reject)=>{    
                const worker = new Worker("./process-heatmap-group.worker.js");
                // End thread when worker finishes
                worker.addEventListener("message",function(e){
                    const data = e.data;
                    if(data.status=="finished"){    
                        worker.terminate();
                        statusChart[i] = data.statusChart;
                        statusLabel[i] = data.statusLabel;
                        const statusBucketCounts = data.statusBucketCounts;
                        Object.keys(statusBucketCounts).forEach((status)=>{
                            compiledStatusBucketCounts[status] = compiledStatusBucketCounts[status] || 0;
                            compiledStatusBucketCounts[status]+=statusBucketCounts[status];
                        })
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
                    "visibleStatuses":visibleStatuses,
                    "dataSummary":dataSummary,
                    "datesSet":i!=0,
                });
            }));
        }
    })
    // Wait till all workers have finished processing before returning status chart  
    Promise.all(workerPromises).then(()=>{
        const compiledStatusChart = {};
        const compiledStatusLabel = {};
        visibleStatuses.forEach((status)=>{
            compiledStatusChart[status] = [];
            statusChart.forEach((parentGroup)=>{;
                compiledStatusChart[status] = compiledStatusChart[status].concat(parentGroup[status]);
            })
            compiledStatusLabel[status] = [];
            statusLabel.forEach((parentGroup)=>{;
                compiledStatusLabel[status] = compiledStatusLabel[status].concat(parentGroup[status]);
            })
        });
        self.postMessage({
            "status":"finished",
            "statusChart":compiledStatusChart,
            "statusLabel":compiledStatusLabel,
            "dates":dataSummary.dates,
        });
    })
})