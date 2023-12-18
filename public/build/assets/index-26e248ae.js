import{d as z,r as B,o as x,b as P,w as a,p as e,V as U,k as u,a0 as C,at as E,au as F,R as p,U as T,Z as K,$ as R,q as t,Q as i,av as q,x as w,m as y,as as G,c as Y}from"./main-4a305e5b.js";import{a as D}from"./axios-d87e70fd.js";import{V as Q}from"./VForm-fce6d192.js";import{V as Z,a as c}from"./VRow-9020e6a9.js";import{V as W}from"./VSelect-c551eedb.js";import{V as v}from"./VTextField-3d54f6b0.js";import{V as L}from"./VSpacer-6c87578e.js";import{V as M}from"./VSnackbar-2745a5f1.js";import{V as j}from"./VDialog-f55c9a38.js";import{V as J}from"./VDataTable-d0269d98.js";import{V as X}from"./VChip-6f184fc2.js";import"./VCounter-d47b1182.js";import"./forwardRefs-9d31fcaa.js";import"./VList-8ef07325.js";import"./ssrBoot-ed7507ec.js";import"./VDivider-f3cf817d.js";import"./dialog-transition-92d1a0d6.js";import"./VMenu-1f398e1c.js";import"./VOverlay-f2e6ad7c.js";import"./VCheckboxBtn-14eb57ab.js";import"./VTable-cc495d9a.js";const ee=z({__name:"DialogCloseBtn",props:{icon:{default:"mdi-close"},iconSize:{default:"24"}},setup(N){const f=N;return(I,V)=>{const r=B("IconBtn");return x(),P(r,{class:"v-dialog-close-btn"},{default:a(()=>[e(U,{icon:f.icon,size:f.iconSize},null,8,["icon","size"])]),_:1})}}}),ae=y("h1",{class:"text-subtitle-1 mb-1"},[y("b",null,"Geographic Identification")],-1),le=y("hr",{class:"my-5",style:{opacity:"0.3"}},null,-1),oe=y("h1",{class:"text-subtitle-1 mb-1"},[y("b",null,"Head of Household")],-1),se={__name:"AddHouseholdDialog",emits:["snackbar","refreshTable"],setup(N,{emit:f}){const I=["Alitao","Alupay","Angeles Zone I (Pob.)","Angeles Zone II","Angeles Zone III","Angeles Zone IV","Angustias Zone I (Pob.)","Angustias Zone II","Angustias Zone III,","Angustias Zone IV","Anos","Ayaas","Baguio","Banilad","Calantas","Camaysa","Dapdap","Gibanga","Alsam Ibaba","Bukal Ibaba","Ilasan Ibaba","Nangka Ibaba","Palale Ibaba","Ibas","Alsam Ilaya","Bukal Ilaya","Ilasan Ilaya","Nangka Ilaya","Palale Ilaya","Ipilan","Isabang","Calumpang","Domoit Kanluran","Katigan Kanluran","Palale Kanluran","Lakawan","Lalo","Lawigue","Lita (Pob.)","Malaoa","Masin","Mate","Mateuna","Mayowe","Opias","Pandakaki","Pook","Potol","San Diego Zone I (Pob.)","San Diego Zone II","San Diego Zone III","San Diego Zone IV","San Isidro Zone I (Pob.)","San Isidro Zone II","San Isidro Zone III","San Isidro Zone IV","San Roque Zone I (Pob.)","San Roque Zone II","Domoit Silangan","Katigan Silangan","Palale Silangan","Talolong","Tamlong","Tongko","Valencia","Wakas"],V=u(),r=u(),S=u(),b=u(),g=u(),h=u(),n=u(),d=u(),_=u(),H=u(),A=u(),s=u(!1),m=async()=>{const k={barangay:V.value,sitio:r.value,husn:S.value,bsn:b.value,hsn:g.value,address:h.value,lastname:n.value,firstname:d.value,middlename:_.value};console.log(k),D.post("/api/addHousehold?",k).then(l=>{$(),f("snackbar",{message:l.data.message,type:"success"}),f("refreshTable")}).catch(l=>{f("snackbar",{message:l,type:"error"})})},$=()=>{V.value=null,r.value="",S.value="",b.value="",g.value="",h.value="",n.value="",d.value="",_.value="",s.value=!1};return(k,l)=>{const O=ee;return x(),P(j,{modelValue:t(s),"onUpdate:modelValue":l[13]||(l[13]=o=>i(s)?s.value=o:null),"max-width":"600"},{activator:a(({props:o})=>[e(C,E(F(o)),{default:a(()=>[p(" Add Household ")]),_:2},1040)]),default:a(()=>[e(T,{title:"Add Household Record"},{default:a(()=>[e(O,{variant:"text",size:"small",onClick:l[0]||(l[0]=o=>s.value=!1)}),e(Q,{ref:"refForm",onSubmit:K(()=>{},["prevent"])},{default:a(()=>[e(R,{class:"px-4 pt-0"},{default:a(()=>[ae,e(Z,null,{default:a(()=>[e(c,{cols:"12",md:"6"},{default:a(()=>[e(W,{modelValue:t(V),"onUpdate:modelValue":l[1]||(l[1]=o=>i(V)?V.value=o:null),items:I,label:"Select Baranggay"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(r),"onUpdate:modelValue":l[2]||(l[2]=o=>i(r)?r.value=o:null),label:"Sitio/Purok"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(S),"onUpdate:modelValue":l[3]||(l[3]=o=>i(S)?S.value=o:null),label:"Housing Unit Serial Number (HUSN)"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(b),"onUpdate:modelValue":l[4]||(l[4]=o=>i(b)?b.value=o:null),label:"Building Serial Number (BSN)"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(g),"onUpdate:modelValue":l[5]||(l[5]=o=>i(g)?g.value=o:null),label:"Household Serial Number (HSN)"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(h),"onUpdate:modelValue":l[6]||(l[6]=o=>i(h)?h.value=o:null),label:"Address(House No., Street, Zone)"},null,8,["modelValue"])]),_:1})]),_:1}),le,oe,e(Z,null,{default:a(()=>[e(c,{cols:"12"},{default:a(()=>[e(v,{modelValue:t(n),"onUpdate:modelValue":l[7]||(l[7]=o=>i(n)?n.value=o:null),label:"Lastname"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(d),"onUpdate:modelValue":l[8]||(l[8]=o=>i(d)?d.value=o:null),label:"Firstname"},null,8,["modelValue"])]),_:1}),e(c,{cols:"12",md:"6"},{default:a(()=>[e(v,{modelValue:t(_),"onUpdate:modelValue":l[9]||(l[9]=o=>i(_)?_.value=o:null),label:"Middlename"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(q,null,{default:a(()=>[e(L),e(C,{color:"error",onClick:l[10]||(l[10]=o=>s.value=!1)},{default:a(()=>[p(" Close ")]),_:1}),e(C,{color:"success",onClick:m},{default:a(()=>[p(" Save ")]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1}),e(M,{modelValue:k.isSnackbarSuccessVisible,"onUpdate:modelValue":l[12]||(l[12]=o=>k.isSnackbarSuccessVisible=o),location:"top center",variant:"flat",color:t(A)},{actions:a(()=>[e(C,{color:"white",onClick:l[11]||(l[11]=o=>k.isSnackbarSuccessVisible=!1)},{default:a(()=>[p(" Close ")]),_:1})]),default:a(()=>[p(w(t(H))+" ",1)]),_:1},8,["modelValue","color"])]),_:1},8,["modelValue"])}}},te=y("h1",{class:"text-h6"}," Household List ",-1),ne={class:"d-flex px-auto gap-1"},Ne={__name:"index",setup(N){const f=u(),I=u(!1),V=u(),r=u(),S=[{title:"BRGY/PUROK/SITIO",key:"Barangay"},{title:"BSN",key:"BSN"},{title:"HUSN",key:"HUSN"},{title:"HSN",key:"HSN"},{title:"HEAD OF HOUSEHOLD",key:"Head.Lastname"},{title:"COUNT",key:"Count"},{title:"SURVEY STATUS",key:"surveyStatus"},{title:"ACTION",key:"actions"}],b=n=>{V.value=n.message,r.value=n.type,I.value=!0};async function g(){try{const n=await D.get("/api/household");f.value=n.data}catch(n){console.error("Error fetching data:",n)}}const h=async n=>{try{const d=await D.delete("/api/households",{data:{household_id:n}});b({message:"Household successfully deleted",type:"success"}),g()}catch(d){console.error("Error deleting household:",d),b({message:"Error deleting household",type:"error"})}};return G(()=>{g()}),(n,d)=>{const _=se,H=B("IconBtn"),A=B("RouterLink");return x(),Y("section",null,[e(T,null,{default:a(()=>[e(R,{class:"d-flex flex-wrap gap-4"},{default:a(()=>[e(Z,null,{default:a(()=>[e(c,{class:"d-flex align-middle"},{default:a(()=>[te,e(L),e(_,{onSnackbar:b,onRefreshTable:g})]),_:1})]),_:1}),e(t(J),{class:"mt-3",headers:S,items:t(f),search:n.search},{"item.Count":a(({item:s})=>[p(w(s.raw.household_members.length),1)]),"item.Head.Lastname":a(({item:s})=>[p(w(s.raw.household_members.find(m=>m.head==1)?s.raw.household_members.find(m=>m.head==1).demographic.lastname+", "+s.raw.household_members.find(m=>m.head==1).demographic.firstname+" "+s.raw.household_members.find(m=>m.head==1).demographic.middlename:"No Assigned Head"),1)]),"item.surveyStatus":a(({item:s})=>[e(X,{color:s.raw.surveyStatus?"success":"error",class:"font-weight-medium",size:"small"},{default:a(()=>[p(w(s.raw.surveyStatus?"Complete":"Not Completed"),1)]),_:2},1032,["color"])]),"item.actions":a(({item:s})=>[y("div",ne,[e(H,{onClick:m=>h(s.raw.id)},{default:a(()=>[e(U,{icon:"mdi-delete-outline"})]),_:2},1032,["onClick"]),e(H,null,{default:a(()=>[e(A,{to:{name:"household-view-id",params:{id:s.raw.id},query:{household_id:s.raw.id}}},{default:a(()=>[e(U,{icon:`
                mdi-information-slab-circle-outline`})]),_:2},1032,["to"])]),_:2},1024)])]),_:1},8,["items","search"])]),_:1}),e(M,{modelValue:t(I),"onUpdate:modelValue":d[1]||(d[1]=s=>i(I)?I.value=s:null),location:"top center",variant:"flat",color:t(r)},{actions:a(()=>[e(C,{color:"white",onClick:d[0]||(d[0]=s=>I.value=!1)},{default:a(()=>[p(" Close ")]),_:1})]),default:a(()=>[p(w(t(V))+" ",1)]),_:1},8,["modelValue","color"])]),_:1})])}}};export{Ne as default};