import{_ as F}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-c0c4cc5e.js";import{l as p,k as M,B as T,Z as B,b6 as N,r as A,s as l,o as I,b as R,w as i,q as r,af as s,$ as W,a6 as H,a4 as $,n as y,ae as k,aH as _,aI as m,a7 as h,Y as b,U as E,y as P,P as Y,aa as v}from"./main-27bf03b5.js";import{a as L}from"./avatar-1-3f757947.js";import{V as q}from"./VForm-7ee54603.js";import{V as z}from"./VSnackbar-45528893.js";const G=y("b",null," DEMOGRAPHICS CHARACTERISTICS ",-1),O={class:"mt-5"},ee={__name:"demographic",props:{member:Array},setup(w){const o=p(w.member),d=p([]);p(),p(L);const f=p(),V=p(),c=p(!1);async function U(){try{const n=await v.get("/api/lookup/");d.value=n.data}catch(n){console.error("Error fetching lookups:",n)}}const C=M(),S=()=>{C.go(-1)};T();const x=async()=>{var n,a;try{const u=await v.post("/api/updateMember",o.value.demographic);f.value=u.data.message,c.value=!0,V.value="success"}catch(u){console.error("There was an error updating the member:",u),f.value=((a=(n=u.response)==null?void 0:n.data)==null?void 0:a.message)||"An error occurred",c.value=!0,V.value="error",console.log(u)}},D=B(()=>{if(!o.value.demographic._6)return 0;const n=new Date(o.value.demographic._6),a=new Date;let u=a.getFullYear()-n.getFullYear();const g=a.getMonth()-n.getMonth();return(g<0||g===0&&a.getDate()<n.getDate())&&u--,o.value.demographic._7=u.toString(),u});return N(()=>{U()}),(n,a)=>{const u=A("VText"),g=F;return l(o)&&l(d)?(I(),R(k,{key:0},{default:i(()=>[r(s,{cols:"12"},{default:i(()=>[r(W,null,{default:i(()=>[r(H,null,{default:i(()=>[r(q,{onSubmit:$(x,["prevent"]),ref:"refForm"},{default:i(()=>[y("div",null,[r(u,{class:"text-button"},{default:i(()=>[G]),_:1}),r(k,{class:"mt-2"},{default:i(()=>[r(s,{md:"4",cols:"12"},{default:i(()=>[r(_,{modelValue:l(o).demographic.lastname,"onUpdate:modelValue":a[0]||(a[0]=t=>l(o).demographic.lastname=t),label:"Last Name","base-color":l(o).demographic.lastname?null:"warning"},null,8,["modelValue","base-color"])]),_:1}),r(s,{md:"4",cols:"12"},{default:i(()=>[r(_,{modelValue:l(o).demographic.firstname,"onUpdate:modelValue":a[1]||(a[1]=t=>l(o).demographic.firstname=t),label:"First Name","base-color":l(o).demographic.firstname?null:"warning"},null,8,["modelValue","base-color"])]),_:1}),r(s,{md:"4",cols:"12"},{default:i(()=>[r(_,{modelValue:l(o).demographic.middlename,"onUpdate:modelValue":a[2]||(a[2]=t=>l(o).demographic.middlename=t),label:"Middle Name","base-color":l(o).demographic.middlename?null:"warning"},null,8,["modelValue","base-color"])]),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._3,"onUpdate:modelValue":a[3]||(a[3]=e=>l(o).demographic._3=e),label:"(3) How is __ related to household head?",items:(t=l(d).filter(e=>e.column_number==="3")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._3?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._4,"onUpdate:modelValue":a[4]||(a[4]=e=>l(o).demographic._4=e),label:"(4) Family Nucleus",items:(t=l(d).filter(e=>e.column_number==="4")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._4?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._5,"onUpdate:modelValue":a[5]||(a[5]=e=>l(o).demographic._5=e),label:"(5) is __ Male or Female",items:(t=l(d).filter(e=>e.column_number==="5")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._5?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>[r(g,{modelValue:l(o).demographic._6,"onUpdate:modelValue":a[6]||(a[6]=t=>l(o).demographic._6=t),label:"(6) When was ____ born? (mm-dd-yyyy)","base-color":l(o).demographic._6?null:"warning"},null,8,["modelValue","base-color"])]),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>[r(_,{modelValue:l(o).demographic._7,"onUpdate:modelValue":a[7]||(a[7]=t=>l(o).demographic._7=t),value:l(D),label:"(7) How old is ___ as of his/her last birthday?","base-color":l(o).demographic._7?null:"warning"},null,8,["modelValue","value","base-color"])]),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._8,"onUpdate:modelValue":a[8]||(a[8]=e=>l(o).demographic._8=e),label:"(8) What __'s citizenship?",items:(t=l(d).filter(e=>e.column_number==="8")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._8?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._9,"onUpdate:modelValue":a[9]||(a[9]=e=>l(o).demographic._9=e),label:"(9) What is ____'s religion/ religious affiliation?",items:(t=l(d).filter(e=>e.column_number==="9")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._9?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._10,"onUpdate:modelValue":a[10]||(a[10]=e=>l(o).demographic._10=e),label:"(10) What is ____'s ethnicity?",items:(t=l(d).filter(e=>e.column_number==="10")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._10?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"4"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._11,"onUpdate:modelValue":a[11]||(a[11]=e=>l(o).demographic._11=e),label:"(11) What is __'s highest educational attainment?",items:(t=l(d).filter(e=>e.column_number==="11")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._11?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"6"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._12a,"onUpdate:modelValue":a[12]||(a[12]=e=>l(o).demographic._12a=e),label:"(12a) Is __ currently enrolled?",items:(t=l(d).filter(e=>e.column_number==="12a")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._12a?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"6"},{default:i(()=>{var t;return[r(m,{modelValue:l(o).demographic._12b,"onUpdate:modelValue":a[13]||(a[13]=e=>l(o).demographic._12b=e),label:"(12b) What type of school is __ on?",items:(t=l(d).filter(e=>e.column_number==="12b")[0])==null?void 0:t.lookup_list.map(e=>({...e,description:e.lookup_key+" - "+e.description})),"item-title":"description","item-value":"lookup_key","base-color":l(o).demographic._12b?null:"warning"},null,8,["modelValue","items","base-color"])]}),_:1}),r(s,{cols:"12",md:"12"},{default:i(()=>[r(_,{modelValue:l(o).demographic._12c,"onUpdate:modelValue":a[14]||(a[14]=t=>l(o).demographic._12c=t),label:"(12c) In what baranagay and city/ municipality is __ currently attending school?","base-color":l(o).demographic._12c?null:"warning"},null,8,["modelValue","base-color"])]),_:1})]),_:1})]),y("div",O,[r(k,null,{default:i(()=>[r(s,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:i(()=>[r(h,{type:"submit",onClick:a[15]||(a[15]=t=>{var e;return(e=n.refForm)==null?void 0:e.validate()})},{default:i(()=>[b(" Save changes ")]),_:1}),r(h,{color:"secondary",variant:"outlined",onClick:S},{default:i(()=>[b(" Back ")]),_:1})]),_:1})]),_:1})])]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1}),r(z,{modelValue:l(c),"onUpdate:modelValue":a[17]||(a[17]=t=>E(c)?c.value=t:null),location:"top center",variant:"flat",color:l(V)},{actions:i(()=>[r(h,{color:"white",onClick:a[16]||(a[16]=t=>c.value=!1)},{default:i(()=>[b(" Close ")]),_:1})]),default:i(()=>[b(P(l(f))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})):Y("",!0)}}};export{ee as default};
