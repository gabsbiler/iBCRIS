import{d as w,S as T,r as $,o as d,b as x,w as a,p as t,G as B,V as v,U as R,W as z,D as _,q as f,R as c,x as u,E as g,X as E,c as b,F as y,a as L,O as C,Y as P,m as h,s as M,Z as F,$ as O,a0 as U,k as D}from"./main-fc279098.js";import{P as W}from"./vue3-perfect-scrollbar.esm-6542549d.js";import{V as N,a as Y}from"./VListItemAction-ce6d11e0.js";import{V as j}from"./VMenu-50f2ce39.js";import{V as q}from"./VTooltip-99b24a3c.js";import{V as k}from"./VDivider-5ecb6611.js";import{V as G,a as S,b as I,c as H}from"./VList-4e58f634.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-a6071b3b.js";import"./ssrBoot-a8066742.js";const X=m=>m?m.split(" ").map(s=>s.charAt(0).toUpperCase()).join(""):"",Z={key:0},J={class:"text-xs text-disabled"},K={class:"d-flex flex-column align-center gap-4"},Q={style:{"block-size":"28px","inline-size":"28px"}},ee=w({__name:"Notifications",props:{notifications:{},badgeProps:{default:void 0},location:{default:"bottom end"}},emits:["read","unread","remove","click:notification"],setup(m,{emit:n}){const s=m,r=T(()=>s.notifications.some(l=>l.isSeen===!1)),p=()=>{const l=s.notifications.map(o=>o.id);r.value?n("read",l):n("unread",l)};return(l,o)=>{const i=$("IconBtn");return d(),x(i,{id:"notification-btn"},{default:a(()=>[t(N,B({dot:""},s.badgeProps,{"model-value":s.notifications.some(e=>!e.isSeen),color:"error",bordered:"","offset-x":"1","offset-y":"1"}),{default:a(()=>[t(v,{icon:"mdi-bell-outline"})]),_:1},16,["model-value"]),t(j,{activator:"parent",width:"380px",location:s.location,offset:"14px","close-on-content-click":!1},{default:a(()=>[t(R,{class:"d-flex flex-column"},{default:a(()=>[t(z,{class:"notification-section"},{append:a(()=>[_(t(i,{onClick:p},{default:a(()=>[t(v,{icon:f(r)?"mdi-email-open-outline":"mdi-email-outline"},null,8,["icon"]),t(q,{activator:"parent",location:"start"},{default:a(()=>[c(u(f(r)?"Mark all as read":"Mark all as unread"),1)]),_:1})]),_:1},512),[[g,s.notifications.length]])]),default:a(()=>[t(E,{class:"text-lg"},{default:a(()=>[c(" Notifications ")]),_:1})]),_:1}),t(k),t(f(W),{options:{wheelPropagation:!1},style:{"max-block-size":"23.75rem"}},{default:a(()=>[t(G,{class:"py-0"},{default:a(()=>[(d(!0),b(y,null,L(s.notifications,(e,A)=>(d(),b(y,{key:e.title},[A>0?(d(),x(k,{key:0})):C("",!0),t(S,{link:"",lines:"one","min-height":"66px",class:"list-item-hover-class",onClick:V=>l.$emit("click:notification",e)},{prepend:a(()=>[t(Y,{start:""},{default:a(()=>[t(P,{size:"40",color:e.color&&e.icon?e.color:void 0,image:e.img||void 0,icon:e.icon||void 0,variant:e.img?void 0:"tonal"},{default:a(()=>[e.text?(d(),b("span",Z,u(f(X)(e.text)),1)):C("",!0)]),_:2},1032,["color","image","icon","variant"])]),_:2},1024)]),append:a(()=>[h("div",K,[t(N,{dot:"",color:e.isSeen?"#a8aaae":"primary",class:M(`${e.isSeen?"visible-in-hover":""} ms-1`),onClick:F(V=>l.$emit(e.isSeen?"unread":"read",[e.id]),["stop"])},null,8,["color","class","onClick"]),h("div",Q,[t(i,{size:"x-small",class:"visible-in-hover",onClick:V=>l.$emit("remove",e.id)},{default:a(()=>[t(v,{size:"20",icon:"mdi-close"})]),_:2},1032,["onClick"])])])]),default:a(()=>[t(I,null,{default:a(()=>[c(u(e.title),1)]),_:2},1024),t(H,null,{default:a(()=>[c(u(e.subtitle),1)]),_:2},1024),h("span",J,u(e.time),1)]),_:2},1032,["onClick"])],64))),128)),_(t(S,{class:"text-center text-medium-emphasis",style:{"block-size":"56px"}},{default:a(()=>[t(I,null,{default:a(()=>[c("No Notification Found!")]),_:1})]),_:1},512),[[g,!s.notifications.length]])]),_:1})]),_:1}),t(k),_(t(O,{class:"notification-footer"},{default:a(()=>[t(U,{block:""},{default:a(()=>[c(" VIEW ALL NOTIFICATIONS ")]),_:1})]),_:1},512),[[g,s.notifications.length]])]),_:1})]),_:1},8,["location"])]),_:1})}}});const te="/build/assets/avatar-3-3ef9169b.png",ae="/build/assets/avatar-4-406ee6ab.png",se="/build/assets/avatar-5-bad78850.png",oe="/build/assets/paypal-01b645d1.svg",ve=w({__name:"NavBarNotifications",setup(m){const n=D([{id:1,img:ae,title:"Congratulation Flora! 🎉",subtitle:"Won the monthly best seller badge",time:"Today",isSeen:!0},{id:2,text:"Tom Holland",title:"New user registered.",subtitle:"5 hours ago",time:"Yesterday",isSeen:!1},{id:3,img:se,title:"New message received 👋🏻",subtitle:"You have 10 unread messages",time:"11 Aug",isSeen:!0},{id:4,img:oe,title:"Paypal",subtitle:"Received Payment",time:"25 May",isSeen:!1,color:"error"},{id:5,img:te,title:"Received Order 📦",subtitle:"New order received from john",time:"19 Mar",isSeen:!0}]),s=o=>{n.value.forEach((i,e)=>{o===i.id&&n.value.splice(e,1)})},r=o=>{n.value.forEach(i=>{o.forEach(e=>{e===i.id&&(i.isSeen=!0)})})},p=o=>{n.value.forEach(i=>{o.forEach(e=>{e===i.id&&(i.isSeen=!1)})})},l=o=>{o.isSeen||r([o.id])};return(o,i)=>{const e=ee;return d(),x(e,{notifications:f(n),onRemove:s,onRead:r,onUnread:p,"onClick:notification":l},null,8,["notifications"])}}});export{ve as default};