(() => {
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.getElementById('site-nav');
  if(!toggle||!nav)return;
  const mobile=window.matchMedia('(max-width: 760px)');
  const setOpen=open=>{
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?toggle.dataset.closeLabel:toggle.dataset.openLabel);
    document.documentElement.classList.toggle('menu-open',open);
    nav.inert=mobile.matches&&!open;
  };
  document.documentElement.classList.add('js');
  setOpen(false);
  toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){setOpen(false);toggle.focus();}});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header')&&toggle.getAttribute('aria-expanded')==='true')setOpen(false);});
  mobile.addEventListener('change',()=>setOpen(false));
})();
