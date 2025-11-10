// IMG POR CATEGORÍAS
document.addEventListener('DOMContentLoaded', () => {

    const conectarApi = async () => {
        console.log("Función conectar API");

        try {
           
            const respuesta = await fetch("https://api.pexels.com/v1/search?query=naturaleza", {
                headers: { 
                Authorization: "5ih5q7iDnDqQWYj19e4LGs6e4GjQMKBxIt3EojUp2ZU4c9ZlmM5i27SH" 
                } 
            })

            if (respuesta.ok) {
                let respuesta = client.photos.search({naturaleza, per_page: 1});
                return respuesta;
                console.log(respuesta);
            } else {
                throw error
                console.log(error, "desde if try");
            }
            
        } catch (error) {
            throw error
            console.log(error, "desde catch try")
        }       
    }

    // DOM
    const botonFiltro = document.querySelector("#filtros");
    const botonCards = document.querySelector("#categorias");
    const fragment = document.createDocumentFragment(); // debe estar en ámbito global

    // VARIABLES
    const arrayBotones = ["Naturaleza", "Animales", "Arte"];
    const arrayFiltros = ["Todos", "Horizontal", "Vertical"];

    // EVENTOS
    /**
     * Evento que detecta clics en los botones de categorías y llama a la función de pintarimágenes.
     * @event click
     * @param {MouseEvent} ev evento del clic.
     */
    //vamos a tener que delegar el evento click porque lo vamos a usar en distintos 
    document.addEventListener("click", (ev) => {
        if (ev.target.matches("#categorias button")) {
            const tagbtn = ev.target.id; // obtiene el id del botón (categoría)
            console.log(tagbtn);
            pintarImagenesIndex(tagbtn);
            conectarApi(tagbtn);
        }
    });

    /**
     * Evento que detecta cambios en el filtro del select y llama a la función de pintarimágenes
     * @event change
     * @param {Event} ev evento del cambio.
     */
    document.addEventListener("change", (ev) => {
        if (ev.target.matches("#filtros select")) {
            const tagbtn = ev.target; // obtiene el elemento select
            console.log(tagbtn);
            pintarImagenesIndex(tagbtn); // pinta las imágenes según el filtro seleccionado
        }
    });

    /**
     * Función que crea dinámicamente botones de categorías y los inserta en el DOM.
     * @function pintarBotones
     */
    pintarBotones = () => {
        arrayBotones.forEach(categoria => {
            const data={
                "id": 2014422,
               
                "src": {
                    
                    "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",

                },
                "alt": "Brown Rocks During Golden Hour"
                }
            const miBoton = document.createElement("button");
            miBoton.id = categoria;
            miBoton.textContent = categoria;
            botonCards.append(miBoton);
        });
    };

    /**
     * Función que crea un elemento select con opciones de filtros y lo añade al DOM.
     * @function pintarFiltro
     */
    pintarFiltro = () => {
        const miSelect = document.createElement("select");

        arrayFiltros.forEach(element => {
            const miFiltro = document.createElement("option");
            miFiltro.value = element;
            miFiltro.textContent = element;
            miSelect.append(miFiltro);
        });

        botonFiltro.append(miSelect);
    };

    pintarImagenesIndex = () =>{
        console.log("esta funcion es pintar imagenes")
    }



    // Con categorias
    
 

    // Invocaciones

    conectarApiCategorias();
    
    // INVOCACIONES
    pintarBotones();
    pintarFiltro();

    
 /*
 const getRandomDog  = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json(); //json es como abrir el paquete que hemos guardado en response

     return data.message; //como ese paquete abierto lo hemos guardado en data, pues queremos conseguir la parte de message, que son  los url de las fotos
}; 

/* Pseudocódigo
    Fetch
        Llamar API
        Esperar a que API responda
        Recibir llamada API
        Si la vinculación es correcta
            Categorias, filtros, buscador... (pendiente de gestionar)
        Si la vinculación no es correcta
            ERROR (pendiente de gestionar)
    
    Try resolver (categorías, filtros... validar, filtrar y pintar en index)
    Catch resolver error (p: Esto es un error)

*/

/* 
La salida será una matriz de fotos, por lo que usamos map(), que es un método de matriz. 
Para ello, tenemos que crear otra función y la llamamos desde la API fetch.

function getPhotos(images) { 
   images.map(image => { 
     console.log(image) 
   }) 
}
fetch(" https://api.pexels.com/v1/search?query=people ",{ 
  headers: { 
    Authorization: "YOUR_API_KEY" 
  } 
}) 
   .then(resp => { 
     return resp.json() 
   }) 
   .then(data => { 
     getPhotos(data.photos); 
   })
*/

// VARIABLES

/**
 * Acceder al elemento del DOM del input a buscar
 */
const campoInput = document.querySelector("#campo-buscador");
//console.log(campoInput);

// EVENTOS
/**
 * Evento que cuando el usuario hace Enter valida la palabra metida
 */
campoInput.addEventListener('keyup', (ev) => {
    //console.log(ev);
    ev.preventDefault();

    if (ev.keyCode == 13) { // El keyCode de Enter es 13
        const input = campoInput.value.trim();
        //console.log(input);
        validarPalabraInput(input);
        
        campoInput.value = ""; 
    } 
});

// FUNCIONES

/**
 * Función que valida la palabra clave metida en el campo input
 * @param {String} input palabra clave metida en campo input
 * @returns Filtrar imágenes o error
 */
const validarPalabraInput = (input) => {
    //console.log("Validar Palabra Input");

    /* Permite:
        Letras mayúsculas y minúsculas con acentos y ñ
        Espacios intermedios (Mesas grandes)
        Longitud entre 3-50 caracteres 
        No permite:
            Números
            Símbolos
            Espacios vacíos
            Palabras muy cortas (1-2 caracteres)*/
    let regExp = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/,"gi")
    let validarExpresion = regExp.test(input); // devuelve true o false

    // Chivato
    let valido = true;

    if (input === "" || validarExpresion === false) {
        mostrarError();
        valido = false; // Para que no se ejecute
    } else if (validarExpresion === true) {
        filtrarImagenes();
    }
}

const filtrarImagenes = () => {
    //console.log("mostrar imagenes filtradas");
    pintarImagenesFiltradas();
}

const pintarImagenesFiltradas = () => {
    console.log("pintar imagenes filtradas");
}

const mostrarError = () => {
    console.log("ERROR");
}

// INVOCACIONES

/* Pseudocódigo
Inicio
    Introducir palabra clave
    Leer palabra clave
        Validar palabra clave
    Si no hay error
        Disparar evento
        Filtrar imágenes
        Pintar imágenes
    Si hay error 
        Mostrar error en pantallas
Fin

Evento 
    Inicio
        Leer palabra clave
            Cuando usuario hace clic en botón enter
                Validar palabra clave
                Filtrar imágenes
                Pintar imágenes
    Fin

Validar palabra clave 
    Inicio
        Leer palabra (después de evento)
        Filtrar palabra por:
            Campo vacío
            Símbolos
            Números
            Acepta tildes, mayúsculas, etc.
        Filtrar palabras
        Pintar imágenes
    Fin

Se necesita:
    Origen datos (array temporal)
    Expresión regular para validar
    Evento
    Acceder al elemento del dom del input
*/
});



