document.body.addEventListener('contextmenu', event => {
  event.preventDefault();
  alert(event.target.id || event.target.tagName);
})