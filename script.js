const cursos = [
  { id: "calculo1", nombre: "Cálculo I", prerequisitos: [] },
  { id: "algebra", nombre: "Álgebra", prerequisitos: [] },
  { id: "calculo2", nombre: "Cálculo II", prerequisitos: ["calculo1"] },
  { id: "fisica", nombre: "Física", prerequisitos: ["calculo1", "algebra"] },
  { id: "ecuaciones", nombre: "Ecuaciones Dif.", prerequisitos: ["calculo2"] },
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
