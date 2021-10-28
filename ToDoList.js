let $todoInput;
let $alertInfo; 
let $addButton;
let $ulList;
let $newTask; 
let $popup;
let $popupInfo; 
let $editedTodo; 
let $popupInput;
let $confirmPopupBtn; 
let $closePopupBtn; 
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addButton = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $confirmPopupBtn = document.querySelector('.accept');
    $closePopupBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
}

const prepareDOMEvents = () => {
    $addButton.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closePopupBtn.addEventListener('click', closePopup);
    $confirmPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
}

const addNewTask = () => {
    if ($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        createToolsArea();
        $todoInput.value = '';
        $alertInfo.innerText = '';
    }else{
        $alertInfo.innerText = 'Wpisz treść zadania!';
    }
}

const enterCheck = () => {
    if (event.keyCode === 13){
        addNewTask();
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    toolsPanel.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    toolsPanel.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = "<i class='fas fa-times'></i>";
    toolsPanel.appendChild(deleteBtn);
}

const checkClick = (event) => {
    if(event.target.closest('button').classList.contains('complete')){
        event.target.closest('li').classList.toggle('completed');
        event.target.closest('button').classList.toggle('completed');
    }else if(event.target.closest('button').className ==='edit'){
        editTask(event);
    }else if(event.target.closest('button').className ==='delete'){
        deleteTask(event);
    }
}

const editTask = (event) => {
    $popup.style.display = 'flex';
    const oldTodo = event.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
}

const changeTodo = () => {
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    }else{
        $popupInfo.innerText = 'Musisz podać jakąś treść.';
    }
}

const closePopup = () => {
    $popup.style.display = 'none';
    $popupInfo.innerText = '';
}

const deleteTask = (event) => {
    const deleteTodo = event.target.closest('li');
    deleteTodo.remove();
    
    if ($allTasks.length === 0){
        $alertInfo.innerText = 'Brak zadań na liście.';
    }
}

document.addEventListener('DOMContentLoaded', main);