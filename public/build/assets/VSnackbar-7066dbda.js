import{ah as C,au as T,b0 as _,av as g,b1 as p,aw as h,ai as L,aj as R,ak as x,aD as A,b2 as B,al as N,b3 as O,b4 as D,az as G,l as I,C as r,aG as M,an as U,ao as c,q as n,b5 as j,aU as q,H as u,ap as z}from"./main-ec2ae718.js";const $=C()({name:"VSnackbar",props:{multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...T({location:"bottom"}),..._(),...g(),...p(),...h(),...L(R({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},emits:{"update:modelValue":a=>!0},setup(a,v){let{slots:t}=v;const e=x(a,"modelValue"),{locationStyles:m}=A(a),{positionClasses:d}=B(a),{scopeId:b}=N(),{themeClasses:k}=O(a),{colorClasses:f,colorStyles:P,variantClasses:V}=D(a),{roundedClasses:y}=G(a),i=I();r(e,o),r(()=>a.timeout,o),M(()=>{e.value&&o()});let l=-1;function o(){window.clearTimeout(l);const s=Number(a.timeout);!e.value||s===-1||(l=window.setTimeout(()=>{e.value=!1},s))}function w(){window.clearTimeout(l)}return U(()=>{const[s]=c.filterProps(a);return n(c,u({ref:i,class:["v-snackbar",{"v-snackbar--active":e.value,"v-snackbar--multi-line":a.multiLine&&!a.vertical,"v-snackbar--vertical":a.vertical},d.value,a.class],style:a.style},s,{modelValue:e.value,"onUpdate:modelValue":S=>e.value=S,contentProps:u({class:["v-snackbar__wrapper",k.value,f.value,y.value,V.value],style:[m.value,P.value],onPointerenter:w,onPointerleave:o},s.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},b),{default:()=>[j(!1,"v-snackbar"),t.default&&n("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[t.default()]),t.actions&&n(q,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[n("div",{class:"v-snackbar__actions"},[t.actions()])]})],activator:t.activator})}),z({},i)}});export{$ as V};