// VARIABLES

//Pendiente cambiar
const arrayTemporalEjemplo = [
    {
        id: 1,
        src: "https://images.pexels.com/photos/347139/pexels-photo-347139.jpeg",
        alt: "Imagen de una mesa a modo de ejemplo",
        titulo: "Imagen mesa 1",
        fotografo: "Fotógrafo X",
        descripcion: "Esta es una breve descripción de ejemplo para probar que el p funciona, espero que se vea :)",
        categoria: "Mesas",
    }
]

/**
 * Variable para poder acceder al elemento estático del HTML (article)
 */
const articleGaleriaIndex = document.querySelector('#imagenes-filtradas-mostradas');
//console.log(articleGaleriaIndex);

/**
 * Variable para poder acceder al elemento estático del HTML (section)
 */
const sectionGaleriaIndex = document.querySelector("#imagenes-mostradas");
//console.log(sectionGaleriaIndex);

/**
 * Fragmento usado en función pintarImagenesIndex para optimizar espacio
 */
const fragment = document.createDocumentFragment();

// EVENTOS


// FUNCIONES
/**
 * Función que filtra las imágenes en función de un párametro
 * @param {Array} arrayTemporalEjemplo fuente de información 
 * @param {String} categoria elemento a comparar
 * @returns pintarImagenesIndex() o MostrarError()
 */
