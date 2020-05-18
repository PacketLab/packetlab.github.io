<template>
    <section class="graph">
        <Plotly :layout="layout" :data="data" :config="config"></Plotly>
    </section>
</template>
<script type="text/javascript">
    import {Plotly} from 'vue-plotly'
    export default {
         props:{
            "layout":{
                type:Object,
                default:()=>({})
            },
            "data":{
                type:Array,
                default:()=>[]
            },
            "config":{
                type:Object,
                default:()=>({"responsive":true,"displayModeBar": false})
            }
        },
        data(){
            return {

            }
        },
        components:{
            Plotly,
        }
    }
</script>
<style lang="scss" scoped>
    .graph{
        width: 100%; 
        background-color: #FFF;
        box-shadow: 3px 3px 5px rgba(0,0,0,0.1);
    }
</style>