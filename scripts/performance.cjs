const fs=require('node:fs');const path=require('node:path');
(async()=>{
 const {default:lighthouse}=await import('lighthouse');const {launch}=await import('chrome-launcher');
 const chrome=await launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless=new','--disable-gpu','--no-first-run']});
 try{for(const mode of ['mobile','desktop']){const result=await lighthouse('http://127.0.0.1:4173/',{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(mode==='desktop'?{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:900,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{})});fs.writeFileSync(path.resolve(__dirname,'../qa/lighthouse-'+mode+'.json'),result.report);console.log(mode,JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)]))));console.log('Opportunities',Object.values(result.lhr.audits).filter(a=>a.score!==null&&a.score<.9&&a.details).map(a=>({id:a.id,title:a.title,score:a.score,display:a.displayValue})));}}
 finally{try{await chrome.kill();}catch(error){if(error.code!=='EPERM')throw error;}}
})().catch(e=>{console.error(e);process.exitCode=1;});
