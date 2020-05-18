<template>
    <div class="monitors">
        <main-header :title="title"></main-header>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <div class="dropdown-wrapper">
                    <ac-dropdown :options="rangeDropdownOptions" v-model="range"></ac-dropdown>
                </div>
            </ac-col>
        </ac-grid>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <heatmap :spinner="spinner" type="Monitor"></heatmap>
            </ac-col>
        </ac-grid>
    </div>
</template>
<script type="text/javascript">
    import mainHeader from "@/components/main-header"
    import heatmap from "@/components/heatmap"
    import moment from "moment"
    import Color from "ac-colors"
    export default {
        data(){
            return {
                defaultTitle:"Monitors Overview",
                title:"",
                defaultRange:"24hours",
                range:"",
                rangeValues:{
                    "24hours":{
                        "from":[1,'days'],
                        "text":"Last 24 Hours",
                        "value":"24hours",
                    },
                    "7days":{
                        "from":[7,'days'],
                        "text":"Last 7 Days",
                        "value":"7days",
                    },
                    "28days":{
                        "from":[28,'days'],
                        "text":"Last 28 Days",
                        "value":"28days",
                    },
                    "90days":{
                        "from":[90,'days'],
                        "text":"Last 90 Days",
                        "value":"90days",
                    },
                    "365days":{
                        "from":[365,'days'],
                        "text":"Last 365 Days",
                        "value":"365days",
                    },
                    // Days since unix epoch
                    "lifetime":{
                        "from":[Math.floor(moment().format("X")/86400),'days'],
                        "text":"Lifetime",
                        "value":"lifetime",
                    },
                },
                spinner:{
                    show:true,
                    message:"Generating graph..."
                }
            }
        },
        components:{
            "main-header":mainHeader,
            "heatmap":heatmap,
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
            setTitle(){
                if(this.params.id!=null){
                    this.title = "Monitor "+this.params.id;
                }else{
                    this.title = this.defaultTitle;
                }
            },
            setRange(rangeChanged=false){
                if(this.query.range==null ||  this.rangeValues[this.query.range]==null){
                    this.range = this.defaultRange;
                    rangeChanged =true
                }else if(this.query.range!=this.range){
                    if(this.range==null){
                        this.range = this.query.range;
                    }else{
                        rangeChanged=true;
                    }
                }
                if(rangeChanged){
                    this.$router.replace({name:"Monitors",params:{id:this.params.id},query:{range:this.range}});
                    this.initMonitorHeatmap();
                }
            },
            processData(){
                this.spinner={show:true,message:"Sorting data..."};
                let {toTime,fromTime}=this.getTimeRange();
                console.log(toTime);
                console.log(fromTime);
                const dataSummary = {};
                // Reduce data
                dataSummary.minTimestamp=Number.MAX_VALUE;
                dataSummary.maxTimestamp=0;
                // Default fromTime is 0
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                dataSummary.type = "Monitor";
                dataSummary.statusTypes = {};
                const jsonDataRows = this.$store.state.data;
                console.log(jsonDataRows);
                let processedRows = 0;
                const groupedData = Object.values(jsonDataRows.reduce((acc,curr)=>{
                    this.spinner = {
                        show:true,
                        message:`Sorting data (${Math.ceil(processedRows/jsonDataRows.length*100)}%)`
                    };
                    processedRows++;
                    const index = curr.monitor;
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
                console.log(groupedData);
            },
            getTimeRange(){
                const toTime = moment().format("X"); 
                const selectedRange = this.rangeValues[this.range]
                const fromTime = moment().subtract(...selectedRange["from"]).format("X");
                return {toTime,fromTime};
            },
            initMonitorHeatmap(){
                this.spinner={show:true,message:"Fetching data..."};
                this.$store.dispatch('loadData',this).then(()=>{
                    this.processData();
                })
            }
        },
        mounted(){

        },
        watch:{
            params:{
                handler(){
                    this.setTitle();
                },
                immediate:true,
            },
            query:{
                handler(){
                    this.setRange();
                },
                immediate:true,
            },
            range:{
                handler(val,oldVal){
                    if(val!=oldVal){
                        this.setRange();
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
    .dropdown-wrapper{
        background-color: #FFF;
        box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
        box-sizing:border-box;
        width: 100%;
        margin: 2% 0;
        .dropdown{
            border: none;
        }
    }  
    @media screen and (min-width: 576px){
        .dropdown-wrapper{
            max-width: 300px;
        }
    }
</style>