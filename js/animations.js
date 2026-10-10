// animations.js: aparición suave de elementos al hacer scroll

function iniciarAnimaciones() {
  const elementos = document.querySelectorAll('.reveal, .section h2, .about, .form');
  elementos.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => observador.observe(el));
}

// Línea de tiempo: resalta la tarjeta que pasa por el centro de la pantalla.
// En escritorio también se resalta con el mouse (CSS :hover); esto cubre el celular.
function iniciarTimelineActiva() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length || !('IntersectionObserver' in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      entrada.target.classList.toggle('en-foco', entrada.isIntersecting);
    });
  }, { rootMargin: '-45% 0px -45% 0px' });   // franja del 10% central de la pantalla

  items.forEach(item => observador.observe(item));
}
