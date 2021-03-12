// pagination api
export default class NewsApiService {
  //
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const URL = `https://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=3&page=${this.page}`;
    const options = {
      headers: {
        Authorization: '1a20ea2bce06456c8b2837e6fda6781c',
      },
    };

    return fetch(URL, options)
      .then(r => r.json())
      .then(data => {
        // console.log(data);
        this.page += 1;

        // console.log(data.articles);
        return data.articles;
      });
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
  //
}

// ======================
// fetch('https://restcountries.eu/rest/v2/name/united');
// ================

// import LoadMoreBtn from './components/load-more-btn';
// import NewsApiService from './pagination-api';
import articlesTemplate from './templates/country-tmpl.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

// v2. --- Load more button ---
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// -----------------------------
const apiService = new NewsApiService();

// let searchQuery = '';

// refs.loadMoreBtn.addEventListener('click', onLoadMore);
// v2. --- Load more button ---
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// ----------------------------
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  // searchQuery = e.currentTarget.elements.query.value;

  // if we don't use gettter in class
  // apiService.searchQuery = e.currentTarget.elements.query.value;

  // if we use gettter in class
  apiService.query = e.currentTarget.elements.query.value;

  // v2. --- Load more button ---
  loadMoreBtn.show();
  loadMoreBtn.disable();
  //-----------------------------

  apiService.resetPage();
  apiService.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticlesMarkup(articles);
    // v2. --- Load more button ---
    loadMoreBtn.enable();
    //-----------------------------
  });
}

function onLoadMore() {
  // apiService.fetchArticles().then(appendArticlesMarkup);

  // v2. --- Load more button ---
  loadMoreBtn.disable();
  apiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
  //-----------------------------
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML(
    'beforeend',
    articlesTemplate(articles),
  );
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
