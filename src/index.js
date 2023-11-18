import {fetchBreeds, fetchCatByBreed} from './cat-api.js'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select')
const load = document.querySelector('.loader')
const err = document.querySelector('.error')
const info = document.querySelector('.cat-info')

fetchBreeds()
.then(res => {
    select.classList.remove('is-hidden')
    load.classList.add('is-hidden')
    createOption(res)
})
.catch(error => {
    console.log(error)
    Notify.failure(`❌Oops! Something went wrong! Try reloading the page! `);
})
.finally(() => {
    load.classList.add('is-hidden')
})


function createOption(res){
    let arrOption = res.map(item => {
        return `<option value=${item.id}> ${item.name} </option>`;
    })

    select.insertAdjacentHTML('beforeend' , arrOption.join(''))
}

function creteMarkUp(item){
    return `<div class="cat-card">
    <img src="${item.url}" alt="${item.breeds[0].name}" class="cat-img" />
  
  <p class="cat-name">${item.breeds[0].name}</p>
  <p class="cat-description">${item.breeds[0].description}</p>
  <p class="cat-temperament"> <span class="cat-temperament-title">Temperament: </span>${item.breeds[0].temperament}</p>
  </div>`
}

select.addEventListener('change', () => {
    load.classList.remove('is-hidden')
    info.classList.add('is-hidden')
    const currentCat = select.value
    fetchCatByBreed(currentCat)
    .then(res => {
        info.classList.remove('is-hidden')
        const card = creteMarkUp(res[0])
        info.innerHTML = card;
    })
    .catch(err => {
        Notify.failure(`❌Oops! Something went wrong! Try reloading the page!`);
      })
    .finally(() => {
        load.classList.add('is-hidden')
    })
})

