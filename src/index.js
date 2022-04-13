import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', inputSearch);
loadMoreBtnRef.addEventListener('click', onLoadMore);

let page = 1;
let searchWords = '';
let countImages = 0;

async function fetchImages(searchWords) {
  try {
    const response = await axios.get(
      `?key=26713885-825cc5fe55e7fb85d69d3b86a&image_type=photo&orientation=horizontal&safesearch=true&q=${searchWords}&per_page=40&page=${page}`,
    );
    if (response.status != 200) {
      throw new Error('not found');
    }
    return response.data;
  } catch (error) {
    return error;
  }
}

async function inputSearch(e) {
  galleryRef.innerHTML = '';
  e.preventDefault();
  searchWords = e.currentTarget.elements.searchQuery.value;
  const images = await fetchImages(searchWords);
  loadMoreBtnRef.classList.remove('is-hidden');

  if (images.hits.length === 0 || !images.hits) {
    loadMoreBtnRef.classList.add('is-hidden');

    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  countImages += images.hits.length;
  renderPage(images);
}

async function onLoadMore() {
  page += 1;
  const images = await fetchImages(searchWords);
  if (!images.hits) {
    loadMoreBtnRef.classList.add('is-hidden');
    Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
  }

  renderPage(images);
}

function markupCard(cards) {
  let arrCards = [];
  cards
    .map(item => {
      arrCards.push(`<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="250"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${item.downloads}
    </p>
  </div>
</div>`);
    })
    .join('');
  return arrCards.join('');
}

function renderPage(cards) {
  const markupCards = markupCard(cards.hits);
  galleryRef.insertAdjacentHTML('beforeend', markupCards);
}
