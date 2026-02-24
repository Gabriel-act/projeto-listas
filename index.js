const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector('#task-title-input')
const todoListsUl = document.querySelector('#todo-list')
let tasks = []

form.addEventListener('submit', (event) => {
    event.preventDefault() // Evita o comportamento padrão de carregar a página ao submeter o formulário

    const taskTitle = taskTitleInput.value
    if (taskTitle.lenght < 3) {
        alert('Sua tarefa precisa ter 3 ou mais caracteres')
    }
    // Adicionando a nova tarefa no array de tasks
    tasks.push(taskTitle)
    // Adicionando a nova tarefa no HTML com a tag li
    const li = document.createElement('li')
    li.textContent = taskTitle
    todoListsUl.appendChild(li)
})

