const addButton = document.querySelector("#add-btn")
const taskInput = document.querySelector('#todo-input')
const taskList = document.querySelector('#todo-list')

loadTask()

function addTask(){
    const task = taskInput.value.trim();
    
    if (task){
        createTaskElement(task)
        taskInput.value = "";
        saveTask()
    }else{
        alert('TYPE ENYTHING TO ADD TO THE LIST !!!')
    }
}

addButton.addEventListener('click', function(e){
    e.preventDefault();
    addTask();
})

document.addEventListener('keypress', (e) => {
    if (e.code === "Enter"){
        addTask()
    }
})

function createTaskElement(task){
    const listItem = document.createElement('li')
    listItem.textContent= task;

    const deleteBTN = document.createElement('button')
    deleteBTN.textContent = 'Delete'
    deleteBTN.className = 'delete-btn'

    listItem.appendChild(deleteBTN)
    taskList.appendChild(listItem)

    deleteBTN.addEventListener('click', () => {
        taskList.removeChild(listItem)
        saveTask()
    })
}

function saveTask(){
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item){
        tasks.push(item.textContent.replace('Delete', '').trim())
    })
    localStorage.setItem('task', JSON.stringify(tasks))
}

function loadTask (){
    const tasks = JSON.parse(localStorage.getItem('task')) || [];
    tasks.forEach(createTaskElement)
}