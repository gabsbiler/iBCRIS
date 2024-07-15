import{d as B,l as v,o as g,b as S,w as t,q as a,a1 as R,a6 as M,n as e,aM as G,c as b,F as T,a as D,y as u,$ as F,Y as i,aG as j,r as O,s,a7 as w,P as N,aJ as ee,E as ae,a2 as k,ae as A,af as p,aH as I,U as P,aL as te,V as le,G as ne,aa as J}from"./main-ec2ae718.js";import{_ as oe}from"./AppDateTimePicker.vue_vue_type_style_index_0_lang-f320825f.js";import{V as se}from"./VCombobox-d819739b.js";import"./filter-48dc3dcf.js";const ue=e("h6",{class:"text-h6"},"Age Distribution by Sex",-1),re={class:"mt-5"},de=e("thead",null,[e("th",null,"Age"),e("th",null,[i("Single"),e("br"),i("Male")]),e("th",null,[i("Single"),e("br"),i("Female")]),e("th",null,[i("Married"),e("br"),i("Male")]),e("th",null,[i("Married"),e("br"),i("Female")])],-1),ce=B({__name:"Marital",props:["data"],setup(C){const f=C;return v(!1),(V,y)=>(g(),S(F,null,{default:t(()=>[a(R,{class:"mt-3 d-flex justify-space-between"},{default:t(()=>[ue]),_:1}),a(M,null,{default:t(()=>[e("div",re,[a(G,null,{default:t(()=>[de,e("tbody",null,[(g(!0),b(T,null,D(f.data.countMaritalStatus,c=>(g(),b("tr",null,[e("td",null,u(c.age.from)+"-"+u(c.age.to),1),e("td",null,u(c.singleMale),1),e("td",null,u(c.singleFemale),1),e("td",null,u(c.marriedMale),1),e("td",null,u(c.marriedFemale),1)]))),256))])]),_:1})])]),_:1})]),_:1}))}}),ie=e("h6",{class:"text-h6"},"Age Distribution by Sex",-1),fe=e("thead",null,[e("tr",null,[e("th",null,"Age"),e("th",null,"Male"),e("th",null,"Female"),e("th",null,"Unknown")])],-1),ge=B({__name:"GenderByAge",props:["data"],setup(C){const f=C;return(V,y)=>(g(),S(F,null,{default:t(()=>[a(R,{class:"mt-3 d-flex justify-space-between"},{default:t(()=>[ie]),_:1}),a(M,null,{default:t(()=>[e("div",null,[a(G,null,{default:t(()=>[fe,e("tbody",null,[(g(!0),b(T,null,D(f.data.countGenderByAge,c=>(g(),b("tr",null,[e("td",null,u(c.age.from)+"-"+u(c.age.to),1),e("td",null,u(c.male),1),e("td",null,u(c.female),1),e("td",null,u(c.unknown),1)]))),256))])]),_:1})])]),_:1})]),_:1}))}}),me=e("h6",{class:"text-h6"},"Total Population Collected",-1),pe=e("thead",null,[e("tr",null,[e("th",{class:"text-center"},"Male"),e("th",{class:"text-center"},"Female"),e("th",{class:"text-center"},"Unknown")])],-1),_e=B({__name:"TotalGenderCount",props:["data"],setup(C){const f=C;return(V,y)=>(g(),S(F,{style:{height:"100%"}},{default:t(()=>[a(R,{class:"mt-3 d-flex justify-space-between align-center"},{default:t(()=>[me]),_:1}),a(M,null,{default:t(()=>[e("div",null,[a(G,{class:"text-center"},{default:t(()=>[pe,e("tbody",null,[e("tr",null,[e("td",null,u(f.data.totalCountGender.Male),1),e("td",null,u(f.data.totalCountGender.Female),1),e("td",null,u(f.data.totalCountGender.Unknown),1)])])]),_:1})])]),_:1})]),_:1}))}}),he={class:"d-flex flex-column gap-y-5"},ye=e("div",{class:"d-flex gap-x-3 align-center"},[e("h6",{class:"text-h6"},"Filter")],-1),ve={class:"d-flex gap-x-3 align-center"},be={class:"d-flex justify-space-between"},xe=e("thead",null,[e("th",null,"Age"),e("th",null,"Single"),e("th",null,"Married"),e("th",null,"Consensual"),e("th",null,"Widow"),e("th",null,"Divorced"),e("th",null,"Common Law"),e("th",null,"Legally Separated"),e("th",null,"Unknown")],-1),Se=B({__name:"distribution",setup(C){const f=v(!0),V=v(!1),y=v(),c=v(),h=v(),m=v({dateFrom:new Date(new Date().setFullYear(new Date().getFullYear()-1)),dateTo:new Date,barangay:"",ageRange:[{from:0,to:5},{from:6,to:10},{from:11,to:15},{from:16,to:20},{from:21,to:25},{from:26,to:30},{from:31,to:35},{from:36,to:40}]}),E=v([]),Y=n=>{n>=0&&n<m.value.ageRange.length&&m.value.ageRange.splice(n,1)},q=(n,l)=>{m.value.ageRange.push({from:n,to:l}),m.value.ageRange.sort((o,d)=>o.from-d.from)},z=()=>{h.value=null},H=async()=>{V.value=!0;try{const n=await J.get("/api/reports/generate",{params:m.value});h.value=n.data}catch(n){console.log(n)}V.value=!1,f.value=!1};function W(n){if(!n)return console.error("convertToCSV was called with undefined or null object"),"";const l=[];return l.push("General Information"),l.push(`Date From: ${n.dateFrom}`),l.push(`Date To: ${n.dateTo}`),l.push(`Barangay: ${n.barangay}`),l.push(""),l.push("Age Ranges"),n.ageRange&&Array.isArray(n.ageRange)&&(n.ageRange.forEach(o=>{l.push(`From: ${o.from}, To: ${o.to}`)}),n.totalCountGender&&(l.push("Gender,Count"),Object.entries(n.totalCountGender).forEach(([o,d])=>{l.push(`${o},${d}`)}),l.push("")),n.countGenderByAge&&Array.isArray(n.countGenderByAge)&&(l.push("Age Range,Male,Female,Unknown"),n.countGenderByAge.forEach(o=>{const d=`${o.age.from}-${o.age.to}`;l.push(`${d},${o.male},${o.female},${o.unknown}`)}),l.push("")),n.countMaritalByAge&&Array.isArray(n.countMaritalByAge)&&(l.push("Age Range,Marital Status Counts"),n.countMaritalByAge.forEach(o=>{const d=`${o.age.from}-${o.age.to}`,x=Object.entries(o.status).map(([_,$])=>`${_}: ${$}`).join(", ");l.push(`${d},${x}`)}),l.push("")),n.countMaritalStatus&&Array.isArray(n.countMaritalStatus)&&(l.push("Age Range,Marital Status Detailed Counts"),n.countMaritalStatus.forEach(o=>{const d=`${o.age.from}-${o.age.to}`,x=Object.entries(o).filter(([_])=>_!=="age").map(([_,$])=>`${_}: ${$}`).join(", ");l.push(`${d},${x}`)}),l.push("")),n.countFemaleMaritalStats&&Array.isArray(n.countFemaleMaritalStats)&&(l.push("Age Range,Female Marital Status Counts"),n.countFemaleMaritalStats.forEach(o=>{const d=`${o.age.from}-${o.age.to}`,x=Object.entries(o).filter(([_])=>_!=="age").map(([_,$])=>`${_}: ${$}`).join(", ");l.push(`${d},${x}`)}),l.push(""))),l.join(`
`)}function K(n,l="data.csv"){const o=new Blob([n],{type:"text/csv;charset=utf-8;"}),d=document.createElement("a");d.href=URL.createObjectURL(o),d.setAttribute("download",l),document.body.appendChild(d),d.click(),document.body.removeChild(d)}function U(){const n=W(h.value);K(n,"exportedData.csv")}const L=JSON.parse(localStorage.getItem("userData")),Q=async()=>{try{const n=await J.get("/api/barangays");E.value=n.data.map(l=>l.barangay)}catch(n){console.error("Error fetching data:",n)}};return j(()=>{L.role==="admin"?Q():E.value=[L.barangay]}),(n,l)=>{const o=O("VText"),d=oe,x=O("Button"),_=_e,$=ge,X=ce;return g(),b("div",he,[a(F,null,{default:t(()=>[a(R,{class:"mt-2 ms-1"},{default:t(()=>[i(" Generate Report for Age Distribution per Barangay ")]),_:1}),a(M,null,{default:t(()=>[i(" This module allows you to generate a report for the Age distribution per brgy. Just select the barangay, Date range of reports and compose the age ranges. Defaults ranges are defined already but you can still modify it. The generated reports can also be exported to CSV format ")]),_:1})]),_:1}),a(F,null,{default:t(()=>[a(R,{class:"d-flex justify-space-between align-center",onClick:l[0]||(l[0]=r=>f.value=!s(f))},{default:t(()=>[ye,e("div",ve,[s(f)?N("",!0):(g(),S(w,{key:0,onClick:U,variant:"outlined",disabled:!s(h)},{default:t(()=>[i(" Export Result ")]),_:1},8,["disabled"])),a(w,{icon:s(f)?"mdi-chevron-up":"mdi-chevron-down",variant:"text"},null,8,["icon"])])]),_:1}),a(ee,null,{default:t(()=>[ae(e("div",null,[a(k),a(M,null,{default:t(()=>[a(A,null,{default:t(()=>[a(p,null,{default:t(()=>[a(se,{label:"Selected Barangay",items:s(E),modelValue:s(m).barangay,"onUpdate:modelValue":l[1]||(l[1]=r=>s(m).barangay=r),clearable:""},null,8,["items","modelValue"])]),_:1})]),_:1}),a(k,{class:"my-5"}),a(A,null,{default:t(()=>[a(p,{cols:"12",md:"6"},{default:t(()=>[a(o,null,{default:t(()=>[i("Pick a Date:")]),_:1}),a(A,{class:"mt-1"},{default:t(()=>[a(p,{cols:"6"},{default:t(()=>[a(d,{label:"From",modelValue:s(m).dateFrom,"onUpdate:modelValue":l[2]||(l[2]=r=>s(m).dateFrom=r)},null,8,["modelValue"])]),_:1}),a(p,{cols:"6"},{default:t(()=>[a(d,{label:"To",modelValue:s(m).dateTo,"onUpdate:modelValue":l[3]||(l[3]=r=>s(m).dateTo=r)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),a(k,{vertical:""}),a(p,{cols:"12",md:"6"},{default:t(()=>[a(o,null,{default:t(()=>[i("Select Age:")]),_:1}),a(A,{class:"mt-1"},{default:t(()=>[a(p,null,{default:t(()=>[a(I,{label:"From",modelValue:s(y),"onUpdate:modelValue":l[4]||(l[4]=r=>P(y)?y.value=r:null),type:"number"},null,8,["modelValue"])]),_:1}),a(p,{class:"d-flex flex-row align-center gap-x-4"},{default:t(()=>[a(I,{label:"To",modelValue:s(c),"onUpdate:modelValue":l[5]||(l[5]=r=>P(c)?c.value=r:null),type:"number"},null,8,["modelValue"]),a(w,{icon:"mdi-plus",onClick:l[6]||(l[6]=r=>q(s(y),s(c))),disabled:!(s(y)>0&&s(c)>0)},null,8,["disabled"])]),_:1})]),_:1}),a(A,null,{default:t(()=>[a(p,{class:"gap-x-2"},{default:t(()=>[(g(!0),b(T,null,D(s(m).ageRange,(r,Z)=>(g(),S(te,{color:"primary",class:"mx-1 mt-2"},{default:t(()=>[a(o,null,{default:t(()=>[i(u(r.from)+" - "+u(r.to),1)]),_:2},1024),a(x,{class:"d-flex align-center ms-1",onClick:$e=>Y(Z)},{default:t(()=>[a(le,{icon:"mdi-close",style:{"font-size":"0.9rem !important"}})]),_:2},1032,["onClick"])]),_:2},1024))),256))]),_:1})]),_:1})]),_:1})]),_:1}),a(k,{class:"my-5"}),e("div",be,[a(w,{onClick:U,disabled:!s(h),variant:"outlined"},{default:t(()=>[i(" Export Result ")]),_:1},8,["disabled"]),e("div",null,[a(w,{variant:"text",onClick:z},{default:t(()=>[i(" Clear ")]),_:1}),a(w,{variant:"elevated",onClick:H,loading:s(V),disabled:!(s(m).barangay.length>0)},{default:t(()=>[i(" Generate ")]),_:1},8,["loading","disabled"])])])]),_:1})],512),[[ne,s(f)]])]),_:1})]),_:1}),s(h)?(g(),S(A,{key:0},{default:t(()=>[a(p,{cols:"12",md:"6"},{default:t(()=>[a(_,{data:s(h)},null,8,["data"])]),_:1}),a(p,{cols:"12",md:"6"},{default:t(()=>[a($,{data:s(h)},null,8,["data"])]),_:1}),a(p,{cols:"12"},{default:t(()=>[a(F,{title:"Age Distribution by Marital Status"},{default:t(()=>[a(M,null,{default:t(()=>[a(G,null,{default:t(()=>[xe,e("tbody",null,[(g(!0),b(T,null,D(s(h).countMaritalByAge,r=>(g(),b("tr",null,[e("td",null,u(r.age.from)+"-"+u(r.age.to),1),e("td",null,u(r.status.single),1),e("td",null,u(r.status.married),1),e("td",null,u(r.status.consensual),1),e("td",null,u(r.status.widow),1),e("td",null,u(r.status.divorced),1),e("td",null,u(r.status.commonLaw),1),e("td",null,u(r.status.legallySeparated),1),e("td",null,u(r.status.unknown),1)]))),256))])]),_:1})]),_:1})]),_:1})]),_:1}),a(p,{cols:"12"},{default:t(()=>[a(X,{data:s(h)},null,8,["data"])]),_:1})]),_:1})):N("",!0)])}}});export{Se as default};