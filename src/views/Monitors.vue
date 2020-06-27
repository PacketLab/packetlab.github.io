<template>
    <div class="monitors">
        <main-header :title="title"></main-header>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <date-range-dropdown :callback="processHeatmapData" :route="{name:'Monitors',params:{id:this.params.id}}"  v-on:change="setTimeRange"></date-range-dropdown>
            </ac-col>
        </ac-grid>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11" class="graph-row">
                <heatmap :spinner="heatmapSpinner" :dataSummary="dataSummary" legend></heatmap>
            </ac-col>
        </ac-grid>
        <div v-if='monitorIDs'>
            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="latencyTimeData" :layout="latencyTimeLayout" :spinner="latencyTimeSpinner"></graph>
                </ac-col>
            </ac-grid>
            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="latencyHourlyData" :layout="latencyHourlyLayout" :spinner="latencyHourlySpinner"></graph>
                </ac-col>
            </ac-grid>
            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="bandwidthTimeData" :layout="bandwidthTimeLayout" :spinner="bandwidthTimeSpinner"></graph>
                </ac-col>
            </ac-grid>

            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="bandwidthHourlyData" :layout="bandwidthHourlyLayout" :spinner="bandwidthHourlySpinner"></graph>
                </ac-col>
            </ac-grid>
        </div>
    </div>
