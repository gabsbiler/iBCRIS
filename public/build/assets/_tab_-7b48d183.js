import I from"./birth-mariages-b09c3d0a.js";import R from"./death-96741d54.js";import U from"./demographic-b9c80472.js";import z from"./health-80e466a6.js";import D from"./skills-dev-ec27c8e9.js";import M from"./residency-961e5759.js";import j from"./sociocivi-dabe8305.js";import A from"./teenage-pregnancy-7938f881.js";import{a as E}from"./avatar-1-3f757947.js";import{b as x}from"./axios-d87e70fd.js";import{A as P,k as h,aB as F,r as L,q as o,o as b,c as w,b as V,w as a,p as e,$ as W,Y as O,m as l,x as u,R as p,a0 as Q,U as Y,O as g,Q as B,F as G,a as J,V as q}from"./main-4a305e5b.js";import{b as N}from"./route-block-83d24a4e.js";import{V as y,a as f}from"./VRow-9020e6a9.js";import{V as K,a as S,b as X,c}from"./VWindowItem-8029cdb4.js";import"./AppDateTimePicker.vue_vue_type_style_index_0_lang-9e6c1713.js";import"./VCounter-d47b1182.js";import"./forwardRefs-9d31fcaa.js";import"./VForm-fce6d192.js";import"./VTextField-3d54f6b0.js";import"./VSelect-c551eedb.js";import"./VList-8ef07325.js";import"./ssrBoot-ed7507ec.js";import"./VDivider-f3cf817d.js";import"./dialog-transition-92d1a0d6.js";import"./VMenu-1f398e1c.js";import"./VOverlay-f2e6ad7c.js";import"./VCheckboxBtn-14eb57ab.js";import"./VChip-6f184fc2.js";import"./VSnackbar-2745a5f1.js";import"./VSpacer-6c87578e.js";const Z={key:0},ee={class:"user-profile-info w-100 d-flex"},oe={class:"mt-auto w-100"},ae={class:"d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-5"},te={class:"d-flex align-center"},le={class:"text-primary"},se={class:"d-flex align-center"},re={class:"text-primary"},ie={class:"d-flex align-center"},ne={class:"text-primary"},me={class:"d-flex align-center"},ue={class:"text-primary"},ce={__name:"[tab]",setup(de){const i=P(),_=h(i.params.tab),t=h(),s=h([]),d=h();h(!1);const v=h(!1),$=[{title:"Demographics",icon:"mdi-account-outline",tab:"demographics"},{title:"Skills Dev & Economic Act.",icon:"mdi-lock-open-outline",tab:"skills-dev"},{title:"Residency & Migration",icon:"mdi-lock-open-outline",tab:"residency"},{title:"Birth & Marriages",icon:"mdi-bookmark-outline",tab:"birth-marriages"},{title:"Health Information",icon:"mdi-medication",tab:"health"},{title:"Socio Civi Information",icon:"mdi-account-details",tab:"sociocivi"},{title:"Teenage Pregnancy",icon:"mdi-human-pregnant",tab:"teenage-pregnancy"}];async function C(){try{const n=i.params.id,r=await x.get("/api/household-list",{params:{id:i.query.household_id}});d.value=r.data}catch(n){console.log(n)}}async function T(){try{const r=await x.get("/api/household-member",{params:{member_id:i.query.member_id,household_id:i.query.household_id}});t.value=r.data;for(var n of t.value.demographic.tags.split(","))v.value=n.trim()=="dead"}catch(r){console.log(r)}}async function H(){try{const n=await x.get("/api/lookup/");s.value=n.data}catch(n){console.error("Error fetching lookups:",n)}}return F(()=>{H(),T(),C()}),(n,r)=>{const k=L("VText");return o(t)&&o(d)?(b(),w("div",Z,[o(d)?(b(),V(Y,{key:0},{default:a(()=>[e(W,{class:"d-flex align-bottom flex-sm-row flex-column justify-center gap-x-4",style:{"min-height":"160px"}},{default:a(()=>[e(y,null,{default:a(()=>[e(f,null,{default:a(()=>[e(O,{rounded:"",size:"125",image:o(E),class:"user-profile-avatar mx-auto"},null,8,["image"])]),_:1})]),_:1}),l("div",ee,[l("div",oe,[e(y,null,{default:a(()=>[e(f,{cols:"12"},{default:a(()=>[e(y,{class:"mt-auto"},{default:a(()=>[e(f,null,{default:a(()=>[l("h1",null,u(o(t).demographic.lastname)+", "+u(o(t).demographic.firstname)+" "+u(o(t).demographic.middlename),1)]),_:1})]),_:1}),e(y,null,{default:a(()=>[e(f,{cols:"10"},{default:a(()=>[l("div",ae,[l("span",te,[e(k,null,{default:a(()=>[p("Brgy (Purok/Sitio):"),l("b",le,u(o(d).Barangay),1)]),_:1})]),l("span",se,[e(k,null,{default:a(()=>[p("BSN:"),l("b",re,u(o(d).BSN),1)]),_:1})]),l("span",ie,[e(k,null,{default:a(()=>[p("HUSN:"),l("b",ne,u(o(d).HUSN),1)]),_:1})]),l("span",me,[e(k,null,{default:a(()=>[p("HSN:"),l("b",ue,u(o(d).HSN),1)]),_:1})])])]),_:1}),e(f,{cols:"2"},{default:a(()=>[e(Q,{color:"primary ms-auto"},{default:a(()=>[p(" Change Photo ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])])]),_:1})]),_:1})):g("",!0),e(y,null,{default:a(()=>[e(f,{cols:"12",class:"mt-5"},{default:a(()=>[e(K,{modelValue:o(_),"onUpdate:modelValue":r[0]||(r[0]=m=>B(_)?_.value=m:null),direction:"horizontal",class:"v-tabs-pill"},{default:a(()=>[o(v)?g("",!0):(b(),w(G,{key:0},J($,m=>e(S,{key:m.icon,value:m.tab,to:{name:"household-member-tab",params:{tab:m.tab},query:{member_id:o(i).query.member_id,household_id:o(i).query.household_id}}},{default:a(()=>[e(q,{size:"20",start:"",icon:m.icon},null,8,["icon"]),p(" "+u(m.title),1)]),_:2},1032,["value","to"])),64)),o(v)?(b(),V(S,{key:"mdi-coffin",value:"death",to:{name:"household-member-tab",params:{tab:"death"},query:{member_id:o(i).query.member_id,household_id:o(i).query.household_id}}},{default:a(()=>[e(q,{size:"20",start:"",icon:"mdi-coffin"}),p(" Death ")]),_:1},8,["to"])):g("",!0)]),_:1},8,["modelValue"])]),_:1}),o(t)&&o(s)?(b(),V(f,{key:0,cols:"12"},{default:a(()=>[e(X,{modelValue:o(_),"onUpdate:modelValue":r[1]||(r[1]=m=>B(_)?_.value=m:null),class:"disable-tab-transition",touch:!0},{default:a(()=>[e(c,{value:"demographics"},{default:a(()=>[e(U,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"skills-dev"},{default:a(()=>[e(D,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"residency"},{default:a(()=>[e(M,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"birth-marriages"},{default:a(()=>[e(I,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"death"},{default:a(()=>[e(R,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"health"},{default:a(()=>[e(z,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"sociocivi"},{default:a(()=>[e(j,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1}),e(c,{value:"teenage-pregnancy"},{default:a(()=>[e(A,{member:o(t),lookups:o(s)},null,8,["member","lookups"])]),_:1})]),_:1},8,["modelValue"])]),_:1})):g("",!0)]),_:1})])):g("",!0)}}};typeof N=="function"&&N(ce);export{ce as default};
