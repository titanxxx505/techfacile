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
  const headerNav=document.querySelector('.site-header .nav');
  const menu=headerNav&&headerNav.querySelector(':scope > nav');
  if(!headerNav||!menu)return;
  menu.id=menu.id||'tc-site-menu';
  const style=document.createElement('style');
  style.textContent='.tc-menu-toggle{display:none;width:44px;height:44px;padding:9px;border:1px solid #b8cec0;border-radius:11px;background:#fff;color:#204b38;cursor:pointer;align-items:center;justify-content:center;flex-direction:column;gap:5px}.tc-menu-toggle span:not(.tc-sr-only){display:block;width:23px;height:2px;border-radius:3px;background:currentColor;transition:transform .2s ease,opacity .2s ease}.tc-menu-toggle[aria-expanded="true"] span:nth-child(2){transform:translateY(7px) rotate(45deg)}.tc-menu-toggle[aria-expanded="true"] span:nth-child(3){opacity:0}.tc-menu-toggle[aria-expanded="true"] span:nth-child(4){transform:translateY(-7px) rotate(-45deg)}.tc-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.tc-language{display:flex;align-items:center;gap:7px;margin-left:3px;padding-left:10px;border-left:1px solid #cbd9d0;color:#345544;font:800 13px/1.2 Arial,Helvetica,sans-serif}.tc-language select{min-height:37px;border:1px solid #b8cec0;border-radius:9px;background:#fff;color:#183d2d;font:700 13px Arial,Helvetica,sans-serif;padding:0 27px 0 9px;cursor:pointer}.tc-menu-toggle:focus-visible,.tc-language select:focus{outline:3px solid rgba(47,107,78,.28);outline-offset:2px}@media(max-width:900px){.site-header .nav{height:auto;min-height:74px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px}.tc-menu-toggle{display:inline-flex}.site-header .nav>nav{display:none!important;width:100%;flex-direction:column;align-items:stretch;gap:5px;padding:10px 0 5px;border-top:1px solid #cfddd4}.site-header .nav>nav.tc-menu-open{display:flex!important}.site-header .nav>nav>a{display:block;width:100%;padding:12px 14px;border-radius:10px}.site-header .nav>nav>a:hover{background:#e3eee7}.site-header .nav>nav .cta-nav{text-align:center}.tc-language{justify-content:space-between;margin:4px 0 0;padding:12px 14px 4px;border-left:0;border-top:1px solid #cfddd4}.tc-language select{min-width:145px}}';
  document.head.append(style);
  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='tc-menu-toggle';
  toggle.setAttribute('aria-controls',menu.id);
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label',translated?'Open menu':'Ouvrir le menu');
  toggle.innerHTML='<span class="tc-sr-only">Menu</span><span></span><span></span><span></span>';
  headerNav.insertBefore(toggle,menu);
  const language=document.createElement('div');
  language.className='tc-language';
  language.setAttribute('translate','no');
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
  language.append(label,select);
  menu.append(language);
  function setMenu(open){menu.classList.toggle('tc-menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?(translated?'Close menu':'Fermer le menu'):(translated?'Open menu':'Ouvrir le menu'))}
  toggle.addEventListener('click',function(){setMenu(this.getAttribute('aria-expanded')!=='true')});
  menu.addEventListener('click',function(event){if(event.target.closest('a')&&innerWidth<=900)setMenu(false)});
  document.addEventListener('keydown',function(event){if(event.key==='Escape')setMenu(false)});
  addEventListener('resize',function(){if(innerWidth>900)setMenu(false)});
})();