import{l as c,B as N,Z as C,k as R,r as D,s as o,o as M,b as A,w as r,q as a,af as i,$ as E,a6 as H,n as p,ae as _,aH as y,E as b,aI as u,G as g,a7 as v,a4 as W,Y as f,U as F,y as G,P as Y,aa as $}from"./main-ec2ae718.js";import{V as q}from"./VForm-0cdb3b2b.js";import{V as O}from"./VSnackbar-7066dbda.js";const P=p("b",null," RESIDENCY ",-1),Z={class:"mt-5"},j=p("b",null," MIGRATION ",-1),z={class:"mt-5"},Q={__name:"residency",props:{member:Array,lookups:Array},setup(U){const w=U,l=c(w.member),n=c(w.lookups),V=c(),k=c(),m=c(!1);N();const S=async()=>{var h,s;try{const d=await $.post("/api/updateMember",l.value.demographic);V.value=d.data.message,m.value=!0,k.value="success"}catch(d){console.error("There was an error updating the member:",d),V.value=((s=(h=d.response)==null?void 0:h.data)==null?void 0:s.message)||"An error occurred",m.value=!0,k.value="error"}},x=C(()=>l.value.demographic._15a!=="0000"||["1","4","5"].includes(l.value.demographic._15b)),B=C(()=>l.value.demographic._15a!=="0000"),I=R(),T=()=>{I.go(-1)};return(h,s)=>{const d=D("VText");return o(l)&&o(n)?(M(),A(_,{key:0},{default:r(()=>[a(i,{cols:"12"},{default:r(()=>[a(E,null,{default:r(()=>[a(H,null,{default:r(()=>[a(q,null,{default:r(()=>[p("div",null,[a(d,{class:"text-button"},{default:r(()=>[P]),_:1}),a(_,{class:"mt-2"},{default:r(()=>[a(i,{md:"6",cols:"12"},{default:r(()=>[a(y,{modelValue:o(l).demographic._15a,"onUpdate:modelValue":s[0]||(s[0]=t=>o(l).demographic._15a=t),label:"(15a) In what year did __ started residing in this housing unit?",type:"number",min:"0000",max:"9999",step:"1","base-color":o(l).demographic._15a?null:"warning"},null,8,["modelValue","base-color"])]),_:1}),b(a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._15b,"onUpdate:modelValue":s[1]||(s[1]=e=>o(l).demographic._15b=e),label:"(15b) Before moving in this housing unit, where did __ reside?",items:(t=o(n).filter(e=>e.column_number==="15b")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._15b?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1},512),[[g,o(x)]]),b(a(i,{md:"12",cols:"12"},{default:r(()=>[a(y,{modelValue:o(l).demographic._15c,"onUpdate:modelValue":s[2]||(s[2]=t=>o(l).demographic._15c=t),"base-color":o(l).demographic._15c?null:"warning",label:"(15c) In what barangay/ city/ municipality did __ resides before?"},null,8,["modelValue","base-color"])]),_:1},512),[[g,o(B)]])]),_:1})]),b(p("div",Z,[a(d,{class:"text-button"},{default:r(()=>[j]),_:1}),a(_,{class:"mt-2"},{default:r(()=>[a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16a,"onUpdate:modelValue":s[3]||(s[3]=e=>o(l).demographic._16a=e),label:"(16a) Type of Resident",items:(t=o(n).filter(e=>e.column_number==="16a")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._16a?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16b,"onUpdate:modelValue":s[4]||(s[4]=e=>o(l).demographic._16b=e),label:"(16b) What are the reason why  __ left his/her previous residence?",items:(t=o(n).filter(e=>e.column_number==="16b")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._16b?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16c,"onUpdate:modelValue":s[5]||(s[5]=e=>o(l).demographic._16c=e),label:"(16c) Does __ plan to return to previous residence?",items:(t=o(n).filter(e=>e.column_number==="16c")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._39a?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),b(a(i,{md:"6",cols:"12"},{default:r(()=>[a(y,{modelValue:o(l).demographic._16c_1,"onUpdate:modelValue":s[6]||(s[6]=t=>o(l).demographic._16c_1=t),label:"(16c) WHEN to return",type:"number",min:"1600",max:"9999",step:"1","base-color":o(l).demographic._16c_1?null:"warning"},null,8,["modelValue","base-color"])]),_:1},512),[[g,o(l).demographic._16c==1]]),a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16d,"onUpdate:modelValue":s[7]||(s[7]=e=>o(l).demographic._16d=e),label:"(16d) What are the reasons why __ transferred in this barangay?",items:(t=o(n).filter(e=>e.column_number==="16d")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._16d?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16e,"onUpdate:modelValue":s[8]||(s[8]=e=>o(l).demographic._16e=e),label:"(16e) Is Migration permanent?",items:(t=o(n).filter(e=>e.column_number==="16e")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._16e?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),a(i,{md:"6",cols:"12"},{default:r(()=>{var t;return[a(u,{modelValue:o(l).demographic._16f,"onUpdate:modelValue":s[9]||(s[9]=e=>o(l).demographic._16f=e),label:"(16f) How long do they intend to stay in the community?",items:(t=o(n).filter(e=>e.column_number==="16f")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":o(l).demographic._16f?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1})]),_:1})],512),[[g,o(x)]]),p("div",z,[a(_,null,{default:r(()=>[a(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:r(()=>[a(v,{onClick:W(S,["prevent"])},{default:r(()=>[f(" Save changes ")]),_:1},8,["onClick"]),a(v,{color:"secondary",variant:"outlined",onClick:T},{default:r(()=>[f(" Back ")]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1}),a(O,{modelValue:o(m),"onUpdate:modelValue":s[11]||(s[11]=t=>F(m)?m.value=t:null),location:"top center",variant:"flat",color:o(k)},{actions:r(()=>[a(v,{color:"white",onClick:s[10]||(s[10]=t=>m.value=!1)},{default:r(()=>[f(" Close ")]),_:1})]),default:r(()=>[f(G(o(V))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})):Y("",!0)}}};export{Q as default};