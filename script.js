// Bitácora — lógica de la lista de tareas.
// Nota: el estado vive solo en memoria (array "entries").
// Al recargar la página se reinicia. Está pensado así a propósito:
// el objetivo de este proyecto es practicar Git, no construir
// persistencia todavía. ¡Ese podría ser tu próximo ejercicio!

const entries = [];
let nextId = 1;
let currentFilter = "todas";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("log-list");
const countLabel = document.getElementById("entry-count");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");

function shortHash(id) {
  // Genera un pseudo-hash de 7 caracteres, como un commit de Git.
  return id.toString(16).padStart(7, "0").slice(-7);
}

function formatTime(date) {
  return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

function addEntry(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  entries.push({
    id: nextId++,
    text: trimmed,
    done: false,
    createdAt: new Date(),
  });

  input.value = "";
  render();
}

function toggleEntry(id) {
  const entry = entries.find((e) => e.id === id);
  if (entry) entry.done = !entry.done;
  render();
}

function deleteEntry(id) {
  const index = entries.findIndex((e) => e.id === id);
  if (index !== -1) entries.splice(index, 1);
  render();
}

function matchesFilter(entry) {
  if (currentFilter === "pendientes") return !entry.done;
  if (currentFilter === "hechas") return entry.done;
  return true;
}

function render() {
  list.innerHTML = "";

  const visible = entries.filter(matchesFilter);

  visible.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "log-entry" + (entry.done ? " done" : "");

    const hash = document.createElement("span");
    hash.className = "hash";
    hash.textContent = shortHash(entry.id);

    const text = document.createElement("span");
    text.className = "entry-text";
    text.textContent = entry.text;
    text.addEventListener("click", () => toggleEntry(entry.id));

    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = formatTime(entry.createdAt);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.setAttribute("aria-label", "Eliminar entrada");
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => deleteEntry(entry.id));

    li.append(hash, text, timestamp, deleteBtn);
    list.appendChild(li);
  });

  countLabel.textContent = `${entries.length} entrada${entries.length === 1 ? "" : "s"}`;
  emptyState.classList.toggle("visible", entries.length === 0);
}

addBtn.addEventListener("click", () => addEntry(input.value));
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addEntry(input.value);
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
