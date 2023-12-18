import{d as E,bu as j,k as g,bv as f,B,a1 as O,r as q,o as r,b as y,w as t,p as a,U as X,$ as w,q as l,Q as G,bw as R,m as o,V as u,D,c as d,F as v,a as x,R as A,x as b,n as $,E as I,O as L,a3 as H,a4 as J,P as W}from"./main-4a305e5b.js";import{P as Y}from"./vue3-perfect-scrollbar.esm-8bcc75eb.js";import{V as Z}from"./VTextField-3d54f6b0.js";import{V as ee}from"./VDivider-f3cf817d.js";import{V as Q,d as se,a as K,b as te}from"./VList-8ef07325.js";import{V as ae,a as le}from"./VRow-9020e6a9.js";import{V as re}from"./VDialog-f55c9a38.js";import"./VCounter-d47b1182.js";import"./forwardRefs-9d31fcaa.js";import"./ssrBoot-ed7507ec.js";import"./VOverlay-f2e6ad7c.js";import"./dialog-transition-92d1a0d6.js";const z=m=>(H("data-v-6b387c92"),m=m(),J(),m),oe={class:"d-flex align-center text-high-emphasis me-1"},ie={class:"d-flex align-center"},ne={class:"h-100"},ce={class:"text-xs text-disabled text-uppercase"},ue={class:"h-100"},de={class:"app-bar-search-suggestions d-flex flex-column align-center justify-center text-high-emphasis h-100"},pe={class:"d-flex align-center flex-wrap justify-center gap-2 text-h6 my-3"},he=z(()=>o("span",null,"No Result For ",-1)),fe={key:0,class:"mt-8"},me=z(()=>o("span",{class:"d-flex justify-center text-disabled"},"Try searching for",-1)),_e=["onClick"],ge={class:"text-sm"},ye=E({__name:"AppBarSearch",props:{isDialogVisible:{type:Boolean},searchQuery:{},searchResults:{},suggestions:{},noDataSuggestion:{}},emits:["update:isDialogVisible","update:searchQuery","itemSelected"],setup(m,{emit:_}){const i=m,{ctrl_k:F,meta_k:T}=j({passive:!1,onEventFired(e){e.ctrlKey&&e.key==="k"&&e.type==="keydown"&&e.preventDefault()}}),S=g(),n=g(structuredClone(f(i.searchQuery))),U=g(),C=g(structuredClone(f(i.isDialogVisible))),p=g(structuredClone(f(i.searchResults)));B(i,()=>{C.value=structuredClone(f(i.isDialogVisible)),p.value=structuredClone(f(i.searchResults)),n.value=structuredClone(f(i.searchQuery))}),B([F,T],()=>{C.value=!0,_("update:isDialogVisible",!0)});const V=()=>{_("update:isDialogVisible",!1),_("update:searchQuery","")};O(()=>{n.value.length||(p.value=[])});const P=e=>{var c,k;e.key==="ArrowDown"?(e.preventDefault(),(c=S.value)==null||c.focus("next")):e.key==="ArrowUp"&&(e.preventDefault(),(k=S.value)==null||k.focus("prev"))},M=e=>{_("update:isDialogVisible",e),_("update:searchQuery","")},N=e=>e==="dashboards"?"Dashboards":e==="appsPages"?"Apps & Pages":e==="userInterface"?"User Interface":e==="formsTables"?"Forms Tables":e==="chartsMisc"?"Charts Misc":"Misc";return(e,c)=>{const k=q("IconBtn");return r(),y(re,{"max-width":"600","model-value":l(C),height:e.$vuetify.display.smAndUp?"550":"100%",fullscreen:e.$vuetify.display.width<600,class:"app-bar-search-dialog","onUpdate:modelValue":M,onKeyup:R(V,["esc"])},{default:t(()=>[a(X,{height:"100%",width:"100%",class:"position-relative"},{default:t(()=>[a(w,{class:"pt-1 px-6",style:{"min-block-size":"65px"}},{default:t(()=>[a(Z,{ref_key:"refSearchInput",ref:U,modelValue:l(n),"onUpdate:modelValue":[c[0]||(c[0]=s=>G(n)?n.value=s:null),c[1]||(c[1]=s=>e.$emit("update:searchQuery",l(n)))],autofocus:"",density:"compact",variant:"plain",class:"app-bar-autocomplete-box",onKeyup:R(V,["esc"]),onKeydown:P},{"prepend-inner":t(()=>[o("div",oe,[a(u,{size:"22",icon:"mdi-magnify",class:"mt-2",style:{opacity:"1"}})])]),"append-inner":t(()=>[o("div",ie,[o("div",{class:"text-base text-disabled cursor-pointer me-1",onClick:V}," [esc] "),a(k,{onClick:V},{default:t(()=>[a(u,{icon:"mdi-close"})]),_:1})])]),_:1},8,["modelValue","onKeyup"])]),_:1}),a(ee),a(l(Y),{options:{wheelPropagation:!1,suppressScrollX:!0},class:"h-100"},{default:t(()=>[D(a(l(Q),{ref_key:"refSearchList",ref:S,density:"compact",class:"app-bar-search-list"},{default:t(()=>[(r(!0),d(v,null,x(l(p),s=>(r(),d(v,{key:s.title},["header"in s?(r(),y(l(se),{key:0,class:"text-disabled"},{default:t(()=>[A(b(N(s.title)),1)]),_:2},1024)):$(e.$slots,"searchResult",{key:1,item:s},()=>[a(l(K),{link:"",onClick:h=>e.$emit("itemSelected",s)},{prepend:t(()=>[a(u,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"])]),append:t(()=>[a(u,{size:"20",icon:"mdi-subdirectory-arrow-left",class:"enter-icon text-disabled"})]),default:t(()=>[a(te,null,{default:t(()=>[A(b(s.title),1)]),_:2},1024)]),_:2},1032,["onClick"])],!0)],64))),128))]),_:3},512),[[I,l(n).length&&!!l(p).length]]),D(o("div",ne,[$(e.$slots,"suggestions",{},()=>[a(w,{class:"app-bar-search-suggestions h-100 pa-10"},{default:t(()=>[i.suggestions?(r(),y(ae,{key:0,class:"gap-y-4"},{default:t(()=>[(r(!0),d(v,null,x(i.suggestions,s=>(r(),y(le,{key:s.title,cols:"12",sm:"6",class:"ps-6"},{default:t(()=>[o("p",ce,b(s.title),1),a(l(Q),{class:"card-list"},{default:t(()=>[(r(!0),d(v,null,x(s.content,h=>(r(),y(l(K),{key:h.title,link:"",title:h.title,class:"app-bar-search-suggestion",onClick:ve=>e.$emit("itemSelected",h)},{prepend:t(()=>[a(u,{icon:h.icon,size:"20",class:"me-2"},null,8,["icon"])]),_:2},1032,["title","onClick"]))),128))]),_:2},1024)]),_:2},1024))),128))]),_:1})):L("",!0)]),_:1})],!0)],512),[[I,!!l(p)&&!l(n)]]),D(o("div",ue,[$(e.$slots,"noData",{},()=>[a(w,{class:"h-100"},{default:t(()=>[o("div",de,[a(u,{size:"75",icon:"mdi-file-remove-outline"}),o("div",pe,[he,o("span",null,'"'+b(l(n))+'"',1)]),i.noDataSuggestion?(r(),d("div",fe,[me,(r(!0),d(v,null,x(i.noDataSuggestion,s=>(r(),d("h6",{key:s.title,class:"app-bar-search-suggestion text-sm font-weight-regular cursor-pointer mt-3",onClick:h=>e.$emit("itemSelected",s)},[a(u,{size:"20",icon:s.icon,class:"me-3"},null,8,["icon"]),o("span",ge,b(s.title),1)],8,_e))),128))])):L("",!0)])]),_:1})],!0)],512),[[I,!l(p).length&&l(n).length]])]),_:3})]),_:3})]),_:3},8,["model-value","height","fullscreen","onKeyup"])}}});const Ae=W(ye,[["__scopeId","data-v-6b387c92"]]);export{Ae as default};