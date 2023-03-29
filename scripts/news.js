'use strict';

const newsContainer = document.getElementById('news-container');
const currentPageNum = document.getElementById('page-num');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');

const current = JSON.parse(getFromStorage(CURRENT, null));
const category = getFromStorage(CATEGORY, 'general');
const pageSize = getFromStorage(PAGESIZE, 5);
let currentPage = 1;

const getLink = (pageSize, page, category) =>
	`https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&category=${category}&apiKey=39b7e5c3d08b40218530dbed2b1aeffc`;

const renderNews = articles => {
	newsContainer.innerHTML = '';

	articles.forEach(article => {
		let newsCard = document.createElement('div');
		newsCard.classList.add('card', 'flex-row', 'flex-wrap', 'border-0');
		newsCard.innerHTML = `
			<div class="card mb-3">
				<div class="row no-gutters">
					<div class="col-md-4">
						<img src="${article.urlToImage}"
							class="card-img"
							alt="${article.title}">
					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${article.title}</h5>
							<p class="card-text">${article.description}</p>
							<a href="${article.url}" class="btn btn-primary">View</a>
						</div>
					</div>
				</div>
			</div>
		`;
		newsContainer.appendChild(newsCard);
	});
};

const renderPagination = (current, max) => {
	currentPageNum.textContent = current;
	if (max > 1) {
		// If there is only one page, prev and next btn are not necessary.
		// Because we hid prev and next btn before calling this function, 
		// we just need to render in case there are more than one page.
		if (current === 1) {
			prevBtn.classList.add('d-none');
			nextBtn.classList.remove('d-none');
		} else if (current === max) {
			prevBtn.classList.remove('d-none');
			nextBtn.classList.add('d-none');
		} else {
			prevBtn.classList.remove('d-none');
			nextBtn.classList.remove('d-none');
		}
	}
};

const render = async link => {
	try {
		let response = await fetch(link);
		let data = await response.json();
		let articles = data.articles;
		// console.log(articles[0]);
		let max = Math.ceil(data.totalResults / pageSize);

		renderPagination(currentPage, max);
		renderNews(articles);
	} catch (err) {
		console.log(err);
	}
};

prevBtn.addEventListener('click', () =>
	render(getLink(pageSize, --currentPage, category))
);
nextBtn.addEventListener('click', () =>
	render(getLink(pageSize, ++currentPage, category))
);

if (current === null) {
	// If no user log in, redirect to login page
	window.location.href = '../pages/login.html';
} else {
	// Hide prev and next btn before rendering
	prevBtn.classList.add('d-none');
	nextBtn.classList.add('d-none');

	render(getLink(pageSize, currentPage, category));
}
