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