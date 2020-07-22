<template>
    <router-link :to="baseUrl"><slot></slot></router-link>
</template>
<script type="text/javascript">
    let currentTarget = null;
    const navOffset = 100;
    export default {
        props:{
            href:{
                type:String,
            },
        },
        data(){
            return {
            }
        },
        methods:{
            async scrollToTarget(){
                const route = this.$route;
                await this.$nextTick();
                if(route.query.target && route.query.target != currentTarget){
                    window.scrollTo(0,0);
                    const targetElement = document.getElementById(route.query.target);
                    if(targetElement){
                        const targetPos = targetElement.getBoundingClientRect();
                        window.scroll({"top":targetPos.top-navOffset,"left":0,behavior:"smooth"});
                    }
                }
                currentTarget = route.query.target;
            }
        },
        computed:{
            baseUrl(){
                const queryString =  window.location.search;
                const params = new URLSearchParams(queryString);
                params.set("target",this.href);
                return "?"+params.toString()
            }
        },
        mounted(){
            window.addEventListener("load",()=>{
                setInterval(this.scrollToTarget, 100)
            })
        },
        watch:{
            $route:{
                deep:true,
                handler(){
                    this.scrollToTarget();
                }
            }
        }
    }
</script>