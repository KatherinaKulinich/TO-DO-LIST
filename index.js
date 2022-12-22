const newTaskTodo = document.querySelector('#newTaskTodo');
const buttonCreateTask = document.querySelector('#buttonCreateTask');
const form = document.querySelector('#form');
const tasksList = document.querySelector('#tasksList');

const listFooter = document.querySelector('.list-footer');
const tasksSum = document.querySelector('#tasksSum');
const buttonDeleteAll = document.querySelector('#buttonDeleteAll');

const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
createList(allTasks);


function addNewTask(task) {

    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    data.push(task);
    localStorage.setItem('tasks', JSON.stringify(data));

    createList(data);
}


function CreateTask(id) {
    this.text = form.elements['newTaskTodo'].value.trim();
    this.id = id;
    this.check = false;
}


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = Date.now();
    const newTask = new CreateTask(id);

    if (newTask.text !== '') {
        addNewTask(newTask);
    }
    
    form.elements['newTaskTodo'].value = '';
})


function createList(array) {
    tasksList.replaceChildren();

    if (array.length > 0) {

        for (let obj of array) {
    
            const listItem = document.createElement('li');
            listItem.classList.add('list-item');
            const itemUnit = document.createElement('div');
            itemUnit.classList.add('item-unit');


            const buttonCheck = document.createElement('button');
            buttonCheck.setAttribute('data-check-id', `${obj.id}`);
            buttonCheck.classList.add('button-check');
            buttonCheck.setAttribute('type', 'button');
            const task = document.createElement('p');
            task.classList.add('list-item-text');
            task.textContent = `${obj.text}`;
            
            if (obj.check === true) {
                buttonCheck.classList.toggle('button-check-active');
                task.classList.toggle('list-item-text-checked');
            }

            const buttonDeleteItem = document.createElement('button');
            buttonDeleteItem.setAttribute('type', 'button');
            buttonDeleteItem.classList.add('button-trash');
            buttonDeleteItem.setAttribute('data-delete-id', `${obj.id}`)
            buttonDeleteItem.innerHTML = `<svg data-delete-id = ${obj.id} version="1.1" width="32" height="32" viewBox="0 0 32 32">
                                                <path data-delete-id = ${obj.id} d="M29.98 6.819c-0.096-1.57-1.387-2.816-2.98-2.816h-3v-1.002c0-1.657-1.344-3-3-3h-10c-1.657 0-3 1.343-3 3v1.001h-3c-1.595 0-2.885 1.246-2.981 2.816h-0.019v2.183c0 1.104 0.896 2 2 2v0 17c0 2.209 1.791 4 4 4h16c2.209 0 4-1.791 4-4v-17c1.104 0 2-0.896 2-2v-2.182h-0.020zM10 3.002c0-0.553 0.447-1 1-1h10c0.553 0 1 0.447 1 1v1h-12v-1zM26 28.002c0 1.102-0.898 2-2 2h-16c-1.103 0-2-0.898-2-2v-17h20v17zM28 8.001v1h-24v-1.999c0-0.553 0.447-1 1-1h22c0.553 0 1 0.447 1 1v0.999zM9 28.006h2c0.553 0 1-0.447 1-1v-13c0-0.553-0.447-1-1-1h-2c-0.553 0-1 0.447-1 1v13c0 0.553 0.447 1 1 1zM9 14.005h2v13h-2v-13zM15 28.006h2c0.553 0 1-0.447 1-1v-13c0-0.553-0.447-1-1-1h-2c-0.553 0-1 0.447-1 1v13c0 0.553 0.447 1 1 1zM15 14.005h2v13h-2v-13zM21 28.006h2c0.553 0 1-0.447 1-1v-13c0-0.553-0.447-1-1-1h-2c-0.553 0-1 0.447-1 1v13c0 0.553 0.447 1 1 1zM21 14.005h2v13h-2v-13z" fill="#FFFFFF" ></path>
                                          </svg>`;
            itemUnit.append(buttonCheck, task);
            listItem.append(itemUnit, buttonDeleteItem);
            tasksList.prepend(listItem); 
        }
    }

    getTasksSum(array);
}

function getTasksSum(array) {

    if (array.length === 1) {
        tasksSum.textContent = `${array.length} task`;
        return;
    }
    tasksSum.textContent = `${array.length} tasks`;
}



tasksList.addEventListener('click', (event) => {
    let elemChecked = Number(event.target.dataset.checkId);
    let elemDelete = Number(event.target.dataset.deleteId);
    console.warn(elemDelete);
    const data = JSON.parse(localStorage.getItem('tasks')) || [];

    if (elemChecked) {
        let check = event.target;
        check.classList.toggle('button-check-active');
        check.nextElementSibling.classList.toggle('list-item-text-checked');
        checkTask(data, elemChecked);
    }

    if (elemDelete) {
        deleteElem(data, elemDelete);
        createList(data);
    }
})


function checkTask(array, checkItem) {

    for (let obj of array) {

        if (obj.id === checkItem) {
            obj.check = true;
            localStorage.setItem('tasks', JSON.stringify(array));
        }
    }
}

function deleteElem(array, item) {

    for (let i = 0; i < array.length; i++) {

        if (item === array[i].id) {
            array.splice(i, 1);
            localStorage.setItem('tasks', JSON.stringify(array));
        }
    }
}


buttonDeleteAll.addEventListener('click', () => {

    localStorage.removeItem('tasks');
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    createList(data);
    form.elements['newTaskTodo'].value = '';
})




