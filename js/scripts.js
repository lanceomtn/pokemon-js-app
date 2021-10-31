//beginning of IIFE
let pokemonRepository = (function () {
//initial array with pokemon data
	let pokemonList = [
  {name:'Bulbasar', height: .5, type: ['grass', 'poison']},
  {name:'Squirtle', height: 1, type: ['water']},
  {name:'Beedrill', height: 1.5, type: ['bug', 'poison']},
  {name:'Geodude', height: 4, type: ['rock']}
];

//add pokemon to the pokemon list array
  function add(pokemon) {
		pokemonList.push(pokemon);
	}

//getAll pokemon data from the list array
  function getAll() {
		return pokemonList;
	}

//return is add + getAll??
  return {
		add: add,
		getAll: getAll()
	};
})();

//create loop that iterates over array data
pokemonRepository.getAll.forEach(function(pokemon) {
//evaluate pokemon height vs variable if condition met print one message
  if(pokemon.height > 2.0 ){
   document.write('<li>'+ pokemon.name + ' - height: ' +  pokemon.height + ' Wow that is a tall Pokemon!  </li>');
  }
//if height variable conditon not met print this message
  else document.write('<li>'+ pokemon.name + ' - height: ' +  pokemon.height +'  </li>');
}	)
