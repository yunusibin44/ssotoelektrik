'use strict';
window.dataLayer=window.dataLayer||[];
const ADS_CONTACT_CONVERSION='AW-18453476969/rPArCLS8yvkcEOnspt9E';
function reportContactConversion(){
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  window.gtag('event','conversion',{send_to:ADS_CONTACT_CONVERSION});
}
const nav=document.querySelector('.site-nav');
const toggle=document.querySelector('.menu-toggle');
function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelectorAll('details[open]').forEach(el=>el.open=false);if(nav?.classList.contains('open')){closeMenu();toggle.focus();}}});
document.addEventListener('click',event=>{
  const link=event.target.closest('a');
  if(link){if(nav?.contains(link))closeMenu();const name=link.dataset.track;if(name){window.dataLayer.push({event:name,cta_id:link.id,page_path:location.pathname});if(name==='whatsapp_click')reportContactConversion();}}
  if(!event.target.closest('.site-nav details'))document.querySelectorAll('.site-nav details[open]').forEach(el=>el.open=false);
  if(!event.target.closest('.site-header'))closeMenu();
});
const media=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!media.matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});}
document.querySelectorAll('.contact-form').forEach(form=>{
  const phone=form.querySelector('[name=phone]');
  phone.addEventListener('input',()=>phone.setCustomValidity(''));
  const textFields=[...form.querySelectorAll('[name=name],[name=vehicle],[name=problem]')];
  textFields.forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    textFields.forEach(field=>field.setCustomValidity(field.value.trim().length>=field.minLength?'':'Lütfen bu alanı anlamlı bir bilgiyle doldurun.'));
    const digits=phone.value.replace(/\D/g,'');
    const validPhone=/^\+?[\d\s()-]+$/.test(phone.value.trim())&&digits.length>=10&&digits.length<=15;
    phone.setCustomValidity(validPhone?'':'Lütfen alan koduyla birlikte geçerli bir telefon numarası girin.');
    if(!form.reportValidity())return;
    const data=new FormData(form);
    if(!data.has('consent'))return;
    const message=`Merhaba SS Oto Elektrik, aracım için bilgi almak istiyorum.\nAd soyad: ${String(data.get('name')).trim()}\nTelefon: ${String(data.get('phone')).trim()}\nAraç: ${String(data.get('vehicle')).trim()}\nSorun / hizmet: ${String(data.get('problem')).trim()}`;
    const url='https://wa.me/905345700733?text='+encodeURIComponent(message);
    window.dataLayer.push({event:'lead_form_submit',cta_id:form.id+'-submit',page_path:location.pathname});
    reportContactConversion();
    form.querySelector('.form-status').textContent='WhatsApp açılıyor. Mesajınızı göndermek için WhatsApp içinde Gönder’e dokunun.';
    window.open(url,'_blank','noopener,noreferrer');
  });
});

