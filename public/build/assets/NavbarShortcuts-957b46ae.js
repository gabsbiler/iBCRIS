import{P as b}from"./vue3-perfect-scrollbar.esm-c7713f38.js";import{d as _,j as g,r as V,o as s,b as i,w as e,p as t,V as n,U as v,W as x,X as C,R as w,q as p,c as S,F as A,a as y,s as I,Y as k,m as d,x as m}from"./main-cf6206e3.js";import{V as B}from"./VMenu-f3279b4c.js";import{V as D}from"./VDivider-1ce2e50d.js";import{V as N,a as F}from"./VRow-0d54e54c.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-a275844d.js";const M={class:"text-base font-weight-medium mt-2 mb-0"},P={class:"text-sm"},R=_({__name:"Shortcuts",props:{togglerIcon:{default:"mdi-view-grid-plus-outline"},shortcuts:{}},setup(l){const o=l,c=g();return(f,r)=>{const u=V("IconBtn");return s(),i(u,null,{default:e(()=>[t(n,{icon:o.togglerIcon},null,8,["icon"]),t(B,{activator:"parent",offset:"14px",location:"bottom end"},{default:e(()=>[t(v,{width:"340","max-height":"560",class:"d-flex flex-column"},{default:e(()=>[t(x,{class:"py-4"},{append:e(()=>[t(u,null,{default:e(()=>[t(n,{icon:"mdi-view-grid-plus-outline"})]),_:1})]),default:e(()=>[t(C,null,{default:e(()=>[w("Shortcuts")]),_:1})]),_:1}),t(D),t(p(b),{options:{wheelPropagation:!1}},{default:e(()=>[t(N,{class:"ma-0 mt-n1"},{default:e(()=>[(s(!0),S(A,null,y(o.shortcuts,(a,h)=>(s(),i(F,{key:a.title,cols:"6",class:I(["text-center border-t cursor-pointer pa-4 shortcut-icon",(h+1)%2?"border-e":""]),onClick:U=>p(c).push(a.to)},{default:e(()=>[t(k,{variant:"tonal",size:"48"},{default:e(()=>[t(n,{icon:a.icon},null,8,["icon"])]),_:2},1024),d("h6",M,m(a.title),1),d("span",P,m(a.subtitle),1)]),_:2},1032,["class","onClick"]))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}});const L=_({__name:"NavbarShortcuts",setup(l){const o=[{icon:"mdi-calendar",title:"Calendar",subtitle:"Appointments",to:{name:"apps-calendar"}},{icon:"mdi-file-document-outline",title:"Invoice App",subtitle:"Manage Accounts",to:{name:"apps-invoice-list"}},{icon:"mdi-account-outline",title:"Users",subtitle:"Manage Users",to:{name:"apps-user-list"}},{icon:"mdi-view-dashboard-outline",title:"Dashboard",subtitle:"Dashboard Analytics",to:{name:"dashboards-analytics"}},{icon:"mdi-cog-outline",title:"Settings",subtitle:"Account Settings",to:{name:"pages-account-settings-tab",params:{tab:"account"}}},{icon:"mdi-help-circle-outline",title:"Help Center",subtitle:"FAQs & Articles",to:{name:"pages-help-center"}}];return(c,f)=>{const r=R;return s(),i(r,{shortcuts:o})}}});export{L as default};
