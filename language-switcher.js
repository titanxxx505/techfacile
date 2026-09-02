(function(){
  const originalHost='titanxxx505.github.io';
  const originalOrigin='https://'+originalHost;
  const translated=location.hostname.endsWith('.translate.goog')||location.hostname.includes('translate.googleusercontent.com');
  function originalUrl(){
    if(!translated){
      const current=new URL(location.href);
      current.searchParams.delete('lang');
      current.searchParams.delete('_x_tr_sl');
      current.searchParams.delete('_x_tr_tl');
      current.searchParams.delete('_x_tr_hl');
      return current.toString();
    }
    const target=new URL(originalOrigin+location.pathname);
    new URLSearchParams(location.search).forEach((value,key)=>{if(!key.startsWith('_x_tr_')&&key!=='lang')target.searchParams.set(key,value)});
    return target.toString();
  }
  const style=document.createElement('style');
  style.textContent='.tc-language{position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:9px;padding:10px 12px;border:1px solid rgba(255,255,255,.72);border-radius:14px;background:rgba(19,39,31,.94);box-shadow:0 12px 30px rgba(10,30,22,.24);color:#fff;font:700 13px/1.2 Arial,Helvetica,sans-serif;backdrop-filter:blur(12px)}.tc-language select{min-height:36px;border:1px solid #91ad9e;border-radius:9px;background:#fff;color:#183d2d;font:700 14px Arial,Helvetica,sans-serif;padding:0 30px 0 10px;cursor:pointer}.tc-language select:focus{outline:3px solid rgba(111,180,143,.45);outline-offset:2px}@media(max-width:520px){.tc-language{right:10px;bottom:10px}.tc-language-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}';
  document.head.append(style);
  const box=document.createElement('div');
  box.className='tc-language';
  box.setAttribute('translate','no');
  const label=document.createElement('label');
  label.className='tc-language-label';
  label.htmlFor='tc-language-select';
  label.textContent=translated?'Language':'Langue';
  const select=document.createElement('select');
  select.id='tc-language-select';
  select.setAttribute('aria-label','Choisir la langue / Choose language');
  select.innerHTML='<option value="fr">Français</option><option value="en">English</option>';
  select.value=translated?'en':'fr';
  select.addEventListener('change',function(){
    const source=originalUrl();
    if(this.value==='fr'){location.href=source;return}
    location.href='https://translate.google.com/translate?sl=fr&tl=en&u='+encodeURIComponent(source);
  });
  box.append(label,select);
  document.body.append(box);
})();