</template>
<script type="text/javascript">
    import stats from "stats-lite"
    import mainHeader from "@/components/main-header"
    import graph from "@/components/graph";
    import heatmap from "@/components/heatmap"
    import dateRangeDropdown from "@/components/date-range-dropdown"
    import moment from "moment"
    import Color from "ac-colors"
    export default {
        data(){
            return {
                timeRange:{toTime:null,fromTime:null},
                defaultTitle:"Monitors Overview",
                title:"",
                dataSummary:{
                    "ready":false,
                },
                heatmapSpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                latencyHourlySpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                latencyHourlyData:{
                    "ready":false,
                    "data":[],
                },
                latencyHourlyLayout:{
                    "ready":false,
                    "layout":{
                        "title":"Average DNS Query Latency by Hour",
                        "xaxis":{
                            "title":"Hour of Day (UTC)",
                            "range":[0,23],
                            "dtick":1
                        },
                        "yaxis":{
                            "title":"Average Endpoint DNS Query Latency (ms)",
                        }
                    }
                },
                latencyTimeSpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                latencyTimeData:{
                    "ready":false,
                    "data":[],
                },
                latencyTimeLayout:{
                    "ready":false,
                    "layout":{
                        "title":"DNS Query Latency to Different DNS Resolvers over Time",
                        "xaxis":{
                            "title":"Date",
                            "type":"date"
                        },
                        "yaxis":{
                            "title":"Endpoint DNS Query Latency (ms)",
                        }
                    }
                },
                bandwidthTimeSpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                bandwidthTimeData:{
                    "ready":false,
                    "data":[],
                },
                bandwidthTimeLayout:{
                    "ready":false,
                    "layout":{
                        "title":"Available Bandwidth & Bottleneck Bandwidth to Controller over Time",
                        "xaxis":{
                            "title":"Date",
                            "type":"date"
                        },
                        "yaxis":{
                            "title":"Measured Bandwidth (Mbps)",
                        }
                    }
                },
                bandwidthHourlySpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                bandwidthHourlyData:{
                    "ready":false,
                    "data":[],
                },
                bandwidthHourlyLayout:{
                    "ready":false,
                    "layout":{
                        "title":"Average Available Bandwidth & Bottleneck Bandwidth to Controller by Hour",
                        "xaxis":{
                            "title":"Hour of Day (UTC)",
                            "range":[0,23],
                            "dtick":1
                        },
                        "yaxis":{
                            "title":"Average Measured Bandwidth (Mbps)",
                        }
                    }
                },
            }
        },
        components:{
            "main-header":mainHeader,
            "heatmap":heatmap,
            "date-range-dropdown":dateRangeDropdown,
            "graph":graph,
        },
        computed:{
            params(){
                return this.$route.params;
            },
            query(){
                return this.$route.query;
            },
            rangeDropdownOptions(){
                return Object.values(this.rangeValues)
            },
            monitorIDs(){
                return (this.params.id!=null) ? [this.params.id] : null;
            }
        },
        methods:{
            setTimeRange(range){
                this.timeRange = range;
            },
            setTitle(){
                if(this.params.id!=null){
                    this.title = "Monitor "+this.params.id;
                }else{
                    this.title = this.defaultTitle;
                }
            },
            processHeatmapData(){
                this.heatmapSpinner={show:true,message:"Sorting data..."};
                let {toTime,fromTime}=this.timeRange
                // Reduce data
                const dataSummary = this.dataSummary;
                dataSummary.ready = false;
                dataSummary.minTimestamp=Number.MAX_VALUE;
                dataSummary.maxTimestamp=0;
                // Default fromTime is 0
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                dataSummary.type = "Monitor";
                dataSummary.statusTypes = {};
                const jsonDataRows = this.$store.state.data;
                let processedRows = 0;
                const groupedData = Object.values(jsonDataRows.reduce((acc,curr)=>{
                    this.heatmapSpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                    const index = "M"+curr.monitor;
                    // Limit data to from fromTime to toTime
                    if((curr.start>=fromTime && curr.start<=toTime)||
                    (curr.end>=fromTime && curr.end<=toTime)){
                        // If monitorIDs is set, limit to monitorIDs
                        if(this.monitorIDs==null || (Array.isArray(this.monitorIDs) && this.monitorIDs.includes(index))){
                            const dataStartTime = Math.max(fromTime,curr.start);
                            const dataEndTime = Math.min(toTime,curr.end);
                            // Update dataSummary max and min timestamp
                            if(dataStartTime>dataSummary.maxTimestamp){
                                dataSummary.maxTimestamp=dataStartTime;
                            }
                            if(dataStartTime<dataSummary.minTimestamp){
                                dataSummary.minTimestamp=dataStartTime;
                            }
                            if(dataEndTime>dataSummary.maxTimestamp){
                                dataSummary.maxTimestamp=dataEndTime;
                            }
                            if(dataEndTime<dataSummary.minTimestamp){
                                dataSummary.minTimestamp=dataEndTime;
                            }
                            // If index for monitor is not set, make new object
                            if(acc[index]==null){
                                 acc[index] = {
                                    "id":index,
                                    "minTimestamp": Math.min(dataStartTime,dataEndTime),
                                    "maxTimestamp": Math.max(dataStartTime,dataEndTime),
                                    "records":[]
                                 }
                            }
                            // Update current monitor max and min timestamp
                            if(dataStartTime>acc[index].maxTimestamp){
                                acc[index].maxTimestamp=dataStartTime;
                            }
                            if(dataStartTime<acc[index].minTimestamp){
                                acc[index].minTimestamp=dataStartTime;
                            }
                            if(dataEndTime>acc[index].maxTimestamp){
                                acc[index].maxTimestamp=dataEndTime;
                            }
                            if(dataEndTime<acc[index].minTimestamp){
                                acc[index].minTimestamp=dataEndTime;
                            }
                            // Push one record for experiment start and one record for experiment end
                            const status = curr.exp;
                            acc[index].records.push({
                                "status": status,
                                "success": curr.success===1,
                                "exp":curr.exp,
                                "ip": curr.ip,
                                "timestamp":dataStartTime,
                            });
                            acc[index].records.push({
                                "status": null,
                                "success": curr.success===1,
                                "exp":curr.exp,
                                "ip": curr.ip,
                                "timestamp":dataEndTime,
                            });
                            // Add status to data summary;
                            if(dataSummary.statusTypes[status]==null){
                                const baseColor = Color.random();
                                dataSummary.statusTypes[status]={
                                    "type":status,
                                    "hidden":false,
                                    "color":baseColor.rgbString.toLowerCase(),
                                }
                            }
                        }
                    }
                    return acc;
                },{}));
                const statusTypeList = Object.values(dataSummary.statusTypes);
                const valueIncrement = !isFinite(1/(statusTypeList.length-1)) ? 1 : 1/(statusTypeList.length-1);
                statusTypeList.forEach((status,i)=>{
                    status['value'] =  i*valueIncrement;
                })
                // If min and max timestamps not updated, set them equal to from and to range
                dataSummary.minTimestamp = (dataSummary.minTimestamp==Number.MAX_VALUE) ? fromTime : dataSummary.minTimestamp;
                dataSummary.maxTimestamp = (dataSummary.maxTimestamp==0) ? toTime : dataSummary.maxTimestamp;
                dataSummary.startDate = moment(dataSummary.minTimestamp,"X").format("YYYY-MM-DD HH:mm:ss");
                dataSummary.endDate = moment(dataSummary.maxTimestamp,"X").format("YYYY-MM-DD HH:mm:ss");
                dataSummary.groupedData = groupedData;
                dataSummary.ready = true;
            },
            processLatencyHourlyData(){
                this.latencyHourlySpinner={show:true,message:"Sorting data..."};
                this.latencyHourlyData.ready=false;
                this.latencyHourlyLayout.ready=false;
                let {toTime,fromTime}=this.timeRange
                const latencyHourlyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="latency").map(exp=>exp.name);
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const monitorIDs = this.monitorIDs.map((id)=>id.toLowerCase());
                const jsonDataRows = this.$store.state.data;
                const latencyHourlyResults = {}
                const addLatencyHourlyRecord = (record, exp)=>{
                    if(!latencyHourlyResults[exp]){
                        latencyHourlyResults[exp] = new Array(24).fill();
                        latencyHourlyResults[exp] = latencyHourlyResults[exp].map(()=>[]);
                    }
                    
                    // Time is in nanoseconds, convert to ms
                    const sendTime = record.ctrl_stime/(10**6);
                    const recvTime = record.ctrl_rtime/(10**6);
                    const latency = (recvTime-sendTime);
                    const hours = moment(sendTime,"x").utc().hours();
                    // Verify data is properly parsed
                    if(!isNaN(hours) && !isNaN(latency)){
                        latencyHourlyResults[exp][hours].push(latency);
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    const index = ("M"+curr.monitor).toLowerCase();
                    if(monitorIDs.includes(index)){
                        if((curr.start>=fromTime && curr.start<=toTime)||
                        (curr.end>=fromTime && curr.end<=toTime)){
                            if(latencyHourlyExperiments.includes(curr.exp)){
                                if(curr.exp=="DNS_local"){ 
                                    addLatencyHourlyRecord(curr.data.rst_list[0], curr.exp)
                                }else{
                                    addLatencyHourlyRecord(curr.data, curr.exp);
                                }
                            }
                        }
                    }
                    this.latencyHourlySpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                Object.keys(latencyHourlyResults).forEach((expName)=>{
                    let prevLatency = null;
                    latencyHourlyResults[expName] = latencyHourlyResults[expName].map((hourData)=>{
                        const filteredHourData = hourData.filter((val)=>!!val);
                        if(filteredHourData.length==0){
                            return prevLatency;
                        }
                        const avgLatency = stats.mean(filteredHourData);
                        prevLatency = avgLatency;
                        return avgLatency; 
                    });
                });
                this.latencyHourlySpinner.message="Generating graph...";
                this.latencyHourlyData.data=[];
                const markerBorderWidth = 2;
                const utcHours = new Array(24).fill().map((v,i)=>i); 
                Object.keys(latencyHourlyResults).forEach((exp)=>{
                    const traceColor = Color.random();
                    this.latencyHourlyData.data.push({
                        x:utcHours,
                        y:latencyHourlyResults[exp],
                        name:exp,
                        mode:"lines+markers",
                        line:{
                            color:traceColor.rgbString
                        },
                        marker:{
                            color:"rgba(0,0,0,0)",
                            line:{
                                color:traceColor.rgbString,
                                width:markerBorderWidth
                            }
                        }
                    })
                })
                // Update yaxis range
                this.latencyHourlyData.ready=true;
                this.latencyHourlyLayout.ready=true;
                this.latencyHourlySpinner.show=false;
            },
            processLatencyTimeData(){
                this.latencyTimeSpinner={show:true,message:"Sorting data..."};
                this.latencyTimeData.ready=false;
                this.latencyTimeLayout.ready=false;
                let {toTime,fromTime}=this.timeRange
                const latencyTimeExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="latency").map(exp=>exp.name);
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const monitorIDs = this.monitorIDs.map((id)=>id.toLowerCase());
                const jsonDataRows = this.$store.state.data;
                const latencyTimeResults = {}
                const addLatencyTimeRecord = (record, exp)=>{
                    if(!latencyTimeResults[exp]){
                        latencyTimeResults[exp] = []
                    }
                    
                    // Time is in nanoseconds, convert to ms
                    const sendTime = record.ctrl_stime/(10**6);
                    const recvTime = record.ctrl_rtime/(10**6);
                    const latency = (recvTime-sendTime);
                    const timestamp = moment(sendTime,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");
                    // Verify data is properly parsed
                    if(!isNaN(latency)){
                        latencyTimeResults[exp].push({
                            timestamp,
                            latency
                        });
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    const index = ("M"+curr.monitor).toLowerCase();
                    if(monitorIDs.includes(index)){
                        if((curr.start>=fromTime && curr.start<=toTime)||
                        (curr.end>=fromTime && curr.end<=toTime)){
                            if(latencyTimeExperiments.includes(curr.exp)){
                                if(curr.exp=="DNS_local"){ 
                                    addLatencyTimeRecord(curr.data.rst_list[0], curr.exp)
                                }else{
                                    addLatencyTimeRecord(curr.data, curr.exp);
                                }
                            }
                        }
                    }
                    this.latencyTimeSpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                this.latencyTimeSpinner.message="Generating graph...";
                this.latencyTimeData.data=[];
                const markerBorderWidth = 2;
                Object.keys(latencyTimeResults).forEach((exp)=>{
                    const traceColor = Color.random();
                    this.latencyTimeData.data.push({
                        x:latencyTimeResults[exp].map(record=>record.timestamp),
                        y:latencyTimeResults[exp].map(record=>record.latency),
                        name:exp,
                        mode:"lines+markers",
                        line:{
                            color:traceColor.rgbString
                        },
                        marker:{
                            color:"rgba(0,0,0,0)",
                            line:{
                                color:traceColor.rgbString,
                                width:markerBorderWidth
                            }
                        }
                    })
                })
                // Update yaxis range
                this.latencyTimeData.ready=true;
                this.latencyTimeLayout.ready=true;
                this.latencyTimeSpinner.show=false;
            },
            processBandwidthTimeData(){
                this.bandwidthTimeSpinner={show:true,message:"Sorting data..."};
                this.bandwidthTimeData.ready=false;
                this.bandwidthTimeLayout.ready=false;
                let {toTime,fromTime}=this.timeRange
                const bandwidthTimeExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="bandwidth").map(exp=>exp.name);
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const monitorIDs = this.monitorIDs.map((id)=>id.toLowerCase());
                const jsonDataRows = this.$store.state.data;
                const bandwidthTimeResults = {}
                const addBandwidthTimeRecord = (data)=>{
                    bandwidthTimeResults.avail_band = bandwidthTimeResults.avail_band || [];
                    bandwidthTimeResults.btnk_band = bandwidthTimeResults.btnk_band || [];
                    
                    // Time is in nanoseconds, convert to ms
                    const sendTime = data.ctrl_stime/(10**6);
                    const timestamp = moment(sendTime,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");

                    if(data.avail_band && data.btnk_band){
                        bandwidthTimeResults.avail_band.push({
                            // Bandwidth is in bps, convert to Mbps
                            "bandwidth":data.avail_band / (10**6),
                            timestamp
                        });
                        bandwidthTimeResults.btnk_band.push({
                            // Bandwidth is in bps, convert to Mbps
                            "bandwidth":data.btnk_band / (10**6),
                            timestamp
                        });
                    }
                    
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    const index = ("M"+curr.monitor).toLowerCase();
                    if(monitorIDs.includes(index)){
                        if((curr.start>=fromTime && curr.start<=toTime)||
                        (curr.end>=fromTime && curr.end<=toTime)){
                            if(bandwidthTimeExperiments.includes(curr.exp)){
                                addBandwidthTimeRecord(curr.data);
                            }
                        }
                    }
                    this.bandwidthTimeSpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                this.bandwidthTimeSpinner.message="Generating graph...";
                this.bandwidthTimeData.data=[];
                const markerBorderWidth = 2;
                Object.keys(bandwidthTimeResults).forEach((exp)=>{
                    const traceColor = Color.random();
                    this.bandwidthTimeData.data.push({
                        x:bandwidthTimeResults[exp].map(record=>record.timestamp),
                        y:bandwidthTimeResults[exp].map(record=>record.bandwidth),
                        name:exp,
                        mode:"lines+markers",
                        line:{
                            color:traceColor.rgbString
                        },
                        marker:{
                            color:"rgba(0,0,0,0)",
                            line:{
                                color:traceColor.rgbString,
                                width:markerBorderWidth
                            }
                        }
                    })
                })
                // Update yaxis range
                this.bandwidthTimeData.ready=true;
                this.bandwidthTimeLayout.ready=true;
                this.bandwidthTimeSpinner.show=false;
            },
            processBandwidthHourlyData(){
                this.bandwidthHourlySpinner={show:true,message:"Sorting data..."};
                this.bandwidthHourlyData.ready=false;
                this.bandwidthHourlyLayout.ready=false;
                let {toTime,fromTime}=this.timeRange
                const bandwidthHourlyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="bandwidth").map(exp=>exp.name);
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const monitorIDs = this.monitorIDs.map((id)=>id.toLowerCase());
                const jsonDataRows = this.$store.state.data;
                const bandwidthHourlyResults = {}
                const addBandwidthHourlyRecord = (data)=>{
                    if(!bandwidthHourlyResults.avail_band){
                        bandwidthHourlyResults.avail_band = new Array(24).fill();
                        bandwidthHourlyResults.avail_band = bandwidthHourlyResults.avail_band.map(()=>[]);
                    }
                    if(!bandwidthHourlyResults.btnk_band){
                        bandwidthHourlyResults.btnk_band = new Array(24).fill();
                        bandwidthHourlyResults.btnk_band = bandwidthHourlyResults.btnk_band.map(()=>[]);
                    }
                    
                    // Time is in nanoseconds, convert to ms
                    const sendTime = data.ctrl_stime/(10**6);
                    const hours = moment(sendTime,"x").utc().hours();

                    if(data.avail_band && data.btnk_band){
                        // Bandwidth is in bps, convert to Mbps
                        bandwidthHourlyResults.avail_band[hours].push(data.avail_band / (10**6));
                        bandwidthHourlyResults.btnk_band[hours].push(data.btnk_band / (10**6));
                    }
                    
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    const index = ("M"+curr.monitor).toLowerCase();
                    if(monitorIDs.includes(index)){
                        if((curr.start>=fromTime && curr.start<=toTime)||
                        (curr.end>=fromTime && curr.end<=toTime)){
                            if(bandwidthHourlyExperiments.includes(curr.exp)){
                                addBandwidthHourlyRecord(curr.data);
                            }
                        }
                    }
                    this.bandwidthHourlySpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                const meanBandwidthHourlyResults = {}
                // Standard deviation data for error bars
                const stdevBandwidthHourlyResults = {}
                Object.keys(bandwidthHourlyResults).forEach((expName)=>{
                    let prevAvgBandwidth = null;
                    let prevStdevBandwidth = null;
                    meanBandwidthHourlyResults[expName] = bandwidthHourlyResults[expName].map((hourData)=>{
                        const filteredHourData = hourData.filter((val)=>!!val);
                        if(filteredHourData.length==0){
                            return prevAvgBandwidth;
                        }
                        const avgBandwidth =  stats.mean(filteredHourData);
                        prevAvgBandwidth = avgBandwidth;
                        return avgBandwidth; 
                    });
                    stdevBandwidthHourlyResults[expName] = bandwidthHourlyResults[expName].map((hourData)=>{
                        const filteredHourData = hourData.filter((val)=>!!val);
                        if(filteredHourData.length==0){
                            return prevStdevBandwidth;
                        }
                        const stdevBandwidth =  stats.sampleStdev(filteredHourData);
                        prevStdevBandwidth = stdevBandwidth;
                        return stdevBandwidth; 
                    });
                });
                this.bandwidthHourlySpinner.message="Generating graph...";
                this.bandwidthHourlyData.data=[];
                const markerBorderWidth = 2;
                const utcHours = new Array(24).fill().map((v,i)=>i); 
                Object.keys(meanBandwidthHourlyResults).forEach((exp)=>{
                    const traceColor = Color.random();
                    this.bandwidthHourlyData.data.push({
                        x:utcHours,
                        y:meanBandwidthHourlyResults[exp],
                        error_y: {
                            type: 'data',
                            array: stdevBandwidthHourlyResults[exp],
                            visible: true,
                        },
                        name:exp,
                        mode:"lines+markers",
                        line:{
                            color:traceColor.rgbString
                        },
                        marker:{
                            color:"rgba(0,0,0,0)",
                            line:{
                                color:traceColor.rgbString,
                                width:markerBorderWidth
                            }
                        }
                    })
                })
                // Update yaxis range
                this.bandwidthHourlyData.ready=true;
                this.bandwidthHourlyLayout.ready=true;
                this.bandwidthHourlySpinner.show=false;
            },
            initGraphData(){
                this.heatmapSpinner={show:true,message:"Fetching data..."};
                this.latencyHourlySpinner={show:true,message:"Fetching data..."};
                this.latencyTimeSpinner={show:true,message:"Fetching data..."};
                this.bandwidthTimeSpinner={show:true,message:"Fetching data..."};
                this.bandwidthHourlySpinner={show:true,message:"Fetching data..."};
                this.$store.dispatch('loadData',this).then(()=>{
                    this.processHeatmapData();
                    if(this.monitorIDs){
                        this.processLatencyHourlyData();
                        this.processLatencyTimeData();
                        this.processBandwidthTimeData();
                        this.processBandwidthHourlyData();
                    }
                })
            }
        },
        watch:{
            params:{
                handler(){
                    this.setTitle();
                },
                immediate:true,
            },
            monitorIDs:{
                immediate:true,
                deep:true,
                async handler(){   
                    await this.$nextTick();
                    this.initGraphData();
                }
            }
        }
    }
</script>
<style lang='scss' scoped>
    .graph-row{
        margin: 2% 0;
    }
</style>