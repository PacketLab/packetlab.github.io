<template>
    <div class="nav-wrapper">
        <ac-nav position="top" fixed class="main-header">
            <div>
                <h1>{{title}}</h1>
            </div>
            <div class="logo-wrapper">
                <img src="@/assets/pktlab_logo.svg" alt="PacketLab Logo" @click="returnHome" class="logo">
            </div>
        </ac-nav>
    </div>
</template>
<script type="text/javascript">
    export default {
        props:{
            "title":{
                "type":String
            }
        },
        data(){
            return {

            }
        },
        methods:{
            returnHome(){
                if(this.$router.currentRoute.name!="Home"){
                    this.$router.push({'name':'Home'})
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nav-wrapper .main-header.nav{
        display: flex;
        padding: 1%;
        align-items: center;
        z-index: 999;
        justify-content: space-between;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
        height: 100px;
        h1{
            margin:0;
            font-size: 5vw; 
            font-weight: 700;
        }
        .logo-wrapper,
        .logo-wrapper img{
            max-height: 60px;
            height: 60px;
            margin:  0 2vw;
            max-width: 50vw;
        }
        .logo-wrapper img{
            cursor: pointer;
        }
        + main{
            position: relative;
            top: 100px;
            padding-top: 1%;;
            padding-bottom: 1%;
        }
    }
    @media screen and (min-width: 968px){
        .nav-wrapper .main-header.nav h1{
            font-size: 2vw;
        }
    }
</style>