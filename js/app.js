(function(e){function t(t){for(var n,r,i=t[0],c=t[1],l=t[2],d=0,u=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&u.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(u.length)u.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,r=1;r<a.length;r++){var i=a[r];0!==s[i]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({}[e]||e)+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={"chunk-0ee44a66":1,"chunk-20904a8e":1,"chunk-446dfc34":1,"chunk-6bce7fe5":1,"chunk-6d0f6b5d":1,"chunk-a610a464":1,"chunk-d1196ace":1,"chunk-f116086e":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({}[e]||e)+".css",s=c.p+n,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var l=o[i],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===n||d===s))return t()}var u=document.getElementsByTagName("style");for(i=0;i<u.length;i++){l=u[i],d=l.getAttribute("data-href");if(d===n||d===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete r[e],f.parentNode.removeChild(f),a(o)},f.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){r[e]=0})));var n=s[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,a){n=s[e]=[t,a]}));t.push(n[2]=o);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=i(e);var u=new Error;l=function(t){d.onerror=d.onload=null,clearTimeout(f);var a=s[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",u.name="ChunkLoadError",u.type=n,u.request=r,a[1](u)}s[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var f=d;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0f21":function(e,t,a){e.exports=a.p+"img/pktlab_logo.svg"},"1c2a":function(e,t,a){"use strict";var n=a("3c51"),r=a.n(n);r.a},"3c51":function(e,t,a){},4678:function(e,t,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var t=s(e);return a(t)}function s(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=s,e.exports=r,r.id="4678"},"4f3d":function(e,t,a){"use strict";var n=a("f96b"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t);var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("main-header",{attrs:{title:e.pageTitle}}),a("ac-grid",[a("ac-col",{attrs:{cols:"3","lg-cols":"2"}},[a("side-nav",{attrs:{hidden:e.navHidden}})],1),a("ac-col",{attrs:{cols:e.navHidden||e.mobileView?12:9,"lg-cols":e.navHidden||e.mobileView?12:10}},[a("router-view")],1)],1)],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav-wrapper"},[n("ac-nav",{staticClass:"main-header",attrs:{position:"top",fixed:""}},[n("div",{class:{"toggle--bars":!0,active:!e.navHidden},on:{click:function(t){return e.toggleNavHidden()}}},[n("div"),n("div"),n("div")]),n("div",[n("h1",{staticClass:"page-title"},[e._v(e._s(e.title))])]),n("div",{staticClass:"logo-wrapper"},[n("img",{staticClass:"logo",attrs:{src:a("0f21"),alt:"PacketLab Logo"},on:{click:e.returnHome}})])])],1)},i=[],c={props:{title:{type:String}},data(){return{}},methods:{returnHome(){"About"!=this.$router.currentRoute.name&&this.$router.push({name:"About"})},toggleNavHidden(){this.$store.commit("setNavHidden",!this.navHidden)}},computed:{navHidden(){return this.$store.state.navHidden}}},l=c,d=(a("cae8"),a("2877")),u=Object(d["a"])(l,o,i,!1,null,"196a17b2",null),f=u.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ac-nav",{staticClass:"main-nav",attrs:{position:"left",hidden:e.navHidden}},[a("div",{staticClass:"nav--links"},[a("router-link",{attrs:{to:{name:"About"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v(e._s(n.meta.title))])]}}])}),a("router-link",{attrs:{to:{name:"Installation"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("Host an Endpoint")])]}}])}),a("router-link",{attrs:{to:{name:"Tutorials"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v(e._s(n.meta.title))])]}}])}),a("router-link",{attrs:{to:{name:"Docs"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v(e._s(n.meta.title))])]}}])}),a("router-link",{attrs:{to:{name:"Our Team"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v(e._s(n.meta.title))])]}}])})],1)])},h=[],b={data(){return{currentRouteName:"About"}},watch:{$route:{deep:!0,immediate:!0,handler(e){this.currentRouteName=e.name}}},computed:{navHidden(){return this.$store.state.navHidden}}},p=b,v=(a("1c2a"),Object(d["a"])(p,m,h,!1,null,"63e91a82",null)),k=v.exports,g=a("c1df"),j=a.n(g),_={data(){return{pageTitle:"",mobileView:!1}},components:{MainHeader:f,SideNav:k},watch:{$route:{immediate:!0,deep:!0,handler(e){this.pageTitle=e.meta.currentPageTitle}}},methods:{updateViewSizing(){this.mobileView=window.innerWidth<576,this.$store.commit("setNavHidden",this.mobileView)},async preloadData(e=0){const t=this.$store.state.dataLoadedTimeframes;if(e<t.length-1){const a=t[e];if(!a.loaded&&!a.loading){const e=j()().format("X");await this.$store.dispatch("loadData",e-a.cutoff)}this.preloadData(e+1)}}},computed:{navHidden(){return this.$store.state.navHidden}},created(){this.preloadData()},mounted(){this.updateViewSizing(),window.addEventListener("resize",this.updateViewSizing)}},w=_,y=(a("5c0b"),Object(d["a"])(w,r,s,!1,null,null,null)),P=y.exports,L=a("8c4f"),x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",{staticClass:"main-content"},[a("h1",[e._v("Welcome to PacketLab!")]),e._m(0),a("p",[e._v("This page contains information about what PacketLab is and how it can be used. To get started with PacketLab, we recommend heading over to the "),a("router-link",{attrs:{to:{name:"Tutorials"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("strong",[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("TUTORIALS")])])]}}])}),e._v(" page and starting by reading the "),a("router-link",{attrs:{to:{name:"PacketLabOverview"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("PacketLab Overview")])]}}])}),e._v(" , or if you're ready to start playing around with PacketLab, you can skip ahead to "),a("router-link",{attrs:{to:{name:"BuildPacketLab"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("Building PacketLab on your Machine")])]}}])}),e._v(" . After this, the following tutorials walk you through harnessing the power of PacketLab!")],1),a("p",[e._v("For information about the PacketLab Utility Library, see the "),a("router-link",{attrs:{to:{name:"Docs"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("strong",[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("DOCS")])])]}}])}),e._v(" and read the "),a("router-link",{attrs:{to:{name:"LibraryIntro"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("Basics of the PacketLab Library")])]}}])}),e._v(" tutorial.")],1),a("h2",[e._v("Downloads")]),a("p",[e._v("The latest build of PacketLab can be downloaded below:")]),e._m(1),a("h2",[e._v("What is PacketLab?")]),a("p",[e._v("PacketLab is a universal measurement endpoint interface that lowers the barriers faced by experimenters and measurement endpoint operators. PacketLab is designed to complement existing network measurement interfaces rather than replace them entirely.")]),a("p",[e._v("PacketLab is based on two key ideas:")]),e._m(2),a("p",[e._v("PacketLab is currently still under development, and many additions are underway. The current build of PacketLab (which can be downloaded at the top of this page) is suitable for creating and running experiments using an Experiment Controller and a Measurement Endpoint. A Broker and Proxy are currently in the works, as well as support for additional experiments.")]),a("h2",[e._v("How is PacketLab used?")]),e._m(3),e._m(4),e._m(5),e._m(6),a("h2",[e._v("Who made PacketLab?")]),a("p",[e._v("PacketLab is currently being developed by a collaboration of students and researchers from the Center for Applied Data Analysis ("),a("a",{attrs:{href:"caida.org"}},[e._v("CAIDA")]),e._v("), the University of California at San-Diego ("),a("a",{attrs:{href:"ucsd.edu"}},[e._v("UCSD")]),e._v("), and the University of Illinois at Urbana-Champaign ("),a("a",{attrs:{href:"illinois.edu"}},[e._v("UIUC")]),e._v("). The team consists of professional research scientists, professors, graduate students, and even some undergrads! Check out "),a("router-link",{attrs:{to:{name:"Our Team"}},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.route,r=t.href;return[a("strong",[a("a",{class:{active:e.currentRouteName==n.name},attrs:{href:r}},[e._v("OUR TEAM")])])]}}])}),e._v(" of researchers and students.")],1),e._m(7),a("h2",[e._v("Host an Endpoint!")]),a("p",[e._v("Currently, PacketLab is not yet ready for endpoint operators to host public endpoints for PacketLab. However, we expect to be ready to welcome endpoint hosts very soon!")])])},T=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[a("b",[e._v("PacketLab")]),e._v(" makes executing, writing, and hosting network experiments easier than ever before.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("table",{staticClass:"PackageTable"},[a("tr",{staticClass:"PackageTableRow"},[a("th",[e._v("Build")]),a("th",[e._v("Release Time")])]),a("tr",{staticClass:"PackageTableRow"},[a("td",{staticClass:"PackageType"},[a("a",{attrs:{href:"https://packetlab.web.illinois.edu/release/pktlab-0.0.1_bin.linux.zip"}},[e._v("Prebuilt Package")])]),a("td",{staticClass:"PackageDate"},[e._v("Monday, July 25 at 10:00 PM UTC")])]),a("tr",{staticClass:"PackageTableRow"},[a("td",{staticClass:"PackageType"},[a("a",{attrs:{href:"https://packetlab.web.illinois.edu/release/pktlab-0.0.1.tar.gz"}},[e._v("Source Tarball")])]),a("td",{staticClass:"PackageDate"},[e._v("Monday, July 25 at 10:00 PM UTC")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ol",[a("li",[e._v("Moving measurement logic out of the endpoint to a separate experiment control server, making each endpoint a lightweight packet source/sink")]),a("li",[e._v("Providing a way to delegate access to measurement endpoints while retaining fine-grained control over how endpoints are used")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("PacketLab makes "),a("b",[e._v("running network experiments")]),e._v(" easier by connecting experimenters to measurement endpoints. What makes PacketLab powerful is its flexibility. Experimenters have control over the experiments they want to use PacketLab resources to run, and PacketLab supports the running of custom experiments.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("PacketLab is also meant for experimenters interested in "),a("b",[e._v("writing network experiments")]),e._v(" and exploring new frontiers of computer networking. The PacketLab library contains tools that can come in handy for many different types of experiments. The library's functions and objects make experiment-writing simpler, and help experiments run seamlessly with PacketLab endpoints and controllers.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("However, "),a("b",[e._v("hosting experiments")]),e._v(" is just as vital as writing them, and PacketLab is also made for endpoint operators. PacketLab endpoint operators can make their endpoints completely private, completely public, or anywhere in between. By volunteering your server as a public PacketLab endpoint, you enable experimenters to make discoveries through PacketLab and help advance computer networking knowledge.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("PacketLab can also be used for "),a("b",[e._v("managing endpoints")]),e._v(" and handling the sharing of measurement resources. Operators can restrict what experiments experimenters can run based on type or resources needed. This can come in handy for a small group using private endpoints for internal use, as well as for people hosting public endpoints that want to manage how much their endpoints are used and who is able to use them.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[a("a",{attrs:{href:"https://www.caida.org/publications/papers/2017/packetlab/packetlab.pdf",target:"_blank"}},[e._v("See the paper that started PacketLab")]),e._v(".")])}],E={data(){return{}}},C=E,S=(a("4f3d"),a("bada"),Object(d["a"])(C,x,T,!1,null,"cd376e64",null)),O=S.exports;n["a"].use(L["a"]);const z=[{path:"/",name:"About",component:O,meta:{title:"About"}},{path:"/installation",name:"Installation",component:()=>a.e("chunk-d1196ace").then(a.bind(null,"31e6f")),meta:{title:"Installation"}},{path:"/tutorials",name:"Tutorials",component:()=>a.e("chunk-f116086e").then(a.bind(null,"c302")),meta:{title:"Tutorials"}},{path:"/docs",name:"Docs",component:()=>a.e("chunk-2d230643").then(a.bind(null,"eba1")),meta:{title:"Docs"}},{path:"/contributors",name:"Our Team",component:()=>a.e("chunk-6bce7fe5").then(a.bind(null,"fc68")),meta:{title:"Our Team"}},{path:"/run_first_exp",name:"RunFirstExp",component:()=>a.e("chunk-6d0f6b5d").then(a.bind(null,"0532")),meta:{title:""}},{path:"/building_packetlab",name:"BuildPacketLab",component:()=>a.e("chunk-446dfc34").then(a.bind(null,"a0d9")),meta:{title:""}},{path:"/packetlab_overview",name:"PacketLabOverview",component:()=>a.e("chunk-a610a464").then(a.bind(null,"7e3d")),meta:{title:""}},{path:"/sample_experiments",name:"SampleExps",component:()=>a.e("chunk-20904a8e").then(a.bind(null,"d83a")),meta:{title:""}},{path:"/lib_intro",name:"LibraryIntro",component:()=>a.e("chunk-0ee44a66").then(a.bind(null,"27e7")),meta:{title:""}}],H=new L["a"]({mode:"hash",base:"",routes:z});H.beforeEach((e,t,a)=>{let n=e.meta.title;"Monitors"!=e.name&&"Experiments"!=e.name||e.params.id&&(n+=" "+e.params.id),e.meta.currentPageTitle=n,document.title=n+" | PacketLab",a()}),H.onError(e=>{/loading chunk \d* failed./i.test(e.message)&&window.location.reload()});var N=H,D=a("2f62");n["a"].use(D["a"]);var $=new D["a"].Store({state:{dataFiles:[{name:"data",url:{all:"https://packetlab.web.illinois.edu/brief_data.jsonl",week:"https://packetlab.web.illinois.edu/brief_data_week.jsonl","24h":"https://packetlab.web.illinois.edu/brief_data_24h.jsonl"},format:"jsonl"},{name:"endpoints",url:{all:"https://packetlab.web.illinois.edu/endpoints.jsonl"},format:"jsonl"}],dataLoadedTimeframes:[{name:"24h",cutoff:86400,loading:!1,loaded:!1},{name:"week",cutoff:604800,loading:!1,loaded:!1},{name:"all",cutoff:Number.MAX_VALUE,loading:!1,loaded:!1}],data:null,experimentDescriptions:null,experiments:null,endpoints:null,navHidden:!1},mutations:{setData(e,t){const a=t.data,n=t.timeframe;e.dataLoadedTimeframes.forEach(e=>{e.cutoff<=n.cutoff&&(e.loaded=!0)}),Object.keys(a).forEach(t=>{e[t]=a[t]})},setNavHidden(e,t){e.navHidden=t}},actions:{loadData({commit:e,state:t},a){console.time("Data Load Started");const n=j()().format("X"),r=n-a,s=t.dataLoadedTimeframes.find(e=>r<=e.cutoff);return new Promise((a,n)=>{if(s.loaded)a();else if(s.loading){let e;e=setInterval(()=>{console.log("running"),s.loaded&&(clearInterval(e),a())},100)}else{s.loading=!0;const r=new Worker("workers/fetch-data.worker.js");r.addEventListener("message",(function(t){console.timeEnd("Data Load Started"),r.terminate();const o=t.data;"finished"==o.status?(e("setData",{data:o.message,timeframe:s}),a()):n()}));const o={};t.dataFiles.forEach(e=>{for(let a=0;a<t.dataLoadedTimeframes.length;a++){const n=t.dataLoadedTimeframes[a];if(n.cutoff>=s.cutoff&&n.name in e.url){o[e.name]={url:e.url[n.name],format:e.format};break}}}),console.log(o),r.postMessage({status:"load",url:o})}})}},modules:{}}),A=a("a43d"),R=a("225e"),M=a("28bd");n["a"].use(A["a"]),n["a"].use(R["a"]),n["a"].use(M["a"]),n["a"].config.productionTip=!1,new n["a"]({router:N,store:$,render:e=>e(P)}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var n=a("9c0c"),r=a.n(n);r.a},"9c0c":function(e,t,a){},bada:function(e,t,a){"use strict";var n=a("e78d"),r=a.n(n);r.a},cae8:function(e,t,a){"use strict";var n=a("eaa8"),r=a.n(n);r.a},e78d:function(e,t,a){},eaa8:function(e,t,a){},f96b:function(e,t,a){}});
//# sourceMappingURL=app.js.map