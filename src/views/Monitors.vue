<template>
    <div class="monitors">
        <main-header :title="title"></main-header>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <date-range-dropdown :callback="initMonitorHeatmap" :route="{name:'Monitors',params:{id:this.params.id}}"  v-on:change="setTimeRange"></date-range-dropdown>
            </ac-col>
        </ac-grid>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <heatmap :spinner="spinner" :dataSummary="dataSummary" legend></heatmap>
            </ac-col>
        </ac-grid>
    </div>
</template>
<script type="text/javascript">
    import mainHeader from "@/components/main-header"
    import heatmap from "@/components/heatmap"
    import dateRangeDropdown from "@/components/date-range-dropdown"
    import moment from "moment"
    import Color from "ac-colors"
    export default {
        data(){
            return {
                defaultTitle:"Monitors Overview",
                title:"",
                dataSummary:{
                    "ready":false,
                },
                spinner:{
                    show:true,
                    message:"Generating graph..."
                },
                timeRange:{toTime:null,fromTime:null}
            }
        },
        components:{
            "main-header":mainHeader,
            "heatmap":heatmap,
            "date-range-dropdown":dateRangeDropdown,
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
            processData(){
                this.spinner={show:true,message:"Sorting data..."};
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
                    this.spinner = {
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
            initMonitorHeatmap(){
                this.spinner={show:true,message:"Fetching data..."};
                this.$store.dispatch('loadData',this).then(()=>{
                    this.processData();
                })
            }
        },
        async mounted(){
            await this.$nextTick();
            this.initMonitorHeatmap();
        },
        watch:{
            params:{
                handler(){
                    this.setTitle();
                },
                immediate:true,
            }
        }
    }
</script>