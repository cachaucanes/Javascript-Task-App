document.getElementById('formTasks').addEventListener('submit', saveTasks);

function saveTasks(e) {
  e.preventDefault()

  let title = document.getElementById('title').value
  let description = document.getElementById('description').value

  const task = {
    title,
    description
  }

  if (localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  else {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))    
  }
  showMessage('Task Added Successfully', 'success')
  document.getElementById('formTasks').reset()
  document.getElementById('title').focus()
  getTasks()

}

function getTasks() {
  let tasksView = document.getElementById('tasks')
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  tasksView.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title
    let description = tasks[i].description

    tasksView.innerHTML += `<div class="card mb-3">
      <div class="card-body">
        <p>${title} - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTasks('${title}')">Delete</a>
      </div>
    </div>`
  }
}

function deleteTasks(title) {
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1) //quitar un dato en el indice y cuantos quitar      
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
  showMessage('Product delete successfully', 'danger')
  getTasks()
}

function showMessage(message, color) {
  const div = document.createElement('div')
  div.className = `alert alert-${color} mt-2`;
  div.appendChild(document.createTextNode(message))
  //Mostrando en el dom
  const container = document.querySelector('#container-main')
  const app = document.querySelector('#app')
  container.insertBefore(div, app)
  //Tiempo del mensaje
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
}

getTasks()