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
  async function addListItem(pokemon) {
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button')
      button.addEventListener('click', function(event) {
      showDetails(pokemon);
      });

    let result = await loadSprite( pokemon );
    let sprite = result.sprites.front_default;

    button.innerHTML = '<p>' + pokemon.name + '</p>';
    button.innerHTML += "<img src='" + sprite + "' />";
    button.classList.add('pokemon-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokeModal');
    listItem.classList.add('list-group-item');

    listItem.appendChild(button);
    listContainer.appendChild(listItem)
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

  async function loadSprite(pokemon) {
        let res = await fetch(pokemon.detailsUrl);
        let resData = await res.json();

        pokemon.spriteUrl = resData.sprites.front_default;
        return resData;
    }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default,
      pokemon.height = details.height,
      pokemon.weight = details.weight,
      pokemon.types = details.types
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
}

  //Create a model to display pokemon details when button is clicked
  function showModal(pokemon) {
    let modalHeader = $('.modal-header');
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let pokeName = $("<h5>" + pokemon.name + "</h5>");
    let pokeHeight = $("<p>" + "Height : " + pokemon.height + "</p>");
    let pokeWeight = $("<p>" + "Weight : " + pokemon.weight + "</p>");


    let allTypes = "";
    for( let i = 0; i < pokemon.types.length; i ++ ){
      let currentType = pokemon.types[i].type.name;
      allTypes += currentType + " ";
    }
    let pokeTypes = $("<p>" + "Type : " + allTypes + "</p>");

    let pokeImg = $('<img class="modal-img" style="width:100%">');
    let imgUrl = pokemon.imageUrl;
    pokeImg.attr('src', imgUrl);

    modalTitle.append(pokeName);
    modalBody.append(pokeHeight);
    modalBody.append(pokeWeight);
    modalBody.append(pokeTypes);
    modalBody.append(pokeImg);
  }  //end of modal code

   return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});
});

//search bar functionallity
let pokemonSearchBar = document.querySelector('#search-input');

pokemonSearchBar.addEventListener('input', function() {
  let pokeItem = document.querySelectorAll('li');
  let filter = pokemonSearchBar.value.toUpperCase();

  pokeItem.forEach(function(pokemon){
    if (pokemon.innerText.toUpperCase().indexOf(filter) === 0) {
      pokemon.style.display = 'block';
    } else {
      pokemon.style.display = 'none';
    }
  });
});
