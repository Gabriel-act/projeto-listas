const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector('#task-title-input')
const todoListsUl = document.querySelector('#todo-list')
let tasks = []

// Lógica leva em consideração que nenhuma tarefa tem o mesmo nome

form.addEventListener('submit', (event) => {
    // Evita o comportamento padrão de carregar a página ao submeter o formulário
    event.preventDefault() 

    const taskTitle = taskTitleInput.value

    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter 3 ou mais caracteres')
        return
    }

    // Adicionando a nova tarefa no array de tasks (como objeto)
    tasks.push({
        title: taskTitle,
        done: false,
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))

    // Adicionando a nova tarefa no HTML de forma dinâmica
    const li = document.createElement('li')

    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    // Adicionando o evento check/checked
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement
        const spanToToggle = liToToggle.querySelector('span')
        const done = event.target.checked
        if (done) {
            spanToToggle.style.textDecoration = 'line-through'
        } else {
            spanToToggle.style.textDecoration = 'none'
        }
        // Além de alterar o HTML, é necessário alterar o array também
        // Utilizar o map para alterar o done dentro do array
        // Atribuir o novo array ao array tasks novamente
        tasks = tasks.map(t => {
            if (t.title === spanToToggle.textContent) {
                return {
                    title: t.title,
                    done: !t.done,
                }
            }
            return t
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    const span = document.createElement('span')
    span.textContent = taskTitle

    const button = document.createElement('button')
    button.textContent = 'Remover'

    // Adicionando evento para botão remover
    button.addEventListener('click', (event) => {
        // Removendo o elemento Pai (HTML), que no caso é a tag li
        // É necessário remover também, o objeto criado dentro do array tasks
        // Passo1: Criar uma variável para atribuir o evento, com target na tag Pai
        // Passo2: Criar uma variável para atribuir o nome da tarefa (span)
        // Passo3: Utilizando o filter, gerar um novo array sem a tarefa removida
        const toRemove = event.target.parentElement
        const titleRemove = toRemove.querySelector('span').textContent
        tasks = tasks.filter(t => t.title !== titleRemove)
        todoListsUl.removeChild(toRemove)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    todoListsUl.appendChild(li)

    // Limpar o input após a adição da tarefa
    taskTitleInput.value = ''
})