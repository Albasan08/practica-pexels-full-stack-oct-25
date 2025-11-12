document.addEventListener('DOMContentLoaded', () => {

    // ----------------- DOM --------------------------------
    const botonFiltro = document.querySelector("#filtros");    
    const botonCards = document.querySelector("#categorias");
    const articleGaleriaIndex = document.querySelector("#imagenes-filtradas-mostradas");
    const sectionGaleriaIndex = document.querySelector("#imagenes-mostradas");
    const campoInput = document.querySelector("#campo-buscador");
    const formulario = document.querySelector("#formulario");
    const articleError = document.querySelector("#error");
    // const abrirPopup = document.querySelector("#boton-favoritos-header");
    // const popup = document.querySelector("#popup-favoritos");
    // const cerrarPopup = document.querySelector("#cerrar-popup");
    const fragment = document.createDocumentFragment();
    
    // ----------------- VARIABLES -------------------------
    const urlBase ='https://api.pexels.com/v1'
    const apiKey = "5ih5q7iDnDqQWYj19e4LGs6e4GjQMKBxIt3EojUp2ZU4c9ZlmM5i27SH";
    let categoriaActual;
    let favoritos = [];

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

            categoriaActual = ev.target.id; 
            gestionarData(categoriaActual);
            // const tagbtn = ev.target.id; 
            // gestionarData(tagbtn);
        }

        if(ev.target.matches(".btnfavIMG")) {
            console.log(ev.target.id, "BOTON FAV")
            let id = ev.target.id;
            agregarFavoritos(id);
        }
    });

    botonFiltro.addEventListener("change", (ev) => {
        
        if (ev.target.matches("#filtros")) {
            
            const tagbtn = ev.target.value; 
            console.log(tagbtn);
            gestionarData(categoriaActual,tagbtn);
        }
    });

    formulario.addEventListener('submit', (ev) => {
        ev.preventDefault();

        categoriaActual = campoInput.value;
        validarPalabraInput(categoriaActual);

        // const input = campoInput.value;
        // validarPalabraInput(input);
    });


    // abrirPopup.addEventListener("click", () => {
    //     popup.classList.add("ensenar");
    // });
    
    // cerrarPopup.addEventListener("click", () => {
    //     popup.classList.remove("ensenar");
    // });


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
            throw (error)
        }
    };

    const gestionarData = async (categoria, orientacion) => {
        const data = await conectarConApi(`search?query=${categoria}&orientation=${orientacion}&per_page=10&page=3`)
        console.log(data)
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
            mostrarError();
        }
    };

    const validarPalabraInput = (input) => {

        articleError.innerHTML = "";

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

        let valido = true;

        if (input === "" || validarExpresion === false) {
            mostrarError();
            valido = false; 
        } else if (validarExpresion === true) {
            gestionarData(input)
        } 
    };

    const pintarImagenesIndex = (imagenesFiltradas) => {
        //console.log(imagenesFiltradas, "pintar Imagenes en index");

        articleError.innerHTML = "";
        articleGaleriaIndex.innerHTML = "";

        try {
            const divH2 = document.createElement('DIV')
            divH2.classList.add('col-12','mb50');
            const tituloSectionAPintar = document.createElement("H2");
            tituloSectionAPintar.textContent = `Imágenes gratis relacionadas `
            articleGaleriaIndex.prepend(tituloSectionAPintar);
            console.log(imagenesFiltradas, "AQUI ESTAMOOOOS")
            imagenesFiltradas.forEach(fotos => { 

                const divImgAPintar = document.createElement('DIV');
                divImgAPintar.classList.add('col-12', 'col-md-6','col-lg-4', 'p10', 'card1');

                const imgAPintar = document.createElement('IMG');

                const autorImgAPintar = document.createElement('P');

                const botonFavorito = document.createElement('BUTTON');

                imgAPintar.setAttribute("src", fotos["src"]["medium"]);

                imgAPintar.setAttribute("alt", fotos.alt);

                autorImgAPintar.textContent = fotos.photographer;

                botonFavorito.textContent = "❤️​";
  
                botonFavorito.id = fotos.id;

                botonFavorito.classList.add("btnfavIMG");

                divH2.append(tituloSectionAPintar);

                divImgAPintar.append(imgAPintar, autorImgAPintar, botonFavorito);

                articleGaleriaIndex.append(divH2,divImgAPintar); 
                
                fragment.append(divImgAPintar);
            });

        articleGaleriaIndex.append(fragment);

        } catch (error) {
            mostrarError();
        }
    };

    const mostrarError = () => {

        articleError.innerHTML = "";

        const textoError = document.createElement('P');
        const divError = document.createElement("DIV");
        divError.classList.add('error','mb50');
        textoError.textContent = "Tu criterio de búsqueda no se corresponde con ninguna imagen. Prueba otra vez.";

        divError.append(textoError);
        articleError.append(divError);
    };

    const obtenerFavoritos = () => {
       return JSON.parse(localStorage.getItem("favoritos")) || [];
    }

    const guardarFavoritos = (favoritos) => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

    }

    const obtenerInfoFav = async (id) => {

        try {
            const data = await conectarConApi(`photos/${id}`)
            //console.log(data);

            const newfav = {

                id: data.id,
                srcP: data.src.small,
                srcG: data.src.medium,
                alt: data.alt,
                fotografo: data.photographer
            }
            return newfav;

        } catch (error) {
            mostrarError();
        }
        
    }

    const agregarFavoritos = async (id) => {
        console.log("entra en agregar")

        try { 

            const favorito = await obtenerInfoFav(id);

            const arrayFavoritosLocal = obtenerFavoritos();
            console.log(arrayFavoritosLocal)

            const existeFavorito = arrayFavoritosLocal.find(objetoFoto => objetoFoto.id === favorito.id)
            console.log(existeFavorito)


 



        } catch (error) {
            mostrarError()
        }
        //console.log(favoritos, "AGREGAVAFORITOS AQUI")

    }
    

    const eliminarFavoritos = () => {
        favoritos = obtenerFavoritos();



        guardarFavoritos(favoritos); 

        pintarFavoritos();
    }

    const pintarFavoritos = () => {
        console.log("ESTA ENTRANDO EN PINTAR")
    }

    //-------------- INVOCACIONES ----------------------

    init()



  
});//DOMContentLoaded


