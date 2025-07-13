const cursos = [
  { id: "introalcalculo", nombre: "Introducción al Cálculo", prerequisitos: [] },
  { id: "introalalgebra", nombre: "Introducción al Álgebra", prerequisitos: [] },
  { id: "introprogra", nombre: "Introducción a la Programación", prerequisitos: [] },
  { id: "filo", nombre: "Filosofía, ¿para qué?", prerequisitos: [] },
  { id: "taller", nombre: "Taller de Matemáticas para Estadística", prerequisitos: [] },
];

let progreso = JSON.parse(localStorage.getItem("progreso")) || [];

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.classList.add("curso");

    const todosCumplidos = curso.prerequisitos.every(pr => progreso.includes(pr));
    const yaAprobado = progreso.includes(curso.id);

    if (yaAprobado) {
      div.classList.add("aprobado");
    } else if (todosCumplidos) {
      div.classList.add("disponible");
      div.onclick = () => marcarAprobado(curso.id);
    } else {
      div.classList.add("bloqueado");
    }

    div.textContent = curso.nombre;
    contenedor.appendChild(div);
  });
}

function marcarAprobado(id) {
  if (!progreso.includes(id)) {
    progreso.push(id);
    localStorage.setItem("progreso", JSON.stringify(progreso));
    renderMalla();
  }
}

function resetProgreso() {
  localStorage.removeItem("progreso");
  progreso = [];
  renderMalla();
}

renderMalla();
