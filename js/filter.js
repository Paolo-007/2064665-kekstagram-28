const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterBlock = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random();

const sortByComments = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM: return[...pictures].sort(sortRandom).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED: return[...pictures].sort(sortByComments);
    default: return[...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterBlock.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (evt.target.id === currentFilter) {
      return;
    }

    filterBlock.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    callback(getFilteredPictures());
  });
};

const filter = (gallery, callback) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  pictures = [...gallery];
  setOnFilterClick(callback);
};

export {filter, getFilteredPictures};
