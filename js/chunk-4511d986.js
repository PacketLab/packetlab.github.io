(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4511d986"],{"0ab9":function(t,e,a){"use strict";t.exports.numbers=n,t.exports.sum=o,t.exports.mean=s,t.exports.median=u,t.exports.mode=l,t.exports.variance=h,t.exports.sampleVariance=d,t.exports.populationVariance=h,t.exports.stdev=p,t.exports.sampleStdev=y,t.exports.populationStdev=p,t.exports.percentile=m,t.exports.histogram=f;var r=a("7380");function n(t){var e=[];if(null==t)return e;for(var a=0;a<t.length;a++)r(t[a])&&e.push(+t[a]);return e}function i(t){return t.sort((function(t,e){return t-e}))}function o(t){t=n(t);for(var e=0,a=0;a<t.length;a++)e+=t[a];return e}function s(t){return t=n(t),0===t.length?NaN:o(t)/t.length}function u(t){if(t=n(t),0===t.length)return NaN;var e=t.length/2|0;return t=i(t),t.length%2?t[e]:(t[e-1]+t[e])/2}function l(t){if(t=n(t),0===t.length)return NaN;for(var e=NaN,a={},r=0;r<t.length;r++){var i=t[r],o=a[i]||0;o++,a[i]=o}var s=n(Object.keys(a).sort((function(t,e){return a[e]-a[t]})));if(e=s[0],a[s[1]]==a[e]){if(s.length==t.length)return t;var u=new Set([e]),l=a[e];for(r=1;r<s.length;r++){if(a[s[r]]!=l)break;u.add(s[r])}return u}return e}function c(t){t=n(t);for(var e=s(t),a=[],r=0;r<t.length;r++)a.push(Math.pow(t[r]-e,2));return a}function h(t){return s(c(t))}function d(t){var e=c(t);return e.length<=1?NaN:o(e)/(e.length-1)}function p(t){return Math.sqrt(h(t))}function y(t){return Math.sqrt(d(t))}function m(t,e){if(t=n(t),0===t.length||null==e||e<0)return NaN;e>1&&(e=1),t=i(t);var a=t.length*e-.5;if((0|a)===a)return t[a];var r=0|a,o=a-r;return(1-o)*t[r]+o*t[Math.min(r+1,t.length-1)]}function f(t,e){if(null==t)return null;if(t=i(n(t)),0===t.length)return null;null==e&&(e=Math.sqrt(t.length)),e=Math.round(e),e<1&&(e=1);var a=t[0],r=t[t.length-1];a===r&&(a-=.5,r+=.5);var o=r-a,s=(o+.05*o)/e,u=(a+r)/2,l=u-s*Math.floor(e/2);if(e%2!==0)l=u-s/2-s*Math.floor(e/2);for(var c={values:Array(e).fill(0),bins:e,binWidth:s,binLimits:[l,l+s*e]},h=0,d=0;d<t.length;d++){while(t[d]>(h+1)*s+l)h++;c.values[h]++}return c}},1276:function(t,e,a){"use strict";var r=a("d784"),n=a("44e7"),i=a("825a"),o=a("1d80"),s=a("4840"),u=a("8aa5"),l=a("50c4"),c=a("14c3"),h=a("9263"),d=a("d039"),p=[].push,y=Math.min,m=4294967295,f=!d((function(){return!RegExp(m,"y")}));r("split",2,(function(t,e,a){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var r=String(o(this)),i=void 0===a?m:a>>>0;if(0===i)return[];if(void 0===t)return[r];if(!n(t))return e.call(r,t,i);var s,u,l,c=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),y=0,f=new RegExp(t.source,d+"g");while(s=h.call(f,r)){if(u=f.lastIndex,u>y&&(c.push(r.slice(y,s.index)),s.length>1&&s.index<r.length&&p.apply(c,s.slice(1)),l=s[0].length,y=u,c.length>=i))break;f.lastIndex===s.index&&f.lastIndex++}return y===r.length?!l&&f.test("")||c.push(""):c.push(r.slice(y)),c.length>i?c.slice(0,i):c}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var n=o(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,n,a):r.call(String(n),e,a)},function(t,n){var o=a(r,t,this,n,r!==e);if(o.done)return o.value;var h=i(t),d=String(this),p=s(h,RegExp),g=h.unicode,b=(h.ignoreCase?"i":"")+(h.multiline?"m":"")+(h.unicode?"u":"")+(f?"y":"g"),v=new p(f?h:"^(?:"+h.source+")",b),w=void 0===n?m:n>>>0;if(0===w)return[];if(0===d.length)return null===c(v,d)?[d]:[];var T=0,x=0,D=[];while(x<d.length){v.lastIndex=f?x:0;var S,M=c(v,f?d:d.slice(x));if(null===M||(S=y(l(v.lastIndex+(f?0:x)),d.length))===T)x=u(d,x,g);else{if(D.push(d.slice(T,x)),D.length===w)return D;for(var H=1;H<=M.length-1;H++)if(D.push(M[H]),D.length===w)return D;x=T=S}}return D.push(d.slice(T)),D}]}),!f)},"32c9":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"experiments"},[a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{attrs:{cols:"11"}},[a("date-range-dropdown",{attrs:{callback:function(){},route:{name:"Experiments",params:{id:this.params.id}}},on:{change:t.setTimeRange}}),t.experimentIDs?a("div",t._l(t.endpointGraphs,(function(t,e){return a("div",{directives:[{name:"show",rawName:"v-show",value:t.data.visible,expression:"graph.data.visible"}],key:e,staticClass:"graph-row"},[a("graph",{attrs:{data:t.data,layout:t.layout,spinner:t.spinner}})],1)})),0):t._e(),a("ac-grid",t._l(t.experimentDescriptions,(function(e,r){return a("ac-col",{key:r,attrs:{cols:"12","md-cols":"6","lg-cols":"4","xl-cols":"3"}},[a("section",{staticClass:"experiment-section"},[a("h2",{staticClass:"experiment-section-name"},[t._v(t._s(e.name))]),a("div",{staticClass:"experiment-section-description"},[t._v(t._s(e.description))]),a("router-link",{staticClass:"experiment-section-link",attrs:{to:{name:"Experiments",params:{id:e.name}}}},[t._v("View Graphs")])],1)])})),1),0==t.experimentDescriptions.length?a("div",[a("graph",{attrs:{spinner:{show:!0,message:"Fetching data..."}}})],1):t._e()],1)],1)],1)},n=[],i=(a("a4d3"),a("e01a"),a("cb29"),a("4de4"),a("7db0"),a("4160"),a("caad"),a("d81d"),a("13d5"),a("b0c0"),a("b64b"),a("07ac"),a("ac1f"),a("2532"),a("1276"),a("159b"),a("96cf"),a("1da1")),o=a("5530"),s=a("0ab9"),u=a.n(s),l=a("6ccf"),c=a("bdbd"),h=a("c1df"),d=a.n(h),p=a("9399"),y=a.n(p),m=a("7e98"),f={mixins:[m["a"]],data:function(){return{graphColor:{primary:new y.a({type:"hex",color:"#7FA44F"}),secondary:new y.a({type:"hex",color:"#989998"})},timeRange:{toTime:null,fromTime:null}}},components:{"date-range-dropdown":c["a"],graph:l["a"]},computed:{params:function(){return this.$route.params},query:function(){return this.$route.query},rangeDropdownOptions:function(){return Object.values(this.rangeValues)},experimentIDs:function(){return null!=this.params.id?[this.params.id]:null},experimentDescriptions:function(){return this.$store.state.experimentDescriptions||[]}},methods:{setTimeRange:function(t){this.timeRange=t},processLatencyTimeData:function(t){var e=this;this.latencyTimeSpinner={show:!0,message:"Sorting data..."},this.latencyTimeData.ready=!1,this.latencyTimeLayout.ready=!1;var a={},r=function(t,e){if(t){a[e]||(a[e]=[]);var r=t.end_stime/Math.pow(10,6),n=t.end_rtime/Math.pow(10,6),i=n-r,o=d()(r,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");isNaN(i)||a[e].push({timestamp:o,latency:i,sendTime:r})}},n=0;t.forEach((function(a){"DNS_local"==a.exp?r(a.data.rst_list[0],a.index):r(a.data,a.index),e.latencyTimeSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(n/t.length*100),"%)")},n++})),this.latencyTimeSpinner.message="Generating graph...",this.latencyTimeData.data=[];var i=2;Object.keys(a).forEach((function(t){a[t].sort((function(t,e){return t.sendTime-e.sendTime}));var r=y.a.randomFromString(t+t+t);e.latencyTimeData.data.push({x:a[t].map((function(t){return t.timestamp})),y:a[t].map((function(t){return t.latency})),name:t,mode:"lines+markers",line:{color:r.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:r.rgbString,width:i}}})})),this.latencyTimeData.ready=!0,this.latencyTimeLayout.ready=!0,this.latencyTimeSpinner.show=!1},processLatencyHourlyData:function(t){var e=this;this.latencyHourlySpinner={show:!0,message:"Sorting data..."},this.latencyHourlyData.ready=!1,this.latencyHourlyLayout.ready=!1;var a={},r=function(t,e){if(t){a[e]||(a[e]=new Array(24).fill(),a[e]=a[e].map((function(){return[]})));var r=t.end_stime/Math.pow(10,6),n=t.end_rtime/Math.pow(10,6),i=n-r,o=d()(r,"x").utc().hours();isNaN(o)||isNaN(i)||a[e][o].push(i)}},n=0;t.forEach((function(a){"DNS_local"==a.exp?r(a.data.rst_list[0],a.index):r(a.data,a.index),e.latencyHourlySpinner={show:!0,message:"Sorting data (".concat(Math.ceil(n/t.length*100),"%)")},n++})),Object.keys(a).forEach((function(t){var e=null;a[t]=a[t].map((function(t){var a=t.filter((function(t){return!!t}));if(0==a.length)return e;var r=u.a.mean(a);return e=r,r}))})),this.latencyHourlySpinner.message="Generating graph...",this.latencyHourlyData.data=[];var i=2,o=new Array(24).fill().map((function(t,e){return e}));Object.keys(a).forEach((function(t){var r=y.a.randomFromString(t+t+t);e.latencyHourlyData.data.push({x:o,y:a[t],name:t,mode:"lines+markers",line:{color:r.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:r.rgbString,width:i}}})})),this.latencyHourlyData.ready=!0,this.latencyHourlyLayout.ready=!0,this.latencyHourlySpinner.show=!1},processBandwidthTimeData:function(t){var e=this;this.bandwidthTimeSpinner={show:!0,message:"Sorting data..."},this.bandwidthTimeData.ready=!1,this.bandwidthTimeLayout.ready=!1;var a={},r=function(t,e){a[e]=a[e]||{avail_band:[],btnk_band:[]};var r=t.ctrl_stime/Math.pow(10,6),n=d()(r,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");t.avail_band&&t.btnk_band&&(a[e].avail_band.push({bandwidth:t.avail_band/Math.pow(10,6),timestamp:n,sendTime:r}),a[e].btnk_band.push({bandwidth:t.btnk_band/Math.pow(10,6),timestamp:n,sendTime:r}))},n=0;t.forEach((function(a){r(a.data,a.index),e.bandwidthTimeSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(n/t.length*100),"%)")},n++})),this.bandwidthTimeSpinner.message="Generating graph...",this.bandwidthTimeData.data=[];var i=2;Object.keys(a).forEach((function(t){var r=a[t],n=y.a.randomFromString(t+t+t),o=new y.a({color:[n.lchuv[0]+20,n.lchuv[1],n.lchuv[2]],type:"lchuv"}),s=[n,o];Object.keys(r).forEach((function(a,n){r[a].sort((function(t,e){return t.sendTime-e.sendTime}));var o=s[n]||y.a.random();e.bandwidthTimeData.data.push({x:r[a].map((function(t){return t.timestamp})),y:r[a].map((function(t){return t.bandwidth})),name:t+" - "+a,mode:"lines+markers",line:{color:o.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:o.rgbString,width:i}}})}))})),this.bandwidthTimeData.ready=!0,this.bandwidthTimeLayout.ready=!0,this.bandwidthTimeSpinner.show=!1},processBandwidthHourlyData:function(t){var e=this;this.bandwidthHourlySpinner={show:!0,message:"Sorting data..."},this.bandwidthHourlyData.ready=!1,this.bandwidthHourlyLayout.ready=!1;var a=this.$store.state.experiments.filter((function(t){return t.categories.includes("bandwidth")})).map((function(t){return t.name})),r={},n=function(t){r.avail_band||(r.avail_band=new Array(24).fill(),r.avail_band=r.avail_band.map((function(){return[]}))),r.btnk_band||(r.btnk_band=new Array(24).fill(),r.btnk_band=r.btnk_band.map((function(){return[]})));var e=t.ctrl_stime/Math.pow(10,6),a=d()(e,"x").utc().hours();t.avail_band&&t.btnk_band&&(r.avail_band[a].push(t.avail_band/Math.pow(10,6)),r.btnk_band[a].push(t.btnk_band/Math.pow(10,6)))},i=0;t.forEach((function(r){a.includes(r.exp)&&n(r.data),e.bandwidthHourlySpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++}));var o={},s={};Object.keys(r).forEach((function(t){var e=null,a=null;o[t]=r[t].map((function(t){var a=t.filter((function(t){return!!t}));if(0==a.length)return e;var r=u.a.mean(a);return e=r,r})),s[t]=r[t].map((function(t){var e=t.filter((function(t){return!!t}));if(0==e.length)return a;var r=u.a.sampleStdev(e);return a=r,r}))})),this.bandwidthHourlySpinner.message="Generating graph...",this.bandwidthHourlyData.data=[];var l=2,c=new Array(24).fill().map((function(t,e){return e}));Object.keys(o).forEach((function(t,a){var r=Object.values(e.graphColor)[a]||y.a.random();e.bandwidthHourlyData.data.push({x:c,y:o[t],error_y:{type:"data",array:s[t],visible:!0},name:t,mode:"lines+markers",line:{color:r.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:r.rgbString,width:l}}})})),this.bandwidthHourlyData.ready=!0,this.bandwidthHourlyLayout.ready=!0,this.bandwidthHourlySpinner.show=!1},processRTTTimeData:function(t){var e=this;this.rttTimeSpinner={show:!0,message:"Sorting data..."},this.rttTimeData.ready=!1,this.rttTimeLayout.ready=!1;var a={},r=function(t,e){if(t){var r=t.ctrl_stime/Math.pow(10,6),n=t.ctrl_rtime/Math.pow(10,6),i=n-r,o=d()(r,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");isNaN(i)||(a[e]||(a[e]=[]),a[e].push({timestamp:o,rtt:i,sendTime:r}))}},n=0;t.forEach((function(a){"DNS_local"==a.exp?r(a.data.rst_list[0],a.index):r(a.data,a.index),e.rttTimeSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(n/t.length*100),"%)")},n++})),this.rttTimeSpinner.message="Generating graph...",this.rttTimeData.data=[];var i=2;Object.keys(a).forEach((function(t){var r=y.a.randomFromString(t+t+t),n=a[t];n.sort((function(t,e){return t.sendTime-e.sendTime})),e.rttTimeData.data.push({x:n.map((function(t){return t.timestamp})),y:n.map((function(t){return t.rtt})),name:t,mode:"lines+markers",line:{color:r.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:r.rgbString,width:i}}})})),this.rttTimeData.ready=!0,this.rttTimeLayout.ready=!0,this.rttTimeSpinner.show=!1},processRTTHourlyData:function(t){var e=this;this.rttHourlySpinner={show:!0,message:"Sorting data..."},this.rttHourlyData.ready=!1,this.rttHourlyLayout.ready=!1;var a={},r=function(t,e){if(a[e]||(a[e]=new Array(24).fill(),a[e]=a[e].map((function(){return[]}))),t){var r=t.ctrl_stime/Math.pow(10,6),n=t.ctrl_rtime/Math.pow(10,6),i=n-r,o=d()(r,"x").utc().hours();isNaN(o)||isNaN(i)||a[e][o].push(i)}},n=0;t.forEach((function(a){"DNS_local"==a.exp?r(a.data.rst_list[0],a.index):r(a.data,a.index),e.rttHourlySpinner={show:!0,message:"Sorting data (".concat(Math.ceil(n/t.length*100),"%)")},n++}));var i=null,o=null;console.log(a),this.rttHourlySpinner.message="Generating graph...",this.rttHourlyData.data=[];var s=2,l=new Array(24).fill().map((function(t,e){return e}));Object.keys(a).forEach((function(t){var r=a[t],n=r.map((function(t){var e=t.filter((function(t){return!!t}));if(0==e.length)return i;var a=u.a.mean(e);return i=a,a})),c=r.map((function(t){var e=t.filter((function(t){return!!t}));if(0==e.length)return o;var a=u.a.sampleStdev(e);return o=a,a})),h=y.a.randomFromString(t+t+t);e.rttHourlyData.data.push({x:l,y:n,error_y:{type:"data",array:c,visible:!0},name:t,mode:"lines+markers",line:{color:h.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:h.rgbString,width:s}}})})),this.rttHourlyData.ready=!0,this.rttHourlyLayout.ready=!0,this.rttHourlySpinner.show=!1},initGraphData:function(){var t=this,e=[this.latencyTimeSpinner],a=[{f:this.processLatencyTimeData,data:this.latencyTimeData,category:"latency"},{f:this.processLatencyHourlyData,data:this.latencyHourlyData,category:"latency"},{f:this.processBandwidthTimeData,data:this.bandwidthTimeData,category:"bandwidth"},{f:this.processBandwidthHourlyData,data:this.bandwidthHourlyData,category:"bandwidth"},{f:this.processRTTTimeData,data:this.rttTimeData,category:"rtt"},{f:this.processRTTHourlyData,data:this.rttHourlyData,category:"rtt"}];e.forEach((function(t){t.show=!0,t.message="Fetching data..."}));var r=this.timeRange,n=r.toTime,i=r.fromTime;i=null!=i?i:0,n=null!=n?n:parseFloat(d()().format("X")),this.$store.dispatch("loadData",i).then((function(){t.$store.state.experiments.forEach((function(e){t.graphColor[e.name]=new y.a({type:"hex",color:e.color})}));var r=t.$store.state.data.filter((function(a,r){var s=t.$store.state.endpoints.reduce((function(t,e){var a="M"+e.monitor,r=a+" - "+e.description.split(/[\s_]/)[0];return t[a]=Object(o["a"])({shortDescription:r},e),t}),{});if(a.monitor){var u="M"+a.monitor;return a.index=s[u].shortDescription,e.forEach((function(e){e.show=!0,e.message="Filtering data (".concat(Math.ceil(r/t.$store.state.data.length*100),"%)")})),(null==t.experimentIDs||Array.isArray(t.experimentIDs)&&t.experimentIDs.includes(a.exp))&&(a.start>=i&&a.start<=n||a.end>=i&&a.end<=n)}return!1}));t.experimentIDs&&a.forEach((function(e){var a=t.$store.state.experiments.find((function(e){return t.experimentIDs.includes(e.name)}));a.categories.includes(e.category)?(e.data.visible=!0,e.f(r)):e.data.visible=!1}))}))}},watch:{experimentIDs:{immediate:!0,deep:!0,handler:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$nextTick();case 2:t.initGraphData();case 3:case"end":return e.stop()}}),e)})))()}}}},g=f,b=(a("fb73"),a("2877")),v=Object(b["a"])(g,r,n,!1,null,"3fdb034c",null);e["default"]=v.exports},7380:function(t,e){function a(t){return!isNaN(parseFloat(t))&&isFinite(t)}t.exports=a},"7e98":function(t,e,a){"use strict";var r=a("9399"),n=a.n(r);e["a"]={data:function(){return{cdfSubdivisions:1e3,graphColor:{primary:new n.a({type:"hex",color:"#7FA44F"}),secondary:new n.a({type:"hex",color:"#989998"})},latencyHourlySpinner:{show:!0,message:"Generating graph..."},latencyHourlyData:{ready:!1,data:[]},latencyHourlyLayout:{ready:!1,layout:{title:"Average DNS Query Latency by Hour",xaxis:{title:"Hour of Day (UTC)",range:[0,23],dtick:1},yaxis:{title:"Average Endpoint DNS Query Latency (ms)"}}},latencyTimeSpinner:{show:!0,message:"Generating graph..."},latencyTimeData:{ready:!1,data:[]},latencyTimeLayout:{ready:!1,layout:{title:"DNS Query Latency to Different DNS Resolvers over Time",xaxis:{title:"Date",type:"date"},yaxis:{title:"Endpoint DNS Query Latency (ms)"}}},latencyTimeCDFData:{ready:!1,data:[]},latencyTimeCDFLayout:{ready:!1,layout:{title:"CDF for DNS Query Latency to Different DNS Resolvers over Time",xaxis:{title:"Endpoint DNS Query Latency (ms)",autorange:!1},yaxis:{title:"Cumulative Probability",autorange:!1,range:[0,1]}}},bandwidthTimeSpinner:{show:!0,message:"Generating graph..."},bandwidthTimeData:{ready:!1,data:[]},bandwidthTimeLayout:{ready:!1,layout:{title:"Available Bandwidth & Bottleneck Bandwidth to Controller over Time",xaxis:{title:"Date",type:"date"},yaxis:{title:"Measured Bandwidth (Mbps)"}}},bandwidthTimeCDFData:{ready:!1,data:[]},bandwidthTimeCDFLayout:{ready:!1,layout:{title:"CDF for Available Bandwidth & Bottleneck Bandwidth to Controller over Time",xaxis:{title:"Measured Bandwidth (Mbps)",autorange:!1},yaxis:{title:"Cumulative Probability",autorange:!1,range:[0,1]}}},bandwidthHourlySpinner:{show:!0,message:"Generating graph..."},bandwidthHourlyData:{ready:!1,data:[]},bandwidthHourlyLayout:{ready:!1,layout:{title:"Average Available Bandwidth & Bottleneck Bandwidth to Controller by Hour",xaxis:{title:"Hour of Day (UTC)",range:[0,23],dtick:1},yaxis:{title:"Average Measured Bandwidth (Mbps)"}}},rttTimeSpinner:{show:!0,message:"Generating graph..."},rttTimeData:{ready:!1,data:[]},rttTimeLayout:{ready:!1,layout:{title:"Endpoint Controller RTT over Time",xaxis:{title:"Date",type:"date"},yaxis:{title:"Endpoint Controller RTT (ms)"}}},rttHourlySpinner:{show:!0,message:"Generating graph..."},rttHourlyData:{ready:!1,data:[]},rttHourlyLayout:{ready:!1,layout:{title:"Average Endpoint Controller RTT by Hour",xaxis:{title:"Hour of Day (UTC)",range:[0,23],dtick:1},yaxis:{title:"Average Endpoint Controller RTT (ms)"}}}}},computed:{endpointGraphs:function(){return[{spinner:this.latencyTimeSpinner,data:this.latencyTimeData,layout:this.latencyTimeLayout},{spinner:this.latencyTimeSpinner,data:this.latencyTimeCDFData,layout:this.latencyTimeCDFLayout},{spinner:this.latencyHourlySpinner,data:this.latencyHourlyData,layout:this.latencyHourlyLayout},{spinner:this.bandwidthTimeSpinner,data:this.bandwidthTimeData,layout:this.bandwidthTimeLayout},{spinner:this.bandwidthTimeSpinner,data:this.bandwidthTimeCDFData,layout:this.bandwidthTimeCDFLayout},{spinner:this.bandwidthHourlySpinner,data:this.bandwidthHourlyData,layout:this.bandwidthHourlyLayout},{spinner:this.rttTimeSpinner,data:this.rttTimeData,layout:this.rttTimeLayout},{spinner:this.rttHourlySpinner,data:this.rttHourlyData,layout:this.rttHourlyLayout}]}}}},"8a17":function(t,e,a){},9399:function(t,e,a){"use strict";function r(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e,a){return e&&r(t.prototype,e),a&&r(t,a),t}var i=function(){function t(t){var e=void 0===t?{color:[0,0,0],type:"rgb",precision:3,capitalize:!0}:t,a=e.color,r=void 0===a?[0,0,0]:a,n=e.type,i=void 0===n?"rgb":n,o=e.precision,s=void 0===o?3:o,u=e.capitalize,l=void 0===u||u;this.updateColor(r,i),this.precision=s,this.capitalize=l}return t.prototype.updateColor=function(e,a){var r;if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");switch(a){case"rgb":r=t.rgbToXyz(e);break;case"hsl":r=t.rgbToXyz(t.hslToRgb(e));break;case"hex":r=t.rgbToXyz(t.hexToRgb(e));break;case"lab":r=t.labToXyz(e);break;case"lchab":r=t.labToXyz(t.lchABToLab(e));break;case"luv":r=t.luvToXyz(e);break;case"lchuv":r=t.luvToXyz(t.lchUVToLuv(e));break;case"xyz":case"default":this._xyz=e,this._rgb=t.xyzToRgb(this._xyz),this._hsl=t.rgbToHsl(this._rgb),this._hex=t.rgbToHex(this._rgb),this._lab=t.xyzToLab(this._xyz),this._lchab=t.labToLCHab(this._lab),this._luv=t.xyzToLuv(this._xyz),this._lchuv=t.luvToLCHuv(this._luv)}"xyz"!==a&&this.updateColor(r,"xyz")},t.rgbToHsl=function(t){var e=t[0]/255,a=t[1]/255,r=t[2]/255,n=Math.max(e,a,r),i=Math.min(e,a,r),o=(n+i)/2,s=0,u=0;return n!==i&&(s=o<.5?(n-i)/(n+i):(n-i)/(2-n-i),u=e===n?(a-r)/(n-i):a===n?2+(r-e)/(n-i):4+(e-a)/(n-i)),[(u=(u*=60)<0?u%360+360:u)+0,0+(s*=100),0+(o*=100)]},t.hslToRgb=function(t){var e=t[0],a=t[1],r=t[2];isFinite(e)||(e=0),isFinite(a)||(a=0),isFinite(r)||(r=0),e=e<0?e%360+360:e,r/=100,a/=100,e/=60;var n=(1-Math.abs(2*r-1))*a,i=n*(1-Math.abs(e%2-1)),o=r-n/2,s=e<1?[n,i,0]:e<2?[i,n,0]:e<3?[0,n,i]:e<4?[0,i,n]:e<5?[i,0,n]:[n,0,i];return s.map((function(t){return Math.round(255*(t+o))+0}))},t.rgbToHex=function(t){function e(t){var e=t.toString(16);return 1===e.length?"0"+e:e}var a=t[0],r=t[1],n=t[2];return"#"+e(a)+e(r)+e(n)},t.hexToRgb=function(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,e,a,r){return e+e+a+a+r+r}));var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null},t.rgbToXyz=function(t){function e(t){return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}var a=t[0]/255,r=t[1]/255,n=t[2]/255,i=e(a),o=e(r),s=e(n);return[100*(.4124*i+.3576*o+.1805*s)+0,100*(.2126*i+.7152*o+.0722*s)+0,100*(.0193*i+.1192*o+.9505*s)+0]},t.xyzToRgb=function(t){function e(t){return t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055}var a=t[0]/100,r=t[1]/100,n=t[2]/100,i=-.9689307147293197*a+1.8757560608852415*r+.041517523842953964*n,o=.055710120445510616*a+-.2040210505984867*r+1.0569959422543882*n,s=e(3.2406254773200533*a-1.5372079722103187*r-.4986285986982479*n),u=e(i),l=e(o);return[Math.round(255*s)+0,Math.round(255*u)+0,Math.round(255*l)+0]},t.xyzToLab=function(e){function a(t){return 216/24389<t?o(t):(24389/27*t+16)/116}var r=e[0]/t.d65[0],n=e[1]/t.d65[1],i=e[2]/t.d65[2],o=null!=Math.cbrt?Math.cbrt:function(t){return Math.pow(t,1/3)},s=a(r),u=a(n);return[116*u-16,0+500*(s-u),0+200*(u-a(i))]},t.labToXyz=function(e){var a=e[0],r=e[1],n=216/24389,i=24389/27,o=(a+16)/116,s=o-e[2]/200,u=r/500+o,l=Math.pow(u,3)>n?Math.pow(u,3):(116*u-16)/i,c=8<a?Math.pow((a+16)/116,3):a/i,h=Math.pow(s,3)>n?Math.pow(s,3):(116*s-16)/i;return[l*t.d65[0]+0,c*t.d65[1]+0,h*t.d65[2]+0]},t.labToLCHab=function(e){var a=e[1],r=Math.abs(e[2])<t.maxZeroTolerance?0:e[2],n=Math.sqrt(a*a+r*r),i=0<=Math.atan2(r,a)?Math.atan2(r,a)/Math.PI*180:Math.atan2(r,a)/Math.PI*180+360;return[e[0]+0,n+0,0+i]},t.lchABToLab=function(t){var e=t[1],a=t[2],r=e*Math.cos(a/180*Math.PI),n=e*Math.sin(a/180*Math.PI);return[t[0]+0,0+r,0+n]},t.xyzToLuv=function(e){var a=e[0],r=e[1],n=e[2],i=t.d65[0],o=t.d65[1],s=t.d65[2],u=9*o/(i+15*o+3*s),l=4*i/(i+15*o+3*s);if(0===a&&0===r&&0===n)return[0,0,0];var c=9*r/(a+15*r+3*n),h=4*a/(a+15*r+3*n),d=r/o,p=null!=Math.cbrt?Math.cbrt:function(t){return Math.pow(t,1/3)},y=216/24389<d?116*p(d,1/3)-16:24389/27*d;return[0+y,0+13*y*(h-l),0+13*y*(c-u)]},t.luvToXyz=function(e){var a=e[0],r=e[1],n=e[2],i=t.d65[0],o=t.d65[1],s=t.d65[2],u=9*o/(i+15*o+3*s),l=4*i/(i+15*o+3*s),c=8<a?Math.pow((a+16)/116,3):a/(24389/27),h=-5*c,d=(52*a/(r+13*a*l)-1)/3||0,p=((c*(39*a/(n+13*a*u)-5)||0)-h)/(d- -1/3);return[100*p+0,100*c+0,100*(p*d+h)+0]},t.luvToLCHuv=function(e){var a=e[0],r=Math.abs(e[1])<t.maxZeroTolerance?0:e[1],n=Math.abs(e[2])<t.maxZeroTolerance?0:e[2],i=Math.sqrt(r*r+n*n),o=180*Math.atan2(n,r)/Math.PI;return[a+0,i+0,(o=0<=o?o:o+360)+0]},t.lchUVToLuv=function(t){var e=t[0],a=t[1],r=t[2]/180*Math.PI;return[e+0,0+a*Math.cos(r),0+a*Math.sin(r)]},t.luminance=function(e,a){if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");"rgb"!==a&&(e=new t({color:e,type:a}).rgb);for(var r=0;r<e.length;r++)e[r]/=255,e[r]<.03928?e[r]/=12.92:e[r]=Math.pow((e[r]+.055)/1.055,2.4);return.2126*e[0]+.7152*e[1]+.0722*e[2]},t.random=function(){return new t({color:[255,255,255].map((function(t){return Math.round(t*Math.random())}))})},t.randomFromString=function(e){function a(t){for(var e=4294967295,a=0;a<t.length;a++){var r=4026531840&(e=(e<<4)+t.charCodeAt(a));0!=r&&(e^=r>>>24,e^=r)}return Math.abs(e)}void 0===e&&(e="");var r=a(e),n=a(e+r);return new t({color:[r%256,n%256,a(e+n)%256]})},t.randomOfType=function(e){if(void 0===e&&(e="rgb"),"string"!=typeof e)throw new TypeError("Parameter 1 must be of type string.");if(e=e.toLowerCase(),!t.validTypes.includes(e))throw new TypeError("Parameter 1 '"+e+"' is not a valid type.");return t.random()[e]},t.randomOfTypeFormatted=function(e,a,r){if(void 0===e&&(e="rgb"),void 0===a&&(a=!0),void 0===r&&(r=3),"string"!=typeof e)throw new TypeError("Parameter 1 must be of type string.");if(e=e.toLowerCase(),!t.validTypes.includes(e))throw new TypeError("Parameter 1 '"+e+"' is not a valid type.");var n=t.random();return n.capitalize=a,n.precision=r,n[e+"String"]},t.contrastTextColor=function(e,a){if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");var r=t.contrastRatio(new t({color:[255,255,255]}),new t({color:e,type:a}));return t.contrastRatio(new t({color:[0,0,0]}),new t({color:e,type:a}))<r?"#FFFFFF":"#000000"},t.contrastRatio=function(e,a){if(!(e instanceof t))throw new TypeError("Parameter 1 must be of type Color.");if(!(a instanceof t))throw new TypeError("Parameter 2 must be of type Color.");var r=t.luminance(e.rgb)+.05,n=t.luminance(a.rgb)+.05;return r<n?n/r:r/n},n(t,[{key:"rgb",get:function(){return this._rgb},set:function(t){this.updateColor(t,"rgb")}},{key:"rgbString",get:function(){var t="RGB("+this.rgb.join(", ")+")";return this.capitalize?t.toUpperCase():t.toLowerCase()}},{key:"hsl",get:function(){return this._hsl},set:function(t){this.updateColor(t,"hsl")}},{key:"hslString",get:function(){var t=this,e="HSL("+this.hsl.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"hex",get:function(){return this._hex},set:function(t){this.updateColor(t,"hex")}},{key:"hexString",get:function(){var t=this._hex;return this.capitalize?t.toUpperCase():t.toLowerCase()}},{key:"xyz",get:function(){return this._xyz},set:function(t){this.updateColor(t,"xyz")}},{key:"xyzString",get:function(){var t=this,e="XYZ("+this.xyz.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lab",get:function(){return this._lab},set:function(t){this.updateColor(t,"lab")}},{key:"labString",get:function(){var t=this,e="LAB("+this.lab.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lchab",get:function(){return this._lchab},set:function(t){this.updateColor(t,"lchab")}},{key:"lchabString",get:function(){var t=this,e=this.lchab.map((function(e){return e.toFixed(t.precision)}));return this.capitalize?"LCHab("+e.join(", ")+")":"lchAB("+e.join(", ")+")"}},{key:"luv",get:function(){return this._luv},set:function(t){this.updateColor(t,"luv")}},{key:"luvString",get:function(){var t=this,e="LUV("+this.luv.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lchuv",get:function(){return this._lchuv},set:function(t){this.updateColor(t,"lchuv")}},{key:"lchuvString",get:function(){var t=this,e=this.lchuv.map((function(e){return e.toFixed(t.precision)}));return this.capitalize?"LCHuv("+e.join(", ")+")":"lchUV("+e.join(", ")+")"}}]),t}();i.validTypes=["rgb","hex","hsl","xyz","lab","lchab","luv","lchuv"],i.d65=[95.05,100,108.9],i.maxZeroTolerance=Math.pow(10,-12),t.exports=i},fb73:function(t,e,a){"use strict";var r=a("8a17"),n=a.n(r);n.a}}]);
//# sourceMappingURL=chunk-4511d986.js.map