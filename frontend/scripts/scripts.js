const API_URL = "http://localhost:3000/tasks";

document.addEventListener("DOMContentLoaded", async () => {
  await loadForm();
  await loadTasks();
});

async function loadForm() {
  const formContainer = document.getElementById("task-form-container");
  const formHtml = await fetch("./components/form.html").then((res) =>
    res.text()
  );
  formContainer.innerHTML = formHtml;

  const form = document.getElementById("task-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const rawDate = document.getElementById("dueDate").value;
    const dueDate = new Date(`${rawDate}T12:00:00`).toISOString();

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, dueDate }),
    });

    form.reset();
    await loadTasks();
  });
}

async function loadTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const tasks = await fetch(API_URL).then((res) => res.json());

  for (const task of tasks) {
    const itemHtml = await fetch("./components/task-item.html").then((res) =>
      res.text()
    );
    const taskHtml = itemHtml
      .replace(/{id}/g, task.id)
      .replace("{name}", task.name)
      .replace("{description}", task.description)
      .replace("{dueDate}", formatDate(task.dueDate))
      .replace("{completed}", task.completed ? "Concluída" : "Concluir");

    const li = document.createElement("div");
    li.innerHTML = taskHtml;
    const taskElement = li.firstElementChild;

    if (task.completed) {
      taskElement.classList.add("completed");
      taskElement.querySelector(".complete-btn").classList.add("completed");
    }

    taskElement
      .querySelector(".complete-btn")
      .addEventListener("click", async () => {
        await fetch(`${API_URL}/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        });
        await loadTasks();
      });

    taskElement
      .querySelector(".delete-btn")
      .addEventListener("click", async () => {
        await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
        await loadTasks();
      });

    taskList.appendChild(taskElement);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR");
}
