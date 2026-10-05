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
