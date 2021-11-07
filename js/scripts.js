//Beginning of IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  //adds pokemon to the pokelist
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //function getAll will get all the pokemon data pushed adove
	function getAll() {
    return pokemonList;
  }

  //create ul and button for the pokelist
  function addListItem(pokemon) {
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('format-button');
    listItem.appendChild(button);
    listContainer.appendChild(listItem)
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })
  }

  //promise function to fetch apiUrl data
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }) .then(function (json) {
      //foreach loop within the json to pull data (in this case name and url)
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default,
      item.height = details.height,
      item.weight = details.weight,
      item.types = details.types
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
}

//Create a model to display pokemon details when button is clicked
let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'x';
    closeButtonElement.style.fontSize = "30px"
    closeButtonElement.addEventListener('click', hideModal);

    let pokeName = document.createElement('h1');
    pokeName.innerText = pokemon.name;

    let pokeHeight = document.createElement('p');
    pokeHeight.innerText = ('Height: ') + pokemon.height;

    let pokeWeight = document.createElement('p');
    pokeWeight.innerText = ('Weight: ') + pokemon.weight;

    let pokeImg = document.createElement('img');
    pokeImg.src = pokemon.imageUrl
    pokeImg.classList.add('modal-img');

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokeName);
    modal.appendChild(pokeHeight);
    modal.appendChild(pokeWeight);
    modal.appendChild(pokeImg)

    pokemon.types.forEach(item => {
      let contentElement = document.createElement('p');
      contentElement.innerText = ('Type: ') + item.type.name;
      modal.appendChild(contentElement);
    });

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  function showDialog(title, text) {
  showModal(title, text);
  let modalContainer = document.querySelector('#modal-container');
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  confirmButton.focus();

  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', () => {
    hideModal();
    reject();
  })
  confirmButton.addEventListener('click', () => {
    hideModal();
    resolve();
  })
  });
}

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal();
});//end of the modal code

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails
  }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});
});
