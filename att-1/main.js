// Select DOM elements
const app = document.querySelector('#app')
const input = app.querySelector('#task-input')
const addButton = app.querySelector('#add-button')
const list = app.querySelector('#list')
const itemTemplate = list.querySelector('template')

// Save tasks to local storage
function saveToLocalStorage() {
  const tasks = []

  list.querySelectorAll('li').forEach(li => {
    const title = li.querySelector('.title').textContent
    tasks.push(title)
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Load tasks from local storage and add them to the list
function loadFromLocalStorage() {
  const tasks = JSON.parse(
    localStorage.getItem('tasks') || '[]'
  )

  tasks.forEach(title => {
    const task = createDomTask(title)
    list.appendChild(task)
  })
}

// Create a DOM element for a task
function createDomTask(title) {
  const task = itemTemplate.content.cloneNode(true)

  task.querySelector('.title').textContent = title

  task.querySelector('.bt-delete')
    .addEventListener('click', (e) => {

      e.target.closest('li').remove()

      saveToLocalStorage()
    })

  return task
}

// Create a new task and add it to the list
function createNewTask() {
  const title = input.value.trim()

  if (!title) return

  const task = createDomTask(title)

  list.appendChild(task)

  input.value = ''

  saveToLocalStorage()
}

// Event listeners
addButton.addEventListener(
  'click',
  createNewTask
)

input.addEventListener('keypress', (e) =>
  (e.key === 'Enter'
    ? createNewTask()
    : null)
)

// Load tasks from local storage on page load
loadFromLocalStorage()