var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('keyup',()=>{
    pegarPokemon(quantidade.value)
})

pegarPokemon(3);

function pegarPokemon(quantidade)
{
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allPokemon =>{//em allPokemon é onde está o resultado da requisição

        var pokemons = [];
        allPokemon.results.map((value)=>{

            fetch(value.url)
            .then(response=> response.json())
            .then(pokemonSingle=>{
                pokemons.push({
                    name:value.name,
                    imagem:pokemonSingle.sprites.front_default
                });

                if(pokemons.length == quantidade)
                {//finalizamos nossas requisições

                    var pokemonBox = document.querySelector('.pokemon-box');
                    pokemonBox.innerHTML = "";

                    pokemons.map((value)=>{
                        console.log(value);
                        pokemonBox.innerHTML +=`
                        <div class="pokemon-box-single">
                            <img src="${value.imagem}">
                            <p>${value.name}</p>
                        </div> `;
                    })
                }
            })
        })
    })
}