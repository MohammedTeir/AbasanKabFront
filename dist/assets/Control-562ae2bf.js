import{d as i,r as _,o as p,a as u,h as n,i as h,w as r,e as s,j as o,b as x,c,k as m,F as f,t as b}from"./index-717cf31f.js";const g=o("h2",{class:"text-right mb-10 text-[28px]"},"الرقابة الداخلية والخارجية",-1),v={class:"flex justify-between items-center"},A={class:"text-[22px]"},k=["href"],C=i({__name:"Control",setup(w){const a=_();return p(async()=>{try{const t=await u.get("/documents/internal-and-external-oversight-documents");a.value=t.data.data}catch(t){console.log(t)}}),(t,y)=>{const l=n("Grid"),d=n("base-section");return s(),h(d,null,{default:r(()=>[o("article",null,[g,x(l,{cols:2,gap:60},{default:r(()=>[(s(!0),c(f,null,m(a.value,e=>(s(),c("div",v,[o("h2",A,b(e==null?void 0:e.name),1),o("a",{href:e==null?void 0:e.doc_url,class:"block px-[58px] py-[12px] border border-[#A7A465] text-[#A7A465] rounded-md text-[16px] hover:bg-[#A7A465] hover:text-white"},"تحميل ",8,k)]))),256))]),_:1})])]),_:1})}}});export{C as default};