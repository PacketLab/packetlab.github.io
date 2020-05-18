// Import bucketify and moment
self.importScripts("bucketify.min.js");
self.importScripts("moment.js");
self.addEventListener("message",(e)=>{
    const data = e.data;
    const parentGroup = data.parentGroup;
    const heatmapConfig = data.heatmapConfig;
    const dataSummary = data.dataSummary;
    const hiddenStatus = data.hiddenStatus;
    const datesSet = data.datesSet;
    const statusChart = [];
    const statusLabel = [];
    const dates = [];
    parentGroup.forEach((parent,i)=>{  
        // initialize status and date rows
        const statusRow = [];
        const labelRow = []
        const parentBuckets = new Bucketify({
            "list":parent.records,
            getProperty:(e)=>parseFloat(e.timestamp),
            "minRange":parseFloat(dataSummary.minTimestamp),
            "maxRange":parseFloat(dataSummary.maxTimestamp),
            "bucketSize":heatmapConfig.BUCKETIFY_BUCKET_SIZE,
        });
        // Maintain bucket state until next update
        let prevBucketState = {};
        parentBuckets.buckets.forEach((bucket)=>{
            if(!datesSet && i==0){
                const minBucketDate = moment(bucket.min,"X");
                if(!dates.includes(minBucketDate.format("YYYY-MM-DD HH:mm:ss"))){
                    dates.push(minBucketDate.format("YYYY-MM-DD HH:mm:ss"));
                }
            }
            let currentBucketState = (bucket.vals.length==0) ? prevBucketState 
                : {"status":bucket.vals[0].status,"success":bucket.vals[0].success,"exp":bucket.vals[0].exp};
            currentBucketState = (currentBucketState.status==null || heatmapConfig.statusTypes[currentBucketState.status].hidden) ? {} 
                : currentBucketState;
            const bucketStatusValue = (currentBucketState.status!=null) ? heatmapConfig.statusTypes[currentBucketState.status].value : null;
            // Update bucket state
            prevBucketState = currentBucketState;
            statusRow.push(bucketStatusValue);
            const avgBucketDate = moment((bucket.min+bucket.max)/2,"X").format("YYYY-MM-DD HH:mm:ss");
            const bucketLabelDate =  (bucket.vals[0]==null) ? avgBucketDate :
                moment(bucket.vals[0].timestamp,"X").format("YYYY-MM-DD HH:mm:ss");
            const bucketLabel = (currentBucketState.status==null) ? null 
                : `Date: ${bucketLabelDate}<br>ID: ${parent.id}<br>Exp: ${currentBucketState.exp}<br>Success: ${currentBucketState.success}`;
            labelRow.push(bucketLabel);
        });
        // Adding minBucketDate add every date except for last max
        const maxBucketDate = moment(parentBuckets.buckets[parentBuckets.buckets.length-1].max,"X");
        if(!dates.includes(maxBucketDate.format("YYYY-MM-DD HH:mm:ss"))){
            dates.push(maxBucketDate.format("YYYY-MM-DD HH:mm:ss"));
        }
        statusChart.push(statusRow);
        statusLabel.push(labelRow);
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
    })
})