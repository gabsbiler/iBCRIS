import{_ as A}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-e6035b98.js";import{k as f,A as I,S as D,r as W,q as o,o as B,b as F,w as i,p as a,U as N,$ as O,m as V,D as m,E as n,a0 as C,Z as M,R as v,Q as $,x as E,O as L}from"./main-be644d5f.js";import{a as Y}from"./axios-60a05fd8.js";import{a as u,V as k}from"./VRow-bdebae90.js";import{V as q}from"./VForm-37319816.js";import{V as b}from"./VTextField-bd036a5d.js";import{V as _}from"./VSelect-95e11595.js";import{V as G}from"./VSnackbar-a4824b83.js";import"./VCounter-4048111b.js";import"./forwardRefs-9d31fcaa.js";import"./axios-4a70c6fc.js";import"./VList-b4de610e.js";import"./ssrBoot-a5814298.js";import"./VDivider-c092720c.js";import"./VMenu-9d117845.js";import"./VOverlay-e17ae491.js";import"./VCheckboxBtn-996d3c07.js";import"./VChip-30808de3.js";const H=V("b",null," BIRTH ",-1),P={class:"mt-5"},Q=V("b",null," MARRIAGE ",-1),Z={class:"mt-5"},_e={__name:"birth-mariages",props:{member:Array,lookups:Array},setup(R){const x=R,l=f(x.member),s=f(x.lookups),y=f(),w=f(),c=f(!1);I();const S=async()=>{var p,t;try{const d=await Y.post("/api/updateMember",l.value.demographic);y.value=d.data.message,c.value=!0,w.value="success"}catch(d){console.error("There was an error updating the member:",d),y.value=((t=(p=d.response)==null?void 0:p.data)==null?void 0:t.message)||"An error occurred",c.value=!0,w.value="error"}},U=D(()=>{if(!l.value.demographic._6)return 0;const p=new Date(l.value.demographic._6),t=new Date;let d=t.getFullYear()-p.getFullYear();const h=t.getMonth()-p.getMonth();return(h<0||h===0&&t.getDate()<p.getDate())&&d--,l.value.demographic._7=d.toString(),d}),T=async()=>{l.value.demographic._17=null,l.value.demographic._18=null,l.value.demographic._19=null,l.value.demographic._20a=null,l.value.demographic._20b=null,l.value.demographic._21=null,l.value.demographic._22=null,l.value.demographic._23=null,l.value.demographic._24=null,l.value.demographic._25=null,l.value.demographic._26=null},g=D(()=>!(l.value.demographic._21==1||l.value.demographic._21==3||l.value.demographic._21==9));return(p,t)=>{const d=W("VText"),h=A;return o(l)&&o(s)?(B(),F(k,{key:0},{default:i(()=>[a(u,{cols:"12"},{default:i(()=>[a(N,null,{default:i(()=>[a(O,null,{default:i(()=>[a(q,null,{default:i(()=>[V("div",null,[a(d,{class:"text-button"},{default:i(()=>[H]),_:1}),a(k,{class:"mt-2"},{default:i(()=>[a(u,{cols:"12",md:"6"},{default:i(()=>[a(b,{modelValue:o(l).demographic._17,"onUpdate:modelValue":t[0]||(t[0]=r=>o(l).demographic._17=r),label:"(17) In what City/ Municipality/ and province was born?"},null,8,["modelValue"])]),_:1}),a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._18a,"onUpdate:modelValue":t[1]||(t[1]=e=>o(l).demographic._18a=e),label:"(18) Is ____'s birth registered with the LRCO?",items:(r=o(s).filter(e=>e.column_number==="18")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),m(a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._19,"onUpdate:modelValue":t[2]||(t[2]=e=>o(l).demographic._19=e),label:"(19) Why was ___'s birth not registered?",items:(r=o(s).filter(e=>e.column_number==="19")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1},512),[[n,o(l).demographic._18a==2]]),m(a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._20a,"onUpdate:modelValue":t[3]||(t[3]=e=>o(l).demographic._20a=e),label:"(20a) Where was  __ delivered?",items:(r=o(s).filter(e=>e.column_number==="20a")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1},512),[[n,o(U)<1]]),m(a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._20b,"onUpdate:modelValue":t[4]||(t[4]=e=>o(l).demographic._20b=e),label:"(20b) Who attended in the delivery of __?",items:(r=o(s).filter(e=>e.column_number==="20b")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1},512),[[n,o(U)<1]]),a(u,{cols:"12",md:"6"},{default:i(()=>[a(b,{modelValue:o(l).demographic._20c,"onUpdate:modelValue":t[5]||(t[5]=r=>o(l).demographic._20c=r),label:"(20c) What is the last vaccine received by ____?"},null,8,["modelValue"])]),_:1})]),_:1})]),V("div",P,[a(d,{class:"text-button"},{default:i(()=>[Q]),_:1}),a(k,{class:"mt-2"},{default:i(()=>[a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._21,"onUpdate:modelValue":t[6]||(t[6]=e=>o(l).demographic._21=e),label:"(21) What is ______'s marital status?",items:(r=o(s).filter(e=>e.column_number==="21")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),m(a(u,{cols:"12",md:"6"},{default:i(()=>[a(h,{modelValue:o(l).demographic._22,"onUpdate:modelValue":t[7]||(t[7]=r=>o(l).demographic._22=r),label:"(22) When did ___'s marriage occur?"},null,8,["modelValue"])]),_:1},512),[[n,o(g)]]),m(a(u,{cols:"12",md:"6"},{default:i(()=>[a(b,{modelValue:o(l).demographic._23,"onUpdate:modelValue":t[8]||(t[8]=r=>o(l).demographic._23=r),label:"(23) In what City/ Municipality/ and province did ___'s marriage occur?"},null,8,["modelValue"])]),_:1},512),[[n,o(g)]]),m(a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._24,"onUpdate:modelValue":t[9]||(t[9]=e=>o(l).demographic._24=e),label:"(24) Type of Marriage ceremony?",items:(r=o(s).filter(e=>e.column_number==="24")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1},512),[[n,o(g)]]),m(a(u,{md:"6",cols:"12"},{default:i(()=>{var r;return[a(_,{modelValue:o(l).demographic._25,"onUpdate:modelValue":t[10]||(t[10]=e=>o(l).demographic._25=e),label:"(25) Is __'s marriage registered with the LCRO?",items:(r=o(s).filter(e=>e.column_number==="25")[0])==null?void 0:r.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1},512),[[n,o(g)]]),m(a(u,{md:"6",cols:"12"},{default:i(()=>[a(b,{modelValue:o(l).demographic._26,"onUpdate:modelValue":t[11]||(t[11]=r=>o(l).demographic._26=r),label:"(26)Why was ___'s marriage not registered?"},null,8,["modelValue"])]),_:1},512),[[n,o(g)]])]),_:1})]),V("div",Z,[a(k,null,{default:i(()=>[a(u,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:i(()=>[a(C,{onClick:M(S,["prevent"])},{default:i(()=>[v(" Save changes ")]),_:1},8,["onClick"]),a(C,{color:"secondary",variant:"outlined",type:"reset",onClick:M(T,["prevent"])},{default:i(()=>[v(" Reset ")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1}),a(G,{modelValue:o(c),"onUpdate:modelValue":t[13]||(t[13]=r=>$(c)?c.value=r:null),location:"top center",variant:"flat",color:o(w)},{actions:i(()=>[a(C,{color:"white",onClick:t[12]||(t[12]=r=>c.value=!1)},{default:i(()=>[v(" Close ")]),_:1})]),default:i(()=>[v(E(o(y))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})):L("",!0)}}};export{_e as default};