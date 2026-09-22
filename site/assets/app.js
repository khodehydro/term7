// پیشرفت مطالعه + جستجو + فیلتر فصل‌ها
(function(){
  const KEY='jabr1-progress-v1';
  function getP(){ try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return{}} }
  function setP(p){ localStorage.setItem(KEY,JSON.stringify(p)); }
  window.JabrProgress={
    done(i){const p=getP();p[i]=true;setP(p);paint();},
    undone(i){const p=getP();delete p[i];setP(p);paint();},
    isDone(i){return !!getP()[i];},
    percent(){const p=getP();let n=0;for(let i=1;i<=12;i++)if(p[i])n++;return Math.round(n/12*100);}
  };
  function paint(){
    document.querySelectorAll('[data-ch]').forEach(el=>{
      const i=el.getAttribute('data-ch');
      const done=window.JabrProgress.isDone(i);
      el.classList.toggle('done',done);
      const b=el.querySelector('.done-btn');
      if(b) b.textContent=done?'✔ خوانده شده — لغو علامت':'✔ این فصل را خواندم';
    });
    document.querySelectorAll('.progress-bar>div').forEach(d=>{d.style.width=window.JabrProgress.percent()+'%'});
    document.querySelectorAll('.progress-txt').forEach(d=>{d.textContent='پیشرفت شما: '+window.JabrProgress.percent()+'٪'});
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('.done-btn'); if(!b) return;
    const i=b.getAttribute('data-ch');
    window.JabrProgress.isDone(i)?window.JabrProgress.undone(i):window.JabrProgress.done(i);
  });
  // جستجو در صفحه اصلی
  const s=document.getElementById('search');
  if(s) s.addEventListener('input',()=>{
    const q=s.value.trim();
    document.querySelectorAll('.ch-card').forEach(c=>{
      c.style.display=(!q||c.textContent.includes(q))?'':'none';
    });
  });
  document.addEventListener('DOMContentLoaded',paint);
})();
