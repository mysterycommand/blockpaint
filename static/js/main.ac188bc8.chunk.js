(this.webpackJsonpblockpaint=this.webpackJsonpblockpaint||[]).push([[0],{155:function(e,n,t){},157:function(e,n,t){e.exports=t.p+"static/media/logo.02b2068a.svg"},158:function(e,n,t){e.exports=t(331)},176:function(e,n){},178:function(e,n){},195:function(e,n){},197:function(e,n){},273:function(e,n){},280:function(e,n){},323:function(e,n,t){},324:function(e,n,t){},325:function(e,n,t){},326:function(e,n,t){},327:function(e,n,t){},328:function(e,n,t){},329:function(e,n,t){},330:function(e,n,t){},331:function(e,n,t){"use strict";t.r(n);var a,c=t(0),i=t.n(c),r=t(156),o=t.n(r),l=t(22),s=t(64),u=(t(323),function(){return i.a.createElement("div",{className:"loader"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null))}),f=(t(324),function(e){var n=e.children,t=e.disabled,a=e.onClick;return(i.a.createElement("button",{className:"button",onClick:a,disabled:t},n,t&&i.a.createElement(u,null)))}),m=(t(325),t(326),t(155),function(){return i.a.createElement("svg",{className:"icon paint",width:"24",height:"24",viewBox:"0 0 24 24",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91A1 1 0 0 0 5 18zM15.27 4L18 6.73l-2 1.95L13.32 6l1.95-2zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28.27-2.99z"}))}),v=function(){return i.a.createElement("svg",{className:"icon erase",width:"24",height:"24",viewBox:"0 0 24 24",preserveAspectRatio:"xMidYMid meet",xmlns:"http://www.w3.org/2000/svg"},i.a.createElement("path",{d:"M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zm-.009-17.942h-.09l-4.17.38a2 2 0 0 0-1.21.57l-9 9a1.92 1.92 0 0 0 .07 2.71l2.74 2.74a2 2 0 0 0 2.66.07l9-9a2 2 0 0 0 .57-1.21l.43-4.17a1 1 0 0 0-1-1.09zm-10.27 14l-2.73-2.73 2-1.95 2.68 2.68-1.95 2zm8.9-8.91l-5.63 5.59-2.7-2.7 5.6-5.6 3-.28-.27 2.99z"}))};!function(e){e.Paint="paint",e.Erase="erase"}(a||(a={}));var d=function(e){var n=e.currentTool,t=e.setCurrentTool;return(i.a.createElement("ul",{className:"tools"},i.a.createElement("li",null,i.a.createElement("input",{type:"radio",id:"paint",name:"tools",checked:n===a.Paint,onChange:function(){return t(a.Paint)}}),i.a.createElement("label",{htmlFor:"paint"},i.a.createElement(m,null))),i.a.createElement("li",null,i.a.createElement("input",{type:"radio",id:"erase",name:"tools",checked:n===a.Erase,onChange:function(){return t(a.Erase)}}),i.a.createElement("label",{htmlFor:"erase"},i.a.createElement(v,null)))))};function h(e){var n=e.canvasRef,t=e.fetchPainting,i=e.currentTool,r=Object(c.useState)(null),o=Object(l.a)(r,2),s=o[0],u=o[1],f=Object(c.useState)(null),m=Object(l.a)(f,2),v=m[0],d=m[1],h=Object(c.useState)(!1),g=Object(l.a)(h,2),p=g[0],E=g[1],w=Object(c.useState)(-1),b=Object(l.a)(w,2),O=b[0],j=b[1],C=Object(c.useState)(-1),S=Object(l.a)(C,2),k=S[0],P=S[1];function N(e){e.preventDefault(),E(0!==e.buttons),j(-1),P(-1)}function R(e){E(0!==e.touches.length),j(-1),P(-1)}function T(e,t){if(p&&n&&n.current&&s&&v){var a=v,c=a.x,i=a.y,r=a.width,o=a.height,l=(e-c)*(n.current.width/r),u=(t-i)*(n.current.height/o);-1===O&&-1===k?s.beginPath():(s.moveTo(O,k),s.lineTo(l,u),s.stroke()),j(l),P(u)}}return function(e){var n=e.canvasRef,t=e.setCanvasContext;Object(c.useEffect)((function(){n&&n.current&&t(n.current.getContext("2d"))}),[n,t])}({setCanvasContext:u,canvasRef:n}),function(e){var n=e.canvasRef,t=e.setCanvasRect;Object(c.useEffect)((function(){n&&n.current&&t(n.current.getBoundingClientRect())}),[n,t])}({setCanvasRect:d,canvasRef:n}),function(e){var n=e.canvasRef,t=e.fetchPainting,a=e.canvasContext,i=Object(c.useCallback)(t,[]);Object(c.useEffect)((function(){a&&i().then((function(e){if(n&&n.current){var t=JSON.parse(e).data;if(t){var c=new Image(n.current.width,n.current.height);c.src=t,c.onload=function(){a.drawImage(c,0,0)}}}}))}),[n,a,i])}({canvasRef:n,canvasContext:s,fetchPainting:t}),function(e){var n=e.currentTool,t=e.canvasContext;Object(c.useEffect)((function(){t&&(t.strokeStyle=n===a.Paint?"black":"white",t.lineWidth=n===a.Paint?4:24,t.lineCap="round",t.lineJoin="round")}),[t,n])}({currentTool:i,canvasContext:s}),{onMouseEnter:N,onMouseDown:N,onMouseMove:function(e){e.preventDefault(),T(e.clientX,e.clientY)},onMouseUp:N,onMouseLeave:N,onTouchStart:R,onTouchMove:function(e){var n=Array.from(e.touches),t=n.reduce((function(e,n){return{clientX:e.clientX+n.clientX,clientY:e.clientY+n.clientY}}),{clientX:0,clientY:0}),a=t.clientX,c=t.clientY;T(a/n.length,c/n.length)},onTouchEnd:R}}function g(e){var n=h(e);return(i.a.createElement("canvas",Object.assign({ref:e.canvasRef,className:"canvas",width:"1080",height:"1080"},n)))}t(327);var p=function(e){var n=e.canvasRef,t=e.currentTool,a=e.fetchPainting,c=e.isFetching,r=e.isSaving,o=e.person,l=e.savePainting,s=e.setCurrentTool,m=e.signOut;return(i.a.createElement("div",{className:"workspace"},i.a.createElement("header",{className:"header"},i.a.createElement("h2",{className:"current-user"},"Signed in as ",o.name()||"nameless person"),i.a.createElement(f,{onClick:m},"Sign out")),i.a.createElement("div",{className:"stage"},i.a.createElement(g,{canvasRef:n,currentTool:t,fetchPainting:a}),c&&i.a.createElement("div",{className:"canvas-guard guard"},i.a.createElement(u,null))),i.a.createElement("footer",{className:"footer"},i.a.createElement(d,{currentTool:t,setCurrentTool:s}),i.a.createElement(f,{onClick:l,disabled:r},"Save"))))},E=(t(328),t(157)),w=t.n(E),b=function(e){var n=e.signIn;return(i.a.createElement("header",{className:"splash"},i.a.createElement("img",{src:w.a,className:"splash-logo",alt:"logo"}),i.a.createElement(f,{onClick:n},"Sign in/up with Blockstack")))},O=(t(329),new s.AppConfig(["store_write","publish_data"])),j=new s.UserSession({appConfig:O});function C(){var e=Object(c.useState)(a.Paint),n=Object(l.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(!1),u=Object(l.a)(o,2),f=u[0],m=u[1],v=Object(c.useState)(!1),d=Object(l.a)(v,2),h=d[0],g=d[1],E=Object(c.useRef)(null);return Object(c.useEffect)((function(){j.isSignInPending()&&j.handlePendingSignIn().then((function(){var e=window.location,n=e.origin,t=e.pathname;window.location.assign("".concat(n).concat(t))}))})),i.a.createElement("div",{className:"app"},j.isUserSignedIn()?i.a.createElement(p,{currentTool:t,canvasRef:E,fetchPainting:function(){var e=E.current;return m(!0),(e?j.getFile("painting.json",{decrypt:!1}):Promise.resolve(JSON.stringify({}))).then((function(e){return m(!1),e}))},isFetching:f,isSaving:h,person:new s.Person(j.loadUserData().profile),savePainting:function(e){e.preventDefault();var n=E.current;n&&(g(!0),j.putFile("painting.json",JSON.stringify({data:n.toDataURL("image/png"),createdAt:Date.now()}),{encrypt:!1}).then((function(){g(!1)})))},setCurrentTool:r,signOut:function(e){e.preventDefault(),j.signUserOut();var n=window.location,t=n.origin,a=n.pathname;window.location.assign("".concat(t).concat(a))}}):i.a.createElement(b,{signIn:function(e){e.preventDefault();var n=window.location,t=n.origin,a=n.pathname;j.redirectToSignIn("".concat(t).concat(a),"".concat(t).concat(a,"manifest.json"))}}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(330);o.a.render(i.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},89:function(e,n){}},[[158,1,2]]]);
//# sourceMappingURL=main.ac188bc8.chunk.js.map