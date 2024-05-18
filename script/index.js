function moveToAction(){
    window.location.href = './action.html'
}
function moveToDashboard(){
    window.location.href = './index.html'
}
function moveToCompleted(){
    window.location.href = './completed.html'
}
function regestrarion(){
    event.preventDefault();
    let userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    if(userData.username == '' || userData.username == undefined || userData.username.lenght < 5 || userData.username.lenght > 15){
        regestrarion()
    };
    if(userData.username == '' || userData.username == undefined || userData.username.password < 8){
        regestrarion()
    };
    localStorage.setItem("userdata", JSON.stringify(userData));
    window.location.href = 'signin.html'
}
function authlog(){
    event.preventDefault();
    let userData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    let login = JSON.parse(localStorage.getItem('userdata'))
    if(login.username == userData.username && login.password == userData.password){
        window.location.href = './index.html'
    }
}
function signOut(){
    event.preventDefault();
    localStorage.removeItem("userdata")
    window.location.href = 'signin.html'
}
function openAddTask(){
    event.preventDefault();
    let opentask = document.getElementById('addtaskbl')
    opentask.style.display = 'flex'
}
function closeAddTask(){
    event.preventDefault();
    let opentask = document.getElementById('addtaskbl')
    opentask.style.display = 'none'
}
function saveNewTask() {
    event.preventDefault();
    let taskTitle = document.getElementById('addtitle').value;
    let taskDesc = document.getElementById('adddesc').value;

    let newTask = {
        title: taskTitle,
        description: taskDesc,
        status: 'active'
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    let taskCount = localStorage.getItem('taskcount') || 0;
    taskCount = Number(taskCount);

    const taskElement = document.createElement('section');
    taskElement.classList.add('task', 'active');
    taskElement.id = `generationtask${taskCount + 1}`;
    taskElement.innerHTML = `
        <div>
            <button onclick="toggleTaskStatus(${taskCount + 1})"></button>
            <p>${newTask.title}</p>
        </div>
    `;
    document.getElementById("task-contain").appendChild(taskElement);
    localStorage.setItem('taskcount', taskCount + 1);
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskContainer = document.getElementById('task-contain');

    tasks.forEach((task, index) => {
        let taskElement = document.createElement('section');
        taskElement.classList.add('task', task.status);
        taskElement.id = `generationtask${index + 1}`;
        taskElement.innerHTML = `
            <div>
                <button onclick="toggleTaskStatus(${index + 1})"></button>
                <p>${task.title}</p>
            </div>
        `;
        taskContainer.appendChild(taskElement);
    });
};

function toggleTaskStatus(taskIndex) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    if (taskIndex <= 0 || taskIndex > tasks.length) {
        console.error('Invalid task index');
        return;
    }

    let task = tasks[taskIndex - 1];
    task.status = task.status === 'active' ? 'taskend' : 'active';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    const taskElement = document.getElementById(`generationtask${taskIndex}`);
    
    if (!taskElement) {
        console.error('Task element not found');
        return;
    }
    taskElement.classList.remove('active', 'taskend');
    if (task.status === 'active') {
        taskElement.classList.add('active');
    } else {
        taskElement.classList.add('taskend');
    }
}

function applyTaskStyles() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach((task, index) => {
        const taskElement = document.getElementById(`generationtask${index + 1}`);

        if (taskElement) {
            taskElement.classList.remove('active', 'taskend');
            
            if (task.status === 'active') {
                taskElement.classList.add('active');
            } else {
                taskElement.classList.add('taskend');
            }
        } else {
            console.log('Task element not found for index ', index + 1);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTaskStyles();
});

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

let dataflex = document.getElementById('data')
dataflex.innerText = formattedDate
function deletetasks(){
    event.preventDefault();
    localStorage.removeItem('taskcount')
    localStorage.removeItem('tasks')
}



function moveTaskToContainer(taskElement, containerId) {
    const container = document.getElementById(containerId);
    if (container && taskElement) {
        container.appendChild(taskElement);
    }
}

function updateTaskElementClasses(taskElement, status) {
    taskElement.classList.remove('active', 'taskend');
    
    taskElement.classList.add(status === 'active' ? 'active' : 'taskend');
}

function updateTaskContainers() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const taskElement = document.getElementById(`generationtask${index + 1}`);

        if (taskElement) {
            console.log(`Updating task ${index + 1} with status ${task.status}`);
            
            updateTaskElementClasses(taskElement, task.status);
            
            if (task.status === 'active') {
                moveTaskToContainer(taskElement, 'task-contain-active');
            } else if (task.status === 'taskend') {
                moveTaskToContainer(taskElement, 'task-contain-end');
            }
        } else {
            console.log(`Task element not found for index ${index + 1}`);
        }
    });
}

function toggleTaskStatus(taskIndex) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (taskIndex <= 0 || taskIndex > tasks.length) {
        console.error('Invalid task index');
        return;
    }

    let task = tasks[taskIndex - 1];
    task.status = task.status === 'active' ? 'taskend' : 'active';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    const taskElement = document.getElementById(`generationtask${taskIndex}`);
    
    if (!taskElement) {
        console.error(`Task element not found for index ${taskIndex}`);
        return;
    }

    updateTaskElementClasses(taskElement, task.status);
    
    if (task.status === 'active') {
        moveTaskToContainer(taskElement, 'task-contain-active');
    } else if (task.status === 'taskend') {
        moveTaskToContainer(taskElement, 'task-contain-end');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTaskContainers();
});
