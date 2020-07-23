<template>
    <div class="dropdown-wrapper">
        <ac-dropdown :options="rangeDropdownOptions" v-model="range"></ac-dropdown>
    </div>
</template>
<script type="text/javascript">
    import moment from "moment"
    import cloneDeep from 'lodash.clonedeep'
    export default {
        props:{
            "route":{
                type:Object
            },
            "callback":{
                type:Function,
                default:()=>{}
            }
        },
        data(){
            return {       
                defaultRange:"24hours",
                range:null,
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
            }
        },
        methods:{   
            getTimeRange(){
                const toTime = moment().format("X"); 
                const selectedRange = this.rangeValues[this.range]
                const fromTime = moment().subtract(...selectedRange["from"]).format("X");
                this.$emit("change",{toTime,fromTime});
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
                    const preQuery = cloneDeep(this.route);
                    preQuery.query = this.route.query || {};
                    preQuery.query.range = this.range;
                    this.$router.replace(preQuery);
                    this.getTimeRange();
                    this.callback();
                }
            },
        },
        mounted(){
            this.setRange();
            this.getTimeRange();
        },
        computed:{
            query(){
                return this.$route.query;
            },
            rangeDropdownOptions(){
                return Object.values(this.rangeValues)
            }
        },
        watch:{
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
<style lang="scss" scoped>
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