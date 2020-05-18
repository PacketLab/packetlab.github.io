<template>
    <div class="status-heatmap">
        <div class="spinner-view" ref="spinner">
            <div class="spinner">
                <div v-for="n in 4" :class="'rect'+n" :key="n"></div>
            </div>
            <div class="spinner-text">{{spinner.message}}</div>
        </div>
        <graph :layout="layoutComputed" :data="data" :config="config"></graph>
    </div>
</template>
<script type="text/javascript">
    import graph from '@/components/graph'
    export default {
        props:{
            "type":{
                type:String,
                default:""
            },
            "layout":{
                type:Object,
                default:()=>({
                    "xaxis":{
                        "type":"date",
                        // "range":[heatmap.dataSummary.startDate,heatmap.dataSummary.endDate],
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
                })
            },
            "data":{
                type:Array,
                default:()=>[{"type":"heatmap","z":[]}]
            },
            "config":{
                type:Object,
                default:()=>({"responsive":true,"displayModeBar": false})
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
            }
        },
        methods:{
            showSpinner(val){
                if(val){
                    this.$refs.spinner.classList.add("active");
                }else{
                    this.$refs.spinner.classList.remove("active");
                }
            }
        },
        components:{
            graph
        },
        computed:{
            layoutComputed(){
                const layout = JSON.parse(JSON.stringify(this.layout));
                layout.yaxis.title.text = this.type+" ID"
                return layout;
            }
        },
        watch:{
            spinner:{
                immediate:true,
                deep:true,
                async handler(val){
                    await this.$nextTick();
                    this.showSpinner(val.show)
                }
            }
        }
    }
</script>
<style lang="scss">
.status-heatmap{
    position: relative;
    box-sizing: border-box;
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