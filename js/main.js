// VARIABLES
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
 * Fragmento usado en función pintarImagenesIndex para optimizar espacio
 */
const fragment = document.createDocumentFragment();

// EVENTOS


// FUNCIONES

const filtrarImagenesIndex =  async () => {
    try {
        const imagenesFiltradas = await arrayTemporalEjemplo.filter((img) => img.categoria === arrayTemporalEjemplo[0].categoria);
        //console.log(imagenesFiltradas)
        return imagenesFiltradas;
    } catch (error) {
        throw error
    }  
}

filtrarImagenesIndex() 
    .then ((respuesta) => {
        pintarImagenesIndex();
    })
    .catch ((error) => {
        mostrarError()
    }) 

const pintarImagenesIndex = (arrayTemporalEjemplo) => {
    const imagenesFiltradas = filtrarImagenesIndex();
    //console.log("pintar Imagenes en index");

    filtrarImagenesIndex(imagenesFiltradas);

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

    // Asignar atributos a img y p
    imgAPintar.setAttribute("src", arrayTemporalEjemplo[0].src);
    //console.log(imgAPintar);
    imgAPintar.setAttribute("alt", arrayTemporalEjemplo[0].alt);
    //console.log(imgAPintar);
    tituloImgAPintar.textContent = arrayTemporalEjemplo[0].titulo;
    //console.log(tituloImgAPintar);
    autorImgAPintar.textContent = arrayTemporalEjemplo[0].fotografo;
    //console.log(autorImgAPintar)
    descImgAPintar.textContent = arrayTemporalEjemplo[0].descripcion;
    //console.log(descImgAPintar);

    // Meter img y ps en el div
    divImgAPintar.append(imgAPintar, tituloImgAPintar, autorImgAPintar, descImgAPintar);
    //console.log(divImgAPintar);

    // Meter el div en el article
    articleGaleriaIndex.append(divImgAPintar); 
    //console.log(articleGaleriaIndex);
    
    //Fragmento
    fragment.append(divImgAPintar);
    articleGaleriaIndex.append(fragment);

    return articleGaleriaIndex;
}

const mostrarError = () => { // Pendiente gestionar el error. Try / catch?
    // Crear elemento
    const textoError = document.createElement('P');
    //console.log(textoError);

    // Asignar texto
    textoError.textContent = "Tu búsqueda no se corresponde con ninguna imágen. Prueba otra vez";
    //console.log(textoError);

    articleGaleriaIndex.append(textoError); 
    //console.log(articleGaleriaIndex);

    return articleGaleriaIndex;
}


// INVOCACIONES
filtrarImagenesIndex(arrayTemporalEjemplo);
pintarImagenesIndex(arrayTemporalEjemplo);
mostrarError();

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

Se necesita (variables): 
    Variable array (temporal hasta conectar la API). Objeto con atributos: id, titulo imagen, alt, src, nombre fotógrafo, breve descripción
    Acceder al elemento del DOM article
    Crear fragmento
*/