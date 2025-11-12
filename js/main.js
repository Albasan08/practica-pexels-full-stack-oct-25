document.addEventListener('DOMContentLoaded', () => {

    // ----------------- DOM --------------------------------
    /**
     * Elementos del DOM que se van a usar a lo largo del script.
     */
    const botonFiltro = document.querySelector("#filtros");    
    const botonCards = document.querySelector("#categorias");
    const articleGaleriaIndex = document.querySelector("#imagenes-filtradas-mostradas");
    const sectionGaleriaIndex = document.querySelector("#imagenes-mostradas");
    const campoInput = document.querySelector("#campo-buscador");
    const formulario = document.querySelector("#formulario");
    const articleError = document.querySelector("#error");
    const fragment = document.createDocumentFragment();
    const fragment1 = document.createDocumentFragment();
    
    // ----------------- VARIABLES -------------------------
    /**
     * Variables globales:
     * urlBase: URL principal de la API de Pexels.
     * apiKey: clave personal para acceder a la API.
     * categoriaActual: almacena la categoría seleccionada o buscada.
     */
    const urlBase = 'https://api.pexels.com/v1';
    const apiKey = "5ih5q7iDnDqQWYj19e4LGs6e4GjQMKBxIt3EojUp2ZU4c9ZlmM5i27SH";
    let categoriaActual;

    /**
     * Array con las categorías iniciales y sus id.
     * Cada una representa una imagen de muestra y su nombre.
     */
    const arrayBotones = [
        { 
            id: 34665728, 
            categoria: "Naturaleza" 
        },
        { 
            id: 45170, 
            categoria: "Animales" 
        },
        { 
            id: 161154, 
            categoria: "Arte" 
        }
    ];

    // ----------------- EVENTOS ---------------------------

    /**
     * Evento general para manejar clics:
     * Si se hace clic en un botón de categoría, busca imágenes de esa categoría.
     * Si se hace clic en el botón de favorito, agrega la imagen a la lista de favoritos.
     */
    document.addEventListener("click", (ev) => {
        if (ev.target.matches("#categorias button")) {
            categoriaActual = ev.target.id; 
            gestionarData(categoriaActual);
        }

        if (ev.target.matches(".btnfavIMG")) {
            let id = ev.target.id;
            agregarFavoritos(id);
        }
    });

    /**
     * Evento que se dispara cuando cambia el filtro de orientación (horizontal, vertical...).
     */
    botonFiltro.addEventListener("change", (ev) => {
        if (ev.target.matches("#filtros")) {
            const tagbtn = ev.target.value; 
            gestionarData(categoriaActual, tagbtn);
        }
    });

    /**
     * Evento del formulario de búsqueda:
     * Evita que se recargue la página y valida el texto.
     */
    formulario.addEventListener('submit', (ev) => {
        ev.preventDefault();
        categoriaActual = campoInput.value;
        validarPalabraInput(categoriaActual);
    });

    // --------------- FUNCIONES --------------------------

    /**
     * Crea los botones iniciales de categorías al cargar la página.
     */
    const init = () => {
        arrayBotones.forEach((foto) => {
            pintarBotones(foto);
        });
    };

    /**
     * Hace la conexión con la API de Pexels y devuelve los datos en formato JSON.
     * @async
     * @param {string} url  Parte final de la URL que se une a la urlBase.
     * @returns {Promise<Object>}  Devuelve los datos obtenidos de la API.
     */
    const conectarConApi = async (url) => {
        try {
            const respuesta = await fetch(`${urlBase}/${url}`, {
                headers: {
                    Authorization: `${apiKey}`
                }
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                return datos;
            } else {
                throw "Oh, oh, error";
            }
        } catch (error) {
            throw (error);
        }
    };

    /**
     * Obtiene imágenes desde la API según la categoría y orientación elegida,
     * y luego las muestra en pantalla.
     * @async
     * @param {string} categoria Categoría o palabra clave de búsqueda.
     * @param {string} [orientacion] Filtro (portrait, landscape...).
     */
    const gestionarData = async (categoria, orientacion) => {
        const data = await conectarConApi(`search?query=${categoria}&orientation=${orientacion}&per_page=10&page=3`);
        pintarImagenesIndex(data.photos);
    };

    /**
     * Crea y muestra los botones con imágenes para cada categoría.
     * @async
     * @param {Object} obj  Objeto con id e categoria.
     */
    const pintarBotones = async ({ id, categoria }) => {
        try {
            const data = await conectarConApi(`photos/${id}`);

            const miarticle = document.createElement("ARTICLE");
            miarticle.classList.add('col-12', 'col-md-6', 'col-lg-4', 'p10', 'card');

            const divImg = document.createElement("DIV");
            const imagen = document.createElement("IMG");
            imagen.setAttribute("src", data["src"]["portrait"]);
            imagen.setAttribute("alt", data.alt);

            const miBoton = document.createElement("BUTTON");
            miBoton.id = categoria;
            miBoton.textContent = categoria;

            divImg.append(imagen, miBoton);
            miarticle.append(divImg);
            botonCards.append(miarticle);
        } catch (error) {
            mostrarError();
        }
    };

    /**
     * Valida que el texto ingresado en el buscador sea correcto:
     * sin números, sin símbolos raros y con mínimo 3 letras.
     * @param {string} input  Texto ingresado por el usuario.
     */
    const validarPalabraInput = (input) => {
        articleError.innerHTML = "";

        let regExp = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÑñäÄëËïÏöÖüÜ\s]{3,50}$/,"gi");
        let validarExpresion = regExp.test(input);
        let valido = true;

        if (input === "" || validarExpresion === false) {
            mostrarError();
            valido = false; 
        } else if (validarExpresion === true) {
            gestionarData(input);
        } 
    };

    /**
     * Pinta en pantalla las imágenes que llegan desde la API.
     * @param {Array<Object>} imagenesFiltradas  Lista de imágenes obtenidas de la API.
     */
    const pintarImagenesIndex = (imagenesFiltradas) => {
        articleError.innerHTML = "";
        articleGaleriaIndex.innerHTML = "";

        try {
            const divH2 = document.createElement('DIV');
            divH2.classList.add('col-12', 'mb50');

            const tituloSectionAPintar = document.createElement("H2");
            tituloSectionAPintar.textContent = `Imágenes gratis relacionadas`;

            articleGaleriaIndex.prepend(tituloSectionAPintar);

            imagenesFiltradas.forEach(fotos => { 
                const divImgAPintar = document.createElement('DIV');
                divImgAPintar.classList.add('col-12', 'col-md-6','col-lg-4', 'p10', 'card1');

                const imgAPintar = document.createElement('IMG');
                const autorImgAPintar = document.createElement('P');
                const botonFavorito = document.createElement('BUTTON');

                imgAPintar.setAttribute("src", fotos["src"]["medium"]);
                imgAPintar.setAttribute("alt", fotos.alt);

                autorImgAPintar.textContent = fotos.photographer;

                botonFavorito.textContent = "🤍​​";
                botonFavorito.id = fotos.id;
                botonFavorito.classList.add("btnfavIMG");

                divImgAPintar.append(imgAPintar, autorImgAPintar, botonFavorito);
                articleGaleriaIndex.append(divH2, divImgAPintar); 
                
                fragment.append(divImgAPintar);
            });

            articleGaleriaIndex.append(fragment);
        } catch (error) {
            mostrarError();
        }
    };

    /**
     * Muestra un mensaje de error cuando no hay resultados o ocurre algún problema.
     */
    const mostrarError = () => {
        articleError.innerHTML = "";
        const textoError = document.createElement('P');
        const divError = document.createElement("DIV");
        divError.classList.add('error', 'mb50');
        textoError.textContent = "Tu criterio de búsqueda no se corresponde con ninguna imagen. Prueba otra vez.";
        divError.append(textoError);
        articleError.append(divError);
    };

    /**
     * Recupera los favoritos guardados en el localStorage.
     * @returns {Array<Object>} Lista de imágenes favoritas.
     */
    const obtenerFavoritos = () => {
       return JSON.parse(localStorage.getItem("favoritos")) || [];
    };

    /**
     * Guarda los favoritos en el localStorage.
     * @param {Array<Object>} favoritos Lista de imágenes a guardar.
     */
    const guardarFavoritos = (favoritos) => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    /**
     * Pide a la API los datos de una imagen usando su ID.
     * @async
     * @param {number} id id de la imagen en Pexels.
     * @returns {Promise<Object>} Datos de la imagen con su autor y URLs.
     */
    const obtenerInfoFav = async (id) => {
        try {
            const data = await conectarConApi(`photos/${id}`);
            const newfav = {
                id: data.id,
                srcP: data.src.small,
                srcG: data.src.medium,
                alt: data.alt,
                fotografo: data.photographer
            };
            return newfav;
        } catch (error) {
            mostrarError();
        }
    };

    /**
     * Agrega una imagen a la lista de favoritos (si no está repetida).
     * (no terminado)
     * @async
     * @param {number} id id de la imagen a agregar.
     */
    const agregarFavoritos = async (id) => {
        try { 
            const favorito = await obtenerInfoFav(id);
            const arrayFavoritosLocal = obtenerFavoritos();
            const existeFavorito = arrayFavoritosLocal.find(objetoFoto => objetoFoto.id === favorito.id);
        } catch (error) {
            mostrarError();
        }
    };

    /**
     * Elimina una imagen de favoritos (no terminado)
     */
    const eliminarFavoritos = () => {
        favoritos = obtenerFavoritos();
        guardarFavoritos(favoritos); 
        pintarFavoritos();
    };

    /**
     * Muestra en pantalla las imágenes guardadas como favoritas (no terminado).
     */
    const pintarFavoritos = () => {
    };

    //-------------- INVOCACIONES ----------------------

    /**
     * Se llama a init() al cargar la página para mostrar los botones iniciales.
     */
    init();
    
}); // Fin del DOMContentLoaded
