let tareas = [
    { id: 16, descripcion: "Hacer mercado", realizada: true },
    { id: 60, descripcion: "Estudiar para la prueba", realizada: false },
    { id: 24, descripcion: "Sacar a pasear a Tobby", realizada: false }
  ];
  
  //elementos del DOM
  const inputTarea = document.getElementById("nuevaTarea");
  const btnAgregar = document.getElementById("btnAgregar");
  const listaTareas = document.getElementById("listaTareas");
  const totalTareas = document.getElementById("totalTareas");
  const tareasRealizadas = document.getElementById("tareasRealizadas");
  
  //renderizar tareas
  function renderizarTareas() {
    listaTareas.innerHTML = ""; // Limpiar lista
    tareas.forEach(tarea => {
      const fila = document.createElement("tr");
      fila.className = tarea.realizada ? "completed" : "";
      fila.innerHTML = `
        <td>${tarea.id}</td>
        <td>${tarea.descripcion}</td>
        <td>
          <input type="checkbox" ${tarea.realizada ? "checked" : ""} 
            onclick="cambiarEstado(${tarea.id})">
        </td>
        <td>
          <span class="delete-btn" onclick="eliminarTarea(${tarea.id})">&times;</span>
        </td>
      `;
      listaTareas.appendChild(fila);
    });
    actualizarResumen();
  }
  
  //actualiza el resumen
  function actualizarResumen() {
    totalTareas.textContent = tareas.length;
    tareasRealizadas.textContent = tareas.filter(t => t.realizada).length;
  }
  
  // agrega una nueva tarea
  btnAgregar.addEventListener("click", () => {
    const descripcion = inputTarea.value.trim();
    if (descripcion === "") return;
  
    const nuevaTarea = {
      id: Date.now(),
      descripcion: descripcion,
      realizada: false
    };
  
    tareas.push(nuevaTarea);
    inputTarea.value = "";
    renderizarTareas();
  });
  
  // cambia el estado de una tarea
  function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      tarea.realizada = !tarea.realizada;
      renderizarTareas();
    }
  }
  
  // eliminar una tarea
  function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
  }
  
  renderizarTareas();
  