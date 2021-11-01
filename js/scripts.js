//beginning of IIFE
let pokemonRepository = (function () {
//initial array with pokemon data
	let pokemonList = [
  {name:'Bulbasar', height: .5, type: ['grass', 'poison']},
  {name:'Squirtle', height: 1, type: ['water']},
  {name:'Beedrill', height: 1.5, type: ['bug', 'poison']},
  {name:'Geodude', height: 4, type: ['rock']}
];

//IIFE returning object with 2 keys (add and getAll - there could be more)
function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll () {
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

function showDetails(pokemon) {
  console.log(pokemon);
}

//calling the above functions in the return
return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
	showDetails: showDetails
};
//end of the IIFE
} )();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
