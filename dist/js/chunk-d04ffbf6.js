(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d04ffbf6"],{"0ab9":function(t,e,a){"use strict";t.exports.numbers=n,t.exports.sum=o,t.exports.mean=s,t.exports.median=u,t.exports.mode=c,t.exports.variance=h,t.exports.sampleVariance=d,t.exports.populationVariance=h,t.exports.stdev=p,t.exports.sampleStdev=m,t.exports.populationStdev=p,t.exports.percentile=f,t.exports.histogram=g;var r=a("7380");function n(t){var e=[];if(null==t)return e;for(var a=0;a<t.length;a++)r(t[a])&&e.push(+t[a]);return e}function i(t){return t.sort((function(t,e){return t-e}))}function o(t){t=n(t);for(var e=0,a=0;a<t.length;a++)e+=t[a];return e}function s(t){return t=n(t),0===t.length?NaN:o(t)/t.length}function u(t){if(t=n(t),0===t.length)return NaN;var e=t.length/2|0;return t=i(t),t.length%2?t[e]:(t[e-1]+t[e])/2}function c(t){if(t=n(t),0===t.length)return NaN;for(var e=NaN,a={},r=0;r<t.length;r++){var i=t[r],o=a[i]||0;o++,a[i]=o}var s=n(Object.keys(a).sort((function(t,e){return a[e]-a[t]})));if(e=s[0],a[s[1]]==a[e]){if(s.length==t.length)return t;var u=new Set([e]),c=a[e];for(r=1;r<s.length;r++){if(a[s[r]]!=c)break;u.add(s[r])}return u}return e}function l(t){t=n(t);for(var e=s(t),a=[],r=0;r<t.length;r++)a.push(Math.pow(t[r]-e,2));return a}function h(t){return s(l(t))}function d(t){var e=l(t);return e.length<=1?NaN:o(e)/(e.length-1)}function p(t){return Math.sqrt(h(t))}function m(t){return Math.sqrt(d(t))}function f(t,e){if(t=n(t),0===t.length||null==e||e<0)return NaN;e>1&&(e=1),t=i(t);var a=t.length*e-.5;if((0|a)===a)return t[a];var r=0|a,o=a-r;return(1-o)*t[r]+o*t[Math.min(r+1,t.length-1)]}function g(t,e){if(null==t)return null;if(t=i(n(t)),0===t.length)return null;null==e&&(e=Math.sqrt(t.length)),e=Math.round(e),e<1&&(e=1);var a=t[0],r=t[t.length-1];a===r&&(a-=.5,r+=.5);var o=r-a,s=(o+.05*o)/e,u=(a+r)/2,c=u-s*Math.floor(e/2);if(e%2!==0)c=u-s/2-s*Math.floor(e/2);for(var l={values:Array(e).fill(0),bins:e,binWidth:s,binLimits:[c,c+s*e]},h=0,d=0;d<t.length;d++){while(t[d]>(h+1)*s+c)h++;l.values[h]++}return l}},"13d5":function(t,e,a){"use strict";var r=a("23e7"),n=a("d58f").left,i=a("a640"),o=a("ae40"),s=i("reduce"),u=o("reduce",{1:0});r({target:"Array",proto:!0,forced:!s||!u},{reduce:function(t){return n(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},2532:function(t,e,a){"use strict";var r=a("23e7"),n=a("5a34"),i=a("1d80"),o=a("ab13");r({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(i(this)).indexOf(n(t),arguments.length>1?arguments[1]:void 0)}})},"2a6d":function(t,e,a){"use strict";var r=a("df0d"),n=a.n(r);n.a},"44e7":function(t,e,a){var r=a("861d"),n=a("c6b6"),i=a("b622"),o=i("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==n(t))}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var r=a("1d80"),n=a("5899"),i="["+n+"]",o=RegExp("^"+i+i+"*"),s=RegExp(i+i+"*$"),u=function(t){return function(e){var a=String(r(e));return 1&t&&(a=a.replace(o,"")),2&t&&(a=a.replace(s,"")),a}};t.exports={start:u(1),end:u(2),trim:u(3)}},"5a34":function(t,e,a){var r=a("44e7");t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},7380:function(t,e){function a(t){return!isNaN(parseFloat(t))&&isFinite(t)}t.exports=a},"78c4":function(t,e,a){"use strict";var r=a("b114"),n=a.n(r);n.a},"81d5":function(t,e,a){"use strict";var r=a("7b0b"),n=a("23cb"),i=a("50c4");t.exports=function(t){var e=r(this),a=i(e.length),o=arguments.length,s=n(o>1?arguments[1]:void 0,a),u=o>2?arguments[2]:void 0,c=void 0===u?a:n(u,a);while(c>s)e[s++]=t;return e}},9399:function(t,e,a){"use strict";function r(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e,a){return e&&r(t.prototype,e),a&&r(t,a),t}var i=function(){function t(t){var e=void 0===t?{color:[0,0,0],type:"rgb",precision:3,capitalize:!0}:t,a=e.color,r=void 0===a?[0,0,0]:a,n=e.type,i=void 0===n?"rgb":n,o=e.precision,s=void 0===o?3:o,u=e.capitalize,c=void 0===u||u;this.updateColor(r,i),this.precision=s,this.capitalize=c}return t.prototype.updateColor=function(e,a){var r;if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");switch(a){case"rgb":r=t.rgbToXyz(e);break;case"hsl":r=t.rgbToXyz(t.hslToRgb(e));break;case"hex":r=t.rgbToXyz(t.hexToRgb(e));break;case"lab":r=t.labToXyz(e);break;case"lchab":r=t.labToXyz(t.lchABToLab(e));break;case"luv":r=t.luvToXyz(e);break;case"lchuv":r=t.luvToXyz(t.lchUVToLuv(e));break;case"xyz":case"default":this._xyz=e,this._rgb=t.xyzToRgb(this._xyz),this._hsl=t.rgbToHsl(this._rgb),this._hex=t.rgbToHex(this._rgb),this._lab=t.xyzToLab(this._xyz),this._lchab=t.labToLCHab(this._lab),this._luv=t.xyzToLuv(this._xyz),this._lchuv=t.luvToLCHuv(this._luv)}"xyz"!==a&&this.updateColor(r,"xyz")},t.rgbToHsl=function(t){var e=t[0]/255,a=t[1]/255,r=t[2]/255,n=Math.max(e,a,r),i=Math.min(e,a,r),o=(n+i)/2,s=0,u=0;return n!==i&&(s=o<.5?(n-i)/(n+i):(n-i)/(2-n-i),u=e===n?(a-r)/(n-i):a===n?2+(r-e)/(n-i):4+(e-a)/(n-i)),[(u=(u*=60)<0?u%360+360:u)+0,0+(s*=100),0+(o*=100)]},t.hslToRgb=function(t){var e=t[0],a=t[1],r=t[2];isFinite(e)||(e=0),isFinite(a)||(a=0),isFinite(r)||(r=0),e=e<0?e%360+360:e,r/=100,a/=100,e/=60;var n=(1-Math.abs(2*r-1))*a,i=n*(1-Math.abs(e%2-1)),o=r-n/2,s=e<1?[n,i,0]:e<2?[i,n,0]:e<3?[0,n,i]:e<4?[0,i,n]:e<5?[i,0,n]:[n,0,i];return s.map((function(t){return Math.round(255*(t+o))+0}))},t.rgbToHex=function(t){function e(t){var e=t.toString(16);return 1===e.length?"0"+e:e}var a=t[0],r=t[1],n=t[2];return"#"+e(a)+e(r)+e(n)},t.hexToRgb=function(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,e,a,r){return e+e+a+a+r+r}));var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null},t.rgbToXyz=function(t){function e(t){return t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}var a=t[0]/255,r=t[1]/255,n=t[2]/255,i=e(a),o=e(r),s=e(n);return[100*(.4124*i+.3576*o+.1805*s)+0,100*(.2126*i+.7152*o+.0722*s)+0,100*(.0193*i+.1192*o+.9505*s)+0]},t.xyzToRgb=function(t){function e(t){return t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055}var a=t[0]/100,r=t[1]/100,n=t[2]/100,i=-.9689307147293197*a+1.8757560608852415*r+.041517523842953964*n,o=.055710120445510616*a+-.2040210505984867*r+1.0569959422543882*n,s=e(3.2406254773200533*a-1.5372079722103187*r-.4986285986982479*n),u=e(i),c=e(o);return[Math.round(255*s)+0,Math.round(255*u)+0,Math.round(255*c)+0]},t.xyzToLab=function(e){function a(t){return 216/24389<t?o(t):(24389/27*t+16)/116}var r=e[0]/t.d65[0],n=e[1]/t.d65[1],i=e[2]/t.d65[2],o=null!=Math.cbrt?Math.cbrt:function(t){return Math.pow(t,1/3)},s=a(r),u=a(n);return[116*u-16,0+500*(s-u),0+200*(u-a(i))]},t.labToXyz=function(e){var a=e[0],r=e[1],n=216/24389,i=24389/27,o=(a+16)/116,s=o-e[2]/200,u=r/500+o,c=Math.pow(u,3)>n?Math.pow(u,3):(116*u-16)/i,l=8<a?Math.pow((a+16)/116,3):a/i,h=Math.pow(s,3)>n?Math.pow(s,3):(116*s-16)/i;return[c*t.d65[0]+0,l*t.d65[1]+0,h*t.d65[2]+0]},t.labToLCHab=function(e){var a=e[1],r=Math.abs(e[2])<t.maxZeroTolerance?0:e[2],n=Math.sqrt(a*a+r*r),i=0<=Math.atan2(r,a)?Math.atan2(r,a)/Math.PI*180:Math.atan2(r,a)/Math.PI*180+360;return[e[0]+0,n+0,0+i]},t.lchABToLab=function(t){var e=t[1],a=t[2],r=e*Math.cos(a/180*Math.PI),n=e*Math.sin(a/180*Math.PI);return[t[0]+0,0+r,0+n]},t.xyzToLuv=function(e){var a=e[0],r=e[1],n=e[2],i=t.d65[0],o=t.d65[1],s=t.d65[2],u=9*o/(i+15*o+3*s),c=4*i/(i+15*o+3*s);if(0===a&&0===r&&0===n)return[0,0,0];var l=9*r/(a+15*r+3*n),h=4*a/(a+15*r+3*n),d=r/o,p=null!=Math.cbrt?Math.cbrt:function(t){return Math.pow(t,1/3)},m=216/24389<d?116*p(d,1/3)-16:24389/27*d;return[0+m,0+13*m*(h-c),0+13*m*(l-u)]},t.luvToXyz=function(e){var a=e[0],r=e[1],n=e[2],i=t.d65[0],o=t.d65[1],s=t.d65[2],u=9*o/(i+15*o+3*s),c=4*i/(i+15*o+3*s),l=8<a?Math.pow((a+16)/116,3):a/(24389/27),h=-5*l,d=(52*a/(r+13*a*c)-1)/3||0,p=((l*(39*a/(n+13*a*u)-5)||0)-h)/(d- -1/3);return[100*p+0,100*l+0,100*(p*d+h)+0]},t.luvToLCHuv=function(e){var a=e[0],r=Math.abs(e[1])<t.maxZeroTolerance?0:e[1],n=Math.abs(e[2])<t.maxZeroTolerance?0:e[2],i=Math.sqrt(r*r+n*n),o=180*Math.atan2(n,r)/Math.PI;return[a+0,i+0,(o=0<=o?o:o+360)+0]},t.lchUVToLuv=function(t){var e=t[0],a=t[1],r=t[2]/180*Math.PI;return[e+0,0+a*Math.cos(r),0+a*Math.sin(r)]},t.luminance=function(e,a){if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");"rgb"!==a&&(e=new t({color:e,type:a}).rgb);for(var r=0;r<e.length;r++)e[r]/=255,e[r]<.03928?e[r]/=12.92:e[r]=Math.pow((e[r]+.055)/1.055,2.4);return.2126*e[0]+.7152*e[1]+.0722*e[2]},t.random=function(){return new t({color:[255,255,255].map((function(t){return Math.round(t*Math.random())}))})},t.randomFromString=function(e){function a(t){for(var e=4294967295,a=0;a<t.length;a++){var r=4026531840&(e=(e<<4)+t.charCodeAt(a));0!=r&&(e^=r>>>24,e^=r)}return Math.abs(e)}void 0===e&&(e="");var r=a(e),n=a(e+r);return new t({color:[r%256,n%256,a(e+n)%256]})},t.randomOfType=function(e){if(void 0===e&&(e="rgb"),"string"!=typeof e)throw new TypeError("Parameter 1 must be of type string.");if(e=e.toLowerCase(),!t.validTypes.includes(e))throw new TypeError("Parameter 1 '"+e+"' is not a valid type.");return t.random()[e]},t.randomOfTypeFormatted=function(e,a,r){if(void 0===e&&(e="rgb"),void 0===a&&(a=!0),void 0===r&&(r=3),"string"!=typeof e)throw new TypeError("Parameter 1 must be of type string.");if(e=e.toLowerCase(),!t.validTypes.includes(e))throw new TypeError("Parameter 1 '"+e+"' is not a valid type.");var n=t.random();return n.capitalize=a,n.precision=r,n[e+"String"]},t.contrastTextColor=function(e,a){if(void 0===a&&(a="rgb"),"string"!=typeof a)throw new TypeError("Parameter 2 must be of type string.");if(a=a.toLowerCase(),!t.validTypes.includes(a))throw new TypeError("Parameter 2 '"+a+"' is not a valid type.");var r=t.contrastRatio(new t({color:[255,255,255]}),new t({color:e,type:a}));return t.contrastRatio(new t({color:[0,0,0]}),new t({color:e,type:a}))<r?"#FFFFFF":"#000000"},t.contrastRatio=function(e,a){if(!(e instanceof t))throw new TypeError("Parameter 1 must be of type Color.");if(!(a instanceof t))throw new TypeError("Parameter 2 must be of type Color.");var r=t.luminance(e.rgb)+.05,n=t.luminance(a.rgb)+.05;return r<n?n/r:r/n},n(t,[{key:"rgb",get:function(){return this._rgb},set:function(t){this.updateColor(t,"rgb")}},{key:"rgbString",get:function(){var t="RGB("+this.rgb.join(", ")+")";return this.capitalize?t.toUpperCase():t.toLowerCase()}},{key:"hsl",get:function(){return this._hsl},set:function(t){this.updateColor(t,"hsl")}},{key:"hslString",get:function(){var t=this,e="HSL("+this.hsl.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"hex",get:function(){return this._hex},set:function(t){this.updateColor(t,"hex")}},{key:"hexString",get:function(){var t=this._hex;return this.capitalize?t.toUpperCase():t.toLowerCase()}},{key:"xyz",get:function(){return this._xyz},set:function(t){this.updateColor(t,"xyz")}},{key:"xyzString",get:function(){var t=this,e="XYZ("+this.xyz.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lab",get:function(){return this._lab},set:function(t){this.updateColor(t,"lab")}},{key:"labString",get:function(){var t=this,e="LAB("+this.lab.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lchab",get:function(){return this._lchab},set:function(t){this.updateColor(t,"lchab")}},{key:"lchabString",get:function(){var t=this,e=this.lchab.map((function(e){return e.toFixed(t.precision)}));return this.capitalize?"LCHab("+e.join(", ")+")":"lchAB("+e.join(", ")+")"}},{key:"luv",get:function(){return this._luv},set:function(t){this.updateColor(t,"luv")}},{key:"luvString",get:function(){var t=this,e="LUV("+this.luv.map((function(e){return e.toFixed(t.precision)})).join(", ")+")";return this.capitalize?e.toUpperCase():e.toLowerCase()}},{key:"lchuv",get:function(){return this._lchuv},set:function(t){this.updateColor(t,"lchuv")}},{key:"lchuvString",get:function(){var t=this,e=this.lchuv.map((function(e){return e.toFixed(t.precision)}));return this.capitalize?"LCHuv("+e.join(", ")+")":"lchUV("+e.join(", ")+")"}}]),t}();i.validTypes=["rgb","hex","hsl","xyz","lab","lchab","luv","lchuv"],i.d65=[95.05,100,108.9],i.maxZeroTolerance=Math.pow(10,-12),t.exports=i},a9e3:function(t,e,a){"use strict";var r=a("83ab"),n=a("da84"),i=a("94ca"),o=a("6eeb"),s=a("5135"),u=a("c6b6"),c=a("7156"),l=a("c04e"),h=a("d039"),d=a("7c73"),p=a("241c").f,m=a("06cf").f,f=a("9bf2").f,g=a("58a8").trim,y="Number",b=n[y],v=b.prototype,w=u(d(v))==y,T=function(t){var e,a,r,n,i,o,s,u,c=l(t,!1);if("string"==typeof c&&c.length>2)if(c=g(c),e=c.charCodeAt(0),43===e||45===e){if(a=c.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+c}for(i=c.slice(2),o=i.length,s=0;s<o;s++)if(u=i.charCodeAt(s),u<48||u>n)return NaN;return parseInt(i,r)}return+c};if(i(y,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var x,S=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof S&&(w?h((function(){v.valueOf.call(a)})):u(a)!=y)?c(new b(T(e)),a,S):T(e)},M=r?p(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_=0;M.length>_;_++)s(b,x=M[_])&&!s(S,x)&&f(S,x,m(b,x));S.prototype=v,v.constructor=S,o(n,y,S)}},ab13:function(t,e,a){var r=a("b622"),n=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(a){try{return e[n]=!1,"/./"[t](e)}catch(r){}}return!1}},b114:function(t,e,a){},c3c0:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"monitors"},[a("main-header",{attrs:{title:t.title}}),a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{attrs:{cols:"11"}},[a("date-range-dropdown",{attrs:{callback:t.processHeatmapData,route:{name:"Monitors",params:{id:this.params.id}}},on:{change:t.setTimeRange}})],1)],1),a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{staticClass:"graph-row",attrs:{cols:"11"}},[a("heatmap",{attrs:{spinner:t.heatmapSpinner,dataSummary:t.dataSummary,legend:""}})],1)],1),t.monitorIDs?a("div",[a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{staticClass:"graph-row",attrs:{cols:"11"}},[a("graph",{attrs:{data:t.latencyTimeData,layout:t.latencyTimeLayout,spinner:t.latencyTimeSpinner}})],1)],1),a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{staticClass:"graph-row",attrs:{cols:"11"}},[a("graph",{attrs:{data:t.latencyHourlyData,layout:t.latencyHourlyLayout,spinner:t.latencyHourlySpinner}})],1)],1),a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{staticClass:"graph-row",attrs:{cols:"11"}},[a("graph",{attrs:{data:t.bandwidthTimeData,layout:t.bandwidthTimeLayout,spinner:t.bandwidthTimeSpinner}})],1)],1),a("ac-grid",{attrs:{cols:"12","align-h":"center"}},[a("ac-col",{staticClass:"graph-row",attrs:{cols:"11"}},[a("graph",{attrs:{data:t.bandwidthHourlyData,layout:t.bandwidthHourlyLayout,spinner:t.bandwidthHourlySpinner}})],1)],1)],1):t._e()],1)},n=[],i=(a("cb29"),a("4de4"),a("4160"),a("caad"),a("d81d"),a("13d5"),a("b0c0"),a("a9e3"),a("b64b"),a("07ac"),a("2532"),a("159b"),a("96cf"),a("1da1")),o=a("0ab9"),s=a.n(o),u=a("d204"),c=a("6ccf"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"wrapper",staticClass:"status-heatmap"},[a("div",{ref:"graphMenu",staticClass:"graph-menu"},[t.legend?a("div",{staticClass:"legend-wrapper"},[a("div",{class:{legend:!0,show:t.showFullLegend}},t._l(t.statusTypeList,(function(e){return a("div",{key:e.type,class:["key-element",e.hidden?"disabled":""],on:{click:function(a){return t.toggleHiddenStatus(e.type)}}},[a("div",{staticClass:"key-color",style:{backgroundColor:e.color}}),a("div",{staticClass:"key-label"},[t._v(t._s(e.type))])])})),0),a("div",{staticClass:"legend-toggle",on:{click:function(e){t.showFullLegend=!t.showFullLegend}}},[t._v(t._s(t.legendToggleText))])]):t._e()]),a("graph",{ref:"graphContainer",staticClass:"graphContainer",attrs:{layout:t.graphLayout,data:t.graphData,config:t.graphConfig,spinner:t.tempSpinner}})],1)},h=[],d=(a("d3b7"),{props:{dataSummary:{type:Object,default:function(){return{}}},sort:{type:Boolean,default:!1},legend:{type:Boolean,default:!1},spinner:{type:Object,default:function(){return{show:!0,message:"Generating graph..."}}}},data:function(){return{BUCKETIFY_BUCKET_SIZE:30,HEATMAP_MIN_HEIGHT:120,ADJUSTED_BAR_HEIGHT:50,graphGenerated:!1,sortMode:"earliestFirstUpdate",sortFunctions:{earliestFirstUpdate:function(t,e){return t.minTimestamp-e.minTimestamp},latestFirstUpdate:function(t,e){return e.minTimestamp-t.minTimestamp},lastUpdated:function(t,e){return e.maxTimestamp-t.maxTimestamp},parentID:function(t,e){return t.id>e.id?1:-1},parentIDReverse:function(t,e){return t.id<e.id?1:-1}},embedIDURL:function(t){return t},visibleStatusTypes:[],statusTypeList:[],graphConfig:{ready:!1,config:{responsive:!0,displayModeBar:!1}},graphLayout:{ready:!1,layout:{xaxis:{type:"date",side:"top"},yaxis:{title:{}},margin:{b:20,t:50,r:10,pad:0},font:{family:"sans-serif",size:16,color:"#333"}}},tempSpinner:{show:!0,message:"Generating graph..."},graphData:{ready:!1,data:[]},showFullLegend:!1}},methods:{updateEmbedIDURL:function(t){if("function"!==typeof t)throw TypeError("Argument 'embedFunction' must be of type function");this.embedIDURL=t},sortFunction:function(){return this.sortFunctions[this.sortMode]},scale:function(t,e,a,r,n){return(t-e)*(n-r)/(a-e)+r},toggleHiddenStatus:function(t){var e=this.dataSummary.statusTypes;null!=e[t]&&(e[t].hidden=!e[t].hidden,this.updateStatusTypeList(),this.graph(this.dataSummary))},graph:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.graphLayout.layout.yaxis.title.text=t.type+" ID",e.graphLayout.layout.xaxis.range=[t.startDate,t.endDate],e.graphLoading=!0,e.graphData.ready=!1,e.graphLayout.ready=!1,e.graphConfig.ready=!1,e.BUCKETIFY_BUCKET_SIZE=(e.dataSummary.maxTimestamp-e.dataSummary.minTimestamp)*(3.4722*Math.pow(10,-4)),a.next=9,e.$nextTick();case 9:return e.graphContainer.$el.style.height=Math.max(e.ADJUSTED_BAR_HEIGHT*t.groupedData.length,e.HEATMAP_MIN_HEIGHT)+"px",r=new Promise((function(a,r){t.groupedData.sort(e.sortFunction()).reverse();var n=JSON.parse(JSON.stringify(t.groupedData));t.parentIDs=n.map((function(t){return t.id}));var i=e.statusTypeList;e.updateHeatmapCharts().then((function(r){e.tempSpinner.message="Generating graph...",e.graphData.data=[],i.forEach((function(a,n){var i=[];i.push(["0.0",a.color]),i.push(["1.0",a.color]),e.graphData.data[n]={x:t.dates,y:t.parentIDs.map((function(t){return e.embedIDURL(t)})),z:r.statusChart[a.type],type:"heatmap",hoverongaps:!1,colorscale:i,showscale:!1,text:r.statusLabel[a.type],hoverinfo:"text",ygap:.75}})),e.graphData.ready=!0,e.graphLayout.ready=!0,e.graphConfig.ready=!0,e.graphGenerated=!0,a()})).catch((function(t){r(t)}))})).finally((function(){e.graphLoading=!1,e.tempSpinner.show=!1})),a.abrupt("return",r);case 12:case"end":return a.stop()}}),a)})))()},updateHeatmapCharts:function(){var t=this,e=this,a=new Promise((function(a,r){if(Worker){var n=new Worker("workers/update-heatmap-charts.worker.js");n.addEventListener("message",(function(r){var i=r.data;"finished"==i.status?(n.terminate(),e.dataSummary.dates=i.dates,a({statusChart:i.statusChart,statusLabel:i.statusLabel})):"update"==i.status&&(t.tempSpinner.message="Processing data (".concat(i.body,"%)"))})),n.postMessage({dataSummary:e.dataSummary,visibleStatusTypes:e.visibleStatusTypes,BUCKETIFY_BUCKET_SIZE:e.BUCKETIFY_BUCKET_SIZE})}else r(Error("Web Workers not enabled"))}));return a},updateStatusTypeList:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.visibleStatusTypes=null,t.statusTypeList=null,e.next=4,t.$nextTick();case 4:t.statusTypeList=Object.values(t.dataSummary.statusTypes||{}),t.visibleStatusTypes=t.statusTypeList.filter((function(t){return!t.hidden}));case 6:case"end":return e.stop()}}),e)})))()}},computed:{graphContainer:function(){return this.$refs.graphContainer},legendToggleText:function(){return this.showFullLegend?" - Show Less":"+ Show More"}},components:{graph:c["a"]},watch:{spinner:{immediate:!0,deep:!0,handler:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$nextTick();case 2:e.tempSpinner.show=t.show,null!=t.message&&(e.tempSpinner.message=t.message);case 4:case"end":return a.stop()}}),a)})))()}},dataSummary:{immediate:!0,deep:!0,handler:function(t){this.updateStatusTypeList(),t.ready&&this.graph(t)}}}}),p=d,m=(a("78c4"),a("2877")),f=Object(m["a"])(p,l,h,!1,null,null,null),g=f.exports,y=a("bdbd"),b=a("c1df"),v=a.n(b),w=a("9399"),T=a.n(w),x={data:function(){return{timeRange:{toTime:null,fromTime:null},defaultTitle:"Monitors Overview",title:"",dataSummary:{ready:!1},heatmapSpinner:{show:!0,message:"Generating graph..."},latencyHourlySpinner:{show:!0,message:"Generating graph..."},latencyHourlyData:{ready:!1,data:[]},latencyHourlyLayout:{ready:!1,layout:{title:"Average DNS Query Latency by Hour",xaxis:{title:"Hour of Day (UTC)",range:[0,23],dtick:1},yaxis:{title:"Average Endpoint DNS Query Latency (ms)"}}},latencyTimeSpinner:{show:!0,message:"Generating graph..."},latencyTimeData:{ready:!1,data:[]},latencyTimeLayout:{ready:!1,layout:{title:"DNS Query Latency to Different DNS Resolvers over Time",xaxis:{title:"Date",type:"date"},yaxis:{title:"Endpoint DNS Query Latency (ms)"}}},bandwidthTimeSpinner:{show:!0,message:"Generating graph..."},bandwidthTimeData:{ready:!1,data:[]},bandwidthTimeLayout:{ready:!1,layout:{title:"Available Bandwidth & Bottleneck Bandwidth to Controller over Time",xaxis:{title:"Date",type:"date"},yaxis:{title:"Measured Bandwidth (Mbps)"}}},bandwidthHourlySpinner:{show:!0,message:"Generating graph..."},bandwidthHourlyData:{ready:!1,data:[]},bandwidthHourlyLayout:{ready:!1,layout:{title:"Average Available Bandwidth & Bottleneck Bandwidth to Controller by Hour",xaxis:{title:"Hour of Day (UTC)",range:[0,23],dtick:1},yaxis:{title:"Average Measured Bandwidth (Mbps)"}}}}},components:{"main-header":u["a"],heatmap:g,"date-range-dropdown":y["a"],graph:c["a"]},computed:{params:function(){return this.$route.params},query:function(){return this.$route.query},rangeDropdownOptions:function(){return Object.values(this.rangeValues)},monitorIDs:function(){return null!=this.params.id?[this.params.id]:null}},methods:{setTimeRange:function(t){this.timeRange=t},setTitle:function(){null!=this.params.id?this.title="Monitor "+this.params.id:this.title=this.defaultTitle},processHeatmapData:function(t,e,a){var r=this;this.heatmapSpinner={show:!0,message:"Sorting data..."};var n=this.dataSummary;n.ready=!1,n.minTimestamp=Number.MAX_VALUE,n.maxTimestamp=0,n.type="Monitor",n.statusTypes={};var i=0,o=Object.values(t.reduce((function(o,s){r.heatmapSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++;var u="M"+s.monitor,c=Math.max(e,s.start),l=Math.min(a,s.end);c>n.maxTimestamp&&(n.maxTimestamp=c),c<n.minTimestamp&&(n.minTimestamp=c),l>n.maxTimestamp&&(n.maxTimestamp=l),l<n.minTimestamp&&(n.minTimestamp=l),null==o[u]&&(o[u]={id:u,minTimestamp:Math.min(c,l),maxTimestamp:Math.max(c,l),records:{}}),c>o[u].maxTimestamp&&(o[u].maxTimestamp=c),c<o[u].minTimestamp&&(o[u].minTimestamp=c),l>o[u].maxTimestamp&&(o[u].maxTimestamp=l),l<o[u].minTimestamp&&(o[u].minTimestamp=l);var h=s.exp;if(o[u].records[h]=o[u].records[h]||[],o[u].records[h].push({status:h,success:1===s.success,exp:s.exp,ip:s.ip,timestamp:c}),o[u].records[h].push({status:null,success:1===s.success,exp:s.exp,ip:s.ip,timestamp:l}),null==n.statusTypes[h]){var d=T.a.random();n.statusTypes[h]={type:h,hidden:!1,color:d.rgbString.toLowerCase()}}return o}),{}));n.minTimestamp=n.minTimestamp==Number.MAX_VALUE?e:n.minTimestamp,n.maxTimestamp=0==n.maxTimestamp?a:n.maxTimestamp,n.startDate=v()(n.minTimestamp,"X").format("YYYY-MM-DD HH:mm:ss"),n.endDate=v()(n.maxTimestamp,"X").format("YYYY-MM-DD HH:mm:ss"),n.groupedData=o,n.ready=!0},processLatencyHourlyData:function(t){var e=this;this.latencyHourlySpinner={show:!0,message:"Sorting data..."},this.latencyHourlyData.ready=!1,this.latencyHourlyLayout.ready=!1;var a=this.$store.state.experiments.filter((function(t){return"latency"==t.category})).map((function(t){return t.name})),r={},n=function(t,e){r[e]||(r[e]=new Array(24).fill(),r[e]=r[e].map((function(){return[]})));var a=t.ctrl_stime/Math.pow(10,6),n=t.ctrl_rtime/Math.pow(10,6),i=n-a,o=v()(a,"x").utc().hours();isNaN(o)||isNaN(i)||r[e][o].push(i)},i=0;t.forEach((function(r){a.includes(r.exp)&&("DNS_local"==r.exp?n(r.data.rst_list[0],r.exp):n(r.data,r.exp)),e.latencyHourlySpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++})),Object.keys(r).forEach((function(t){var e=null;r[t]=r[t].map((function(t){var a=t.filter((function(t){return!!t}));if(0==a.length)return e;var r=s.a.mean(a);return e=r,r}))})),this.latencyHourlySpinner.message="Generating graph...",this.latencyHourlyData.data=[];var o=2,u=new Array(24).fill().map((function(t,e){return e}));Object.keys(r).forEach((function(t){var a=T.a.random();e.latencyHourlyData.data.push({x:u,y:r[t],name:t,mode:"lines+markers",line:{color:a.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:a.rgbString,width:o}}})})),this.latencyHourlyData.ready=!0,this.latencyHourlyLayout.ready=!0,this.latencyHourlySpinner.show=!1},processLatencyTimeData:function(t){var e=this;this.latencyTimeSpinner={show:!0,message:"Sorting data..."},this.latencyTimeData.ready=!1,this.latencyTimeLayout.ready=!1;var a=this.$store.state.experiments.filter((function(t){return"latency"==t.category})).map((function(t){return t.name})),r={},n=function(t,e){r[e]||(r[e]=[]);var a=t.ctrl_stime/Math.pow(10,6),n=t.ctrl_rtime/Math.pow(10,6),i=n-a,o=v()(a,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");isNaN(i)||r[e].push({timestamp:o,latency:i})},i=0;t.forEach((function(r){a.includes(r.exp)&&("DNS_local"==r.exp?n(r.data.rst_list[0],r.exp):n(r.data,r.exp)),e.latencyTimeSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++})),this.latencyTimeSpinner.message="Generating graph...",this.latencyTimeData.data=[];var o=2;Object.keys(r).forEach((function(t){var a=T.a.random();e.latencyTimeData.data.push({x:r[t].map((function(t){return t.timestamp})),y:r[t].map((function(t){return t.latency})),name:t,mode:"lines+markers",line:{color:a.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:a.rgbString,width:o}}})})),this.latencyTimeData.ready=!0,this.latencyTimeLayout.ready=!0,this.latencyTimeSpinner.show=!1},processBandwidthTimeData:function(t){var e=this;this.bandwidthTimeSpinner={show:!0,message:"Sorting data..."},this.bandwidthTimeData.ready=!1,this.bandwidthTimeLayout.ready=!1;var a=this.$store.state.experiments.filter((function(t){return"bandwidth"==t.category})).map((function(t){return t.name})),r={},n=function(t){r.avail_band=r.avail_band||[],r.btnk_band=r.btnk_band||[];var e=t.ctrl_stime/Math.pow(10,6),a=v()(e,"x").utc().format("YYYY-MM-DD HH:mm:ss.SS");t.avail_band&&t.btnk_band&&(r.avail_band.push({bandwidth:t.avail_band/Math.pow(10,6),timestamp:a}),r.btnk_band.push({bandwidth:t.btnk_band/Math.pow(10,6),timestamp:a}))},i=0;t.forEach((function(r){a.includes(r.exp)&&n(r.data),e.bandwidthTimeSpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++})),this.bandwidthTimeSpinner.message="Generating graph...",this.bandwidthTimeData.data=[];var o=2;Object.keys(r).forEach((function(t){var a=T.a.random();e.bandwidthTimeData.data.push({x:r[t].map((function(t){return t.timestamp})),y:r[t].map((function(t){return t.bandwidth})),name:t,mode:"lines+markers",line:{color:a.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:a.rgbString,width:o}}})})),this.bandwidthTimeData.ready=!0,this.bandwidthTimeLayout.ready=!0,this.bandwidthTimeSpinner.show=!1},processBandwidthHourlyData:function(t){var e=this;this.bandwidthHourlySpinner={show:!0,message:"Sorting data..."},this.bandwidthHourlyData.ready=!1,this.bandwidthHourlyLayout.ready=!1;var a=this.$store.state.experiments.filter((function(t){return"bandwidth"==t.category})).map((function(t){return t.name})),r={},n=function(t){r.avail_band||(r.avail_band=new Array(24).fill(),r.avail_band=r.avail_band.map((function(){return[]}))),r.btnk_band||(r.btnk_band=new Array(24).fill(),r.btnk_band=r.btnk_band.map((function(){return[]})));var e=t.ctrl_stime/Math.pow(10,6),a=v()(e,"x").utc().hours();t.avail_band&&t.btnk_band&&(r.avail_band[a].push(t.avail_band/Math.pow(10,6)),r.btnk_band[a].push(t.btnk_band/Math.pow(10,6)))},i=0;t.forEach((function(r){a.includes(r.exp)&&n(r.data),e.bandwidthHourlySpinner={show:!0,message:"Sorting data (".concat(Math.ceil(i/t.length*100),"%)")},i++}));var o={},u={};Object.keys(r).forEach((function(t){var e=null,a=null;o[t]=r[t].map((function(t){var a=t.filter((function(t){return!!t}));if(0==a.length)return e;var r=s.a.mean(a);return e=r,r})),u[t]=r[t].map((function(t){var e=t.filter((function(t){return!!t}));if(0==e.length)return a;var r=s.a.sampleStdev(e);return a=r,r}))})),this.bandwidthHourlySpinner.message="Generating graph...",this.bandwidthHourlyData.data=[];var c=2,l=new Array(24).fill().map((function(t,e){return e}));Object.keys(o).forEach((function(t){var a=T.a.random();e.bandwidthHourlyData.data.push({x:l,y:o[t],error_y:{type:"data",array:u[t],visible:!0},name:t,mode:"lines+markers",line:{color:a.rgbString},marker:{color:"rgba(0,0,0,0)",line:{color:a.rgbString,width:c}}})})),this.bandwidthHourlyData.ready=!0,this.bandwidthHourlyLayout.ready=!0,this.bandwidthHourlySpinner.show=!1},initGraphData:function(){var t=this;this.heatmapSpinner={show:!0,message:"Fetching data..."},this.latencyHourlySpinner={show:!0,message:"Fetching data..."},this.latencyTimeSpinner={show:!0,message:"Fetching data..."},this.bandwidthTimeSpinner={show:!0,message:"Fetching data..."},this.bandwidthHourlySpinner={show:!0,message:"Fetching data..."};var e=this.timeRange,a=e.toTime,r=e.fromTime;r=null!=r?r:0,a=null!=a?a:parseFloat(v()().format("X")),this.$store.dispatch("loadData",this).then((function(){var e=t.$store.state.data.filter((function(e,n){var i=("M"+e.monitor).toLowerCase();return t.heatmapSpinner={show:!0,message:"Filtering data (".concat(Math.ceil(n/t.$store.state.data.length*100),"%)")},t.latencyHourlySpinner={show:!0,message:"Filtering data (".concat(Math.ceil(n/t.$store.state.data.length*100),"%)")},t.latencyTimeSpinner={show:!0,message:"Filtering data (".concat(Math.ceil(n/t.$store.state.data.length*100),"%)")},t.bandwidthTimeSpinner={show:!0,message:"Filtering data (".concat(Math.ceil(n/t.$store.state.data.length*100),"%)")},t.bandwidthHourlySpinner={show:!0,message:"Filtering data (".concat(Math.ceil(n/t.$store.state.data.length*100),"%)")},(null==t.monitorIDs||Array.isArray(t.monitorIDs)&&t.monitorIDs.map((function(t){return t.toLowerCase()})).includes(i))&&(e.start>=r&&e.start<=a||e.end>=r&&e.end<=a)}));t.processHeatmapData(e,r,a),t.monitorIDs&&(t.processLatencyHourlyData(e),t.processLatencyTimeData(e),t.processBandwidthTimeData(e),t.processBandwidthHourlyData(e))}))}},watch:{params:{handler:function(){this.setTitle()},immediate:!0},monitorIDs:{immediate:!0,deep:!0,handler:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$nextTick();case 2:t.initGraphData();case 3:case"end":return e.stop()}}),e)})))()}}}},S=x,M=(a("2a6d"),Object(m["a"])(S,r,n,!1,null,"1a835348",null));e["default"]=M.exports},caad:function(t,e,a){"use strict";var r=a("23e7"),n=a("4d64").includes,i=a("44d2"),o=a("ae40"),s=o("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!s},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},cb29:function(t,e,a){var r=a("23e7"),n=a("81d5"),i=a("44d2");r({target:"Array",proto:!0},{fill:n}),i("fill")},d58f:function(t,e,a){var r=a("1c0b"),n=a("7b0b"),i=a("44ad"),o=a("50c4"),s=function(t){return function(e,a,s,u){r(a);var c=n(e),l=i(c),h=o(c.length),d=t?h-1:0,p=t?-1:1;if(s<2)while(1){if(d in l){u=l[d],d+=p;break}if(d+=p,t?d<0:h<=d)throw TypeError("Reduce of empty array with no initial value")}for(;t?d>=0:h>d;d+=p)d in l&&(u=a(u,l[d],d,c));return u}};t.exports={left:s(!1),right:s(!0)}},df0d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-d04ffbf6.js.map