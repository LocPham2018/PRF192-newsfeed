'use strict';

const taskInput = document.getElementById('input-task');
const addBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

const current = JSON.parse(getFromStorage(CURRENT, null));
const todoArr = JSON.parse(getFromStorage(TODOS, '[]')).map(task =>
	parseTodo(task)
);

const getTasksByOwner = owner => {
	return todoArr.filter(task => task.owner === owner);
};

const renderTasks = tasks => {
	todoList.innerHTML = '';

	tasks.forEach(task => {
		let item = document.createElement('li');
		if (task.isDone) {
			item.classList.add('checked');
		}
		item.innerHTML = `${task.task}<span class="close">x</span>`;
		todoList.appendChild(item);
	});
};

const findTask = (taskName, owner) => {
	let length = todoArr.length;
	for (let i = 0; i < length; i++) {
		let task = todoArr[i];
		if (task.task === taskName && task.owner === owner) {
			return i;
		}
	}
	return -1;
};

const addTask = (taskName, owner) => {
	let task = new Task(taskName, owner);
	todoArr.push(task);
	saveToStorage(TODOS, JSON.stringify(todoArr));
	let tasks = getTasksByOwner(owner);
	renderTasks(tasks);
};

const deleteTask = (taskName, owner) => {
	let i = findTask(taskName, owner);
	todoArr.splice(i, 1);
	saveToStorage(TODOS, JSON.stringify(todoArr));
	let tasks = getTasksByOwner(owner);
	renderTasks(tasks);
};

const toggleTask = (taskName, owner) => {
	let i = findTask(taskName, owner);
	todoArr[i].toggle();
	saveToStorage(TODOS, JSON.stringify(todoArr));
	let tasks = getTasksByOwner(owner);
	renderTasks(tasks);
};

if (current === null) {
	window.location.href = '../pages/login.html';
} else {
	const user = current.username;
	addBtn.addEventListener('click', () => {
		let taskName = taskInput.value;
		if (taskName != '') {
			addTask(taskName, user);
			taskInput.value = '';
		}
	});
	todoList.addEventListener('click', evt => {
		// console.log(evt.target.tagName);
		let targetElement = evt.target;
		if (targetElement.tagName === 'LI') {
			let taskName = targetElement.innerHTML.split('<')[0];
			toggleTask(taskName, user);
		}
		if (targetElement.tagName === 'SPAN') {
			let taskName = targetElement.parentElement.innerHTML.split('<')[0];
			deleteTask(taskName, user);
		}
	});
	let tasks = getTasksByOwner(user);
	renderTasks(tasks);
}
