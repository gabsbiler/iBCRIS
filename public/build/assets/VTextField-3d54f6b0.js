import{m as $,a as q,u as H,b as I,f as J,c as K,d as L}from"./VCounter-d47b1182.js";import{aF as Q,a7 as X,bT as Y,a9 as Z,S as m,k as x,ab as ee,ay as te,p as n,G as V,D as ne,aW as le,F as y,bU as ae,az as S,aA as ue}from"./main-4a305e5b.js";import{f as oe}from"./forwardRefs-9d31fcaa.js";const ie=["color","file","time","date","datetime-local","week","month"],se=Q({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,type:{type:String,default:"text"},modelModifiers:Object,...$(),...q()},"v-text-field"),ve=X()({name:"VTextField",directives:{Intersect:Y},inheritAttrs:!1,props:se(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,p){let{attrs:v,emit:g,slots:l}=p;const o=Z(e,"modelValue"),{isFocused:s,focus:w,blur:D}=H(e),T=m(()=>typeof e.counterValue=="function"?e.counterValue(o.value):(o.value??"").toString().length),A=m(()=>{if(v.maxlength)return v.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function R(t,a){var u,i;!e.autofocus||!t||(i=(u=a[0].target)==null?void 0:u.focus)==null||i.call(u)}const C=x(),F=x(),r=x(),B=m(()=>ie.includes(e.type)||e.persistentPlaceholder||s.value);function d(){var t;r.value!==document.activeElement&&((t=r.value)==null||t.focus()),s.value||w()}function M(t){g("mousedown:control",t),t.target!==r.value&&(d(),t.preventDefault())}function _(t){d(),g("click:control",t)}function E(t){t.stopPropagation(),d(),S(()=>{o.value=null,ue(e["onClick:clear"],t)})}function N(t){var u;const a=t.target;if(o.value=a.value,(u=e.modelModifiers)!=null&&u.trim&&["text","search","password","tel","url"].includes(e.type)){const i=[a.selectionStart,a.selectionEnd];S(()=>{a.selectionStart=i[0],a.selectionEnd=i[1]})}}return ee(()=>{const t=!!(l.counter||e.counter||e.counterValue),a=!!(t||l.details),[u,i]=te(v),[{modelValue:re,...z}]=I.filterProps(e),[U]=J(e);return n(I,V({ref:C,modelValue:o.value,"onUpdate:modelValue":c=>o.value=c,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)},e.class],style:e.style},u,z,{focused:s.value}),{...l,default:c=>{let{id:f,isDisabled:h,isDirty:k,isReadonly:j,isValid:G}=c;return n(K,V({ref:F,onMousedown:M,onClick:_,"onClick:clear":E,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},U,{id:f.value,active:B.value||k.value,dirty:k.value||e.dirty,disabled:h.value,focused:s.value,error:G.value===!1}),{...l,default:O=>{let{props:{class:P,...W}}=O;const b=ne(n("input",V({ref:r,value:o.value,onInput:N,autofocus:e.autofocus,readonly:j.value,disabled:h.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:d,onBlur:D},W,i),null),[[le("intersect"),{handler:R},null,{once:!0}]]);return n(y,null,[e.prefix&&n("span",{class:"v-text-field__prefix"},[e.prefix]),l.default?n("div",{class:P,"data-no-activator":""},[l.default(),b]):ae(b,{class:P}),e.suffix&&n("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:a?c=>{var f;return n(y,null,[(f=l.details)==null?void 0:f.call(l,c),t&&n(y,null,[n("span",null,null),n(L,{active:e.persistentCounter||s.value,value:T.value,max:A.value},l.counter)])])}:void 0})}),oe({},C,F,r)}});export{ve as V,se as m};