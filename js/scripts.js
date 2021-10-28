//initial array with pokemon data
let pokemonList = [
  {name:'Bulbasar', height: .5, type: ['grass', 'poison']},
  {name:'Squirtle', height: 1, type: ['water']},
  {name:'Beedrill', height: 1.5, type: ['bug', 'poison']},
  {name:'Geodude', height: 4, type: ['rock']}
]

//list pokepeoples by name and height
document.write('<ul>')
for (let i = 0; i < pokemonList.length; i++)  {
  document.write( `<li> ${pokemonList[i].name} - height: ${pokemonList[i].height} </li>` );
//evaluate if pokemon excedes certain height and write message if true
  if (pokemonList[i].height > 2.0){ document.write(" - Wow that is a tall pokemon!");
  }
}
document.write('</ul>')
