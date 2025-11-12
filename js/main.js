document.addEventListener('DOMContentLoaded', () => {

    // ----------------- DOM --------------------------------
    const botonFiltro = document.querySelector("#filtros");    
    const botonCards = document.querySelector("#categorias");
    const articleGaleriaIndex = document.querySelector("#imagenes-filtradas-mostradas");
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

    // ----------------- EVENTOS ---------------------------

    document.addEventListener("click", (ev) => {
        
        if (ev.target.matches("#categorias button")) {

            const tagbtn = ev.target.id; 
            gestionarData(tagbtn)
        }
    });

    botonFiltro.addEventListener("change", (ev) => {
        if (ev.target.matches("#filtros")) {
            const tagbtn = ev.target.value; 
            console.log(tagbtn);
            pintarImagenesIndex(tagbtn); 
        }
    });

    formulario.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const input = campoInput.value;
        validarPalabraInput(input);
    });


    // --------------- FUNCIONES --------------------------
    const init = () => {
        arrayBotones.forEach((foto)=>{
            pintarBotones(foto)
        })
    };

    const conectarConApi = async (url) => {
        try {
            const respuesta = await fetch(`${urlBase}/${url}`, {
                headers: {
                    Authorization:`${apiKey}`
                }
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                return datos;
            } else {
                throw "Oh, oh, error"
            }
        } catch (error) {
            throw (error + "Pendiente de gestionar error")
        }
    };

    const gestionarData = async (categoria)=>{
        const data = await conectarConApi(`search?query=${categoria}&orientation=${botonFiltro.value}&per_page=10&page=3`)
        pintarImagenesIndex(data.photos);
    };

    const pintarBotones = async({id,categoria}) => {
        try {
            const data = await conectarConApi(`photos/${id}`)
            
            //fragmento???
            const miarticle = document.createElement("ARTICLE");
            miarticle.classList.add('col-12', 'col-md-6','col-lg-4', 'p10', 'card');

            const divImg = document.createElement("DIV");
            const imagen = document.createElement("IMG");
            imagen.setAttribute("src", data["src"]["portrait"])
            imagen.setAttribute("alt", data.alt)

            const miBoton = document.createElement("BUTTON");
            miBoton.id = categoria;
            miBoton.textContent = categoria;
            
            divImg.append(imagen,miBoton)
            miarticle.append(divImg)
            botonCards.append(miarticle);
            
        } catch (error) {
            console.log(error)
        }
    };

    const validarPalabraInput = (input) => {

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
            console.log("ENTRARÍA A ERROR")
            valido = false; 
        } else if (validarExpresion === true) {
            gestionarData(input)
        } 
    };

    const pintarImagenesIndex = (imagenesFiltradas) => {
        console.log(imagenesFiltradas, "pintar Imagenes en index");

        articleGaleriaIndex.innerHTML = "";
        try {
            const divH2 = document.createElement('DIV')
            divH2.classList.add('col-12','mb50');
            const tituloSectionAPintar = document.createElement("H2");
            tituloSectionAPintar.textContent = `Imágenes gratis relacionadas `
            articleGaleriaIndex.prepend(tituloSectionAPintar);

            imagenesFiltradas.forEach(fotos => { 

            const divImgAPintar = document.createElement('DIV');
            divImgAPintar.classList.add('col-12', 'col-md-6','col-lg-4', 'p10', 'card');

            const imgAPintar = document.createElement('IMG');

            const autorImgAPintar = document.createElement('P');

            imgAPintar.setAttribute("src", fotos["src"]["medium"]);

            imgAPintar.setAttribute("alt", fotos.alt);

            autorImgAPintar.textContent = fotos.photographer;

            divH2.append(tituloSectionAPintar);

            divImgAPintar.append(imgAPintar, autorImgAPintar);

            articleGaleriaIndex.append(divH2,divImgAPintar); 
            
            fragment.append(divImgAPintar);
        });

        articleGaleriaIndex.append(fragment);

        } catch (error) {
            console.log(error, "GESTIONA EL ERROR DESDE PINTARIMAGENESINDEX")
        }

    };

    const mostrarError = () => {
        const textoError = document.createElement('P');

        textoError.textContent = "Tu búsqueda no se corresponde con ninguna imágen. Prueba otra vez";
        articleGaleriaIndex.append(textoError); 
    };

    //-------------- INVOCACIONES ----------------------

    init()

  
});//DOMContentLoaded


