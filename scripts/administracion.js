import crearTabla from "./tablaDinamica.js";
import Anuncio_Mascota from "./entidades/Anuncio_Mascota.js";
import imprimirAnuncios from "./anunciosDinamicos.js";

import {
    validarCampoVacio,
    validarPrecio,
    validarLongitudMaxima
} from "./entidades/validaciones.js";


const listado = JSON.parse(localStorage.getItem("Elementos")) || [];
const $tableContainer = document.getElementById("listado");
const $form = document.forms[0];
const $nav = document.getElementsByTagName("nav");
const $spinner = document.getElementById("spinner");
const $styleSheet = document.getElementById("style");
const $anuncio = document.querySelector(".anuncio");
const { btn_editar, btn_eliminar, btn_cancelar } = $form;
const{titulo,transaccion,descripcion, precio , raza , fecha, vacunas }= $form;

let table;
let _id = -1;
console.log(listado.length);
if (listado.length > 0 ) {

    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");
}
else{
    $spinner.style.display = "none";
}



//Evento submit del formulario
$form.addEventListener("submit", e => {
    const form = e.target;
    e.preventDefault();
    //Alta
    if (btn_editar.classList.contains("alta")) {

        if (validarEntrada(form)) {
            listado.push(new Anuncio_Mascota(Date.now(), titulo.value,
                transaccion.value, descripcion.value, precio.value,
                raza.value, fecha.value, vacunas.value));

            localStorage.setItem("Elementos", JSON.stringify(listado));
            actualizarTabla(listado)
                .then(() => $spinner.style.display = "none");
            form.reset();
            $anuncio.classList.add("hidden")
        } else {
            $anuncio.classList.remove("hidden")
            $anuncio.innerHTML = "Datos incompletos!";
        }
    }
    //Modificacion
    else {
        if (btn_editar.classList.contains("editar")) {
            const objeto = listado[buscarPorId(listado, _id)];
            console.log(objeto);
            if (objeto) {
                if (titulo.value) {
                    objeto.titulo = titulo.value;
                }
                if (transaccion.value) {
                    objeto.transaccion = transaccion.value;
                }
                if (descripcion.value) {
                    objeto.descripcion = descripcion.value;
                }
                if (parseInt(precio.value)) {
                    objeto.precio = precio.value;
                }
                if (parseInt(raza.value)) {
                    objeto.raza = raza.value;
                }
                if (parseInt(fecha.value)) {
                    objeto.fecha = fecha.value;
                }
                if (parseInt(vacunas.value)) {
                    objeto.vacuna = vacunas.value;
                }

                localStorage.setItem("Elementos", JSON.stringify(listado));
                actualizarTabla(listado)
                    .then(() => $spinner.style.display = "none");;
                unsetId();
                $form.reset();
            }
        }
    }
});



$form.addEventListener("reset", e => {
    for (const iterator of $form) {
        if (iterator.classList.contains("correcto"))
            iterator.classList.remove("correcto");
    }
});

//Envento cambio en el valor de los inputs
$form.addEventListener("input", e => {
    const form = e.target;
    console.log(form);
    switch (form.name) {
        case 'titulo':
            form.addEventListener("blur", validarLongitudMaxima);
            break;
        case 'transaccion':
            console.log("transaccion");
            form.addEventListener("blur", validarCampoVacio);
            break;
        case 'descripcion':
            form.addEventListener("blur", validarLongitudMaxima);

            console.log("descripcion");
            break;
        case 'precio':
            form.addEventListener("blur", validarPrecio);

            console.log("precio");
            break;
        case 'raza':
            form.addEventListener("blur", validarCampoVacio);

            console.log("raza");
            break;
        case 'fecha':

            form.addEventListener("blur", validarCampoVacio);
            console.log("fecha");
            break;
        case 'vacuna':

            form.addEventListener("blur", validarCampoVacio);
            console.log("vacuna");
            break;
        default:
            break;
    }
});



//Evento de click en la tabla
window.addEventListener("click", e => {

    if (e.target.matches("tr td")) {
        setId(e.target.parentElement.dataset.id);
        btn_editar.classList.replace("alta", "editar");
        document.querySelector(".editar div span").innerHTML = "Modificar";
        inicializarCampos();
    }
});

//Evento click del boton Eliminar
btn_eliminar.addEventListener("click", () => {
    listado.splice(buscarPorId(listado, _id), 1);
    localStorage.setItem("Elementos", JSON.stringify(listado));
    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");;
    unsetId();
});

//Evento click del boton
btn_cancelar.addEventListener("click", unsetId);

function actualizarTabla(vec) {
    return new Promise((res, rej) => {
        if ($tableContainer.contains(table)) {
            $tableContainer.removeChild(table);
            $spinner.style.display = "inherit";
        }
        setTimeout(() => {

            table = crearTabla(vec);
            $tableContainer.appendChild(table);
            res();
        }, 1000);
    });
}

function setId(id) {
    _id = id;
    if (_id > 0) {
        btn_editar.classList.replace("alta", "editar",);
        btn_cancelar.classList.remove("hidden");
        btn_eliminar.classList.remove("hidden");
    }
}

function unsetId() {
    _id = -1;
    btn_editar.classList.replace("editar", "alta");
    btn_cancelar.classList.add("hidden");
    btn_eliminar.classList.add("hidden");
    document.querySelector(".alta div span").innerHTML = "Guardar";
}

function buscarPorId(lista, id) {
    if(lista)
    {
        return lista.findIndex(el => el.id == id);
    }
  
}

/*
Inicializa campos linkeado los nombres de los parametros del objeto en storage 
con los inputs del form por lo que deben tener el mismo nombre del parametro como ID 
*/
function inicializarCampos() {
    const controles = $form.elements;
    const elemento = listado[buscarPorId(listado, _id)];

    for (const iterator of controles) {

        let nombreAtributo = iterator.name;
        if (elemento[nombreAtributo] == "gato" && iterator.id == "rdo_gato") {
            iterator.checked = true;
            iterator.classList.add("correcto");

        } else if (elemento[nombreAtributo] == "perro" && iterator.id == "rdo_perro") {
            iterator.checked = true;
            iterator.classList.add("correcto");
        }
        else if (elemento[nombreAtributo] && nombreAtributo != "transaccion") {
            iterator.classList.add("correcto");
            iterator.value = elemento[nombreAtributo];
        }
    }
}

function validarEntrada() {

    const form = document.forms[0].elements;
    const elemento = listado[buscarPorId(listado, _id)];
    let inputCorrectos = 0;
    for (const iterator of form) {
        if (iterator.classList.contains("correcto"))
            inputCorrectos++;

    }
    let selectorTipo = document.getElementById("txt_vacuna").value;
    if (selectorTipo == "si" || selectorTipo == "no") {
        inputCorrectos++;
    }


    if (inputCorrectos == 7)
        return true;

    return false;
}


