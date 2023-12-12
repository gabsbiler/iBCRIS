import{m as O,a as Q,u as W,b as B,f as X,c as Y,d as Z}from"./VCounter-834eef0d.js";import{f as ee}from"./forwardRefs-9d31fcaa.js";import{a7 as le,aw as te,am as ae,a9 as ne,S as d,ax as A,k as C,B as oe,ab as ue,ay as se,p as o,G as h,F as g,az as ie,aA as re}from"./main-78095835.js";import{V as ce}from"./VChip-45ebfbe6.js";const ye=le()({name:"VFileInput",inheritAttrs:!1,props:{chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},...O({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>te(e).every(f=>f!=null&&typeof f=="object")},...Q({clearable:!0})},emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,f){let{attrs:$,emit:k,slots:a}=f;const{t:V}=ae(),n=ne(e,"modelValue"),{isFocused:v,focus:M,blur:N}=W(e),I=d(()=>typeof e.showSize!="boolean"?e.showSize:void 0),S=d(()=>(n.value??[]).reduce((l,t)=>{let{size:i=0}=t;return l+i},0)),b=d(()=>A(S.value,I.value)),p=d(()=>(n.value??[]).map(l=>{const{name:t="",size:i=0}=l;return e.showSize?`${t} (${A(i,I.value)})`:t})),x=d(()=>{var t;const l=((t=n.value)==null?void 0:t.length)??0;return e.showSize?V(e.counterSizeString,l,b.value):V(e.counterString,l)}),F=C(),z=C(),u=C();function y(){var l;u.value!==document.activeElement&&((l=u.value)==null||l.focus()),v.value||M()}function D(l){w(l)}function j(l){k("mousedown:control",l)}function w(l){var t;(t=u.value)==null||t.click(),k("click:control",l)}function E(l){l.stopPropagation(),y(),ie(()=>{n.value=[],re(e["onClick:clear"],l)})}return oe(n,l=>{(!Array.isArray(l)||!l.length)&&u.value&&(u.value.value="")}),ue(()=>{const l=!!(a.counter||e.counter),t=!!(l||a.details),[i,G]=se($),[{modelValue:de,...L}]=B.filterProps(e),[T]=X(e);return o(B,h({ref:F,modelValue:n.value,"onUpdate:modelValue":r=>n.value=r,class:["v-file-input",e.class],style:e.style,"onClick:prepend":D},i,L,{focused:v.value}),{...a,default:r=>{let{id:m,isDisabled:c,isDirty:P,isReadonly:U,isValid:_}=r;return o(Y,h({ref:z,"prepend-icon":e.prependIcon,onMousedown:j,onClick:w,"onClick:clear":E,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},T,{id:m.value,active:P.value||v.value,dirty:P.value,disabled:c.value,focused:v.value,error:_.value===!1}),{...a,default:q=>{var R;let{props:{class:H,...J}}=q;return o(g,null,[o("input",h({ref:u,type:"file",readonly:U.value,disabled:c.value,multiple:e.multiple,name:e.name,onClick:s=>{s.stopPropagation(),y()},onChange:s=>{if(!s.target)return;const K=s.target;n.value=[...K.files??[]]},onFocus:y,onBlur:N},J,G),null),o("div",{class:H},[!!((R=n.value)!=null&&R.length)&&(a.selection?a.selection({fileNames:p.value,totalBytes:S.value,totalBytesReadable:b.value}):e.chips?p.value.map(s=>o(ce,{key:s,size:"small",color:e.color},{default:()=>[s]})):p.value.join(", "))])])}})},details:t?r=>{var m,c;return o(g,null,[(m=a.details)==null?void 0:m.call(a,r),l&&o(g,null,[o("span",null,null),o(Z,{active:!!((c=n.value)!=null&&c.length),value:x.value},a.counter)])])}:void 0})}),ee({},F,z,u)}});export{ye as V};
