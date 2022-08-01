(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a610a464"],{"3d0a":function(e,t,a){},"7e3d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",{staticClass:"main-content"},[a("h1",[e._v("An Overview of PacketLab")]),a("p",[e._v("PacketLab is A Universal Measurement Endpoint Interface that lowers the barriers faced by experimenters and measurement endpoint operators. PacketLab seeks to make network measurement easier for everyone involved. PacketLab offers a handful of different use cases for network measurement and experimentation.")]),a("h2",[e._v("Use Cases")]),a("p",[e._v("PacketLab has something to offer for everyone (at least, everyone involved in network measurement). For those who have already read the use case information on the "),a("router-link",{attrs:{to:{name:"About"}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.route,n=t.href;return[a("strong",[a("a",{class:{active:e.currentRouteName==r.name},attrs:{href:n}},[e._v("ABOUT")])])]}}])}),e._v(" page, what follows is a more in-depth description.")],1),a("b",{staticClass:"section"},[e._v("Experimenters")]),a("p",[e._v("One of the major user groups of PacketLab is experimenters. Experimenters can use the network of PacketLab endpoints to run experiments, and they have control over what what experiments they want to run, provided that the resources are available for the experiments. Experimenters can even write custom experiments, and PacketLab comes equipped with tools to make this happen. The PacketLab Utility Library offers a variety of tools that make writing multiple types of experiments easier. The library is packed with tools for managing messages, connections, credentials, and more!")]),a("p",[e._v("The library tools not only facilitate writing and organizing experiments, but they also help make experiments work with PacketLab. The tools in the library can be used to make custom and pre-existing experiments runnable on PacketLab endpoints. All in all, PacketLab's flexible approach centers around giving experimenters a higher degree of control over the experiments they are able to run.")]),a("b",{staticClass:"section"},[e._v("Endpoint Operators")]),a("p",[e._v("The other major user group of PacketLab is hosts of measurement endpoints. Endpoint operators have a variety of needs, and PacketLab is here to help operators operate their endpoints however they choose. Some operators may want to host completely private endpoints for internal use within groups, while others may want to host publicly available endpoints for use by any PacketLab experimenters, and everything in between.")]),a("p",[e._v("PacketLab gives hosts tools that make it easier to control how their endpoints and measurement resources are used. Operators can restrict who can run experiments, what kinds of experiments can be run, how many resources can be used. Endpoint access control is done through certificates.")]),a("p",[e._v("For example, there could be an endpoint operator that hosts a public endpoint available to experimenters who have a certain certificate, but the operator could also choose not to allow experimenters to run experiments that require a certain feature that is not supported by the endpoint system.")]),a("h2",[e._v("The PacketLab Model")]),a("p",[e._v("What makes PacketLab PacketLab is its unique model. A traditional endpoint model for network measurement consists of an experiment controller and an endpoint, both of which are also present in PacketLab. Traditionally, the experiment controller contains the control logic for an experiment, while the endpoint carries both the experiment logic as well as the network interface.")]),a("p",[e._v("However, in the PacketLab endpoint model, the experiment logic is instead handled by the experiment controller, while the endpoint only needs to take care of the network interface. This is powerful because it allows endpoints to simply be lightweight packet sources/sinks. Endpoints can simply be simple servers that are much easier to deploy with less overhead and configuration necessary.")]),a("p",[e._v("This is where the idea of a universal endpoint comes into play - because endpoints no longer have the burden of carrying experiment logic, their network resources can be used by different experiments. Since the heftier experiment controllers are controlled by the experimenters, they can more easily be configured to run different experiments, creating a win-win scenario for experimenters and hosts alike.")]),a("h2",[e._v("The PacketLab Utility Library")]),a("p",[e._v("As mentioned earlier, PacketLab also offers a feature-packed library to facilitate experiment creation, execution, and hosting. The PacketLab Utility Library is a C99 library with features to program custom experiment controllers and endpoint programs alike. For information about the PacketLab Utility Library, see the "),a("router-link",{attrs:{to:{name:"Docs"}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.route,n=t.href;return[a("strong",[a("a",{class:{active:e.currentRouteName==r.name},attrs:{href:n}},[e._v("DOCS")])])]}}])}),e._v(" and read the "),a("router-link",{attrs:{to:{name:"LibraryIntro"}},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.route,n=t.href;return[a("a",{class:{active:e.currentRouteName==r.name},attrs:{href:n}},[e._v("Basics of the PacketLab Library")])]}}])}),e._v(" tutorial.")],1)])},n=[],o=(a("fb02"),a("2877")),i={},s=Object(o["a"])(i,r,n,!1,null,"3f539b03",null);t["default"]=s.exports},fb02:function(e,t,a){"use strict";var r=a("3d0a"),n=a.n(r);n.a}}]);
//# sourceMappingURL=chunk-a610a464.js.map