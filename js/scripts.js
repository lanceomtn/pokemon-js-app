//beginning if IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	//IIFE returning object with 2 keys (add and getAll - there could be more)
	//function add pushes pokemons in array
	function add(pokemon) {
    pokemonList.push(pokemon);
	}

	//function getAll will get all the pokemon pushed adove and add to array and display
	function getAll() {
    return pokemonList;
  }

	//create ul on html page to display pokemon
	function addListItem (pokemon) {
		//assigns pokemon-list class for index to pokemonList variable
		let pokemonList = document.querySelector('.pokemon-list');
		//create li within the ul (this is the child?)
		let listPokemon = document.createElement('li');
		//add button element within li
		let button = document.createElement('button');
		//put text (in this case pokemon name) inside button
		button.innerText = pokemon.name;
		//refer button to css .button-class for styling
		button.classList.add('button-class')
		//call listPokemon and append button within li
		listPokemon.appendChild(button);
		//append li within the ul (the parent element)
		pokemonList.appendChild(listPokemon);
		//add event listner for click on button defined above
		button.addEventListener('click', function() {
    	showDetails(pokemon)
  	});
	}

	//promise function fetch apiUrl data
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
			//foreach loop within the json to pull data (in this case name and url)
			json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

	//promise function fetch apiUrl data
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // adds the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

	//callinng the above functions in the return
	return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
//end of the IIFE

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
