<template>
    <div id="app">
        <main-header :title="pageTitle"></main-header>
        <ac-grid>
            <ac-col cols="3" lg-cols="2">
                <side-nav :hidden="navHidden"></side-nav>
            </ac-col>
            <ac-col :cols="(navHidden || mobileView) ? 12 : 9" :lg-cols="(navHidden || mobileView) ? 12 : 10">        
                <router-view/>
            </ac-col>
        </ac-grid>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Source+Code+Pro:wght@400&display=swap');
    body{
        padding: 0;
        margin:0;
        background-color: #FCFCFC;
        font-family: 'Lato', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #000;
        font-weight: 400;
        font-size: 16px;
    }
</style>
<script type="text/javascript">
    import MainHeader from "@/components/main-header"
    import SideNav from "@/components/side-nav"
    export default {
        data(){
            return {
                pageTitle:"",
                mobileView:false,
            }
        },
        components:{
            MainHeader,
            SideNav
        },
        watch:{
            $route:{
                immediate:true,
                deep:true,
                handler(route){
                    this.pageTitle = route.meta.currentPageTitle;
                }
            }
        },
        methods:{
            updateViewSizing(){
                this.mobileView = window.innerWidth < 576;
                this.$store.commit('setNavHidden',this.mobileView);
            }
        },
        computed:{
            navHidden(){
                return this.$store.state.navHidden;
            }
        },
        mounted(){
            this.updateViewSizing();
            window.addEventListener("resize",this.updateViewSizing);
        }
    }
</script>
