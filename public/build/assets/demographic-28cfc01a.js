import{_ as T}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-635e6c5f.js";import{k as c,A as W,S as G,r as B,q as t,o as E,b as H,w as s,p as o,U as P,$ as S,Y as $,m as p,a0 as f,V as A,Z as k,R as v,Q as j,x as z,O as Y}from"./main-78095835.js";import{a as L}from"./axios-6fe055d1.js";import{a as I}from"./avatar-1-3f757947.js";import{a as d,V as x}from"./VRow-d93bd0d7.js";import{V as O}from"./VSpacer-3f62ace1.js";import{V as q}from"./VForm-299de584.js";import{V as g}from"./VTextField-b80dd629.js";import{V as u}from"./VSelect-c8ac4ea3.js";import{V as J}from"./VSnackbar-19f0ce03.js";import"./VCounter-834eef0d.js";import"./forwardRefs-9d31fcaa.js";import"./VList-78e71c89.js";import"./ssrBoot-c7737f13.js";import"./VDivider-fa72a8bc.js";import"./dialog-transition-17ebb244.js";import"./VMenu-aa475c7b.js";import"./VOverlay-90497e8f.js";import"./VCheckboxBtn-1010991f.js";import"./VChip-45ebfbe6.js";const K={class:"d-flex flex-column justify-center gap-4"},Q={class:"d-flex flex-wrap gap-4"},Z=p("span",{class:"d-none d-sm-block"},"Upload new photo",-1),X=p("span",{class:"d-none d-sm-block"},"Reset",-1),ee=p("p",{class:"text-xs mb-0"}," Allowed JPG, GIF or PNG. Max size of 800K ",-1),le=p("b",null," DEMOGRAPHICS CHARACTERISTICS ",-1),oe={class:"mt-5"},xe={__name:"demographic",props:{member:Array,lookups:Array},setup(F){const C=F,l=c(C.member),m=c(C.lookups),U=c();let h=c(I);const b=c(),y=c(),_=c(!1),R=n=>{const a=new FileReader,{files:r}=n.target;r&&r.length&&(a.readAsDataURL(r[0]),a.onload=()=>{typeof a.result=="string"&&(h.value=a.result)})},D=()=>{h.value=I};W();const M=async()=>{l.value.demographic.lastname=null,l.value.demographic.firstname=null,l.value.demographic.middlename=null,l.value.demographic._3=null,l.value.demographic._4=null,l.value.demographic._5=null,l.value.demographic._6=null,l.value.demographic._7=null,l.value.demographic._8=null,l.value.demographic._9=null,l.value.demographic._10=null,l.value.demographic._11=null,l.value.demographic._12a=null,l.value.demographic._12b=null,l.value.demographic._12c=null},w=async()=>{var n,a;try{const r=await L.post("/api/updateMember",l.value.demographic);b.value=r.data.message,_.value=!0,y.value="success"}catch(r){console.error("There was an error updating the member:",r),b.value=((a=(n=r.response)==null?void 0:n.data)==null?void 0:a.message)||"An error occurred",_.value=!0,y.value="error"}},N=G(()=>{if(!l.value.demographic._6)return 0;const n=new Date(l.value.demographic._6),a=new Date;let r=a.getFullYear()-n.getFullYear();const V=a.getMonth()-n.getMonth();return(V<0||V===0&&a.getDate()<n.getDate())&&r--,l.value.demographic._7=r.toString(),r});return(n,a)=>{const r=B("VText"),V=T;return t(l)&&t(m)?(E(),H(x,{key:0},{default:s(()=>[o(d,{cols:"12"},{default:s(()=>[o(P,null,{default:s(()=>[o(S,{class:"d-flex"},{default:s(()=>[o($,{rounded:"sm",size:"120",class:"me-6",image:t(h)},null,8,["image"]),p("form",K,[p("div",Q,[o(f,{color:"primary",onClick:a[0]||(a[0]=i=>{var e;return(e=t(U))==null?void 0:e.click()})},{default:s(()=>[o(A,{icon:"mdi-cloud-upload-outline",class:"d-sm-none"}),Z]),_:1}),p("input",{ref_key:"refInputEl",ref:U,type:"file",name:"file",accept:".jpeg,.png,.jpg,GIF",hidden:"",onInput:R},null,544),o(f,{type:"reset",color:"error",variant:"tonal",onClick:D},{default:s(()=>[X,o(A,{icon:"mdi-refresh",class:"d-sm-none"})]),_:1})]),ee]),o(O),o(f,{icon:"mdi-content-save-outline",onClick:k(n.submitForm,["prevent"])},null,8,["onClick"])]),_:1}),o(S,null,{default:s(()=>[o(q,{class:"mt-6",onSubmit:k(w,["prevent"])},{default:s(()=>[p("div",null,[o(r,{class:"text-button"},{default:s(()=>[le]),_:1}),o(x,{class:"mt-2"},{default:s(()=>[o(d,{md:"4",cols:"12"},{default:s(()=>[o(g,{modelValue:t(l).demographic.lastname,"onUpdate:modelValue":a[1]||(a[1]=i=>t(l).demographic.lastname=i),label:"Last Name"},null,8,["modelValue"])]),_:1}),o(d,{md:"4",cols:"12"},{default:s(()=>[o(g,{modelValue:t(l).demographic.firstname,"onUpdate:modelValue":a[2]||(a[2]=i=>t(l).demographic.firstname=i),label:"First Name"},null,8,["modelValue"])]),_:1}),o(d,{md:"4",cols:"12"},{default:s(()=>[o(g,{modelValue:t(l).demographic.middlename,"onUpdate:modelValue":a[3]||(a[3]=i=>t(l).demographic.middlename=i),label:"Middle Name"},null,8,["modelValue"])]),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._3,"onUpdate:modelValue":a[4]||(a[4]=e=>t(l).demographic._3=e),label:"(3) How is __ related to household head?",items:(i=t(m).filter(e=>e.column_number==="3")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._4,"onUpdate:modelValue":a[5]||(a[5]=e=>t(l).demographic._4=e),label:"(4) Family Nucleus",items:(i=t(m).filter(e=>e.column_number==="4")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._5,"onUpdate:modelValue":a[6]||(a[6]=e=>t(l).demographic._5=e),label:"(5) is __ Male or Female",items:(i=t(m).filter(e=>e.column_number==="5")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>[o(V,{modelValue:t(l).demographic._6,"onUpdate:modelValue":a[7]||(a[7]=i=>t(l).demographic._6=i),label:"(6) When was ____ born? (mm-dd-yyyy)"},null,8,["modelValue"])]),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>[o(g,{modelValue:t(l).demographic._7,"onUpdate:modelValue":a[8]||(a[8]=i=>t(l).demographic._7=i),value:t(N),label:"(7) How old is ___ as of his/her last birthday?"},null,8,["modelValue","value"])]),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._8,"onUpdate:modelValue":a[9]||(a[9]=e=>t(l).demographic._8=e),label:"(8) What __'s citizenship?",items:(i=t(m).filter(e=>e.column_number==="8")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._9,"onUpdate:modelValue":a[10]||(a[10]=e=>t(l).demographic._9=e),label:"(9) What is ____'s religion/ religious affiliation?",items:(i=t(m).filter(e=>e.column_number==="9")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._10,"onUpdate:modelValue":a[11]||(a[11]=e=>t(l).demographic._10=e),label:"(10) What is ____'s ethnicity?",items:(i=t(m).filter(e=>e.column_number==="10")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"4"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._11,"onUpdate:modelValue":a[12]||(a[12]=e=>t(l).demographic._11=e),label:"(11) What is __'s highest educational attainment?",items:(i=t(m).filter(e=>e.column_number==="11")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"6"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._12a,"onUpdate:modelValue":a[13]||(a[13]=e=>t(l).demographic._12a=e),label:"(12a) Is __ currently enrolled?",items:(i=t(m).filter(e=>e.column_number==="12a")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"6"},{default:s(()=>{var i;return[o(u,{modelValue:t(l).demographic._12b,"onUpdate:modelValue":a[14]||(a[14]=e=>t(l).demographic._12b=e),label:"(12b) What type of school is __ on?",items:(i=t(m).filter(e=>e.column_number==="12b")[0])==null?void 0:i.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),o(d,{cols:"12",md:"12"},{default:s(()=>[o(g,{modelValue:t(l).demographic._12c,"onUpdate:modelValue":a[15]||(a[15]=i=>t(l).demographic._12c=i),label:"(12c) In what baranagay and city/ municipality is __ currently attending school?"},null,8,["modelValue"])]),_:1})]),_:1})]),p("div",oe,[o(x,null,{default:s(()=>[o(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[o(f,{onClick:k(w,["prevent"])},{default:s(()=>[v(" Save changes ")]),_:1},8,["onClick"]),o(f,{color:"secondary",variant:"outlined",type:"reset",onClick:k(M,["prevent"])},{default:s(()=>[v(" Reset ")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1}),o(J,{modelValue:t(_),"onUpdate:modelValue":a[17]||(a[17]=i=>j(_)?_.value=i:null),location:"top center",variant:"flat",color:t(y)},{actions:s(()=>[o(f,{color:"white",onClick:a[16]||(a[16]=i=>_.value=!1)},{default:s(()=>[v(" Close ")]),_:1})]),default:s(()=>[v(z(t(b))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})):Y("",!0)}}};export{xe as default};
