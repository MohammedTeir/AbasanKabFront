import{d as s,r,o as c,a as l,h as i,i as _,w as d,e as u,j as t}from"./index-717cf31f.js";const p=t("h2",{class:"text-right mb-10 text-[28px]"},"المخطط الهيكلي للبلدية",-1),h=["href"],g=s({__name:"OrganizationChart",setup(m){const o=r();return c(async()=>{try{const e=await l.get("/documents/orgchart-document");console.log(e.data.data),o.value=e.data.data}catch(e){console.log(e)}}),(e,f)=>{const n=i("base-section");return u(),_(n,null,{default:d(()=>{var a;return[t("article",null,[p,t("div",null,[t("a",{href:(a=o.value)==null?void 0:a.doc_url,class:"text-center underline cursor-pointer"},"تحميل المخطط الهيكلي المحدث",8,h)])])]}),_:1})}}});export{g as default};