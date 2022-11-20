import crearTabla from "./tablaDinamica.js";
import Anuncio_Mascota from "./entidades/Anuncio_Mascota.js";
import imprimirAnuncios from "./anunciosDinamicos.js";
import {
    validarCampoVacio,
    //  validarPrecio,
} from "./entidades/validaciones.js";
import {
    // validarCampoVacio,
    validarPrecio,
} from "./entidades/validaciones.js";


const listado = JSON.parse(localStorage.getItem("Elementos")) || [new Anuncio_Mascota(0, 0, 0, 0, 0, 0, 0, 0, 0)];
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

if (listado.length > 0 && document.getElementById("listado")) {

    actualizarTabla(listado)
        .then(() => $spinner.style.display = "none");
}

if (document.getElementById("anunciosDinamicos")) {
    imprimirAnuncios(listado);
}


//Evento submit del formulario
$form.addEventListener("submit", e => {
    const form = e.target;
    e.preventDefault();
    //Alta
    if (btn_editar.classList.contains("alta")) {

        if (validarEntrada(form)) {
            listado.push(new Anuncio_Mascota(Date.now(), form.txt_titulo.value,
                form.transaccion.value, form.txt_descripcion.value, form.txt_precio.value,
                form.txt_raza.value, form.txt_fecha.value, form.txt_vacuna.value));

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
                if ($form.titulo.value) {
                    objeto.titulo = $form.titulo.value;
                }
                if ($form.transaccion.value) {
                    objeto.transaccion = $form.transaccion.value;
                }
                if ($form.descripcion.value) {
                    objeto.descripcion = $form.descripcion.value;
                }
                if (parseInt($form.precio.value)) {
                    objeto.precio = $form.precio.value;
                }
                if (parseInt($form.txt_raza.value)) {
                    objeto.raza = $form.txt_raza.value;
                }
                if (parseInt($form.txt_fecha.value)) {
                    objeto.fecha = $form.txt_fecha.value;
                }
                if (parseInt($form.txt_vacuna.value)) {
                    objeto.vacuna = $form.txt_vacuna.value;
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
            form.addEventListener("blur", validarCampoVacio);
            break;
        case 'transaccion':
            console.log("transaccion");
            form.addEventListener("blur", validarCampoVacio);
            break;
        case 'descripcion':
            form.addEventListener("blur", validarCampoVacio);

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
    return lista.findIndex(el => el.id == id);
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


