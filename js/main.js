// IMG POR CATEGORÍAS
document.addEventListener('DOMContentLoaded', () => {

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
    document.addEventListener("click", (ev) => {
        if (ev.target.matches("#categorias button")) {
            const tagbtn = ev.target.id; // obtiene el id del botón (categoría)
            console.log(tagbtn);
            pintarImagenesIndex(tagbtn);
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
        arrayBotones.forEach(element => {
            const miBoton = document.createElement("button");
            miBoton.id = element;
            miBoton.textContent = element;
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


    // INVOCACIONES
    pintarBotones();
    pintarFiltro();



});
