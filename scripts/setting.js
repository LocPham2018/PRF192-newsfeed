'use strict'

const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');

const current = JSON.parse(getFromStorage(CURRENT, null));
const category = getFromStorage(CATEGORY, 'general');
const pageSize = getFromStorage(PAGESIZE, 5);

if (current === null) {
	// If no user log in, redirect to login page
	window.location.href = '../pages/login.html';
} else {
	pageSizeInput.value = pageSize;
	categoryInput.value = category;
	saveBtn.addEventListener('click', () => {
		if (pageSizeInput.value <= 0 || pageSizeInput.value > 50) {
			alert('Invalid page size.');
			return;
		}
		saveToStorage(PAGESIZE, parseInt(pageSizeInput.value));
		saveToStorage(CATEGORY, categoryInput.value);
		alert('Changed.');
	});
}
