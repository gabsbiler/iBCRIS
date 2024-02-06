import{d as y,k as d,A as k,j as I,o as S,c as C,m as l,p as e,q as t,v as p,x as L,w as a,ac as m,U as B,$ as f,Z as D,a0 as R,R as P,D as T,E as j}from"./main-fc279098.js";import{u as g,b as h}from"./route-block-1a92777f.js";import{t as M}from"./tree-68e903b5.js";import{V as N}from"./VNodeRenderer-ebce1064.js";import{a as q,b as E}from"./auth-v2-mask-light-b35e3b5d.js";import{a as n,V as _}from"./VRow-3d749928.js";import{V as U}from"./VForm-c4179a4a.js";import{V}from"./VTextField-43358ead.js";import"./forwardRefs-9d31fcaa.js";const F="/build/assets/auth-v2-login-illustration-bordered-dark-1621a082.png",$="/build/assets/auth-v2-login-illustration-bordered-light-5efb7928.png",A="/build/assets/auth-v2-login-illustration-dark-c163247b.png",G="/build/assets/auth-v2-login-illustration-light-c910569c.png",W={class:"auth-logo d-flex align-start gap-x-3"},Z={class:"font-weight-medium leading-normal text-2xl text-uppercase"},z={class:"d-flex align-center justify-center w-100 pa-10 pe-0"},H=l("h5",{class:"text-h5 font-weight-medium mb-1"}," Welcome to iBCRIS! 👋🏻 ",-1),J=l("p",{class:"mb-0"}," Please sign-in to your account ",-1),K={class:"text-error mt-1"},O=y({__name:"login",setup(Q){const s=d({email:"",password:"",remember:!1}),c=k(),b=I(),u=d(!1),i=d(!1),w=g(G,A,$,F,!0),x=g(E,q),v=()=>{s.value.email=="admin@admin.com"&&s.value.password=="@dm1n@dm1n"?(u.value=!1,localStorage.setItem("loggedIn","1"),b.replace(c.query.to?String(c.query.to):"/")):u.value=!0};return(X,o)=>(S(),C("div",null,[l("div",W,[e(t(N),{nodes:t(p).app.logo},null,8,["nodes"]),l("h1",Z,L(t(p).app.title),1)]),e(_,{"no-gutters":"",class:"auth-wrapper"},{default:a(()=>[e(n,{md:"8",class:"d-none d-md-flex align-center justify-center position-relative"},{default:a(()=>[l("div",z,[e(m,{"max-width":"768px",src:t(w),class:"auth-illustration"},null,8,["src"])]),e(m,{width:276,src:t(M),class:"auth-footer-start-tree"},null,8,["src"]),e(m,{class:"auth-footer-mask",src:t(x)},null,8,["src"])]),_:1}),e(n,{cols:"12",md:"4",class:"auth-card-v2 d-flex align-center justify-center"},{default:a(()=>[e(B,{flat:"","max-width":500,class:"mt-12 mt-sm-0 pa-4"},{default:a(()=>[e(f,null,{default:a(()=>[H,J]),_:1}),e(f,null,{default:a(()=>[e(U,{onSubmit:D(v,["prevent"])},{default:a(()=>[e(_,null,{default:a(()=>[e(n,{cols:"12"},{default:a(()=>[e(V,{modelValue:t(s).email,"onUpdate:modelValue":o[0]||(o[0]=r=>t(s).email=r),label:"Email",type:"email"},null,8,["modelValue"])]),_:1}),e(n,{cols:"12"},{default:a(()=>[e(V,{modelValue:t(s).password,"onUpdate:modelValue":o[1]||(o[1]=r=>t(s).password=r),label:"Password",type:t(i)?"text":"password","append-inner-icon":t(i)?"mdi-eye-off-outline":"mdi-eye-outline","onClick:appendInner":o[2]||(o[2]=r=>i.value=!t(i))},null,8,["modelValue","type","append-inner-icon"])]),_:1}),e(n,null,{default:a(()=>[e(R,{block:"",type:"submit"},{default:a(()=>[P(" Login ")]),_:1}),T(l("p",K,"Please check your email and password.",512),[[j,t(u)]])]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1})]),_:1})]),_:1})]))}});typeof h=="function"&&h(O);export{O as default};