(function(){
const $ = (sel,ctx=document)=>ctx.querySelector(sel);
const $$ = (sel,ctx=document)=>Array.from(ctx.querySelectorAll(sel));
const btnFr = $('#btn-fr');
const btnEn = $('#btn-en');
const year = $('#year'); if(year) year.textContent = new Date().getFullYear();

// Modal elements
const modal = $('#coming-soon-modal');
const donationBtn = $('#donation-btn');
const closeBtn = $('.close');

// Hamburger menu elements
const hamburger = $('.hamburger');
const nav = $('.nav');

function setLang(lang){
const isFR = lang === 'fr';
$$('.lang').forEach(el=>{
const isElFR = el.classList.contains('lang-fr');
el.hidden = isFR ? !isElFR : isElFR;
});

// Update language toggle buttons
if(isFR) {
  btnFr.classList.add('active');
  btnEn.classList.remove('active');
  btnFr.hidden = false;
  btnEn.hidden = true;
  btnFr.setAttribute('aria-pressed', 'true');
  btnEn.setAttribute('aria-pressed', 'false');
} else {
  btnFr.classList.remove('active');
  btnEn.classList.add('active');
  btnFr.hidden = true;
  btnEn.hidden = false;
  btnFr.setAttribute('aria-pressed', 'false');
  btnEn.setAttribute('aria-pressed', 'true');
}

document.documentElement.lang = isFR ? 'fr' : 'en';
try{ localStorage.setItem('femadi_lang', lang); }catch(e){}
}

// Modal functions
function openModal(){
if(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
}

function closeModal(){
if(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}
}

try{
const saved = localStorage.getItem('femadi_lang');
if(saved === 'en') setLang('en'); else setLang('fr');
}catch(e){ setLang('fr'); }

btnFr?.addEventListener('click', ()=>setLang('en'));
btnEn?.addEventListener('click', ()=>setLang('fr'));

// Hamburger menu functionality
if(hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
    });
  });
}

// Modal event listeners
if(donationBtn) {
  donationBtn.addEventListener('click', openModal);
}
if(closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if(modal) {
  modal.addEventListener('click', (e)=>{
    if(e.target === modal) closeModal();
  });
}

// Close modal with Escape key
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && modal && modal.style.display === 'flex') closeModal();
});

document.addEventListener('click', (e)=>{
const a = e.target.closest('a[href^="#"]');
if(!a) return;
const id = a.getAttribute('href').slice(1);
const target = document.getElementById(id);
if(target){
e.preventDefault();
target.scrollIntoView({behavior:'smooth',block:'start'});
history.replaceState(null,'','#'+id);
}
});
})();
