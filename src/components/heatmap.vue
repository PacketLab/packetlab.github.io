<template>
    <div class="status-heatmap" ref="wrapper">
        <div class="spinner-view" ref="spinner">
            <div class="spinner">
                <div v-for="n in 4" :class="'rect'+n" :key="n"></div>
            </div>
            <div class="spinner-text">{{spinnerMessage}}</div>
        </div>
        <div class="graph-menu" ref="graphMenu">
            <div class="legend-wrapper" v-if="legend">
                <div class="legend">
                    <div :class="['key-element', (status.hidden) ? 'disabled' : '']" v-for="status in statusTypeList" 
                    :key="status.type" 
                    @click="toggleHiddenStatus(status.type)">
                        <div class="key-color" :style="{backgroundColor:status.color}"></div>
                        <div class="key-label">{{status.type}}</div>
                    </div>
                </div>
            </div>
        </div>
        <graph :layout="graphLayout" :data="graphData" :config="graphConfig" class="graphContainer" ref="graphContainer"></graph>
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
                BUCKETIFY_BUCKET_SIZE:3600,
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
                spinnerMessage:"Generating graph...",
                graphData:{
                    "ready":false,
                    "data":[]
                }
            }
        },
        methods:{
            showSpinner(val){
                if(val){
                    this.$refs.spinner.classList.add("active");
                }else{
                    this.$refs.spinner.classList.remove("active");
                }
            },
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
                    const visibleStatusTypes = Object.values(dataSummary.statusTypes).filter(status=>!status.hidden);
                    const visibleStatusValues = visibleStatusTypes.map(status=>status.value);
                    // Min and max heatmap values for viable statuses
                    const minVisibleStatusValue = Math.min(...visibleStatusValues);
                    const maxVisibleStatusValue = Math.max(...visibleStatusValues);
                    this.updateHeatmapCharts().then((heatmapCharts)=>{
                        this.spinnerMessage ="Generating graph...";
                        // Set colors for heatmap values
                        const colorScale=[];
                        // If no visible or no hidden status values, use default scale
                        if(visibleStatusTypes.length==1){
                            colorScale.push(["0",visibleStatusTypes[0].color]);
                            colorScale.push(["1",visibleStatusTypes[0].color]);

                        }else if(visibleStatusValues.length!=0){
                            visibleStatusTypes.forEach((status)=>{
                                // Scale status values from 0 to 1
                                colorScale.push([this.scale(status.value,minVisibleStatusValue,maxVisibleStatusValue,0,1),status.color]);
                            })
                            // Sort color scale ascending
                            colorScale.sort((a,b)=>parseFloat(a[0])-parseFloat(b[0]));
                        }
                        console.log(colorScale);
                        this.graphData.data[0]={
                            "x":dataSummary.dates,
                            "y":dataSummary.parentIDs.map(id=>this.embedIDURL(id)),
                            "z":heatmapCharts.statusChart,
                            "type":'heatmap',
                            "hoverongaps":false,
                            "colorscale":colorScale,
                            "showscale":false,
                            "text":heatmapCharts.statusLabel,
                            "hoverinfo":"text",
                            "ygap":.75,
                        };
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
                    this.showSpinner(false);
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
                                this.spinnerMessage =`Processing data (${data.body}%)`;
                            }
                        });
                        worker.postMessage({
                            "dataSummary":that.dataSummary,
                            "hiddenStatus":that.hiddenStatus,
                            "statusTypes":that.dataSummary.statusTypes,
                            "BUCKETIFY_BUCKET_SIZE":that.BUCKETIFY_BUCKET_SIZE,
                        });
                    }
                })
                return promise;
            }
        },
        computed:{
            graphContainer(){
                return this.$refs.graphContainer;
            }
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
                    this.showSpinner(val.show)
                    if(val.message!=null){
                        this.spinnerMessage = val.message;
                    }
                }
            },
            dataSummary:{
                immediate:true,
                deep:true,
                async handler(dataSummary){
                    this.statusTypeList = null;
                    await this.$nextTick();
                    this.statusTypeList =  Object.values(dataSummary.statusTypes || {}).filter(status=>!status.hidden);
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
    .spinner-view{
        background-color: #FFF;
        box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        padding: 5%;
        box-sizing: border-box;
        &:not(.active){
            display: none
        }
        &.active ~ * {
            opacity: 0;
        }
        .spinner-text{
            margin: 1% 0 0 0;
            color: #333;
        }
        .spinner {
            width: 50px;
            height: 40px;
            text-align: center;
            font-size: 10px;
            & > div {
                background-color: #6d6ab7;
                height: 100%;
                width: 6px;
                display: inline-block;
                margin: 0 1px;
                -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
                animation: sk-stretchdelay 1.2s infinite ease-in-out;
            }
            .rect2 {
                -webkit-animation-delay: -1.1s;
                animation-delay: -1.1s;
            }

            .rect3 {
                -webkit-animation-delay: -1.0s;
                animation-delay: -1.0s;
            }

            .rect4 {
                -webkit-animation-delay: -0.9s;
                animation-delay: -0.9s;
            }

            .rect5 {
                -webkit-animation-delay: -0.8s;
                animation-delay: -0.8s;
            }
        }
        .spinner-text{
            margin: 1% 0 0 0;
            color: #333;
        }
    }
}
@-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
    0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>