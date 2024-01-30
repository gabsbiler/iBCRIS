import{k as p,A,r as T,q as l,o as F,b as N,w as r,p as o,U as P,$ as R,m as y,D as _,E as g,a0 as k,Z as C,R as V,Q as B,x as D,O as I}from"./main-ee999be4.js";import{a as W}from"./axios-60a05fd8.js";import{a as u,V as f}from"./VRow-b84d81cd.js";import{V as M}from"./VForm-5c1e5662.js";import{V as c}from"./VSelect-4a1635ff.js";import{V as s}from"./VTextField-5e129094.js";import{V as H}from"./VSnackbar-9d2e1910.js";import"./axios-4a70c6fc.js";import"./forwardRefs-9d31fcaa.js";import"./VList-24266b93.js";import"./ssrBoot-16871ecf.js";import"./VDivider-81cb78e4.js";import"./VMenu-0cb1867b.js";import"./VOverlay-d1ced1dc.js";import"./VCheckboxBtn-178c9cd1.js";const $=y("b",null," Teenage Pregnancy ",-1),q={class:"mt-5"},ae={__name:"teenage-pregnancy",props:{member:Array,lookups:Array},setup(U){const x=U,e=p(x.member),i=p(x.lookups),h=p(),v=p(),d=p(!1);A();const w=async()=>{var b,a;try{const n=await W.post("/api/updateMember",e.value.demographic);h.value=n.data.message,d.value=!0,v.value="success"}catch(n){console.error("There was an error updating the member:",n),h.value=((a=(b=n.response)==null?void 0:b.data)==null?void 0:a.message)||"An error occurred",d.value=!0,v.value="error"}},S=async()=>{e.value.demographic._51=null,e.value.demographic._52=null,e.value.demographic._53_1=null,e.value.demographic._53_2=null,e.value.demographic._54=null,e.value.demographic._55=null,e.value.demographic._56=null,e.value.demographic._57=null};return(b,a)=>{const n=T("VText");return l(e)&&l(i)?(F(),N(f,{key:0},{default:r(()=>[o(u,{cols:"12"},{default:r(()=>[o(P,null,{default:r(()=>[o(R,null,{default:r(()=>[o(M,null,{default:r(()=>[y("div",null,[o(n,{class:"text-button"},{default:r(()=>[$]),_:1}),o(f,{class:"mt-2"},{default:r(()=>[o(u,{cols:"12"},{default:r(()=>{var t;return[o(c,{modelValue:l(e).demographic.isPregnant,"onUpdate:modelValue":a[0]||(a[0]=m=>l(e).demographic.isPregnant=m),label:"Is the HH enaged in teenage pregnancy incident in the last 3 years?",items:(t=l(i).filter(m=>m.column_number==="50")[0])==null?void 0:t.lookup_list.map(m=>({...m,description:m.lookup_key+" - "+m.description})),"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1})]),_:1}),_(o(f,null,{default:r(()=>[o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._51,"onUpdate:modelValue":a[1]||(a[1]=t=>l(e).demographic._51=t),label:"(51) When the incidence occurred?",min:"1960",max:"2999",type:"number"},null,8,["modelValue"])]),_:1}),o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._51_1,"onUpdate:modelValue":a[2]||(a[2]=t=>l(e).demographic._51_1=t),label:"(51) Age during the incidence occurred?",min:"0",max:"999",type:"number"},null,8,["modelValue"])]),_:1}),o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._52,"onUpdate:modelValue":a[3]||(a[3]=t=>l(e).demographic._52=t),label:"(52) Age of Father of the child during incidence occurred?",min:"0",max:"999",type:"number"},null,8,["modelValue"])]),_:1}),o(u,{md:"6",cols:"12"},{default:r(()=>{var t;return[o(c,{modelValue:l(e).demographic._53_1,"onUpdate:modelValue":a[4]||(a[4]=m=>l(e).demographic._53_1=m),label:"(53.1) Is teenager studying?",items:(t=l(i).filter(m=>m.column_number==="53.1")[0])==null?void 0:t.lookup_list,"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),_(o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._54_1,"onUpdate:modelValue":a[5]||(a[5]=t=>l(e).demographic._54_1=t),label:"(54.1) Where he/she studying"},null,8,["modelValue"])]),_:1},512),[[g,l(e).demographic._53_1==1]]),o(u,{md:"6",cols:"12"},{default:r(()=>{var t;return[o(c,{modelValue:l(e).demographic._53_2,"onUpdate:modelValue":a[6]||(a[6]=m=>l(e).demographic._53_2=m),label:"(53.2) Is Father Studying?",items:(t=l(i).filter(m=>m.column_number==="53.2")[0])==null?void 0:t.lookup_list,"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),_(o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._54,"onUpdate:modelValue":a[7]||(a[7]=t=>l(e).demographic._54=t),label:"(54) Where he/she is studying?"},null,8,["modelValue"])]),_:1},512),[[g,l(e).demographic._53_2==1]]),o(u,{md:"6",cols:"12"},{default:r(()=>{var t;return[o(c,{modelValue:l(e).demographic._55,"onUpdate:modelValue":a[8]||(a[8]=m=>l(e).demographic._55=m),label:"(55) Delivery Complication?",items:(t=l(i).filter(m=>m.column_number==="55")[0])==null?void 0:t.lookup_list,"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1}),_(o(u,{cols:"12",md:"6"},{default:r(()=>[o(s,{modelValue:l(e).demographic._56,"onUpdate:modelValue":a[9]||(a[9]=t=>l(e).demographic._56=t),label:"(56) What are the complications?"},null,8,["modelValue"])]),_:1},512),[[g,l(e).demographic._55==1]]),o(u,{md:"6",cols:"12"},{default:r(()=>{var t;return[o(c,{modelValue:l(e).demographic._57,"onUpdate:modelValue":a[10]||(a[10]=m=>l(e).demographic._57=m),label:"(57) Next Action Plan",items:(t=l(i).filter(m=>m.column_number==="57")[0])==null?void 0:t.lookup_list,"item-title":"description","item-value":"lookup_key"},null,8,["modelValue","items"])]}),_:1})]),_:1},512),[[g,l(e).demographic.isPregnant==1]])]),y("div",q,[o(f,null,{default:r(()=>[o(u,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:r(()=>[o(k,{onClick:C(w,["prevent"])},{default:r(()=>[V(" Save changes ")]),_:1},8,["onClick"]),o(k,{color:"secondary",variant:"outlined",type:"reset",onClick:C(S,["prevent"])},{default:r(()=>[V(" Reset ")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1}),o(H,{modelValue:l(d),"onUpdate:modelValue":a[12]||(a[12]=t=>B(d)?d.value=t:null),location:"top center",variant:"flat",color:l(v)},{actions:r(()=>[o(k,{color:"white",onClick:a[11]||(a[11]=t=>d.value=!1)},{default:r(()=>[V(" Close ")]),_:1})]),default:r(()=>[V(D(l(h))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})):I("",!0)}}};export{ae as default};
