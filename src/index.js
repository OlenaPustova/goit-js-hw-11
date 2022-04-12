import './sass/main.scss';
import Notiflix from 'notiflix';
import axios from 'axios';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', e => {
  e.preventDefault();
});

function markupPage() {
  galleryRef.innerHTML = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}

// markupPage();
