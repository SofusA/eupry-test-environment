(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{123:function(t,e,a){},242:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),i=a(24),c=a.n(i),r=(a(123),a(54)),o=a(12),l=a.p+"static/media/eupry_LOGO.5c8f32b5.svg",d=a(249),h=a(258),u=a(257),j=a(248),p=a(1);var m=Object(o.f)((function(t){return Object(p.jsx)("div",{children:Object(p.jsxs)(h.a,{expand:"lg",className:"bg-light px-5 shadow-sm",children:[Object(p.jsx)(u.a,{className:"mr-auto",children:Object(p.jsx)(u.a,{children:Object(p.jsx)(r.b,{to:"/",style:{textShadow:"none",backgroundImage:"none"},children:Object(p.jsx)("img",{src:l,alt:"",width:"100px"})})})}),Object(p.jsxs)(j.a,{href:"https://eupry.com/logger",target:"_blank",rel:"noopener noreferrer",children:[" Eupry Logger ",Object(p.jsx)(d.a,{size:16})]})]})})}));var b=a(14),O=a(17),x=a(18),f=a(20),g=a(19),y=a(21),v=a.n(y),w=a(113),_=a(250),C=a(261),k=a(251),S="http://127.0.0.1:1880",I=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).handleClick=function(){console.log(t.state)},t.state={ID:null,data:[]},t.getData=function(){var e=S;e=e+"/api/forward?api=loc&id="+t.state.ID,v.a.get(e).then((function(e){t.setState({data:e.data})})).catch((function(e){console.log("Error"),t.props.history.push("/login/")}))},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){var t=this;"undefined"!==typeof window&&localStorage.getItem("ID")?this.setState({ID:localStorage.getItem("ID")},(function(){t.getData()})):this.props.history.push("/login")}},{key:"render",value:function(){var t,e=this,a=this.state.data,s=[],n=Object(b.a)(a);try{var i=function(){var a=t.value;s.push(Object(p.jsx)(w.a,{className:"col-auto mb-3",children:Object(p.jsx)(j.a,{variant:"light",type:"submit",onClick:function(){e.props.history.push("/location?"+a.id)},className:"p-4 shadow-sm buttonCard",children:a.name})},"locationRender"+a.id))};for(n.s();!(t=n.n()).done;)i()}catch(c){n.e(c)}finally{n.f()}return Object(p.jsxs)(_.a,{children:[Object(p.jsx)(C.a,{children:Object(p.jsx)(C.a.Item,{active:!0,children:"Locations "})}),Object(p.jsx)(k.a,{className:"justify-content-md-center",children:Object(p.jsx)(k.a,{className:"justify-content-md-left",children:s})})]})}}]),a}(n.a.Component),N=Object(o.f)(I),D=a(259),H=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={ID:null,data:[]},t.getData=function(){var e=window.location.href;e=e.split("?")[1],t.setState({loc:e});var a=S,s=a+"/api/forward?api=loc/"+e+"/pro&id="+t.state.ID,n=a+"/api/forward?api=loc/"+e+"&id="+t.state.ID;v.a.get(s).then((function(e){t.setState({data:e.data})})).catch((function(e){t.props.history.push("/login/")})),v.a.get(n).then((function(e){t.setState({locName:e.data.name})})).catch((function(t){console.log(t)}))},t.handleClick=function(){console.log(t.state)},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){var t=this;"undefined"!==typeof window&&localStorage.getItem("ID")?this.setState({ID:localStorage.getItem("ID")},(function(){t.getData()})):this.props.history.push("/login/")}},{key:"render",value:function(){var t,e=this,a=this.state.data,s=[],n=Object(b.a)(a);try{var i=function(){var a=t.value;s.push(Object(p.jsx)(w.a,{className:"col-auto mb-3",children:Object(p.jsx)(j.a,{variant:"light",type:"submit",onClick:function(){e.props.history.push("/profile?loc="+e.state.loc+"&pro="+a.id)},className:"p-4 shadow-sm buttonCard",children:a.name})},"profileRender"+a.id))};for(n.s();!(t=n.n()).done;)i()}catch(c){n.e(c)}finally{n.f()}return Object(p.jsxs)(_.a,{children:[Object(p.jsxs)(C.a,{children:[Object(p.jsx)(C.a.Item,{onClick:function(){e.props.history.push("/")},children:" Locations "}),Object(p.jsxs)(C.a.Item,{active:!0,children:[" ",this.state.locName," "]})]}),Object(p.jsx)("div",{className:this.state.ID?"d-none ":"d-inline",children:Object(p.jsx)(k.a,{className:"justify-content-md-center",children:Object(p.jsx)(D.a,{className:"text-center",style:{width:"18rem"},children:Object(p.jsx)(D.a.Header,{children:"Not logged in"})})})}),Object(p.jsx)("div",{className:this.state.ID?"d-inline ":"d-none",children:Object(p.jsx)("div",{children:Object(p.jsx)(k.a,{className:"justify-content-md-center",children:Object(p.jsx)(k.a,{className:"justify-content-md-left",children:s})})})})]})}}]),a}(n.a.Component),A=Object(o.f)(H),M=a(22),L=a(256),z=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={email:"",password:"",login:!1,id:0},t.handleInputChange=function(e){var a=e.target,s=a.value,n=a.name;t.setState(Object(M.a)({},n,s))},t.handleSubmit=function(e){e.preventDefault();var a=S;a=a+"/api/login?email="+t.state.email+"&password="+t.state.password,v.a.get(a).then((function(e){var a=e.data;t.setState({login:!0,ID:a.id}),localStorage.setItem("ID",a.id),t.props.history.push("/")})).catch((function(t){console.log(t),alert("Wrong login or password")})),console.log("loginComp.js -> handleSubmit(): "+a)},t}return Object(x.a)(a,[{key:"render",value:function(){return Object(p.jsx)("div",{children:Object(p.jsx)(_.a,{children:Object(p.jsx)(k.a,{className:" mt-5 justify-content-md-center",children:Object(p.jsx)(D.a,{className:"text-left",style:{width:"18rem"},children:Object(p.jsxs)(D.a.Body,{children:[Object(p.jsx)(D.a.Title,{children:"Login"}),Object(p.jsxs)(L.a,{onSubmit:this.handleSubmit,children:[Object(p.jsxs)(L.a.Group,{controlId:"formBasicEmail",children:[Object(p.jsx)(L.a.Label,{children:"Email address"}),Object(p.jsx)(L.a.Control,{type:"email",placeholder:"Enter email",name:"email",value:this.state.email,onChange:this.handleInputChange})]}),Object(p.jsxs)(L.a.Group,{controlId:"formBasicPassword",children:[Object(p.jsx)(L.a.Label,{children:"Password"}),Object(p.jsx)(L.a.Control,{type:"password",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleInputChange})]}),Object(p.jsx)(j.a,{variant:"primary",type:"submit",children:"Submit"})]})]})})})})})}}]),a}(n.a.Component),U=Object(o.f)(z),T=a(35),B=a.n(T),E=a(114),G=a.n(E),P=(a(152),function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={focused:null},t.handleClick=function(){console.log(t.props),console.log(t.state)},t.changeDate=function(e,a){t.props.handler(t.props.time.end.add(e,a),t.props.time.start.add(e,a))},t.handleChange=function(e){var a=B()(e).diff(t.props.time.start,"days");t.changeDate(a,"days")},t}return Object(x.a)(a,[{key:"render",value:function(){var t=this,e=n.a.createRef(),a=Object(s.forwardRef)((function(e,a){var s=e.onClick,n=e.value;return Object(p.jsxs)(j.a,{variant:"link",onClick:s,value:n,onChange:s,ref:a,className:"text-dark",children:[t.props.time.start.format("dddd")," ",Object(p.jsx)("br",{}),t.props.time.start.format("MMMM DD YYYY")]})}));return Object(p.jsx)("div",{children:Object(p.jsxs)(k.a,{className:"mb-3 justify-content-md-center",children:[Object(p.jsx)(j.a,{onClick:function(){return t.changeDate(-1,"days")},className:"text-dark",variant:"link",children:"\u1438"}),Object(p.jsx)(G.a,{selected:this.props.time.start.valueOf(),onChange:this.handleChange,customInput:Object(p.jsx)(a,{ref:e}),filterDate:function(t){return B()()>t}}),Object(p.jsx)(j.a,{onClick:function(){return t.changeDate(1,"days")},className:this.props.time.start.isSame(B()(),"day")?"invisible":"text-dark",variant:"link",children:"\u1433"})]})})}}]),a}(s.Component)),F=a(45),J=a(58),R=a.n(J),Y=a(55),W=a.n(Y),$=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).handleClick=function(){console.log(t.state)},t.generateAxis=function(e){for(var a=[],s=0,n=Object.entries(e.devices);s<n.length;s++){var i,c=Object(F.a)(n[s],2),r=c[0],o=c[1],l=[],d=[],h=[],u=Object(b.a)(o.v.entries());try{for(u.s();!(i=u.n()).done;){var j=Object(F.a)(i.value,2),p=j[0],m=j[1];m&&l.push({x:1e3*e.time[p],y:m})}}catch(G){u.e(G)}finally{u.f()}l.length>0&&a.push({device_name:o.name,device_id:o.device_id,shadow_id:parseInt(r),min:o.min_v,max:o.max_v,mean:o.mean_v,source:"temperature",data:l});var O,x=Object(b.a)(o.p.entries());try{for(x.s();!(O=x.n()).done;){var f=Object(F.a)(O.value,2),g=f[0],y=f[1];y&&d.push({x:1e3*e.time[g],y:y})}}catch(G){x.e(G)}finally{x.f()}d.length>0&&a.push({device_name:o.name,device_id:o.device_id,shadow_id:parseInt(r),min:o.min_p,max:o.max_p,mean:o.mean_p,source:"external",data:d});var v,w=Object(b.a)(o.h.entries());try{for(w.s();!(v=w.n()).done;){var _=Object(F.a)(v.value,2),C=_[0],k=_[1];k&&h.push({x:1e3*e.time[C],y:k})}}catch(G){w.e(G)}finally{w.f()}h.length>0&&a.push({device_name:o.name,device_id:o.device_id,shadow_id:parseInt(r),min:o.min_h,max:o.max_h,mean:o.mean_h,source:"humidity",data:h})}var S={normal:[],CO2:[],humidity:[]};if(t.props.status){var I,N=Object(b.a)(t.props.status);try{for(N.s();!(I=N.n()).done;){var D=I.value;if("normal"===D.type){var H,A=Object(b.a)(a);try{for(A.s();!(H=A.n()).done;){var M=H.value;D.shadow_id===M.shadow_id&&("temperature"===M.source&&S.normal.push(M),"external"===M.source&&S.normal.push(M),"humidity"===M.source&&S.humidity.push(M))}}catch(G){A.e(G)}finally{A.f()}}if("humidity"===D.type){var L,z=Object(b.a)(a);try{for(z.s();!(L=z.n()).done;){var U=L.value;D.shadow_id===U.shadow_id&&("temperature"===U.source&&S.normal.push(U),"external"===U.source&&S.humidity.push(U),"humidity"===U.source&&S.humidity.push(U))}}catch(G){z.e(G)}finally{z.f()}}if("CO2"===D.type){var T,B=Object(b.a)(a);try{for(B.s();!(T=B.n()).done;){var E=T.value;D.shadow_id===E.shadow_id&&("temperature"===E.source&&S.normal.push(E),"external"===E.source&&S.CO2.push(E),"humidity"===E.source&&S.humidity.push(E))}}catch(G){B.e(G)}finally{B.f()}}}}catch(G){N.e(G)}finally{N.f()}}t.setState({series:a,sortedSeries:S})},t.state={normal:{options:{chart:{animations:{enabled:!1,easing:"easeinout",speed:800,animateGradually:{enabled:!1,delay:150},dynamicAnimation:{enabled:!1,speed:350},initialAnimation:{enabled:!1}},height:380,width:"100%",toolbar:{show:!0,tools:{selection:!1,zoom:!1,pan:!1,zoomin:!1,zoomout:!1,reset:!1}}},xaxis:{type:"datetime",labels:{datetimeUTC:!1},tooltip:{enabled:!1}},stroke:{width:3,curve:"smooth"},legend:{show:!1},tooltip:{x:{format:"dddd MMM dd HH:mm"},y:{title:{formatter:function(e,a){return t.state.series[a.seriesIndex].device_name}}}}}},CO2:{options:{chart:{animations:{enabled:!1,easing:"easeinout",speed:800,animateGradually:{enabled:!1,delay:150},dynamicAnimation:{enabled:!1,speed:350},initialAnimation:{enabled:!1}},height:380,width:"100%",toolbar:{show:!0,tools:{selection:!1,zoom:!1,pan:!1,zoomin:!1,zoomout:!1,reset:!1}}},xaxis:{type:"datetime",labels:{datetimeUTC:!1},tooltip:{enabled:!1}},yaxis:{labels:{formatter:function(t){return parseFloat(t.toFixed(1))+" %"}}},stroke:{width:3,curve:"smooth"},legend:{show:!1},tooltip:{x:{format:"dddd MMM dd HH:mm"},y:{title:{formatter:function(e,a){return t.props.graph.CO2[a.seriesIndex].device_name}}}}}},diffPressure:{options:{chart:{animations:{enabled:!1,easing:"easeinout",speed:800,animateGradually:{enabled:!1,delay:150},dynamicAnimation:{enabled:!1,speed:350},initialAnimation:{enabled:!1}},height:380,width:"100%",toolbar:{show:!0,tools:{selection:!1,zoom:!1,pan:!1,zoomin:!1,zoomout:!1,reset:!1}}},xaxis:{type:"datetime",labels:{datetimeUTC:!1},tooltip:{enabled:!1}},yaxis:{labels:{formatter:function(t){return parseFloat(t.toFixed(1))+" Pa"}}},stroke:{width:3,curve:"smooth"},legend:{show:!1},tooltip:{x:{format:"dddd MMM dd HH:mm"},y:{title:{formatter:function(e,a){return t.props.data.graph[a.seriesIndex].device_name}}}}}}},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){"ok"!==this.props.mgraph.status&&this.generateAxis(this.props.mgraph)}},{key:"componentDidUpdate",value:function(t){W()(this.props,t)||this.generateAxis(this.props.mgraph)}},{key:"render",value:function(){return Object(p.jsxs)(k.a,{children:[Object(p.jsx)(w.a,{lg:12,className:this.state.sortedSeries&&this.state.sortedSeries.normal.length>0?null:"hidden",children:Object(p.jsxs)(D.a,{className:"mb-3",children:[Object(p.jsx)(D.a.Header,{children:"Temperature "}),Object(p.jsx)(D.a.Body,{children:this.state.sortedSeries?Object(p.jsx)(R.a,{options:this.state.normal.options,series:this.state.sortedSeries.normal,height:200}):null})]})}),Object(p.jsx)(w.a,{lg:12,className:this.state.sortedSeries&&this.state.sortedSeries.CO2.length>0?null:"hidden",children:Object(p.jsxs)(D.a,{className:"mb-3",children:[Object(p.jsx)(D.a.Header,{children:"CO2 "}),Object(p.jsx)(D.a.Body,{children:this.state.sortedSeries?Object(p.jsx)(R.a,{options:this.state.normal.options,series:this.state.sortedSeries.CO2,height:200}):null})]})}),Object(p.jsx)(w.a,{lg:12,className:this.state.sortedSeries&&this.state.sortedSeries.humidity.length>0?null:"hidden",children:Object(p.jsxs)(D.a,{className:"mb-3",children:[Object(p.jsx)(D.a.Header,{children:"Humidity "}),Object(p.jsx)(D.a.Body,{children:this.state.sortedSeries?Object(p.jsx)(R.a,{options:this.state.normal.options,series:this.state.sortedSeries.humidity,height:200}):null})]})})]})}}]),a}(n.a.Component),q=a(29),K=a(260),Q=a(252),V=a(255),X=a(253),Z=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={shadows:{}},t.setSettings=function(e){t.setState({shadows:Object(q.a)(Object(q.a)({},t.state.shadows),{},Object(M.a)({},e,{normal:!0,CO2:!1,humidity:!1}))})},t.loadSettings=function(){var e,a=Object(b.a)(t.props.status);try{var s=function(){var a=e.value,s=S+"/api/getsettings?loc="+t.props.loc+"&pro= "+t.props.pro+"&shadow="+a.shadow_id;v.a.get(s).then((function(e){if(0===e.data.length)t.setSettings(a.shadow_id);else{var s=JSON.parse(e.data.replaceAll("/",'"'));t.props.handler(a.shadow_id,s),t.setState({shadows:Object(q.a)(Object(q.a)({},t.state.shadows),{},Object(M.a)({},a.shadow_id,s))})}})).catch((function(t){console.log(t)}))};for(a.s();!(e=a.n()).done;)s()}catch(n){a.e(n)}finally{a.f()}},t.handleUnitCheckboxes=function(e,a){var s=!t.state.shadows[e][a],n=t.state.shadows[e];n[a]=s;var i=Object.keys(n);if(!0===s){var c,r=Object(b.a)(i);try{for(r.s();!(c=r.n()).done;){var o=c.value;o!==a&&(n[o]=!1)}}catch(d){r.e(d)}finally{r.f()}}else n.normal=!0;if("normal"===a&&!1===s);else{var l=S+"/api/setin?loc="+t.props.loc+"&pro="+t.props.pro+"&shadow="+e+"&data="+JSON.stringify(n);v.a.get(l).then((function(a){t.props.handler(e,n),t.setState({shadows:Object(q.a)(Object(q.a)({},t.state.shadows),{},Object(M.a)({},e,n))})})).catch((function(t){console.log(t)}))}},t.handleClick=function(){console.log(t.state)},t.collectDataloggers=function(){if(t.state.shadows)return t.props.status.map((function(e,a){return Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.device_name}),t.state.shadows[e.shadow_id]?Object(p.jsx)("td",{children:Object(p.jsx)("input",{type:"checkbox",checked:t.state.shadows[e.shadow_id].normal,id:e.device_name+"_normal",onChange:function(a){return t.handleUnitCheckboxes(e.shadow_id,"normal")}})}):null,t.state.shadows[e.shadow_id]?Object(p.jsx)("td",{children:Object(p.jsx)("input",{type:"checkbox",checked:t.state.shadows[e.shadow_id].humidity,id:e.device_name+"humidity",onChange:function(a){return t.handleUnitCheckboxes(e.shadow_id,"humidity")}})}):null,t.state.shadows[e.shadow_id]?Object(p.jsx)("td",{children:Object(p.jsx)("input",{type:"checkbox",checked:t.state.shadows[e.shadow_id].CO2,id:e.device_name+"_CO2",onChange:function(a){return t.handleUnitCheckboxes(e.shadow_id,"CO2")}})}):null]},"settingsButton"+e.shadow_id)}))},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){this.loadSettings()}},{key:"componentDidUpdate",value:function(t){W()(this.props,t)||this.loadSettings()}},{key:"render",value:function(){var t=Object(p.jsxs)(K.a,{id:"popover-basic",width:400,children:[Object(p.jsx)(K.a.Title,{as:"h3",children:"Settings"}),Object(p.jsx)(K.a.Content,{children:Object(p.jsxs)(Q.a,{striped:!0,className:"text-center",children:[Object(p.jsx)("thead",{children:Object(p.jsxs)("tr",{children:[Object(p.jsx)("th",{children:"Logger"}),Object(p.jsx)("th",{children:"Temperature"}),Object(p.jsx)("th",{children:"Humidity"}),Object(p.jsx)("th",{children:"CO2"})]})}),Object(p.jsx)("tbody",{children:this.collectDataloggers()})]})})]});return Object(p.jsx)("span",{children:Object(p.jsx)(V.a,{trigger:"click",placement:"bottom",overlay:t,children:Object(p.jsx)(j.a,{variant:"link",children:Object(p.jsx)(X.a,{size:18})})})})}}]),a}(s.Component),tt=a(254),et=a(117),at=a.n(et),st=a(118),nt=a.n(st),it=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={},t.loadSettings=function(){var e,a=[],s=Object(b.a)(t.props.status);try{for(s.s();!(e=s.n()).done;){var n=e.value,i=n.configuration;i.shadow_id=n.shadow_id,i.type=n.type,i.device_name=n.device_name,a.push(n.type),t.setState(Object(M.a)({},n.shadow_id,i))}}catch(c){s.e(c)}finally{s.f()}t.setState({types:a})},t.setSettings=function(){Object.values(t.state).forEach((function(e){var a=S+"/api/setconfig/"+t.props.loc+"/"+t.props.pro+"/"+e.shadow_id+"/"+t.props.id;v()({method:"post",url:a,data:at.a.stringify(e),headers:{"content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then((function(t){var e=t.data;console.log(e)})).catch((function(e){console.log(e),t.props.history.push("/login/")}))}))},t.handleChange=function(e){var a=e.target.attributes.shadow.value,s=e.target.value,n=e.target.attributes.alarmtype.value;t.setState(Object(M.a)({},a,Object(q.a)(Object(q.a)({},t.state[a]),{},Object(M.a)({},n,s))))},t.handleClick=function(){console.log(t.state)},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){this.loadSettings()}},{key:"componentDidUpdate",value:function(t){nt()(this.props,t)||this.loadSettings()}},{key:"render",value:function(){var t=this,e=this.state,a={temp:[],hum:[],CO2:[]};Object.values(e).forEach((function(e){"normal"!==e.type&&"humidity"!==e.type||a.temp.push(Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.device_name}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"temp",alarmtype:"crit_high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].crit_high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"temp",alarmtype:"high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"temp",alarmtype:"crit_low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].crit_low})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"temp",alarmtype:"low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].low})})]},"alarmconfigTemp"+e.shadow_id)),"humidity"!==e.type&&"CO2"!==e.type||a.hum.push(Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.device_name}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"hum",alarmtype:"humid_crit_high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].humid_crit_high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"hum",alarmtype:"humid_high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].humid_high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"hum",alarmtype:"humid_crit_low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].humid_crit_low})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"hum",alarmtype:"humid_low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].humid_low})})]},"alarmconfigHum"+e.shadow_id)),"CO2"===e.type&&a.CO2.push(Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{children:e.device_name}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"CO2",alarmtype:"crit_high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].crit_high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"CO2",alarmtype:"high",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].high})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"CO2",alarmtype:"crit_low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].crit_low})}),Object(p.jsx)("td",{children:Object(p.jsx)("input",{shadow:e.shadow_id,alarmunit:"CO2",alarmtype:"low",onChange:t.handleChange,className:"alarmInput",type:"text",value:t.state[e.shadow_id].low})})]},"alarmconfigCO2"+e.shadow_id))}));var s=Object(p.jsxs)(K.a,{id:"popover-basic",width:400,children:[Object(p.jsx)(K.a.Title,{as:"h3",children:"Alarm configuration"}),Object(p.jsxs)(K.a.Content,{children:[Object(p.jsxs)(Q.a,{striped:!0,className:"text-center",children:[Object(p.jsxs)("thead",{children:[Object(p.jsx)("tr",{children:Object(p.jsx)("th",{colSpan:"5",children:"Temperatur"})}),Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{}),Object(p.jsx)("td",{children:"Critical High"}),Object(p.jsx)("td",{children:"High"}),Object(p.jsx)("td",{children:"Critical Low"}),Object(p.jsx)("td",{children:"Low"})]})]}),Object(p.jsx)("tbody",{children:a.temp}),Object(p.jsxs)("thead",{className:this.state.types&&this.state.types.includes("humidity")?null:"hidden",children:[Object(p.jsx)("tr",{children:Object(p.jsx)("th",{colSpan:"5",children:"Humidity"})}),Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{}),Object(p.jsx)("td",{children:"Critical High"}),Object(p.jsx)("td",{children:"High"}),Object(p.jsx)("td",{children:"Critical Low"}),Object(p.jsx)("td",{children:"Low"})]})]}),Object(p.jsx)("tbody",{children:a.hum}),Object(p.jsxs)("thead",{className:this.state.types&&this.state.types.includes("CO2")?null:"hidden",children:[Object(p.jsx)("tr",{children:Object(p.jsx)("th",{colSpan:"5",children:"CO2"})}),Object(p.jsxs)("tr",{children:[Object(p.jsx)("td",{}),Object(p.jsx)("td",{children:"Critical High"}),Object(p.jsx)("td",{children:"High"}),Object(p.jsx)("td",{children:"Critical Low"}),Object(p.jsx)("td",{children:"Low"})]})]}),Object(p.jsx)("tbody",{children:a.CO2})]}),Object(p.jsx)(j.a,{onClick:this.setSettings,children:"Submit"})]})]});return Object(p.jsx)("span",{children:Object(p.jsx)(V.a,{trigger:"click",placement:"bottom",overlay:s,children:Object(p.jsx)(j.a,{variant:"link",children:Object(p.jsx)(tt.a,{size:18})})})})}}]),a}(s.Component),ct=function(t){Object(f.a)(a,t);var e=Object(g.a)(a);function a(){var t;Object(O.a)(this,a);for(var s=arguments.length,n=new Array(s),i=0;i<s;i++)n[i]=arguments[i];return(t=e.call.apply(e,[this].concat(n))).state={time:{start:B()().hours(0).minutes(0).seconds(0),end:B()().hours(0).minutes(0).seconds(0).add(24,"hours")},updater:0,empty:!0},t.handleClick=function(){console.log(t.state)},t.getData=function(){var e=window.location.href,a=(e=e.split("?")[1]).split("&")[0].split("=")[1],s=e.split("&")[1].split("=")[1];t.setState({updater:t.state.updater+1,loc:a,pro:s});var n={locName:S+"/api/forward?api=loc/"+a+"&id="+t.state.ID,proName:S+"/api/forward?api=loc/"+a+"/pro/"+s+"&id="+t.state.ID,alert:S+"/api/forward?api=loc/"+a+"/pro/"+s+"/alert?start="+t.state.time.start.unix()+"&end="+t.state.time.end.unix()+"&id="+t.state.ID,config:S+"/api/forward?api=loc/"+a+"/pro/"+s+"/config?start="+t.state.time.start.unix()+"&end="+t.state.time.end.unix()+"&id="+t.state.ID,status:S+"/api/forward?api=loc/"+a+"/pro/"+s+"/status?start="+t.state.time.start.unix()+"&end="+t.state.time.end.unix()+"&id="+t.state.ID,button:S+"/api/forward?api=loc/"+a+"/pro/"+s+"/button?start="+t.state.time.start.unix()+"&end="+t.state.time.end.unix()+"&id="+t.state.ID,mgraph:S+"/api/forward?api=loc/"+a+"/pro/"+s+"/mgraph?res=30&start="+t.state.time.start.unix()+"&end="+t.state.time.end.unix()+"&id="+t.state.ID},i=function(e){v.a.get(n[e]).then((function(a){var s=a.data;t.setState(Object(M.a)({},e,s),(function(){if("status"===e){t.nextUpload(s);var a,n=Object(b.a)(s);try{for(n.s();!(a=n.n()).done;){a.value.type="normal"}}catch(i){n.e(i)}finally{n.f()}s.length>0&&t.setState({updater:t.state.updater+1,empty:!1})}}))})).catch((function(e){console.log(e),t.props.history.push("/login/")}))};for(var c in n)i(c)},t.dateHandler=function(e,a){t.setState({time:{start:a,end:e}},(function(){t.getData()}))},t.settingsHandler=function(e,a){for(var s=t.state.status,n="normal",i=0,c=Object.keys(a);i<c.length;i++){var r=c[i];a[r]&&(n=r)}for(var o in s)s[o].shadow_id===e&&(s[o].type=n);t.setState({status:s,updater:t.state.updater+1})},t.nextUpload=function(e){var a,s=1/0,n=Object(b.a)(e);try{for(n.s();!(a=n.n()).done;){var i=a.value;i.next_update<s&&(s=i.next_update)}}catch(c){n.e(c)}finally{n.f()}t.setState({nextupload:B.a.unix(s).fromNow()})},t}return Object(x.a)(a,[{key:"componentDidMount",value:function(){var t=this;"undefined"!==typeof window&&localStorage.getItem("ID")?this.setState({ID:localStorage.getItem("ID")},(function(){t.getData()})):this.props.history.push("/login/")}},{key:"render",value:function(){var t=this;return Object(p.jsxs)(_.a,{children:[Object(p.jsx)(k.a,{children:Object(p.jsx)(w.a,{children:Object(p.jsxs)(C.a,{children:[Object(p.jsx)(C.a.Item,{onClick:function(){t.props.history.push("/")},children:" Locations "}),this.state.locName?Object(p.jsxs)(C.a.Item,{onClick:function(){t.props.history.push("/location?"+t.state.loc)},children:[" ",this.state.locName.name," "]}):null,this.state.proName?Object(p.jsxs)(C.a.Item,{active:!0,children:[" ",this.state.proName.name," "]}):null]})})}),Object(p.jsx)(k.a,{children:Object(p.jsxs)(w.a,{children:[Object(p.jsx)(P,{handler:this.dateHandler,time:this.state.time}),Object(p.jsxs)("small",{className:"float-sm-right",children:["Next upload ",this.state.nextupload,"  or ",Object(p.jsx)("b",{children:"on alarm"}),this.state.loc&&this.state.pro&&this.state.status?Object(p.jsx)(Z,{loc:this.state.loc,pro:this.state.pro,status:this.state.status,handler:this.settingsHandler}):null,this.state.status?Object(p.jsx)(it,{id:this.state.ID,loc:this.state.loc,pro:this.state.pro,updater:this.state.updater,status:this.state.status}):null]})]})}),this.state.mgraph&&!0!==this.state.empty?Object(p.jsx)($,{mgraph:this.state.mgraph,status:this.state.status,time:this.state.time,updater:this.state.updater}):"No connected data logger in rofile",Object(p.jsx)(j.a,{onClick:this.handleClick,children:"Profile.jsx state"})]})}}]),a}(n.a.Component),rt=Object(o.f)(ct);a(241);var ot=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsxs)(r.a,{children:[Object(p.jsx)(m,{}),Object(p.jsxs)(o.c,{children:[Object(p.jsx)(o.a,{path:"/",exact:!0,component:function(){return Object(p.jsx)(N,{})}}),Object(p.jsx)(o.a,{path:"/login",exact:!0,component:function(){return Object(p.jsx)(U,{})}}),Object(p.jsx)(o.a,{path:"/location",exact:!0,component:function(){return Object(p.jsx)(A,{})}}),Object(p.jsx)(o.a,{path:"/profile",exact:!0,component:function(){return Object(p.jsx)(rt,{})}})]})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(p.jsx)(ot,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[242,1,2]]]);
//# sourceMappingURL=main.f02a8cb4.chunk.js.map