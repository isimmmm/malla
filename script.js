const cursos = [
  { id: "introalcalculo", nombre: "Introducción al Cálculo", prerequisitos: [], semestre: 1 },
  { id: "introalalgebra", nombre: "Introducción al Álgebra", prerequisitos: [], semestre: 1 },
  { id: "introprogra", nombre: "Introducción a la Programación", prerequisitos: [], semestre: 1 },
  { id: "taller", nombre: "Taller de Matemáticas para Estadística", prerequisitos: [], semestre: 1 },
  { id: "progra", nombre: "Programación Avanzada", prerequisitos: ["introprogra"], semestre: 2 },
  { id: "introciencias", nombre: "Introducción a la Ciencia de Datos", prerequisitos: ["introalalgebra", "introprogra"], semestre: 2 },
  { id: "algebralinealcd", nombre: "Álgebra Lineal para Ciencias de Datos", prerequisitos: ["introprogra", "introalcalculo", "introalalgebra"], semestre: 2 },
  { id: "calculo1", nombre: "Cálculo I", prerequisitos: ["introalcalculo"], semestre: 2 },
  { id: "matesdiscretas", nombre: "Matemáticas Discretas", prerequisitos: ["algebralinealcd"], semestre: 3 },
  { id: "calculocd", nombre: "Cálculo para Ciencia de Datos", prerequisitos: ["calculo1", "algebralinealcd"], semestre: 3 },
  { id: "algebralinealavanzada", nombre: "Álgebra Lineal Avanzada y Modelamiento", prerequisitos: ["algebralinealcd", "calculo1"], semestre: 3 },
  { id: "etica", nombre: "Ética para Ciencia de Datos y Estadística", prerequisitos: ["introciencias", "progra"], semestre: 3 },
  { id: "modelosprobabilisticos", nombre: "Modelos Probabilísticos", prerequisitos: ["calculocd", "algebralinealavanzada"], semestre: 4 },
  { id: "datosyalg", nombre: "Estructuras de Datos y Algoritmos", prerequisitos: ["matesdiscretas", "progra"], semestre: 4 },
  { id: "bdd", nombre: "Bases de Datos", prerequisitos: ["progra"], semestre: 4 },
  { id: "opti", nombre: "Optimización para Ciencia de Datos", prerequisitos: ["algebralinealcd", "calculocd"], semestre: 4 },
  { id: "inferencia", nombre: "Inferencia Estadística", prerequisitos: ["modelosprobabilisticos"], semestre: 5 },
  { id: "ia", nombre: "Inteligencia Artificial", prerequisitos: ["modelosprobabilisticos", "progra"], semestre: 5 },
  { id: "procdm", nombre: "Procesamiento Datos Masivos", prerequisitos: ["bdd", "datosyalg"], semestre: 5 },
  { id: "opr1", nombre: "OPR o MINOR", prerequisitos: [], semestre: 5 },
  { id: "pea", nombre: "Procesos Estocásticos Aplicados", prerequisitos: ["inferencia"], semestre: 6 },
  { id: "analisis", nombre: "Análisis de Regresión", prerequisitos: ["inferencia"], semestre: 6 },
  { id: "visinf", nombre: "Visualización de Información", prerequisitos: ["introprogra"], semestre: 6 },
  { id: "mineria", nombre: "Minería de Datos", prerequisitos: ["introprogra", "modelosprobabilisticos", "algebralinealcd"], semestre: 6 },
  { id: "simes", nombre: "Simulación Estocástica", prerequisitos: ["pea"], semestre: 7 },
  { id: "metodos", nombre: "Métodos Bayesianos", prerequisitos: ["inferencia"], semestre: 7 },
  { id: "taa", nombre: "Teoría de Aprendizaje Automático", prerequisitos: ["inferencia", "opti", "procdm"], semestre: 7 },
  { id: "opr2", nombre: "OPR o MINOR", prerequisitos: [], semestre: 7 },
  { id: "graduacion", nombre: "Proyecto de Graduación", prerequisitos: ["etica", "opti", "taa", "metodos"], semestre: 8 },
  { id: "opr3", nombre: "OPR o MINOR", prerequisitos: [], semestre: 8 },
  { id: "opr4", nombre: "OPR o MINOR", prerequisitos: [], semestre: 8 },
  { id: "opr5", nombre: "OPR o MINOR", prerequisitos: [], semestre: 8 },
];

let progreso = JSON.parse(localStorage.getItem("progreso")) || [];

function renderMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  // Obtener semestres únicos ordenados
  const semestres = [...new Set(cursos.map(c => c.semestre))].sort((a, b) => a - b);

  semestres.forEach(semestre => {
    // Crear contenedor semestre
    const divSemestre = document.createElement("div");
    divSemestre.classList.add("semestre");

    // Título semestre
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    divSemestre.appendChild(titulo);

    // Filtrar cursos de ese semestre
    const cursosSemestre = cursos.filter(c => c.semestre === semestre);

    // Crear contenedor cursos semestre
    const cursosDiv = document.createElement("div");
    cursosDiv.classList.add("cursos-semestre");

    cursosSemestre.forEach(curso => {
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
      cursosDiv.appendChild(div);
    });

    divSemestre.appendChild(cursosDiv);
    contenedor.appendChild(divSemestre);
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
