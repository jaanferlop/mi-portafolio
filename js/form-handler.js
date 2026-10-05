// form-handler.js: validación en tiempo real y envío simulado

const reglas = {
  nombre:  v => v.trim().length >= 3 ? '' : 'El nombre debe tener al menos 3 caracteres',
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Ingresa un correo válido',
  asunto:  v => v ? '' : 'Selecciona un asunto',
  mensaje: v => v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres'
};

// Valida un campo y actualiza su estado visual. Devuelve true si es válido.
function validarCampo(input) {
  const error = reglas[input.name](input.value);
  const campo = input.closest('.field');
  campo.classList.toggle('invalido', Boolean(error));
  campo.classList.toggle('valido', !error);
  document.querySelector(`#error-${input.name}`).textContent = error;
  return !error;
}

function iniciarFormulario() {
  const formulario = document.querySelector('#form-contacto');
  const estado = document.querySelector('#form-estado');
  const campos = formulario.querySelectorAll('input, select, textarea');

  // Validación en tiempo real
  campos.forEach(c => {
    c.addEventListener('input', () => validarCampo(c));
    c.addEventListener('blur', () => validarCampo(c));
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const todosValidos = [...campos].map(validarCampo).every(Boolean);

    if (!todosValidos) {
      estado.style.color = 'var(--color-error)';
      estado.textContent = 'Revisa los campos marcados.';
      return;
    }

    // Envío simulado (sin backend)
    estado.style.color = 'var(--color-ok)';
    estado.textContent = 'Enviando...';
    setTimeout(() => {
      estado.textContent = '¡Mensaje enviado! Gracias por contactarme.';
      formulario.reset();
      campos.forEach(c => c.closest('.field').classList.remove('valido', 'invalido'));
    }, 800);
  });
}
