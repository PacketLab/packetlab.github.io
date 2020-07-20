<template>
    <div class="monitors">
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <date-range-dropdown :callback="processHeatmapData" :route="{name:'Monitors',params:{id:this.params.id}}"  v-on:change="setTimeRange"></date-range-dropdown>
            </ac-col>
        </ac-grid>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11" class="graph-row">
                <heatmap :spinner="heatmapSpinner" :dataSummary="dataSummary" legend
                :embedIDURL="(id)=>`<a href='#/monitors/${id}'>${id}</a>`"></heatmap>
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
            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="rttTimeData" :layout="rttTimeLayout" :spinner="rttTimeSpinner"></graph>
                </ac-col>
            </ac-grid>
            <ac-grid cols=12 align-h="center">
                <ac-col cols="11" class="graph-row">
                    <graph :data="rttHourlyData" :layout="rttHourlyLayout" :spinner="rttHourlySpinner"></graph>
                </ac-col>
            </ac-grid>
        </div>
    </div>
</template>
<script type="text/javascript">
    import stats from "stats-lite"
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
                rttTimeSpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                rttTimeData:{
                    "ready":false,
                    "data":[],
                },
                rttTimeLayout:{
                    "ready":false,
                    "layout":{
                        "title":"Endpoint Controller RTT over Time",
                        "xaxis":{
                            "title":"Date",
                            "type":"date"
                        },
                        "yaxis":{
                            "title":"Endpoint Controller RTT (ms)",
                        }
                    }
                },
                rttHourlySpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                rttHourlyData:{
                    "ready":false,
                    "data":[],
                },
                rttHourlyLayout:{
                    "ready":false,
                    "layout":{
                        "title":"Average Endpoint Controller RTT by Hour",
                        "xaxis":{
                            "title":"Hour of Day (UTC)",
                            "range":[0,23],
                            "dtick":1
                        },
                        "yaxis":{
                            "title":"Average Endpoint Controller RTT (ms)",
                        }
                    }
                },
            }
        },
        components:{
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
            processHeatmapData(jsonDataRows,fromTime, toTime){
                this.heatmapSpinner={show:true,message:"Sorting data..."};
                // Reduce data
                const dataSummary = this.dataSummary;
                dataSummary.ready = false;
                dataSummary.minTimestamp=Number.MAX_VALUE;
                dataSummary.maxTimestamp=0;
                dataSummary.type = "Monitor";
                dataSummary.statusTypes = {};
                let processedRows = 0;
                const groupedData = Object.values(jsonDataRows.reduce((acc,curr)=>{
                    this.heatmapSpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                    const index = "M"+curr.monitor;
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
                            "records":{}
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
                    // Divide up records by status
                    acc[index].records[status] = acc[index].records[status] || [];
                    acc[index].records[status].push({
                        "status": status,
                        "success": curr.success===1,
                        "exp":curr.exp,
                        "ip": curr.ip,
                        "timestamp":dataStartTime,
                    });
                    acc[index].records[status].push({
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
                    return acc;
                },{}));
                // If min and max timestamps not updated, set them equal to from and to range
                dataSummary.minTimestamp = (dataSummary.minTimestamp==Number.MAX_VALUE) ? fromTime : dataSummary.minTimestamp;
                dataSummary.maxTimestamp = (dataSummary.maxTimestamp==0) ? toTime : dataSummary.maxTimestamp;
                dataSummary.startDate = moment(dataSummary.minTimestamp,"X").format("YYYY-MM-DD HH:mm:ss");
                dataSummary.endDate = moment(dataSummary.maxTimestamp,"X").format("YYYY-MM-DD HH:mm:ss");
                dataSummary.groupedData = groupedData;
                dataSummary.ready = true;
            },
            processLatencyHourlyData(jsonDataRows){
                this.latencyHourlySpinner={show:true,message:"Sorting data..."};
                this.latencyHourlyData.ready=false;
                this.latencyHourlyLayout.ready=false;
                const latencyHourlyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="latency").map(exp=>exp.name);
                const latencyHourlyResults = {}
                const addLatencyHourlyRecord = (record, exp)=>{
                    if(record){
                        if(!latencyHourlyResults[exp]){
                            latencyHourlyResults[exp] = new Array(24).fill();
                            latencyHourlyResults[exp] = latencyHourlyResults[exp].map(()=>[]);
                        }
                        
                        // Time is in nanoseconds, convert to ms
                        const sendTime = record.end_stime/(10**6);
                        const recvTime = record.end_rtime/(10**6);
                        const latency = (recvTime-sendTime);
                        const hours = moment(sendTime,"x").utc().hours();
                        // Verify data is properly parsed
                        if(!isNaN(hours) && !isNaN(latency)){
                            latencyHourlyResults[exp][hours].push(latency);
                        }
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if(latencyHourlyExperiments.includes(curr.exp)){
                        if(curr.exp=="DNS_local"){ 
                            addLatencyHourlyRecord(curr.data.rst_list[0], curr.exp)
                        }else{
                            addLatencyHourlyRecord(curr.data, curr.exp);
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
            processLatencyTimeData(jsonDataRows){
                this.latencyTimeSpinner={show:true,message:"Sorting data..."};
                this.latencyTimeData.ready=false;
                this.latencyTimeLayout.ready=false;
                const latencyTimeExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="latency").map(exp=>exp.name);
                const latencyTimeResults = {}
                const addLatencyTimeRecord = (record, exp)=>{
                    if(record){
                        if(!latencyTimeResults[exp]){
                            latencyTimeResults[exp] = []
                        }
                        
                        // Time is in nanoseconds, convert to ms
                        const sendTime = record.end_stime/(10**6);
                        const recvTime = record.end_rtime/(10**6);
                        const latency = (recvTime-sendTime);
                        const timestamp = moment(sendTime,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");
                        // Verify data is properly parsed
                        if(!isNaN(latency)){
                            latencyTimeResults[exp].push({
                                timestamp,
                                latency,
                                sendTime
                            });
                        }
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if(latencyTimeExperiments.includes(curr.exp)){
                        if(curr.exp=="DNS_local"){ 
                            addLatencyTimeRecord(curr.data.rst_list[0], curr.exp)
                        }else{
                            addLatencyTimeRecord(curr.data, curr.exp);
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
                    // Sort records by sendTime
                    latencyTimeResults[exp].sort((a,b)=>a.sendTime-b.sendTime)
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
            processBandwidthTimeData(jsonDataRows){
                this.bandwidthTimeSpinner={show:true,message:"Sorting data..."};
                this.bandwidthTimeData.ready=false;
                this.bandwidthTimeLayout.ready=false;
                const bandwidthTimeExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="bandwidth").map(exp=>exp.name);
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
                            timestamp,
                            sendTime
                        });
                        bandwidthTimeResults.btnk_band.push({
                            // Bandwidth is in bps, convert to Mbps
                            "bandwidth":data.btnk_band / (10**6),
                            timestamp,
                            sendTime
                        });
                    }
                    
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if(bandwidthTimeExperiments.includes(curr.exp)){
                        addBandwidthTimeRecord(curr.data);
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
                    // Sort records by sendTime
                    bandwidthTimeResults[exp].sort((a,b)=>a.sendTime-b.sendTime)
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
            processBandwidthHourlyData(jsonDataRows){
                this.bandwidthHourlySpinner={show:true,message:"Sorting data..."};
                this.bandwidthHourlyData.ready=false;
                this.bandwidthHourlyLayout.ready=false;
                const bandwidthHourlyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="bandwidth").map(exp=>exp.name);
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
                    if(bandwidthHourlyExperiments.includes(curr.exp)){
                        addBandwidthHourlyRecord(curr.data);
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
            processRTTTimeData(jsonDataRows){
                this.rttTimeSpinner={show:true,message:"Sorting data..."};
                this.rttTimeData.ready=false;
                this.rttTimeLayout.ready=false;
                const rttTimeExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="rtt").map(exp=>exp.name);
                const rttTimeResults = []
                const addRTTTimeRecord = (record)=>{
                    if(record){
                        
                        // Time is in nanoseconds, convert to ms
                        const sendTime = record.ctrl_stime/(10**6);
                        const recvTime = record.ctrl_rtime/(10**6);
                        const rtt = (recvTime-sendTime);
                        const timestamp = moment(sendTime,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");
                        // Verify data is properly parsed
                        if(!isNaN(rtt)){
                            rttTimeResults.push({
                                timestamp,
                                rtt,
                                sendTime
                            });
                        }
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if(rttTimeExperiments.includes(curr.exp)){
                        if(curr.exp=="DNS_local"){ 
                            addRTTTimeRecord(curr.data.rst_list[0])
                        }else{
                            addRTTTimeRecord(curr.data);
                        }
                    }
                    this.rttTimeSpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                this.rttTimeSpinner.message="Generating graph...";
                this.rttTimeData.data=[];
                const markerBorderWidth = 2;
                const traceColor = Color.random();
                // Sort records by sendTime
               rttTimeResults.sort((a,b)=>a.sendTime-b.sendTime)
                this.rttTimeData.data.push({
                    x:rttTimeResults.map(record=>record.timestamp),
                    y:rttTimeResults.map(record=>record.rtt),
                    name:"RTT",
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
                // Update yaxis range
                this.rttTimeData.ready=true;
                this.rttTimeLayout.ready=true;
                this.rttTimeSpinner.show=false;
            },
            processRTTHourlyData(jsonDataRows){
                this.rttHourlySpinner={show:true,message:"Sorting data..."};
                this.rttHourlyData.ready=false;
                this.rttHourlyLayout.ready=false;
                const rttHourlyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="rtt").map(exp=>exp.name);
                const rttHourlyResults = new Array(24).fill().map(()=>[]);
                const addRTTHourlyRecord = (record)=>{
                    if(record){
                        // Time is in nanoseconds, convert to ms
                        const sendTime = record.ctrl_stime/(10**6);
                        const recvTime = record.ctrl_rtime/(10**6);
                        const rtt = (recvTime-sendTime);
                        const hours = moment(sendTime,"x").utc().hours();
                        // Verify data is properly parsed
                        if(!isNaN(hours) && !isNaN(rtt)){
                            rttHourlyResults[hours].push(rtt);
                        }
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if(rttHourlyExperiments.includes(curr.exp)){
                        if(curr.exp=="DNS_local"){ 
                            addRTTHourlyRecord(curr.data.rst_list[0])
                        }else{
                            addRTTHourlyRecord(curr.data);
                        }
                    }
                    this.rttHourlySpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                let prevAvgRTT = null;
                let prevStdevRTT = null;
                const meanRTTHourlyResults = rttHourlyResults.map((hourData)=>{
                    const filteredHourData = hourData.filter((val)=>!!val);
                    if(filteredHourData.length==0){
                        return prevAvgRTT;
                    }
                    const avgRTT = stats.mean(filteredHourData);
                    prevAvgRTT = avgRTT;
                    return avgRTT; 
                });
                const stdevRTTHourlyResults = rttHourlyResults.map((hourData)=>{
                    const filteredHourData = hourData.filter((val)=>!!val);
                    if(filteredHourData.length==0){
                        return prevStdevRTT;
                    }
                    const stdevRTT =  stats.sampleStdev(filteredHourData);
                    prevStdevRTT = stdevRTT;
                    return stdevRTT; 
                });
                this.rttHourlySpinner.message="Generating graph...";
                this.rttHourlyData.data=[];
                const markerBorderWidth = 2;
                const utcHours = new Array(24).fill().map((v,i)=>i); 
                const traceColor = Color.random();
                this.rttHourlyData.data.push({
                    x:utcHours,
                    y:meanRTTHourlyResults,
                    error_y: {
                        type: 'data',
                        array: stdevRTTHourlyResults,
                        visible: true,
                    },
                    name:"Avg. RTT",
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
                // Update yaxis range
                this.rttHourlyData.ready=true;
                this.rttHourlyLayout.ready=true;
                this.rttHourlySpinner.show=false;
            },
            initGraphData(){
                this.heatmapSpinner={show:true,message:"Fetching data..."};
                this.latencyHourlySpinner={show:true,message:"Fetching data..."};
                this.latencyTimeSpinner={show:true,message:"Fetching data..."};
                this.bandwidthTimeSpinner={show:true,message:"Fetching data..."};
                this.bandwidthHourlySpinner={show:true,message:"Fetching data..."};
                this.rttTimeSpinner={show:true,message:"Fetching data..."};
                this.rttHourlySpinner={show:true,message:"Fetching data..."};
                let {toTime,fromTime}=this.timeRange
                // Default fromTime is 0
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                this.$store.dispatch('loadData', fromTime).then(()=>{
                    const jsonDataRows = this.$store.state.data.filter((row, i)=>{
                        if(row.monitor){
                            const index = ("M"+row.monitor).toLowerCase();
                            this.heatmapSpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.latencyHourlySpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.latencyTimeSpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.bandwidthTimeSpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.bandwidthHourlySpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.rttTimeSpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            this.rttHourlySpinner={
                                show:true,
                                message:`Filtering data (${Math.ceil(i/this.$store.state.data.length*100)}%)`
                            };
                            return (this.monitorIDs==null || 
                                (Array.isArray(this.monitorIDs) && this.monitorIDs.map((str)=>str.toLowerCase()).includes(index))
                            )
                            && (
                                (row.start >= fromTime && row.start <= toTime) ||
                                (row.end>=fromTime && row.end<=toTime)
                            )
                        }else{
                            return false;
                        }
                    });
                    this.processHeatmapData(jsonDataRows, fromTime, toTime);
                    if(this.monitorIDs){
                        this.processLatencyHourlyData(jsonDataRows);
                        this.processLatencyTimeData(jsonDataRows);
                        this.processBandwidthTimeData(jsonDataRows);
                        this.processBandwidthHourlyData(jsonDataRows);
                        this.processRTTTimeData(jsonDataRows);
                        this.processRTTHourlyData(jsonDataRows);
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