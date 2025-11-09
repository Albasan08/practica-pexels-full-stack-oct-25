document.addEventListener("DOMContentLoaded", () => {
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


