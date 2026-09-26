/* Gateway share button — Web Share API where available, copy-link fallback. */
(function(){
  function label(el,txt,ms){var b=el.querySelector('button');if(!b)return;var old=b.textContent;b.textContent=txt;setTimeout(function(){b.textContent=old},ms||2600)}
  function copy(url,el){
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(function(){label(el,'Link copied')},function(){prompt('Copy this link:',url)});return}
    var t=document.createElement('textarea');t.value=url;t.setAttribute('readonly','');t.style.position='fixed';t.style.left='0';t.style.opacity='0';
    document.body.appendChild(t);t.focus();t.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(t);
    ok?label(el,'Link copied'):prompt('Copy this link:',url);
  }
  document.querySelectorAll('[data-share]').forEach(function(el){
    var url=el.dataset.url||window.location.href.split('#')[0];
    var text=el.dataset.text||'Thought you might like this:';
    var title=el.dataset.title||document.title;
    var btn=document.createElement('button');
    btn.type='button';btn.className='btn line';btn.textContent='Share with a friend';
    btn.addEventListener('click',function(){
      if(navigator.share){navigator.share({title:title,text:text,url:url}).catch(function(){});return}
      copy(url,el);
    });
    el.appendChild(btn);
  });
})();
