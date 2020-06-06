<template>
    <section class="graph">
        <div class="spinner-view" ref="spinner">
            <div class="spinner">
                <div v-for="n in 4" :class="'rect'+n" :key="n"></div>
            </div>
            <div class="spinner-text">{{spinnerMessage}}</div>
        </div>
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
            },
            "spinner":{
                type:Object,
                default:()=>({"show":true,"message":"Generating graph..."}),
            },
        },
        data(){
            return {
                plotlyLayout:{},
                plotlyData:[],
                plotlyConfig:{"responsive":true,"displayModeBar": false},
                spinnerMessage:"Generating graph...",
                updateKey:0,
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
            updateGraph(){

            }
        },
        components:{
            Plotly,
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
        position: relative;
    }
    .graph::v-deep .js-plotly-plot{
        height: inherit;
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