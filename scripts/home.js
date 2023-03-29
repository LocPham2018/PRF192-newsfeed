'use strict'

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeElement = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

const current = JSON.parse(getFromStorage(CURRENT, null));

const logout = () => {
	localStorage.removeItem(CURRENT);
	// When logging out, settings related to an user need to be removed
	localStorage.removeItem(PAGESIZE);
	localStorage.removeItem(CATEGORY);

	window.location.href = './pages/login.html';
}

if (current === null) {
	// Display login modal only
	loginModal.classList.remove('d-none');
	mainContent.classList.add('d-none');
} else {
	const currentUser = parseUser(current);
	// Display main content only
	loginModal.classList.add('d-none');
	mainContent.classList.remove('d-none');
	welcomeElement.textContent = `Welcome ${currentUser.firstname}`;
	logoutBtn.addEventListener('click', logout);
}
