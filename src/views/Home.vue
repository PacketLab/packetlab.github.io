<template>
	<div class="home">
        <main-header title="Home"></main-header>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <date-range-dropdown :route="{name:'Home'}"  v-on:change="setTimeRange" :callback="graphData"></date-range-dropdown>
            </ac-col>
        </ac-grid>
        <ac-grid cols=12 align-h="center">
            <ac-col cols="11">
                <graph :data="data" :layout="layout" :spinner="spinner"></graph>
            </ac-col>
        </ac-grid>
	</div>
</template>

<script>
import MainHeader from "@/components/main-header";
import graph from "@/components/graph";
import dateRangeDropdown from "@/components/date-range-dropdown";
import moment from "moment";
import Bucketify from "bucketify";
export default {
	name: 'Home',
	components: {
	"main-header":MainHeader,
    "graph":graph,
    "date-range-dropdown":dateRangeDropdown,
	},
    data(){
        return {
            // Seconds per hour
            BUCKETIFY_BUCKET_SIZE:3600,
            timeRange:{toTime:null,fromTime:null},
            data:{
                "ready":false,
                "data":[],
            },
            layout:{
                "ready":false,
                "layout":{
                    "title":"Available Endpoints Over Time",
                    "xaxis":{
                        "type":"date",
                        "title":"Date"
                    },
                    "yaxis":{
                        "title":"Number of Endpoints",
                    }
                }
            },
            spinner:{"message":"Generating graph...","show":true}
        }
    },
    methods:{
        setTimeRange(range){
            this.timeRange = range;
        },
         processData(){
                this.data.ready=false;
                let {toTime,fromTime}=this.timeRange;
                // Default fromTime is 0
                fromTime = (fromTime!=null) ? fromTime : 0;
                // Default toTime is current time
                toTime = (toTime!=null) ? toTime : parseFloat(moment().format("X"));
                const jsonDataRows = this.$store.state.data;
                const buckets = new Bucketify({
                    "list":jsonDataRows.filter((curr)=>(curr.start>=fromTime && curr.start<=toTime)),
                    getProperty:(curr)=>parseFloat(curr.start),
                    "bucketSize":this.BUCKETIFY_BUCKET_SIZE,
                });
                const monitorCounts = [];
                const monitorDates  = [];
                buckets.buckets.forEach((bucket)=>{
                    // Get count of unique monitors running experiments per hour
                    const monitorIds = new Set(bucket.vals.map((val)=>val.monitor));
                    monitorCounts.push(monitorIds.size);
                    monitorCounts.push(monitorIds.size);
                    // Add the dates for the buckets min and max timestamps
                    const minBucketDate = moment(bucket.min,"X");
                    monitorDates.push(minBucketDate.format("YYYY-MM-DD HH:mm:ss"));
                    const maxBucketDate = moment(bucket.max,"X");
                    monitorDates.push(maxBucketDate.format("YYYY-MM-DD HH:mm:ss"));
                })
                this.spinner.message ="Generating graph...";
                this.layout.layout.yaxis.range = [0,Math.max(...monitorCounts)];
                this.data.data[0] = {
                    "x":monitorDates,
                    "y":monitorCounts,
                    "mode":'lines',
                }
                this.layout.ready=true;
                this.data.ready=true;
                this.spinner.show=false;
            },
        graphData(){
            this.spinner.message="Fetching data...";
            this.$store.dispatch('loadData',this).then(()=>{
                this.spinner.message =`Processing data...`;
                this.processData();
            })
        }
    },
    mounted(){
        this.graphData();
    }
}
</script>
