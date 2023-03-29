'use strict';

// Keys
const KEY = 'USER_ARRAY';
const CURRENT = 'CURRENT_USER';
const TODOS = 'TODO_LIST';
const PAGESIZE = 'PAGESIZE';
const CATEGORY = 'CATEGORY';

// Access to local storage
function saveToStorage(key, value) {
	localStorage.setItem(key, value);
}

function getFromStorage(key, def) {
	return localStorage.getItem(key) ?? def;
}

function parseUser(userData) {
	return new User(
		userData.firstname,
		userData.lastname,
		userData.username,
		userData.password
	);
}

function parseTodo(data) {
	return new Task(
		data.task,
		data.owner,
		data.isDone
	);
}

function findUser(userId) {
	let length = userArr.length;
	for (let i = 0; i < length; i++) {
		if (userArr[i].username === userId) {
			return i;
		}
	}
	return -1;
}
