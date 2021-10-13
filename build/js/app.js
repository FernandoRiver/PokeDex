document.addEventListener('DOMContentLoaded', ()=>{
    recuperar_pokemon()
    autoGetPokemon()
})

const container = document.querySelector('.container')

//Generacines

const gen =[151,251,386,494,649,721,809,898]
const gen_index = 0
//Pokemones descubiertos
let pokemones = []

// Cargar lista de pokemones
function loadListPokemon(){
    //Pokemon random
    const rnd_pokemon = Math.floor((Math.random() * 898) + 1);
    
    //Probabilidad de shiny
    const rnd_shiny = Math.floor(Math.random()*10)
    
    for(let i = 0; i < pokemones.length; i++){
        if(rnd_pokemon == pokemones[i].id){
            console.log(i)    
            loadListPokemon()
            return 0
        }
        else if(pokemones.length == 898){
            console.log("dens")
            return 0
        }
    }
    getPokemon(rnd_pokemon,rnd_shiny)
    
    //Actualizar catidad de pokemones
    const total_pokemones = document.getElementById('total-pokemones')
    total_pokemones.textContent = pokemones.length + 1
}

// Obtener Pokemon
function getPokemon(id,shiny){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => createCard(data, shiny))
}

// Crear tarjeta
function createCard(pokemon, shiny){
    // Crear carta contenedora
    const card = document.createElement('DIV')
    card.classList.add('pokeCard')
    card.id = pokemon.id

    // Imagen
    const card_body = document.createElement('DIV')
    card_body.classList.add('card-body')
    const img = document.createElement('IMG')
        // shiny pokemon?
        const star = document.createElement('I')
        star.classList.add('fas')
        star.classList.add('fa-star')
        star.id = 'shiny'
        if(shiny > 8){
            img.src = pokemon.sprites.front_shiny
            card.appendChild(star)
        }
        else
            img.src = pokemon.sprites.front_default
    
    
    // ID
    const id = document.createElement('P')
    id.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
    
    // Nombre
    const name = document.createElement('P')
    name.textContent = pokemon.name

    // Tipo
    const tipo_cont = document.createElement('div')
    tipo_cont.classList.add('types')
    for(let i = 0; i < pokemon.types.length; i++){
        const img_types = document.createElement('P')
        img_types.textContent = pokemon.types[i].type.name
        img_types.classList.add(pokemon.types[i].type.name)
        
        tipo_cont.appendChild(img_types)
    }
    
    // Agregar de datos al contenedor
    const cont_data = document.createElement('DIV')
    cont_data.classList.add('pokeData')
    cont_data.appendChild(id)
    cont_data.appendChild(name)
    cont_data.appendChild(tipo_cont)

    
    card_body.appendChild(img)
    card.appendChild(card_body)
    card.appendChild(cont_data)

    
    
    
    pokemones.push(card)

    //Ordenar Pokemones
    ord_pokemones()

    //Recargar pantalla    
    $.ajax({
        type : 'get',
        success : function(){
          $('#container').html(pokemones);
        }
       });
}
// Recuperar Pokemon
function recuperar_pokemon(){
    let nav = document.querySelector('.get-pokemon');
    nav.addEventListener('click', ()=>{
        autoGetPokemon()
        loadListPokemon()
    })
}



// Odenar Pokemones por ID
function ord_pokemones(){
    let id_1 = 0
    let id_2 = 0
    for(let i = 0; i <= pokemones.length; i++){
        
        for(let j = i+1; j < pokemones.length; j++){
            id_1 = parseInt(pokemones[i].id)
            id_2 = parseInt(pokemones[j].id)
            if(id_1 > id_2){
                let aux = pokemones[j]
                pokemones[j] = pokemones[i]    
                pokemones[i] = aux
            }
        }
    }
}

// Obtener pokemones cada 30s
function autoGetPokemon(){
    setInterval(()=>{
        loadListPokemon()
    }, 30000)
}