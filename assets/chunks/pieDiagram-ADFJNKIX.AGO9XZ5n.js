import{f as e,r as t}from"./chunk-S3R3BYOJ.ijsjCY8C.js";import{t as n}from"./mermaid-parser.core.C98Gv79M.js";import{g as r,h as i}from"./src.i5GmpHjt.js";import{B as a,C as o,U as s,_ as c,a as l,b as u,c as d,d as f,v as p,z as m}from"./chunk-ABZYJK2D.BkzFrL34.js";import{t as h}from"./ordinal.BAxfPAgN.js";import{n as g}from"./path.fybaL0A-.js";import{p as _}from"./math.Bi_r_ZWc.js";import{t as v}from"./arc.CDVcXlh3.js";import{t as y}from"./array.BifhSqXX.js";import{t as b}from"./chunk-4BX2VUAB.DPJJI__j.js";import{o as x}from"./mermaid.core.Jm_zXpA6.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var e=C,t=S,n=null,r=g(0),i=g(_),a=g(0);function o(o){var s,c=(o=y(o)).length,l,u,d=0,f=Array(c),p=Array(c),m=+r.apply(this,arguments),h=Math.min(_,Math.max(-_,i.apply(this,arguments)-m)),g,v=Math.min(Math.abs(h)/c,a.apply(this,arguments)),b=v*(h<0?-1:1),x;for(s=0;s<c;++s)(x=p[f[s]=s]=+e(o[s],s,o))>0&&(d+=x);for(t==null?n!=null&&f.sort(function(e,t){return n(o[e],o[t])}):f.sort(function(e,n){return t(p[e],p[n])}),s=0,u=d?(h-c*b)/d:0;s<c;++s,m=g)l=f[s],x=p[l],g=m+(x>0?x*u:0)+b,p[l]={data:o[l],index:s,value:x,startAngle:m,endAngle:g,padAngle:v};return p}return o.value=function(t){return arguments.length?(e=typeof t==`function`?t:g(+t),o):e},o.sortValues=function(e){return arguments.length?(t=e,n=null,o):t},o.sort=function(e){return arguments.length?(n=e,t=null,o):n},o.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:g(+e),o):r},o.endAngle=function(e){return arguments.length?(i=typeof e==`function`?e:g(+e),o):i},o.padAngle=function(e){return arguments.length?(a=typeof e==`function`?e:g(+e),o):a},o}var T=f.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:i(()=>structuredClone(k),`getConfig`),clear:i(()=>{D=new Map,O=E.showData,l()},`clear`),setDiagramTitle:s,getDiagramTitle:o,setAccTitle:a,getAccTitle:p,setAccDescription:m,getAccDescription:c,addSection:i(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),r.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:i(()=>D,`getSections`),setShowData:i(e=>{O=e},`setShowData`),getShowData:i(()=>O,`getShowData`)},j=i((e,t)=>{b(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:i(async e=>{let t=await n(`pie`,e);r.debug(t),j(t,A)},`parse`)},N=i(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=i(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return w().value(e=>e.value)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:i((n,i,a,o)=>{r.debug(`rendering pie chart
`+n);let s=o.db,c=u(),l=t(s.getConfig(),c.pie),f=x(i),p=f.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=c,[g]=e(m.pieOuterStrokeWidth);g??=2;let _=l.textPosition,y=v().innerRadius(0).outerRadius(185),b=v().innerRadius(185*_).outerRadius(185*_);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+g/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=P(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=h(w);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,y).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+b.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=p.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));f.attr(`viewBox`,`0 0 ${A} 450`),d(f,450,A,l.useMaxWidth)},`draw`)},styles:N};export{F as diagram};