import{_ as we}from"./ConfirmDialog.vue_vue_type_script_setup_true_lang-33112e47.js";import{_ as be}from"./SnackBar.vue_vue_type_script_setup_true_lang-1315b352.js";import{ah as Ve,b_ as ke,b7 as Se,b8 as Ce,ak as De,bT as Be,Z as ne,l as g,aG as pe,C as Q,b$ as Ne,an as He,ba as Fe,bb as ce,bc as Me,q as e,be as Ie,H as ie,F as J,E as me,bM as Ue,c0 as Re,bV as Pe,ap as Te,aS as ue,bW as $e,bj as Ae,bF as ze,d as he,B as _e,o as h,c as v,w as a,Y as d,a7 as z,s as l,b as ae,$ as te,a6 as L,ae as W,af as k,aH as A,aW as Ee,P as b,U as Z,aa as $,k as je,r as re,aq as qe,n as S,y as w,aI as Ge,V as ee,a as fe,aL as G}from"./main-27bf03b5.js";import{V as Le}from"./VDialog-ca11cea5.js";import{V as ge}from"./VDataTable-069e871b.js";import{V as Ye}from"./VSnackbar-45528893.js";import"./filter-85954aca.js";const Ke=Ve()({name:"VTextarea",directives:{Intersect:ke},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:o=>!isNaN(parseFloat(o))},maxRows:{type:[Number,String],validator:o=>!isNaN(parseFloat(o))},suffix:String,modelModifiers:Object,...Se(),...Ce()},emits:{"click:control":o=>!0,"mousedown:control":o=>!0,"update:focused":o=>!0,"update:modelValue":o=>!0},setup(o,H){let{attrs:E,emit:n,slots:u}=H;const _=De(o,"modelValue"),{isFocused:V,focus:F,blur:D}=Be(o),I=ne(()=>typeof o.counterValue=="function"?o.counterValue(_.value):(_.value||"").toString().length),B=ne(()=>{if(E.maxlength)return E.maxlength;if(!(!o.counter||typeof o.counter!="number"&&typeof o.counter!="string"))return o.counter});function c(m,s){var i,p;!o.autofocus||!m||(p=(i=s[0].target)==null?void 0:i.focus)==null||p.call(i)}const U=g(),r=g(),Y=g(""),j=g(),X=ne(()=>V.value||o.persistentPlaceholder);function N(){var m;j.value!==document.activeElement&&((m=j.value)==null||m.focus()),V.value||F()}function K(m){N(),n("click:control",m)}function le(m){n("mousedown:control",m)}function oe(m){m.stopPropagation(),N(),ue(()=>{_.value="",$e(o["onClick:clear"],m)})}function se(m){var i;const s=m.target;if(_.value=s.value,(i=o.modelModifiers)!=null&&i.trim){const p=[s.selectionStart,s.selectionEnd];ue(()=>{s.selectionStart=p[0],s.selectionEnd=p[1]})}}const R=g();function M(){o.autoGrow&&ue(()=>{if(!R.value||!r.value)return;const m=getComputedStyle(R.value),s=getComputedStyle(r.value.$el),i=parseFloat(m.getPropertyValue("--v-field-padding-top"))+parseFloat(m.getPropertyValue("--v-input-padding-top"))+parseFloat(m.getPropertyValue("--v-field-padding-bottom")),p=R.value.scrollHeight,O=parseFloat(m.lineHeight),q=Math.max(parseFloat(o.rows)*O+i,parseFloat(s.getPropertyValue("--v-input-control-height"))),P=parseFloat(o.maxRows)*O+i||1/0;Y.value=Ae(ze(p??0,q,P))})}pe(M),Q(_,M),Q(()=>o.rows,M),Q(()=>o.maxRows,M),Q(()=>o.density,M);let C;return Q(R,m=>{m?(C=new ResizeObserver(M),C.observe(R.value)):C==null||C.disconnect()}),Ne(()=>{C==null||C.disconnect()}),He(()=>{const m=!!(u.counter||o.counter||o.counterValue),s=!!(m||u.details),[i,p]=Fe(E),[{modelValue:O,...q}]=ce.filterProps(o),[P]=Me(o);return e(ce,ie({ref:U,modelValue:_.value,"onUpdate:modelValue":T=>_.value=T,class:["v-textarea v-text-field",{"v-textarea--prefixed":o.prefix,"v-textarea--suffixed":o.suffix,"v-text-field--prefixed":o.prefix,"v-text-field--suffixed":o.suffix,"v-textarea--auto-grow":o.autoGrow,"v-textarea--no-resize":o.noResize||o.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(o.variant)},o.class],style:o.style},i,q,{focused:V.value}),{...u,default:T=>{let{isDisabled:t,isDirty:f,isReadonly:y,isValid:x}=T;return e(Ie,ie({ref:r,style:{"--v-textarea-control-height":Y.value},onClick:K,onMousedown:le,"onClick:clear":oe,"onClick:prependInner":o["onClick:prependInner"],"onClick:appendInner":o["onClick:appendInner"],role:"textbox"},P,{active:X.value||f.value,dirty:f.value||o.dirty,disabled:t.value,focused:V.value,error:x.value===!1}),{...u,default:ve=>{let{props:{class:de,...ye}}=ve;return e(J,null,[o.prefix&&e("span",{class:"v-text-field__prefix"},[o.prefix]),me(e("textarea",ie({ref:j,class:de,value:_.value,onInput:se,autofocus:o.autofocus,readonly:y.value,disabled:t.value,placeholder:o.placeholder,rows:o.rows,name:o.name,onFocus:N,onBlur:D},ye,p),null),[[Ue("intersect"),{handler:c},null,{once:!0}]]),o.autoGrow&&me(e("textarea",{class:[de,"v-textarea__sizer"],"onUpdate:modelValue":xe=>_.value=xe,ref:R,readonly:!0,"aria-hidden":"true"},null),[[Re,_.value]]),o.suffix&&e("span",{class:"v-text-field__suffix"},[o.suffix])])}})},details:s?T=>{var t;return e(J,null,[(t=u.details)==null?void 0:t.call(u,T),m&&e(J,null,[e("span",null,null),e(Pe,{active:o.persistentCounter||V.value,value:I.value,max:B.value},u.counter)])])}:void 0})}),Te({},U,r,j)}}),Oe=he({__name:"EditHouseholdDialog",props:["householdData"],emits:["finish"],setup(o,{emit:H}){const E=o,n=g(!1),u=g(),_=g(),V=g(!1),F=_e(),D=()=>{n.value=!0,u.value={...E.householdData}},I=async()=>{V.value=!0;try{const B=await $.put(`/api/household/${F.query.household_id}`,{barangay:u.value.Barangay,sitio:u.value.sitio,husn:u.value.HUSN,bsn:u.value.BSN,hsn:u.value.HSN,address:u.value.address});H("finish"),_.value.show("success",B.data.message)}catch(B){_.value.show("error",B)}n.value=!1,V.value=!1};return(B,c)=>{const U=be;return h(),v("div",null,[e(U,{ref_key:"SnackBarRef",ref:_},null,512),e(z,{onClick:D,block:""},{default:a(()=>[d("Edit")]),_:1}),e(Le,{modelValue:l(n),"onUpdate:modelValue":c[8]||(c[8]=r=>Z(n)?n.value=r:null),"max-width":"800"},{default:a(()=>[l(u)?(h(),ae(te,{key:0,title:"Edit Household"},{default:a(()=>[e(L,null,{default:a(()=>[e(W,null,{default:a(()=>[e(k,{cols:"12"},{default:a(()=>[e(A,{label:"Household Key",disabled:"",modelValue:l(u).HouseholdKey,"onUpdate:modelValue":c[0]||(c[0]=r=>l(u).HouseholdKey=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12",md:"4"},{default:a(()=>[e(A,{label:"HSN",modelValue:l(u).HSN,"onUpdate:modelValue":c[1]||(c[1]=r=>l(u).HSN=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12",md:"4"},{default:a(()=>[e(A,{label:"BSN",modelValue:l(u).BSN,"onUpdate:modelValue":c[2]||(c[2]=r=>l(u).BSN=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12",md:"4"},{default:a(()=>[e(A,{label:"HUSN",modelValue:l(u).HUSN,"onUpdate:modelValue":c[3]||(c[3]=r=>l(u).HUSN=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12",md:"4"},{default:a(()=>[e(A,{label:"Baranggay",modelValue:l(u).Barangay,"onUpdate:modelValue":c[4]||(c[4]=r=>l(u).Barangay=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12",md:"4"},{default:a(()=>[e(A,{label:"Sitio",modelValue:l(u).sitio,"onUpdate:modelValue":c[5]||(c[5]=r=>l(u).sitio=r)},null,8,["modelValue"])]),_:1}),e(k,{cols:"12"},{default:a(()=>[e(Ke,{label:"Address",modelValue:l(u).address,"onUpdate:modelValue":c[6]||(c[6]=r=>l(u).address=r)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(Ee,{class:"d-flex justify-end"},{default:a(()=>[e(z,{onClick:c[7]||(c[7]=r=>n.value=!1)},{default:a(()=>[d(" Cancel ")]),_:1}),e(z,{variant:"elevated",onClick:I,loading:l(V)},{default:a(()=>[d(" Save ")]),_:1},8,["loading"])]),_:1})]),_:1})):b("",!0)]),_:1},8,["modelValue"])])}}}),Qe="/build/assets/background-1-ceba94e3.jpg",We={class:"user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0"},Ze={class:"d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4"},Je={class:"d-flex gap-x-5"},Xe={key:0,class:"d-flex align-center"},ea={key:1,class:"d-flex align-center"},aa={key:2,class:"d-flex align-center"},ta={key:3,class:"d-flex align-center"},la={key:4,class:"d-flex align-center"},oa={key:0,class:"d-flex"},sa={class:"d-flex px-auto gap-1"},na={key:0},ia={key:1},ua={key:2},ra=S("div",{class:"text-h6"}," Deceased Members ",-1),da={class:"d-flex px-auto gap-1"},ca={key:0},ma={key:1},fa={key:2},wa=he({__name:"[id]",setup(o){const H=_e(),E=je(),n=g(),u=g();g(97);const _=g(),V=g(),F=g(),D=g([]),I=g(!1),B=g(!1),c=g(!1),U=g(null),r=g(!1),Y=g(),j=g(),X=g(),N=s=>{Y.value=s.message,j.value=s.type,r.value=!0};async function K(){try{const s=H.params.id,i=await $.get("/api/household-list",{params:{id:H.query.household_id}});n.value=i.data,F.value=n.value.household_container.id,X.value=n.value.household_members.filter(p=>{if(p.demographic.tags=="dead")return p}).length}catch(s){console.log(s)}try{const s=await $.get("/api/container");u.value=s.data}catch(s){console.error(s)}}async function le(){try{const s=await $.get("/api/lookup/");D.value=s.data}catch(s){console.error("Error fetching lookups:",s)}}const oe=async()=>{I.value=!0;try{const s=await $.put(`/api/household/${H.query.household_id}/update-container`,{container_id:F.value});N({message:s.data.message,type:"success"}),I.value=!1}catch(s){N({message:s,type:"error"}),I.value=!1}};async function se(){try{const s=await $.post("/api/addMember",{household_id:H.query.household_id});E.push("/household/member/demographics?member_id="+s.data.household_member_id+"&household_id="+H.query.household_id)}catch(s){console.log(s)}}const R=async()=>{try{await $.delete("/api/household/member",{data:{household_member_id:U.value}}),N({message:"Household member successfully deleted",type:"success"}),K()}catch(s){N({message:s.response.data.message,type:"warning"})}U.value=null,c.value=!1},M=s=>{U.value=s,c.value=!0},C=[{title:"Full Name",key:"name"},{title:"Relationship",key:"demographic.relationship"},{title:"Sex",key:"demographic.sex"},{title:"Age",key:"demographic.age"},{title:"Status",key:"demographic.tags"},{title:"Action",key:"actions"}];pe(()=>{K(),le()});const m=async(s,i)=>{try{const p=await $.put("/api/household/survey-status",{household_id:s,surveyStatus:!i});N({message:p.data.message,type:"success"}),n.value.surveyStatus=!i}catch(p){N({message:p.response.data.message,type:"error"})}};return(s,i)=>{const p=re("VText"),O=Oe,q=we,P=re("IconBtn"),T=re("RouterLink");return h(),v("section",null,[l(n)&&l(D)?(h(),ae(te,{key:0},{default:a(()=>[e(qe,{src:l(Qe),"min-height":"125","max-height":"175",cover:""},null,8,["src"]),e(L,{class:"d-flex align-bottom flex-sm-row flex-column justify-center gap-x-4",style:{"min-height":"125px"}},{default:a(()=>[S("div",We,[S("div",Ze,[e(W,null,{default:a(()=>[e(k,{cols:"12",sm:"8",class:"d-flex flex-column"},{default:a(()=>[S("div",Je,[l(n).Barangay?(h(),v("span",Xe,[e(p,null,{default:a(()=>[d("Brgy: "),S("b",null,w(l(n).Barangay),1)]),_:1})])):b("",!0),l(n).sitio?(h(),v("span",ea,[e(p,null,{default:a(()=>[d("Purok/Sitio: "),S("b",null,w(l(n).sitio),1)]),_:1})])):b("",!0),l(n).BSN?(h(),v("span",aa,[e(p,null,{default:a(()=>[d("BSN: "),S("b",null,w(l(n).BSN),1)]),_:1})])):b("",!0),l(n).HUSN?(h(),v("span",ta,[e(p,null,{default:a(()=>[d("HUSN: "),S("b",null,w(l(n).HUSN),1)]),_:1})])):b("",!0),l(n).HSN?(h(),v("span",la,[e(p,null,{default:a(()=>[d("HSN: "),S("b",null,w(l(n).HSN),1)]),_:1})])):b("",!0)]),l(n).address?(h(),v("div",oa,[e(p,null,{default:a(()=>[d("Complete Address: "),S("b",null,w(l(n).address),1)]),_:1})])):b("",!0)]),_:1}),e(k,{class:"d-flex flex-column gap-y-2",cols:"12",sm:"4"},{default:a(()=>[e(W,null,{default:a(()=>[e(k,null,{default:a(()=>[e(Ge,{modelValue:l(F),"onUpdate:modelValue":[i[0]||(i[0]=t=>Z(F)?F.value=t:null),oe],items:l(u),"item-title":"name","item-value":"id",density:"compact",label:"Record Batch",loading:l(I)},null,8,["modelValue","items","loading"])]),_:1}),e(k,null,{default:a(()=>[e(O,{"household-data":l(n),onFinish:K},null,8,["household-data"])]),_:1})]),_:1}),e(z,{onClick:i[1]||(i[1]=()=>{m(l(n).id,l(n).surveyStatus)}),color:l(n).surveyStatus?"success":"warning"},{default:a(()=>[d(w(l(n).surveyStatus?"Completed":"Mark as Complete"),1)]),_:1},8,["color"])]),_:1})]),_:1})])])]),_:1})]),_:1})):b("",!0),l(n)?(h(),ae(te,{key:1,class:"mt-3"},{default:a(()=>[e(L,null,{default:a(()=>[e(W,null,{default:a(()=>[e(k,{class:"d-flex gap-x-3"},{default:a(()=>[e(z,{color:"primary",onClick:i[2]||(i[2]=t=>B.value=!0)},{default:a(()=>[d(" Add Member ")]),_:1})]),_:1}),e(k,{class:"d-flex justify-end"},{default:a(()=>[e(A,{modelValue:l(_),"onUpdate:modelValue":i[3]||(i[3]=t=>Z(_)?_.value=t:null),density:"compact",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":"",dense:"",outlined:"",style:{"max-width":"20rem"}},null,8,["modelValue"])]),_:1}),e(q,{isDialogVisible:l(B),confirmationQuestion:"Add another member?",onConfirm:se,onCancel:i[4]||(i[4]=t=>B.value=!1)},null,8,["isDialogVisible"]),e(z,{class:"me-3 my-3 d-md-none",color:"primary",icon:"mdi-plus"})]),_:1})]),_:1}),e(L,null,{default:a(()=>[e(l(ge),{headers:C,items:l(n).household_members.filter(t=>{if(t.demographic.tags=="alive")return t}),search:l(_)},{"item.actions":a(({item:t})=>[S("div",sa,[e(P,{onClick:f=>M(t.raw.id)},{default:a(()=>[e(ee,{icon:"mdi-delete-outline"})]),_:2},1032,["onClick"]),e(P,null,{default:a(()=>[e(T,{to:{name:"household-member-tab",params:{tab:"demographics"},query:{member_id:t.raw.id,household_id:t.raw.household_id}}},{default:a(()=>[e(ee,{icon:`
                  mdi-information-slab-circle-outline`})]),_:2},1032,["to"])]),_:2},1024)])]),"item.name":a(({item:t})=>[d(w(t.raw.demographic.lastname+", "+t.raw.demographic.firstname+" "+t.raw.demographic.middlename),1)]),"item.demographic.relationship":a(({item:t})=>{var f,y;return[d(w(((y=(f=l(D).filter(x=>x.column_number==="3")[0])==null?void 0:f.lookup_list.filter(x=>x.lookup_key===t.raw.demographic._3)[0])==null?void 0:y.description)||"Not Specified"),1)]}),"item.demographic.sex":a(({item:t})=>{var f,y;return[d(w(((y=(f=l(D).filter(x=>x.column_number==="5")[0])==null?void 0:f.lookup_list.filter(x=>x.lookup_key===t.raw.demographic._5)[0])==null?void 0:y.description)||"Not Specified"),1)]}),"item.demographic.age":a(({item:t})=>[d(w(new Date().getFullYear()-new Date(t.raw.demographic._6).getFullYear()-(new Date().getMonth()<new Date(t.raw.demographic._6).getMonth()||new Date().getMonth()===new Date(t.raw.demographic._6).getMonth()&&new Date().getDate()<new Date(t.raw.demographic._6).getDate()?1:0)),1)]),"item.demographic.tags":a(({item:t})=>[(h(!0),v(J,null,fe(t.raw.demographic.tags.split(","),(f,y)=>(h(),v("span",{key:y},[f.trim()=="alive"?(h(),v("span",na,[e(G,{color:"success",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Alive ")]),_:1})])):b("",!0),f.trim()=="teenage_pregnancy"?(h(),v("span",ia,[e(G,{color:"gray",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Teenage Pregnancy ")]),_:1})])):b("",!0),f.trim()=="dead"?(h(),v("span",ua,[e(G,{color:"error",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Deceased ")]),_:1})])):b("",!0)]))),128))]),_:1},8,["items","search"])]),_:1})]),_:1})):b("",!0),l(n)&&l(X)>0?(h(),ae(te,{key:2,class:"mt-3"},{default:a(()=>[e(L,null,{default:a(()=>[e(W,null,{default:a(()=>[e(k,{class:"d-flex justify-space-between"},{default:a(()=>[ra,e(A,{modelValue:l(V),"onUpdate:modelValue":i[5]||(i[5]=t=>Z(V)?V.value=t:null),density:"compact",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":"",dense:"",outlined:"",style:{"max-width":"20rem"}},null,8,["modelValue"])]),_:1}),e(z,{class:"me-3 my-3 d-md-none",color:"primary",icon:"mdi-plus"})]),_:1})]),_:1}),e(L,null,{default:a(()=>[e(l(ge),{headers:C,items:l(n).household_members.filter(t=>{if(t.demographic.tags=="dead")return t}),search:l(V)},{"item.actions":a(({item:t})=>[S("div",da,[e(P,{onClick:f=>M(t.raw.id)},{default:a(()=>[e(ee,{icon:"mdi-delete-outline"})]),_:2},1032,["onClick"]),e(P,null,{default:a(()=>[e(T,{to:{name:"household-member-tab",params:{tab:"demographics"},query:{member_id:t.raw.id,household_id:t.raw.household_id}}},{default:a(()=>[e(ee,{icon:`
                  mdi-information-slab-circle-outline`})]),_:2},1032,["to"])]),_:2},1024)])]),"item.name":a(({item:t})=>[d(w(t.raw.demographic.lastname+", "+t.raw.demographic.firstname+" "+t.raw.demographic.middlename),1)]),"item.demographic.relationship":a(({item:t})=>{var f,y;return[d(w(((y=(f=l(D).filter(x=>x.column_number==="3")[0])==null?void 0:f.lookup_list.filter(x=>x.lookup_key===t.raw.demographic._3)[0])==null?void 0:y.description)||"Not Specified"),1)]}),"item.demographic.sex":a(({item:t})=>{var f,y;return[d(w(((y=(f=l(D).filter(x=>x.column_number==="5")[0])==null?void 0:f.lookup_list.filter(x=>x.lookup_key===t.raw.demographic._5)[0])==null?void 0:y.description)||"Not Specified"),1)]}),"item.demographic.age":a(({item:t})=>[d(w(new Date().getFullYear()-new Date(t.raw.demographic._6).getFullYear()-(new Date().getMonth()<new Date(t.raw.demographic._6).getMonth()||new Date().getMonth()===new Date(t.raw.demographic._6).getMonth()&&new Date().getDate()<new Date(t.raw.demographic._6).getDate()?1:0)),1)]),"item.demographic.tags":a(({item:t})=>[(h(!0),v(J,null,fe(t.raw.demographic.tags.split(","),(f,y)=>(h(),v("span",{key:y},[f.trim()=="alive"?(h(),v("span",ca,[e(G,{color:"success",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Alive ")]),_:1})])):b("",!0),f.trim()=="teenage_pregnancy"?(h(),v("span",ma,[e(G,{color:"gray",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Teenage Pregnancy ")]),_:1})])):b("",!0),f.trim()=="dead"?(h(),v("span",fa,[e(G,{color:"error",class:"font-weight-medium",size:"small"},{default:a(()=>[d(" Deceased ")]),_:1})])):b("",!0)]))),128))]),_:1},8,["items","search"])]),_:1})]),_:1})):b("",!0),e(q,{isDialogVisible:l(c),confirmationQuestion:"This will be deleted permanently. Are you sure?",onConfirm:R,onCancel:i[6]||(i[6]=t=>c.value=!1)},null,8,["isDialogVisible"]),e(Ye,{modelValue:l(r),"onUpdate:modelValue":i[8]||(i[8]=t=>Z(r)?r.value=t:null),location:"top center",variant:"flat",color:l(j)},{actions:a(()=>[e(z,{color:"white",onClick:i[7]||(i[7]=t=>r.value=!1)},{default:a(()=>[d(" Close ")]),_:1})]),default:a(()=>[d(w(l(Y))+" ",1)]),_:1},8,["modelValue","color"])])}}});export{wa as default};
