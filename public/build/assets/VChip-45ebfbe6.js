import{a7 as E,b8 as X,ae as L,aF as H,ah as R,ai as z,ba as F,aU as T,aI as J,aR as Z,M as r,ab as ee,p as l,bg as ae,ad as y,bh as x,bi as le,aP as te,bj as ne,aW as se,ag as ie,bk as ce,bl as de,am as oe,bm as ue,bc as re,aQ as ve,bn as fe,al as me,bo as ke,a9 as be,aY as pe,bp as he,S as C,D as V,aV as D,bd as ye,bq as Ce,V as v,be as f,E as Ve,F as G,Y as _,G as Ie}from"./main-78095835.js";const w=Symbol.for("vuetify:v-chip-group");E()({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:X},...L(),...H({selectedClass:"v-chip--selected"}),...R(),...z(),...F({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,m){let{slots:c}=m;const{themeClasses:o}=T(e),{isSelected:t,select:k,next:b,prev:p,selected:h}=J(e,w);return Z({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ee(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:k,next:b,prev:p,selected:h.value})]}})),{}}});const Pe=E()({name:"VChip",directives:{Ripple:ae},props:{activeClass:String,appendAvatar:String,appendIcon:y,closable:Boolean,closeIcon:{type:y,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:y,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:x(),onClickOnce:x(),...le(),...L(),...te(),...ne(),...se(),...ie(),...ce(),...de(),...R({tag:"span"}),...z(),...F({variant:"tonal"})},emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,m){let{attrs:c,emit:o,slots:t}=m;const{t:k}=oe(),{borderClasses:b}=ue(e),{colorClasses:p,colorStyles:h,variantClasses:u}=re(e),{densityClasses:M}=ve(e),{elevationClasses:$}=fe(e),{roundedClasses:q}=me(e),{sizeClasses:K}=ke(e),{themeClasses:O}=T(e),I=be(e,"modelValue"),a=pe(e,w,!1),s=he(e,c),Y=C(()=>e.link!==!1&&s.isLink.value),i=C(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),j=C(()=>({"aria-label":k(e.closeLabel),onClick(n){I.value=!1,o("click:close",n)}}));function g(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function N(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),g(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),Q=!!(d||t.append),U=!!(t.close||e.closable),P=!!(t.filter||e.filter)&&a,S=!!(e.prependIcon||e.prependAvatar),W=!!(S||t.prepend),A=!a||a.isSelected.value;return I.value&&V(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":P,"v-chip--pill":e.pill},O.value,b.value,A?p.value:void 0,M.value,$.value,q.value,K.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[A?h.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:g,onKeydown:i.value&&!Y.value&&N},{default:()=>{var B;return[ye(i.value,"v-chip"),P&&l(Ce,{key:"filter"},{default:()=>[V(l("div",{class:"v-chip__filter"},[t.filter?V(l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},null),[[D("slot"),t.filter,"default"]]):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ve,a.isSelected.value]])]}),W&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!S,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(G,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(_,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),((B=t.default)==null?void 0:B.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text,Q&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(G,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(_,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),U&&l("div",Ie({key:"close",class:"v-chip__close"},j.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[D("ripple"),i.value&&e.ripple,null]])}}});export{Pe as V};
