'use strict';

const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

// Get from local storage
const userArr = JSON.parse(getFromStorage(KEY, '[]'));

const validate = data => {
	if (data.username === '') {
		alert('Username must not be empty.');
		return false;
	}

	if (data.password.length <= 8) {
		alert('Password must have more than 8 characters.');
		return false;
	}

	return true;
};

const login = () => {
	const data = {
		username: usernameInput.value,
		password: passwordInput.value
	};

	if (validate(data)) {
		let i = findUser(data.username);
		if (i === -1) {
			alert('Invalid username.');
		} else {
			const user = parseUser(userArr[i]);
			if (user.password === data.password) {
				saveToStorage(CURRENT, JSON.stringify(user));
				window.location.href = '../index.html';
			} else {
				alert('Invalid password.');
			}
		}
	}
}

loginBtn.addEventListener('click', login);

// If user has logged in, redirect to home page
if (getFromStorage(CURRENT, null) != null) {
	window.location.href = '../index.html';
}
