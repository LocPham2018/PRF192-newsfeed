'use strict'

const firstnameInput = document.getElementById('input-firstname');
const lastnameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmInput = document.getElementById('input-password-confirm');
const submitBtn = document.getElementById('btn-submit');

// Get from local storage
const userArr = JSON.parse(getFromStorage(KEY, '[]'));

const validate = (data, confirmPass) => {
	if (data.username === '') {
		alert('Username must not be empty.');
		return false;
	}

	if (findUser(data.username) != -1) {
		alert('This username has been exist.');
		return false;
	}

	if (data.password.length <= 8) {
		alert('Password must have more than 8 characters.');
		return false;
	}

	if (data.password != confirmPass) {
		alert('Confirm password must match password.');
		return false;
	}

	if (data.firstname === '') {
		alert('Firstname must not be empty.');
		return false;
	}

	if (data.lastname === '') {
		alert('Lastname must not be empty.');
		return false;
	}

	return true;
}

const submit = () => {
	let data = new User(
		firstnameInput.value,
		lastnameInput.value,
		usernameInput.value,
		passwordInput.value
	);
	let confirmPass = confirmInput.value;

	if (validate(data, confirmPass)) {
		userArr.push(data);
		saveToStorage(KEY, JSON.stringify(userArr));
		window.location.href = '../pages/login.html';
	}
}

submitBtn.addEventListener('click', submit);

// If user has logged in, redirect to home page
if (getFromStorage(CURRENT, null) != null) {
	window.location.href = '../index.html';
}
