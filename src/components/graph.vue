<template>
    <section class="graph">
        <Plotly :layout="plotlyLayout" :data="plotlyData" :update="updateKey"></Plotly>
    </section>
</template>
<script type="text/javascript">
    import {Plotly} from 'vue-plotly'
    export default {
         props:{
            "layout":{
                type:Object,
            },
            "data":{
                type:Object,          
            },
            "config":{
                type:Object,
            }
        },
        data(){
            return {
                plotlyLayout:{},
                plotlyData:[],
                plotlyConfig:{"responsive":true,"displayModeBar": false},
                updateKey:0,
            }
        },
        methods:{
            updateGraph(){

            }
        },
        components:{
            Plotly,
        },
        watch:{
            data:{
                async handler(newData){
                    if(newData!=null && newData.ready){
                        this.plotlyData=null;
                        await this.$nextTick();
                        this.plotlyData=newData.data;
                    }
                },
                deep:true,
                immediate:true,
            },
            layout:{
                async handler(newLayout){
                    if(newLayout!=null && newLayout.ready){
                        this.plotlyLayout=null;
                        await this.$nextTick()
                        this.plotlyLayout=newLayout.layout;
                    }
                },
                deep:true,
                immediate:true,
            },
            config:{
                async handler(newConfig){
                    if(newConfig!=null && newConfig.ready){
                        this.plotlyConfig=null;
                        await this.$nextTick()
                        this.plotlyConfig=newConfig.config;
                    }
                },
                deep:true,
                immediate:true,
            },
        }
    }
</script>
<style lang="scss" scoped>
    .graph{
        width: 100%; 
        background-color: #FFF;
        box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
    }
    .graph::v-deep .js-plotly-plot{
        height: inherit;
    }
</style>