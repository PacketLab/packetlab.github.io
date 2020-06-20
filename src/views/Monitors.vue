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
                    <graph :data="latencyData" :layout="latencyLayout" :spinner="latencySpinner"></graph>
                </ac-col>
            </ac-grid>
        </div>
    </div>
</template>
<script type="text/javascript">
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
                latencySpinner:{
                    show:true,
                    message:"Generating graph..."
                },
                latencyData:{
                    "ready":false,
                    "data":[],
                },
                latencyLayout:{
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
                }
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
            processLatencyData(){
                this.latencySpinner={show:true,message:"Sorting data..."};
                this.latencyData.ready=false;
                this.latencyLayout.ready=false;
                let {toTime,fromTime}=this.timeRange
                const latencyExperiments = this.$store.state.experiments.filter((exp)=>exp.category=="latency").map(exp=>exp.name);
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const jsonDataRows = this.$store.state.data;
                const latencyResults = {}
                const addLatencyRecord = (record, exp)=>{
                    if(!latencyResults[exp]){
                        latencyResults[exp] = new Array(24).fill(null);
                    }
                    // Time is in nanoseconds, convert to ms
                    const sendTime = record.ctrl_stime/(10**6);
                    const recvTime = record.ctrl_rtime/(10**6);
                    const latency = (recvTime-sendTime);
                    const hours = moment(sendTime,"X").utc().hours();
                    // Verify data is properly parsed
                    if(!isNaN(hours) && !isNaN(latency)){
                        if(!latencyResults[exp][hours]){
                            latencyResults[exp][hours] = []
                        }
                        latencyResults[exp][hours].push(latency);
                    }
                }
                let processedRows = 0;
                jsonDataRows.forEach((curr)=>{
                    if((curr.start>=fromTime && curr.start<=toTime)||
                    (curr.end>=fromTime && curr.end<=toTime)){
                        if(latencyExperiments.includes(curr.exp)){
                            if(curr.exp=="DNS_local"){
                                curr.data.rst_list.forEach((record)=>{
                                    addLatencyRecord(record, curr.exp)
                                });
                            }else{
                                addLatencyRecord(curr.data, curr.exp);
                            }
                        }
                    }
                    this.latencySpinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                });
                let maxAvgLatency = Number.MIN_SAFE_INTEGER;
                Object.values(latencyResults).forEach((expData)=>{
                    Object.keys(expData).forEach((hour)=>{    
                        // Replace list of latencies with avg latency
                        expData[hour] = expData[hour].reduce((acc, curr)=>acc+curr)/expData[hour].length;
                        maxAvgLatency = Math.max(maxAvgLatency,expData[hour]);
                    })
                });
                this.latencySpinner.message="Generating graph...";
                this.latencyData.data=[];
                const markerBorderWidth = 2;
                const utcHours = new Array(24).fill().map((v,i)=>i); 
                Object.keys(latencyResults).forEach((exp)=>{
                    const traceColor = Color.random()
                    this.latencyData.data.push({
                        x:utcHours,
                        y:latencyResults[exp],
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
                this.latencyLayout.layout.yaxis.range=[0,maxAvgLatency+markerBorderWidth];
                this.latencyData.ready=true;
                this.latencyLayout.ready=true;
                this.latencySpinner.show=false;
            },
            initGraphData(){
                this.heatmapSpinner={show:true,message:"Fetching data..."};
                this.latencySpinner={show:true,message:"Fetching data..."};
                this.$store.dispatch('loadData',this).then(()=>{
                    this.processHeatmapData();
                    if(this.monitorIDs){
                        this.processLatencyData();
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