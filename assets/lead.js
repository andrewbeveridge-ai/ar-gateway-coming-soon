/* Lead capture for Gateway forms. Each form carries data-source (web:home, web:starter). */
(function(){
  var CAPTURE='https://bgswqjgswlvdazseyhvu.supabase.co/functions/v1/capture-lead';
  var KIT_URL='/gateway-ai-starter-kit.pdf';
  document.querySelectorAll('form[data-lead]').forEach(function(form){
    var box=form.parentNode, ok=box.querySelector('.msg.ok'), err=box.querySelector('.msg.err'),
        btn=form.querySelector('button'), label=btn.textContent;
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var email=form.querySelector('input[type=email]').value.trim(), hp=form.querySelector('.hp').value;
      ok.style.display='none'; err.style.display='none';
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent='That email address doesn’t look right — mind checking it?'; err.style.display='block'; return; }
      btn.disabled=true; btn.textContent='Sending…';
      fetch(CAPTURE,{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({entity:'ARAI',dba:'Another Realm Gateway',source:form.dataset.source,email:email,_hp:hp})})
      .then(function(r){ if(!r.ok) throw new Error('status '+r.status);
        form.style.display='none';
        ok.innerHTML='You’re in. <a href="'+KIT_URL+'">Download the kit now →</a><br>Using a phone? <a href="/kit">Copy the prompts one tap at a time →</a>';
        ok.style.display='block'; })
      .catch(function(){
        err.innerHTML='Something went wrong on our end. You can still <a href="'+KIT_URL+'">download the kit here →</a>';
        err.style.display='block'; btn.disabled=false; btn.textContent=label; });
    });
  });
  var y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
})();
