// main.js: menú responsive, tema claro/oscuro y carga dinámica de proyectos

// Datos de proyectos.
// estado: "desarrollo" | "pausa" | "terminado". enlace: vacío si aún no hay demo pública.
const proyectos = [
  {
    titulo: "Módulo de Gestión de Auditoría",
    descripcion: "Aplicación web que digitaliza las auditorías presenciales en puntos de venta y reemplaza el trabajo manual en Excel: inventarios, arqueo de efectivo, lista de chequeo, informes financieros y análisis de riesgos, con reportes PDF, trabajo en equipo y permisos por rol. Ya se usa en auditorías reales; pendiente de integrarse al sistema principal de la empresa.",
    tecnologias: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "Jinja2", "JavaScript", "ReportLab", "pytest"],
    estado: "desarrollo",
    imagen: "assets/images/proyecto1.svg",
    enlace: ""
  },
  {
    titulo: "Audilab",
    descripcion: "Plataforma gamificada de aprendizaje para auditores. Con la guía de Lupo, su mascota, plantea casos de hallazgos para resolver (qué harías y cómo lo harías) y evalúa las respuestas con puntajes y una ruta de crecimiento por niveles, como en un juego.",
    tecnologias: ["Python", "HTML", "CSS"],
    estado: "desarrollo",
    imagen: "assets/images/audilab-lupo.svg",
    imagenAlt: "Lupo, el búho guía de Audilab, sosteniendo una lupa",
    imagenContenida: true,   // ilustración: se muestra completa, sin recortar
    enlace: ""
  },
  {
    titulo: "Herramienta de Alertas para Auditoría",
    descripcion: "Procesa reportes exportados del sistema (CSV y Excel), cruza la información y genera un panel de alertas priorizadas con un ranking de riesgo, para que la auditoría sepa por dónde empezar. Arquitectura modular: cada análisis es un módulo que se conecta al motor de alertas.",
    tecnologias: ["Python", "pandas", "openpyxl", "matplotlib"],
    estado: "pausa",
    imagen: "assets/images/proyecto3.svg",
    enlace: ""
  }
];

// Texto visible de cada estado
const ESTADOS = {
  desarrollo: "En desarrollo",
  pausa: "En pausa",
  terminado: "Terminado"
};

// Renderiza las tarjetas de proyectos en el DOM
function renderizarProyectos() {
  const contenedor = document.querySelector('#proyectos-grid');
  if (!contenedor) return;

  proyectos.forEach(proyecto => {
    const card = document.createElement('article');
    card.className = 'proyecto-card reveal';
    // Las tecnologías y el botón solo se muestran si hay datos
    const tecnologias = proyecto.tecnologias.length
      ? `<div class="tecnologias">${proyecto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}</div>`
      : '';
    const boton = proyecto.enlace
      ? `<a href="${proyecto.enlace}" class="btn">Ver proyecto</a>`
      : '';

    card.innerHTML = `
      <img src="${proyecto.imagen}"
           alt="${proyecto.imagenAlt || `Vista previa de ${proyecto.titulo}`}"
           class="${proyecto.imagenContenida ? 'contenida' : ''}">
      <div class="card-body">
        <span class="estado estado-${proyecto.estado}">${ESTADOS[proyecto.estado]}</span>
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
        ${tecnologias}
        ${boton}
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// Menú hamburguesa
function iniciarMenu() {
  const toggle = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#menu');

  const cerrar = () => {
    menu.classList.remove('abierto');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    toggle.setAttribute('aria-expanded', String(abierto));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
}

// Tema claro/oscuro con persistencia
function iniciarTema() {
  const boton = document.querySelector('#theme-toggle');
  const aplicar = (tema) => {
    document.documentElement.setAttribute('data-theme', tema);
    boton.textContent = tema === 'dark' ? '☀️' : '🌙';
  };

  let guardado = 'light';
  try { guardado = localStorage.getItem('tema') || 'light'; } catch (e) { /* sin storage */ }
  aplicar(guardado);

  boton.addEventListener('click', () => {
    const nuevo = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicar(nuevo);
    try { localStorage.setItem('tema', nuevo); } catch (e) { /* sin storage */ }
  });
}

// Resalta en el menú la sección que se está viendo
function iniciarMenuActivo() {
  const enlaces = document.querySelectorAll('#menu a');
  const secciones = document.querySelectorAll('main section[id]');
  if (!('IntersectionObserver' in window)) return;

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      enlaces.forEach(a => {
        a.classList.toggle('activo', a.getAttribute('href') === `#${entrada.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secciones.forEach(s => observador.observe(s));
}

// Botón "volver arriba": aparece después de bajar 400px
function iniciarVolverArriba() {
  const boton = document.querySelector('#volver-arriba');

  window.addEventListener('scroll', () => {
    boton.classList.toggle('visible', window.scrollY > 400);
  });
  boton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProyectos();
  iniciarMenu();
  iniciarTema();
  iniciarMenuActivo();
  iniciarVolverArriba();
  iniciarAnimaciones();   // definido en animations.js
  iniciarFormulario();    // definido en form-handler.js
});
