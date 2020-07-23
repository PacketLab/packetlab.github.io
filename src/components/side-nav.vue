<template> 
    <ac-nav position="left" :hidden="navHidden" class="main-nav">
        <div class="nav--links">
            <router-link :to="{name:'About'}" v-slot="{route,href}">
                <a :href="href" :class="{'active':currentRouteName==route.name}">{{route.meta.title}}</a>
            </router-link>
            <router-link :to="{name:'Installation'}" v-slot="{route,href}">
                 <a :href="href" :class="{'active':currentRouteName==route.name}">{{route.meta.title}}</a>
            </router-link>
            <router-link :to="{name:'Data',query:{range:'24hours'}}" v-slot="{route,href}">
                 <a :href="href" :class="{'active':currentRouteName==route.name}">{{route.meta.title}}</a>
            </router-link>
            <router-link :to="{name:'Monitors',query:{range:'24hours'}}" v-slot="{route,href}">
                 <a :href="href" :class="{'active':currentRouteName==route.name}">{{route.meta.title}}</a>
            </router-link>
        </div>
    </ac-nav>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                currentRouteName:"About"
            }
        },
        watch:{
            $route:{
                deep:true,
                immediate:true,
                handler(route){
                    this.currentRouteName = route.name
                }
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
    .nav.nav--side.main-nav{
        top:100px;
        z-index: 998;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        .nav--links a{
            &:hover,
            &.active{
                background-color: #D5D2FF;
                color: #615E8A;
                font-weight: bold;
            }
        }
    }
</style>