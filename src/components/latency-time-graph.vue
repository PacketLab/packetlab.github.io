<template>
    <graph :data="latencyTimeData" :layout="latencyTimeLayout" :spinner="latencyTimeSpinner"></graph>
</template>
<script type="text/javascript">
    import stats from "stats-lite"
    import graph from "@/components/graph";
    import heatmap from "@/components/heatmap"
    import moment from "moment"
    import Color from "ac-colors"
    export default {
        props:{
            spinnerMessage:{
                type:String
            }
        },
        data(){
            return {
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
                }
            }
        },
        components:{
            graph
        },
        watch:{
            spinnerMessage(){
                this.latencyTimeSpinner.message = this.spinnerMessage;
            }
        }
        methods:{
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
            }
        }
    }
</script>