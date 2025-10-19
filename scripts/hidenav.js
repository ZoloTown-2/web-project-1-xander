let button;
let nav;
let hidden = false;
document.addEventListener('DOMContentLoaded', () => {
  button = document.getElementById('hidenav');
  nav = document.getElementsByTagName('nav').item(0);
});
function hidenav() {
  if (hidden) {
    nav.style.position = 'sticky';
    button.innerHTML = '^';
  } else {
    nav.style.position = 'relative';
    button.innerHTML = '&#8964;';
  }
  hidden = !hidden;
}