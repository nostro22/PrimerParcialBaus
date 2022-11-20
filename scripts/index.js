import Anuncio_Mascota from "./entidades/Anuncio_Mascota.js";
import imprimirAnuncios from "./anunciosDinamicos.js";


const listado = JSON.parse(localStorage.getItem("Elementos")) || [new Anuncio_Mascota(0, 0, 0, 0, 0, 0, 0, 0, 0)];
const $tableContainer = document.getElementById("listado");
const $nav = document.getElementsByTagName("nav");
const $spinner = document.getElementById("spinner");
const $styleSheet = document.getElementById("style");
const $anuncio = document.querySelector(".anuncio");


if (document.getElementById("anunciosDinamicos")) {
    window.setTimeout(()=>
    {
        imprimirAnuncios(listado);
        $spinner.style.display = "none";
    },1000);
    //$spinner.style.display = "none";
}





