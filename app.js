const fetchPokemon = () =>{
  // Função que retorna a url de cada pokemon

  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromisses = [];

  for(let i = 1; i<=150; i++){

    // No momento desse código o pokemon 48 esta com erro, logo vou ignorar
    if(i!=48){
      pokemonPromisses.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    
  }

  // metodo statico. Cada requisição de promise vai ser feito em paralelo 
  Promise.all(pokemonPromisses)
    .then(pokemons => {
      // console.log(pokemons)

      // Reduzir um array a um string (TempleateHTML)
      const lisPokemons = pokemons.reduce( (accumulator, pokemon)=>{
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        accumulator += `
          <li class="card  ${types[0]} ">
            <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
            <h2 class="card-title" >${pokemon.id}. ${pokemon.name}</h2>
            <p class="card-subtitle">${types.join(' | ') }</p>
          </li>
        `
        return accumulator
      }, '')

      // Pegar a ul vazia do html
      const ul = document.querySelector('[data-js="pokedex"]')

      ul.innerHTML = lisPokemons;
      // console.log(lisPokemons)

    })

}

fetchPokemon()




// accumulator += `
// <li class="card">
//   <img class="card-image ${}" />
//   <h2 class="card-title" >${pokemon.id}. ${pokemon.name}</h2>
//   <p class="card-subtitle">${pokemon.types.map(typeInfo => typeInfo.type.name).join(' | ') }</p>
// </li>
// `