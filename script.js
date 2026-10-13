(() => {
  const panel = document.getElementById('panel');
  const title = document.getElementById('panel-title');
  const body = document.getElementById('panel-body');
  let opener = null;

  function openSection(id, trigger) {
    const tpl = document.getElementById(id);
    if (!tpl) return;
    opener = trigger;
    title.textContent = tpl.dataset.title;
    body.replaceChildren(tpl.content.cloneNode(true));
    panel.showModal();
    panel.scrollTop = 0;
    history.replaceState(null, '', '#' + id);
  }

  document.querySelectorAll('[data-open]').forEach(btn =>
    btn.addEventListener('click', () => openSection(btn.dataset.open, btn)));

  panel.querySelector('.close').addEventListener('click', () => panel.close());
  panel.addEventListener('click', e => { if (e.target === panel) panel.close(); });
  panel.addEventListener('close', () => {
    history.replaceState(null, '', location.pathname);
    if (opener) opener.focus();
  });

  const hash = location.hash.slice(1);
  if (hash) {
    const trigger = document.querySelector(`[data-open="${hash}"]`);
    if (trigger) openSection(hash, trigger);
  }
})();
