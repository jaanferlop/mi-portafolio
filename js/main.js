// main.js: menú responsive, tema claro/oscuro y carga dinámica de proyectos

// Datos de proyectos (reemplazar por los proyectos reales)
const proyectos = [
  {
    titulo: "Control de Inventario de Joyería",
    descripcion: "Prototipo para registrar y auditar existencias de piezas por sucursal.",
    tecnologias: ["HTML5", "CSS3", "JS"],
    imagen: "assets/images/proyecto1.svg",
    enlace: "#"
  },
  {
    titulo: "Panel de Hallazgos de Auditoría",
    descripcion: "Tablero que resume hallazgos, riesgos y estado de acciones correctivas.",
    tecnologias: ["HTML5", "CSS Grid", "JS"],
    imagen: "assets/images/proyecto2.svg",
    enlace: "#"
  },
  {
    titulo: "Calculadora de Quilates y Precio",
    descripcion: "Herramienta web para estimar el valor de una pieza según peso y pureza.",
    tecnologias: ["HTML5", "Flexbox", "JS"],
    imagen: "assets/images/proyecto3.svg",
    enlace: "#"
  }
];

// Renderiza las tarjetas de proyectos en el DOM
function renderizarProyectos() {
  const contenedor = document.querySelector('#proyectos-grid');
  if (!contenedor) return;

  proyectos.forEach(proyecto => {
    const card = document.createElement('article');
    card.className = 'proyecto-card reveal';
    card.innerHTML = `
      <img src="${proyecto.imagen}" alt="Vista previa de ${proyecto.titulo}">
      <div class="card-body">
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
        <div class="tecnologias">
          ${proyecto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <a href="${proyecto.enlace}" class="btn">Ver proyecto</a>
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

document.addEventListener('DOMContentLoaded', () => {
  renderizarProyectos();
  iniciarMenu();
  iniciarTema();
  iniciarAnimaciones();   // definido en animations.js
  iniciarFormulario();    // definido en form-handler.js
});
