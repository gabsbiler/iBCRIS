import{d as m,B as g,k as d,r as f,o as r,b as c,w as t,p as l,V as _,q as L,Q as h,c as b,F as v,a as V,R as C,x as I,t as k}from"./main-78095835.js";import{V as x}from"./VMenu-aa475c7b.js";import{V as B,a as w,b as y}from"./VList-78e71c89.js";import"./forwardRefs-9d31fcaa.js";import"./VOverlay-90497e8f.js";import"./dialog-transition-17ebb244.js";import"./ssrBoot-c7737f13.js";import"./VDivider-fa72a8bc.js";const A=m({__name:"I18n",props:{languages:{},location:{default:"bottom end"}},emits:["change"],setup(u){const o=u,{locale:s}=useI18n({useScope:"global"});g(s,n=>{document.documentElement.setAttribute("lang",n)});const a=d(["en"]);return(n,i)=>{const p=f("IconBtn");return r(),c(p,null,{default:t(()=>[l(_,{icon:"mdi-translate"}),l(x,{activator:"parent",location:o.location,offset:"14px"},{default:t(()=>[l(B,{selected:L(a),"onUpdate:selected":i[0]||(i[0]=e=>h(a)?a.value=e:null),"active-color":"primary","min-width":"175px"},{default:t(()=>[(r(!0),b(v,null,V(o.languages,e=>(r(),c(w,{key:e.i18nLang,value:e.i18nLang,onClick:E=>{s.value=e.i18nLang,n.$emit("change",e.i18nLang)}},{default:t(()=>[l(y,null,{default:t(()=>[C(I(e.label),1)]),_:2},1024)]),_:2},1032,["value","onClick"]))),128))]),_:1},8,["selected"])]),_:1},8,["location"])]),_:1})}}}),M=m({__name:"NavBarI18n",setup(u){const{isAppRtl:o}=k(),s=[{label:"English",i18nLang:"en"},{label:"French",i18nLang:"fr"},{label:"Arabic",i18nLang:"ar"}],a=n=>{o.value=n==="ar"};return(n,i)=>(r(),c(A,{languages:s,onChange:a}))}});export{M as default};
