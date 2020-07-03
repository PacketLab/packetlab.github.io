<template>
    <div class="status-heatmap" ref="wrapper">
        <div class="graph-menu" ref="graphMenu">
            <div class="legend-wrapper" v-if="legend">
                <div :class="{'legend':true,'show':showFullLegend}">
                    <div :class="['key-element', (status.hidden) ? 'disabled' : '']" v-for="status in statusTypeList" 
                    :key="status.type" 
                    @click="toggleHiddenStatus(status.type)">
                        <div class="key-color" :style="{backgroundColor:status.color}"></div>
                        <div class="key-label">{{status.type}}</div>
                    </div>
                </div>
                <div class="legend-toggle" @click="showFullLegend=!showFullLegend">{{legendToggleText}}</div>
            </div>
        </div>
        <graph :layout="graphLayout" :data="graphData" :config="graphConfig" class="graphContainer" ref="graphContainer"
        :spinner="tempSpinner"></graph>
    </div>
</template>
<script type="text/javascript">
    import graph from '@/components/graph'
    export default {
        props:{
            "dataSummary":{
                type:Object,
                default:()=>({})
            },
            "sort":{
                type:Boolean,
                default:false,
            },
            "legend":{
                type:Boolean,
                default:false,
            },
            "spinner":{
                type:Object,
                default:()=>({"show":true,"message":"Generating graph..."}),
            },
            
        },
        data(){
            return {
                BUCKETIFY_BUCKET_SIZE:30,
                HEATMAP_MIN_HEIGHT:120,
                // Bar height multiplied by number of bars for min height
                ADJUSTED_BAR_HEIGHT:50,
                graphGenerated:false,
                sortMode: "earliestFirstUpdate",
                sortFunctions:{
                    earliestFirstUpdate:(a,b)=>a.minTimestamp-b.minTimestamp,
                    latestFirstUpdate:(a,b)=>b.minTimestamp-a.minTimestamp,
                    lastUpdated:(a,b)=>b.maxTimestamp-a.maxTimestamp,
                    parentID:(a,b)=>(a.id>b.id) ? 1 : -1,
                    parentIDReverse:(a,b)=>(a.id<b.id) ? 1 : -1,
                },
                embedIDURL:(id)=>id,
                visibleStatusTypes:[],
                statusTypeList:[],
                graphConfig:{
                    "ready":false,
                    "config":{
                        "responsive":true,
                        "displayModeBar": false
                    }
                },
                graphLayout:{
                    "ready":false,
                    "layout":{
                        "xaxis":{
                            "type":"date",
                            "side":"top",
                        },
                        "yaxis":{
                            "title":{
                            }
                        },
                        "margin": {
                            "b": 20,
                            "t": 50,
                            "r":10,
                            "pad": 0,
                        },
                        "font": {
                            "family": 'sans-serif',
                            "size": 16,
                            "color": '#333'
                        } 
                    }
                },
                tempSpinner:{"show":true,"message":"Generating graph..."},
                graphData:{
                    "ready":false,
                    "data":[]
                },
                showFullLegend:false,
            }
        },
        methods:{
            updateEmbedIDURL(embedFunction){
                if(typeof embedFunction !== "function"){
                    throw TypeError("Argument 'embedFunction' must be of type function");
                }else{
                    this.embedIDURL = embedFunction;
                }
            },
            sortFunction(){
                return this.sortFunctions[this.sortMode];
            },
            scale(val,baseMin,baseMax,scaledMin,scaledMax){
                return (val-baseMin)*(scaledMax-scaledMin)/(baseMax-baseMin)+scaledMin;
            },
            toggleHiddenStatus(status){
                const statusTypes = this.dataSummary.statusTypes;
                if(statusTypes[status]!=null){
                    statusTypes[status].hidden = !statusTypes[status].hidden;
                    this.updateStatusTypeList();
                    this.graph(this.dataSummary);
                }
            },
            async graph(dataSummary){
                this.graphLayout.layout.yaxis.title.text = dataSummary.type+" ID";
                this.graphLayout.layout.xaxis.range = [dataSummary.startDate, dataSummary.endDate];
                this.graphLoading = true;
                this.graphData.ready=false;
                this.graphLayout.ready=false;
                this.graphConfig.ready=false;
                // Scale bucket size proportionally to 30 seconds per 24 hours
                this.BUCKETIFY_BUCKET_SIZE = (this.dataSummary.maxTimestamp - this.dataSummary.minTimestamp)*(3.4722*10**-4)
                await this.$nextTick();
                this.graphContainer.$el.style.height = Math.max(this.ADJUSTED_BAR_HEIGHT*dataSummary.groupedData.length,this.HEATMAP_MIN_HEIGHT)+"px";
                const promise = new Promise((resolve,reject)=>{ 
                    // Sort parent data and reverse (lowest index goes to bottom of graph)
                    dataSummary.groupedData.sort(this.sortFunction()).reverse()
                    const groupedData = JSON.parse(JSON.stringify(dataSummary.groupedData));
                    // Get parent ids for y-axis
                    dataSummary.parentIDs= groupedData.map(parent=>parent.id);
                    // Generate status chart and labels for z-values
                    // Heatmap values for visible statuses
                    const visibleStatusTypes = this.statusTypeList;
                    this.updateHeatmapCharts().then((heatmapCharts)=>{
                        this.tempSpinner.message ="Generating graph...";
                        // Reset graphData
                        this.graphData.data = [];
                        visibleStatusTypes.forEach((status, i)=>{
                            // Set colors for heatmap values
                            const colorScale=[];
                            colorScale.push(["0.0", status.color]);
                            colorScale.push(["1.0", status.color]);
                            this.graphData.data[i]={
                                "x":dataSummary.dates,
                                "y":dataSummary.parentIDs.map(id=>this.embedIDURL(id)),
                                "z":heatmapCharts.statusChart[status.type],
                                "type":'heatmap',
                                "hoverongaps":false,
                                "colorscale":colorScale,
                                "showscale":false,
                                "text":heatmapCharts.statusLabel[status.type],
                                "hoverinfo":"text",
                                "ygap":.75,
                            };
                        })
                        this.graphData.ready=true;
                        this.graphLayout.ready=true;
                        this.graphConfig.ready=true;
                        this.graphGenerated=true;
                        resolve();
                    }).catch((error)=>{
                        reject(error);
                    });
                }).finally(()=>{
                    this.graphLoading=false; 
                    this.tempSpinner.show=false;
                })
                return promise;
            },
            updateHeatmapCharts(){
                const that = this;
                const promise = new Promise((resolve,reject)=>{    
                    if(!Worker){
                        reject(Error("Web Workers not enabled"));
                    }else{
                        const worker = new Worker("workers/update-heatmap-charts.worker.js");
                        worker.addEventListener("message",(e)=>{
                            const data = e.data;
                            if(data.status=="finished"){    
                                worker.terminate();
                                that.dataSummary.dates = data.dates;
                                resolve({
                                    "statusChart":data.statusChart,
                                    "statusLabel":data.statusLabel
                                });
                            }else if(data.status=="update"){
                                this.tempSpinner.message =`Processing data (${data.body}%)`;
                            }
                        });
                        worker.postMessage({
                            "dataSummary":that.dataSummary,
                            "visibleStatusTypes":that.visibleStatusTypes,
                            "BUCKETIFY_BUCKET_SIZE":that.BUCKETIFY_BUCKET_SIZE,
                        });
                    }
                })
                return promise;
            },
            async updateStatusTypeList(){
                this.visibleStatusTypes = null;
                this.statusTypeList = null;
                await this.$nextTick();
                this.statusTypeList = Object.values(this.dataSummary.statusTypes || {});
                this.visibleStatusTypes =  this.statusTypeList.filter(status=>!status.hidden);
            }
        },
        computed:{
            graphContainer(){
                return this.$refs.graphContainer;
            },
            legendToggleText(){
                return (this.showFullLegend) ? " - Show Less" : "+ Show More";
            },
        },
        components:{
            graph
        },
        watch:{
            spinner:{
                immediate:true,
                deep:true,
                async handler(val){
                    await this.$nextTick();
                    this.tempSpinner.show=val.show;
                    if(val.message!=null){
                        this.tempSpinner.message = val.message;
                    }
                }
            },
            dataSummary:{
                immediate:true,
                deep:true,
                handler(dataSummary){
                    this.updateStatusTypeList();
                    if(dataSummary.ready){
                        this.graph(dataSummary);
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
.status-heatmap{
    position: relative;
    box-sizing: border-box;
    font-size: 16px;
    .graph-menu{
        padding: 1%;
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        align-items: flex-start;
        background-color: #FFF;
        box-shadow: 3px 3px 5px rgba(0,0,0,0.1);

    }
    .graphContainer{
        height: inherit;
        padding-bottom: 20px;
    }
    .legend,
    .sort-menu
    {
        font-family: sans-serif;
        display: inline-block;
        position: relative;
        z-index: 100;
    }
    .legend{
        transition: max-height 0.5s cubic-bezier(0, 1.05, 0, 1);
        display: inline-flex;
        flex-direction: row;
        position: relative;
        flex-wrap: wrap;
        max-height: 1.5em;
        overflow-y: hidden;
        line-height: 1.5em;
        &.show{
            max-height: 100vh;
            transition: max-height 0.5s cubic-bezier(0, 0, 1, 0.4);
        }
        & > div{
            margin:  0 1em;
            display: flex;
            align-items: center;
            cursor: pointer;
            &.disabled{
                opacity: 0.5;
            }
        }
        .key-color{
            min-height: 1em;
            min-width: 1em;
            display: block;
        }
        .key-label{
            margin-left: 10%;
        }
    }
    .legend-wrapper{
        display: flex;
        align-items: flex-start;
        max-width: 50%;
        flex-wrap: wrap;
    }
    .legend-toggle{
        color: #005aff;
        cursor: pointer;
        transition: filter 0.15s ease-in-out;
        filter: brightness(1);
        display: inline-flex;
        &.hidden{
            opacity: 0;
        }
        &:hover{
            filter: brightness(1.5);
        }
    }
    .sort-menu{
        padding: 0 1%;
        display: inline-flex;
        align-items: center;
        width: max-content;
        flex-wrap: wrap;
        h2,label{
            padding: 0;
            font-size: 1em;
            margin: 0 0.5em 0;
            white-space: nowrap;
            font-weight: bold;
        }
        .sortTypeLabel{
            margin: 0 0.5em 0 1em;
            white-space: nowrap;
        }
    }
}
</style>