const filtrarImagenesIndex = (arrayTemporalEjemplo, categoria) => {
    //console.log("filtrar Imagenes en index");
    const imagenesFiltradas = arrayTemporalEjemplo.filter((fotos) => fotos.categoria === categoria); // Filter siempre te devuelve un array
    if(imagenesFiltradas.length > 0) { // Comparar si el array devuelto tiene contenido o no
        //console.log(imagenesFiltradas)
        pintarImagenesIndex(imagenesFiltradas)
    } else {
        mostrarError();
    }  
}

/**
 * Función que pinta en el DOM los divs de las imágenes ya filtradas
 * @param {Array} imagenesFiltradas imágenes filtradas por el parámetro
 * @returns DOM dinámico
 */
const pintarImagenesIndex = (imagenesFiltradas) => {
    //console.log("pintar Imagenes en index");

    imagenesFiltradas.forEach(fotos => { // Porque el método filter siempre te va a devolver un array
    // Crear los elementos
    const divImgAPintar = document.createElement('DIV');
    //console.log(divImgAPintar)
    const imgAPintar = document.createElement('IMG');
    //console.log(imgAPintar);
    const tituloImgAPintar = document.createElement('P');
    //console.log(tituloImgAPintar);
    const autorImgAPintar = document.createElement('P');
    //console.log(autorImgAPintar);
    const descImgAPintar = document.createElement('P');
    //console.log(descImgAPintar);

    const tituloSectionAPintar = document.createElement("H2");
    //console.log(tituloSectionAPintar);

    // Asignar atributos a img, p y h2
    imgAPintar.setAttribute("src", fotos.src);
    //console.log(imgAPintar);
    imgAPintar.setAttribute("alt", fotos.alt);
    //console.log(imgAPintar);
    tituloImgAPintar.textContent = fotos.titulo;
    //console.log(tituloImgAPintar);
    autorImgAPintar.textContent = fotos.fotografo;
    //console.log(autorImgAPintar)
    descImgAPintar.textContent = fotos.descripcion;
    //console.log(descImgAPintar);

    tituloSectionAPintar.textContent = `Imágenes gratis de ${fotos.categoria} `
    //console.log(tituloSectionAPintar);

    // Meter img y ps en el div
    divImgAPintar.append(imgAPintar, tituloImgAPintar, autorImgAPintar, descImgAPintar);
    //console.log(divImgAPintar);

    // Meter el div en el article
    articleGaleriaIndex.append(divImgAPintar); 
    //console.log(articleGaleriaIndex);

    // Meter H2 en section
    sectionGaleriaIndex.prepend(tituloSectionAPintar);
    
    //Fragmento
    fragment.append(divImgAPintar);
    });

    articleGaleriaIndex.append(fragment);
}

/**
 * Función que devuelve un error al no coincidir las imágenes con el filtro
 */
const mostrarError = () => {
    // Crear elemento
    const textoError = document.createElement('P');
    //console.log(textoError);

    // Asignar texto
    textoError.textContent = "Tu búsqueda no se corresponde con ninguna imágen. Prueba otra vez";
    //console.log(textoError);

    articleGaleriaIndex.append(textoError); 
    //console.log(articleGaleriaIndex);
}

// INVOCACIONES
filtrarImagenesIndex(arrayTemporalEjemplo, "Mesas");

/* Pseudocódigo
Evento()

Filtrar imágenes()
Inicio
    Leer origen (de momento array, entrega final API)
    Filtrar imágenes
        Si corresponde
            pintarImagenesIndex
        Si no corresponde 
            MostrarError()
Fin

Pintar imágenes()
Inicio 
    Si la conexión es correcta
        Muestra las imágenes 
            Crear div
            Crear img
            Crear atributos img (src y alt)
            Dar valor a esos atributos
            Crear p título imagen
            Crear p nombre fotógrafo
            Crear p breve descripción
            Meter ps en div
            Meter img en div
            Meter div en article
    Si no
        Mostrar error
Fin

MostrarError()
Inicio
    Mostrar error en pantalla (p)
        Crear p
        Asignar valor a p
        Meter p en el article
Fin

Se necesita (variables): 
    Variable array (temporal hasta conectar la API). Objeto con atributos: id, titulo imagen, alt, src, nombre fotógrafo, breve descripción
    Acceder al elemento del DOM article
    Crear fragmento
*/