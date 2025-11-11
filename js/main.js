document.addEventListener('DOMContentLoaded', () => {

    // ----------------- DOM --------------------------------
    const botonFiltro = document.querySelector("#filtros");    
    const botonCards = document.querySelector("#categorias");
    const articleGaleriaIndex = document.querySelector("#imagenes-filtradas-mostradas");
    //console.log(articleGaleriaIndex)
    const sectionGaleriaIndex = document.querySelector("#imagenes-mostradas");
    const campoInput = document.querySelector("#campo-buscador");
    const formulario = document.querySelector("#formulario");
    const fragment = document.createDocumentFragment();
    
    // ----------------- VARIABLES -------------------------
    const urlBase='https://api.pexels.com/v1'
    const apiKey = "5ih5q7iDnDqQWYj19e4LGs6e4GjQMKBxIt3EojUp2ZU4c9ZlmM5i27SH";

    const arrayBotones = [{
            id:34665728,
            categoria:"Naturaleza"
        }, 
        {
            id:45170,
            categoria:"Animales"
        },
            {
            id:161154,
            categoria:"Arte"
        }
    ];
    const arrayFiltros = ["Todos", "Horizontal", "Vertical"];

    // ----------------- EVENTOS ---------------------------
    //vamos a tener que delegar el evento click porque lo vamos a usar en distintos 
    document.addEventListener("click", (ev) => {

        //gestionCategorias(url); // ??????????????
        
        if (ev.target.matches("#categorias button")) {

            const tagbtn = ev.target.id; // obtiene el id del botón (categoría)
            //console.log(tagbtn);
            gestionarData(tagbtn)
        }
       
    });

    document.addEventListener("change", (ev) => {
        if (ev.target.matches("#filtros select")) {
            const tagbtn = ev.target; // obtiene el elemento select
            //console.log(tagbtn);
            pintarImagenesIndex(tagbtn); // pinta las imágenes según el filtro seleccionado
        }
    });

    formulario.addEventListener('submit', (ev) => {
        //console.log(ev);
        ev.preventDefault();

        //console.log("DESDE EVENTO SUBMIT")

        //Para poder acceder al valor del input (palabra clave a meter en el buscador)
        const input = campoInput.value;
        //console.log(input);

        validarPalabraInput(input);
    });


    // --------------- FUNCIONES --------------------------
    const init=()=>{
        arrayBotones.forEach((foto)=>{
            pintarBotones(foto)
        })
    }

    const conectarConApi = async (url) => {
        try {
            const respuesta = await fetch(`${urlBase}/${url}`, {
                headers: {
                    Authorization:`${apiKey}`
                }
            });
            //console.log(respuesta)
            if (respuesta.ok) {
                const datos = await respuesta.json();
                //console.log(datos);
                return datos;
            } else {
                throw "Oh, oh, error"
            }
        } catch (error) {
            //console.log(error)
            throw (error + "Pendiente de gestionar error")
        }
    }

    //console.log(conectarConApi())

//34665728
//photos/34665728
    // const gestionCategorias = async (id) => {
    //     try {
    //         const data = await conectarConApi(`photos/${id}`);
    //         console.log(data);
    //         pintarBotones(data);
    //     } catch (error) {
    //         mostrarError(error);
    //     }
    // }
    

    const gestionarData = async (categoria)=>{
        //console.log('pintando todas')
        //console.log(categoria)
        const data = await conectarConApi(`search?query=${categoria}&per_page=10&page=3`)
        //console.log(data.photos, "AQUIIIIIIII")
        pintarImagenesIndex(data.photos);
        
    };

    const pintarBotones = async({id,categoria}) => {
        try {
            const data = await conectarConApi(`photos/${id}`)
            //console.log(data, "soy data")
            
            //fragmento???
            const miarticle = document.createElement("ARTICLE");

            const divImg = document.createElement("DIV");

            const imagen = document.createElement("IMG");
            imagen.setAttribute("src", data["src"]["medium"])
            //console.log(imagen, "SRC ESTAMOS AQUI")
            imagen.setAttribute("alt", data.alt)
            //console.log(imagen, "AALT")

            const miBoton = document.createElement("BUTTON");
            miBoton.id = categoria;
            miBoton.textContent = categoria;
            //console.log(miBoton,"AQUI ESTOY")
            
            divImg.append(imagen,miBoton)
            //console.log(divImg,"AHORA AQUI")
            miarticle.append(divImg)
            //console.log(miarticle, "final")
            botonCards.append(miarticle);
            //console.log(botonCards, "final2")
            
        } catch (error) {
            console.log(error)
        }
    };

    const pintarFiltro = () => {
        const miSelect = document.createElement("select");

        arrayFiltros.forEach(element => {
            const miFiltro = document.createElement("option");
            miFiltro.value = element;
            miFiltro.textContent = element;
            miSelect.append(miFiltro);
        });

        botonFiltro.append(miSelect);
    };

    const validarPalabraInput = (input) => {
        //console.log("Validar Palabra Input");
        console.log(input, "DESDE VALIDAR PALABRA INPUT");

        /* Permite:
            Letras mayúsculas y minúsculas con acentos y ñ
            Dieresis
            Espacios intermedios (Mesas grandes)
            Longitud entre 3-50 caracteres 
            No permite:
                Números
                Símbolos
                Espacios vacíos
                Palabras muy cortas (1-2 caracteres)*/
        let regExp = new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúÑñäÄëËïÏöÖüÜ\s]{3,50}$/,"gi")
        let validarExpresion = regExp.test(input); // devuelve true o false

        // Chivato
        let valido = true;

        if (input === "" || validarExpresion === false) {
            //mostrarError();
            console.log("ENTRARÍA A ERROR")
            valido = false; // Para que no se ejecute
        } else if (validarExpresion === true) {
            gestionarData(input)
            //console.log("ENTRARÍA A FILTRAR IMÁGENES")
        }

        
    };

    // const filtrarImagenesIndex = (arrayTemporalEjemplo, categoria) => {
    // //console.log("filtrar Imagenes en index");
    //     const imagenesFiltradas = arrayTemporalEjemplo.filter((fotos) => fotos.categoria === categoria); // Filter siempre te devuelve un array
    //     if(imagenesFiltradas.length > 0) { // Comparar si el array devuelto tiene contenido o no
    //         //console.log(imagenesFiltradas)
    //         pintarImagenesIndex(imagenesFiltradas)
    //     } else {
    //         mostrarError();
    //     }  
    // }

    const pintarImagenesIndex = (imagenesFiltradas) => {
        console.log(imagenesFiltradas, "pintar Imagenes en index");

        articleGaleriaIndex.innerHTML = "";
        try {
            const tituloSectionAPintar = document.createElement("H2");
            //console.log(tituloSectionAPintar);
            tituloSectionAPintar.textContent = `Imágenes gratis relacionadas `
            //console.log(tituloSectionAPintar);
            // Meter H2 en section
            articleGaleriaIndex.prepend(tituloSectionAPintar);

            imagenesFiltradas.forEach(fotos => { // Porque el método filter siempre te va a devolver un array
            // Crear los elementos
            const divImgAPintar = document.createElement('DIV');
            //console.log(divImgAPintar)
            const imgAPintar = document.createElement('IMG');
            //console.log(imgAPintar);
            const autorImgAPintar = document.createElement('P');
            //console.log(autorImgAPintar);

            // Asignar atributos a img, p y h2
            imgAPintar.setAttribute("src", fotos["src"]["medium"]);
            //console.log(imgAPintar);
            imgAPintar.setAttribute("alt", fotos.alt);
            //console.log(imgAPintar);
            autorImgAPintar.textContent = fotos.photographer;
            //console.log(autorImgAPintar)

            // Meter img y ps en el div
            divImgAPintar.append(imgAPintar, autorImgAPintar);
            //console.log(divImgAPintar);

            // Meter el div en el article
            articleGaleriaIndex.append(divImgAPintar); 
            //console.log(articleGaleriaIndex);
            
            //Fragmento
            fragment.append(divImgAPintar);
        });

        articleGaleriaIndex.append(fragment);

        } catch (error) {
            console.log(error, "GESTIONA EL ERROR DESDE PINTARIMAGENESINDEX")
        }

    }

    /*const mostrarError = () => {
        // Crear elemento
        const textoError = document.createElement('P');
        //console.log(textoError);

        // Asignar texto
        textoError.textContent = "Tu búsqueda no se corresponde con ninguna imágen. Prueba otra vez";
        //console.log(textoError);

        articleGaleriaIndex.append(textoError); 
        //console.log(articleGaleriaIndex);
    };*/

    //-------------- INVOCACIONES ----------------------

    init()

  
});//DOMContentLoaded
  


    // //Pendiente cambiar
    // const arrayTemporalEjemplo = [
    //     {
    //         id: 1,
    //         src: "https://images.pexels.com/photos/347139/pexels-photo-347139.jpeg",
    //         alt: "Imagen de una mesa a modo de ejemplo",
    //         titulo: "Imagen mesa 1",
    //         fotografo: "Fotógrafo X",
    //         descripcion: "Esta es una breve descripción de ejemplo para probar que el p funciona, espero que se vea :)",
    //         categoria: "Mesas",
    //     }
    // ]




