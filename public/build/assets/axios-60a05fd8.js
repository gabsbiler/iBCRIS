import{a as t}from"./axios-4a70c6fc.js";const r=t.create({baseURL:"https://ibcris.thinkingbees.tech/"});r.interceptors.request.use(e=>{const s=localStorage.getItem("accessToken");return s&&(e.headers=e.headers||{},e.headers.Authorization=s?`Bearer ${JSON.parse(s)}`:""),e});r.interceptors.response.use(e=>e,e=>{if(e.response.status===401)localStorage.removeItem("userData"),localStorage.removeItem("accessToken"),localStorage.removeItem("userAbilities"),router.push("/login");else return Promise.reject(e)});export{r as a};