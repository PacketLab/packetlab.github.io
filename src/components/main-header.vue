<template>
    <div class="nav-wrapper">
        <ac-nav position="top" fixed class="main-header">
             <div :class="{'toggle--bars':true,'active':!navHidden}" @click="toggleNavHidden()">
                <div></div>
                <div></div>
                <div></div>
            </div>
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
            },
            toggleNavHidden(){
                this.$store.commit('setNavHidden',!this.navHidden);
            }
        },
        computed:{
            navHidden(){
                return this.$store.state.navHidden;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .toggle--bars{
        --width: 3em;
        width: var(--width);
        height: calc(var(--width) * 0.9);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        font-size: 10px;
        margin: 0 2%;
    }
    .toggle--bars div{
        background-color: #333;
        width: 100%;
        height: calc(var(--width) / 5);
        position: relative;
        transition-property: top, transform, opacity;
        transition-duration:  0.3s;
        transition-timing-function: ease-in-out;
        top: 0;
        opacity: 1;
    }
    .toggle--bars.active div{
        opacity: 0;
    }
    .toggle--bars.active div:first-child{
        transform: rotate(135deg);
        top: calc(var(--width) / 2.857);
        opacity: 1; 
    }
    .toggle--bars.active div:last-child{
        transform: rotate(-135deg);
        top:  calc(var(--width) / -2.857);
        opacity: 1;
    }
    .nav-wrapper .main-header.nav{
        display: flex;
        padding: 1%;
        align-items: center;
        z-index: 999;
        justify-content: flex-start;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
        height: 100px;
        h1{
            margin:0;
            font-size: 5vw; 
            font-weight: 700;
            padding: 0 5%;
            white-space: nowrap;
        }
        .logo-wrapper,
        .logo-wrapper img{
            max-height: 60px;
            height: 60px;
            margin:  0 2vw 0 auto;
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
            font-size: 40px;
        }
    }
</style>