//initial array with pokemon data
let pokemonList = [
  {name:'Bulbasar', height: .5, type: ['grass', 'poison']},
  {name:'Squirtle', height: 1, type: ['water']},
  {name:'Beedrill', height: 1.5, type: ['bug', 'poison']},
  {name:'Geodude', height: 4, type: ['rock']}
]

pokemonList.forEach(function(pokemon) {
  if (pokemon.height > 2.0) {
      document.write('<li>'+ pokemon.name + ' - height: '  +  pokemon.height + ' '
    + ' - Wow, that is a tall Pokemon! </li>');
  }else {
    document.write('<li>'+ pokemon.name + '  - height: ' +  pokemon.height +'  </li>');

    }
})
