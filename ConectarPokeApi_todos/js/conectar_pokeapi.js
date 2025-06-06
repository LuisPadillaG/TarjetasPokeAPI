const plantilla_contenedor = document.querySelector(".ContenedorPokemon")
const body = document.querySelector("body")



for(i = 0; i < 1024; i++){
    //el hecho de crear el nodo crea la instancia
    console.log(plantilla_contenedor)
    var clon = plantilla_contenedor.cloneNode(true)
    body.appendChild(clon)  
}

const arreglo_pokemons = document.querySelectorAll(".ContenedorPokemon");
console.log(arreglo_pokemons);
 
const numero_pokemon = document.querySelectorAll(".numero_pokemon");
const nombre_pokemon = document.querySelectorAll(".nombre_pokemon");
const imagen_pokemon = document.querySelectorAll("img");
const tipo_pokemon = document.querySelectorAll(".tipo_pokemon")
const altura_pokemon = document.querySelectorAll(".altura_pokemon")
const peso_pokemon = document.querySelectorAll(".peso_pokemon")
const audio_pokemon = document.querySelectorAll("audio")
for (let i = 0; i < arreglo_pokemons.length; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
        .then(recurso => recurso.json())
        .then(pokemon => {
            console.log(i);

            numero_pokemon[pokemon.id - 1].innerHTML = pokemon.id;
            nombre_pokemon[pokemon.id - 1].innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            imagen_pokemon[pokemon.id - 1].src = pokemon.sprites.front_default;
            imagen_pokemon[pokemon.id - 1].addEventListener("click", function() {
                
                if (this.src === pokemon.sprites.front_default) {
                    this.src = pokemon.sprites.back_default;
                } else {
                    this.src = pokemon.sprites.front_default;
                }
            });
            //creo una constante donde se guarda el tipo principal
            const tipoClase = pokemon.types[0].type.name;
            //aqui la escribo la constante
            tipo_pokemon[pokemon.id - 1].innerHTML = `<b>Tipos:</b> <div class="tipo ${tipoClase}">${tipoClase}</div>`;

            if (pokemon.types.length > 1) {
                //nada mas le añado la 2da pero para escribir alli
                tipo_pokemon[pokemon.id - 1].innerHTML += `${pokemon.types[1].type.name}`;
            }

            altura_pokemon[pokemon.id - 1].innerHTML = "<b>Altura </b>" + (pokemon.height / 10) + " cm";
            peso_pokemon[pokemon.id - 1].innerHTML = "<b> Peso</b> " + (pokemon.weight / 10) + " kg";
            audio_pokemon[pokemon.id - 1].src = pokemon.cries.latest;

            arreglo_pokemons[pokemon.id - 1].addEventListener('click', () => {
                audio_pokemon[pokemon.id - 1].play(); 
                
            });
            // Llamo a la function, donde uso el id de donde estamos, menos 1 porque como el id empieza en uno y usaré un arreglo, debe empezar en 0
            cambiarColorFondo(arreglo_pokemons[pokemon.id - 1], tipoClase);
        })
        .catch(error => console.error("Error al obtener los datos:", error));
}


//pide el id del pokemon y el tipo
function cambiarColorFondo(elemento, tipo) {
    const colores = {
        fire: "#f13636",
        water: "#81cdf3",
        grass: "#68e127",
        electric: "#f5f54b",
        psychic: "#e250d3",
        ice: "#8be0d6",
        fighting: "#e5854a",
        poison: "#a94590",
        ground: "#cb865e",
        flying: "skyblue",
        bug: "#93be59",
        rock: "#a6703d",
        ghost: "#845a97",
        dragon: "#5a5e97",
        dark: "#686868",
        steel: "#a5a5a5",
        fairy: "#f291ff",
        normal: "#e7e7e7"
    };
    //aqui casi casi que comparo con el puro if con cada nombre de los tipos que traigo
    if (colores[tipo]) {
        elemento.style.backgroundColor = colores[tipo]; 
    } else {
        //en caso que no jale, blanco.
        elemento.style.backgroundColor = "white";
    }
}

const datosPokemon = document.querySelector('.datos');  // Seleccionamos la imagen 

datosPokemon.addEventListener('click', () => {
    audio_pokemon.play(); // Reproduce el sonido cuando se hace clic en la imagen


});
//efecto de scrollreveal
window.sr = ScrollReveal();
    sr.reveal('.ContenedorPokemon', {
        duration: 2000,
        origin: 'bottom'
    });