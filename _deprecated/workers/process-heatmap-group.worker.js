// Import bucketify and moment
self.importScripts("bucketify.min.js");
self.importScripts("moment.js");
self.addEventListener("message",(e)=>{
    const data = e.data;
    const parentGroup = data.parentGroup;
    const heatmapConfig = data.heatmapConfig;
    const dataSummary = data.dataSummary;
    const visibleStatuses = data.visibleStatuses;
    let datesSet = data.datesSet;
    const statusChart = {};
    const statusLabel = {};
    const dates = [];
    // Track the number of valid buckets per experiment to sort traces
    const statusBucketCounts = {}
    parentGroup.forEach((parent,i)=>{  
        visibleStatuses.forEach((status, j)=>{
            // initialize status and date rows
            const statusRow = [];
            const labelRow = [];
            statusBucketCounts[status] = 0;
            // Only process if status is visible
            if(status in parent.records){
                const statusRecords = parent.records[status];
                const parentBuckets = new Bucketify({
                    "list":statusRecords,
                    getProperty:(e)=>parseFloat(e.timestamp),
                    "minRange":parseFloat(dataSummary.minTimestamp),
                    "maxRange":parseFloat(dataSummary.maxTimestamp),
                    "bucketSize":heatmapConfig.BUCKETIFY_BUCKET_SIZE,
                });
                // Maintain bucket state until next update
                let prevBucketState = {};
                parentBuckets.buckets.forEach((bucket)=>{
                    const minBucketDate = moment(bucket.min,"X").format("YYYY-MM-DD HH:mm:ss");
                    if(!datesSet){
                        if(!dates.includes(minBucketDate)){
                            dates.push(minBucketDate);
                        }
                    }
                    const sortedBucketVals = bucket.vals.sort((a,b)=>a.timestamp<b.timestamp);
                    // If more success than failures in a given bucket, mark bucket as success
                    const bucketSuccess = sortedBucketVals.reduce((acc, curr)=>{
                        if(curr.success){
                            acc++;
                        }else{
                            acc--;
                        }
                        return acc;
                    }, 0);
                    // Set bucket to show experiment if at least one experiment is ongoing or started in the bucket
                    const experimentRun = bucket.vals.some((val)=>val.status);
                    let currentBucketState = (experimentRun) ? 
                        {"status": true, "success":bucketSuccess>=0} :
                        prevBucketState;
                    // If non null current status push bucket segment
                    if(currentBucketState.status){
                        statusRow.push(1)
                    }else{
                        statusRow.push(null)
                    }
                    // Update bucket state
                    // Use last value in bucket to determine prev bucket state
                    if(sortedBucketVals.length == 0 || sortedBucketVals[sortedBucketVals.length-1].status){
                        prevBucketState = currentBucketState;
                    }else{
                        prevBucketState = {};
                    }
                    if(currentBucketState.status==null){
                        labelRow.push(null);
                    }else{
                        statusBucketCounts[status]++;
                        let bucketLabel = `ID: ${parent.id}     Exp: ${status}`;
                        if(sortedBucketVals.length>0){
                            sortedBucketVals.filter(row=>row.status).forEach((row)=>{
                                const rowDate =  moment(row.timestamp,"X").format("YYYY-MM-DD HH:mm:ss")
                                bucketLabel+=`<br>${rowDate} - ${(row.success) ? "Success" : "Failure"}`
                            })
                        }else{
                            const avgBucketTimestamp = (bucket.min+bucket.max)/2;
                            const rowDate =  moment(avgBucketTimestamp,"X").format("YYYY-MM-DD HH:mm:ss")
                            bucketLabel+=`<br>${rowDate} - ${(currentBucketState.success) ? "Success" : "Failure"}`
                        }
                        labelRow.push(bucketLabel);
                    }
                });
                // Adding minBucketDate add every date except for last max
                const maxBucketDate = moment(parentBuckets.buckets[parentBuckets.buckets.length-1].max,"X");
                if(!dates.includes(maxBucketDate.format("YYYY-MM-DD HH:mm:ss"))){
                    dates.push(maxBucketDate.format("YYYY-MM-DD HH:mm:ss"));
                }
                // Only collect dates on first valid iteration
                datesSet = true;
            }
            statusChart[status] = statusChart[status] || []
            statusChart[status].push(statusRow);
            statusLabel[status] = statusLabel[status] || []
            statusLabel[status].push(labelRow);
        })
        self.postMessage({
            "status":"update",
            "body":"row finished",
        })
    })  
    self.postMessage({
        "status":"finished",
        "statusChart":statusChart,
        "statusLabel":statusLabel,
        "dates":dates,
        "statusBucketCounts":statusBucketCounts
    })
})