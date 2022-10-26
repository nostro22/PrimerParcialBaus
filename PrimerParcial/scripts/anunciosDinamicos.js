export default function imprimirAnuncios(lista) {
    if (lista != null) {
        var main = document.getElementById("anunciosDinamicos");
        var div = [];
        for (var i = 0; i < lista.length; i++) {
            const objecto = lista[i];
            if (objecto.id != 0) {

               var divPrincipal = document.createElement("div");
                divPrincipal.setAttribute("class", "anuncio");
    
                var innerDiv = document.createElement("div");
                innerDiv.setAttribute("class", "card-head");

                var innerDiv2 = document.createElement("div");
                innerDiv2.setAttribute("class", "card-body");

                var innerDiv3 = document.createElement("div");
                innerDiv3.setAttribute("class", "card-footer");

                var titulo = document.createElement("h1");
                titulo.textContent = objecto.titulo + " " + objecto.transaccion;

                var descripcion = document.createElement("h1");
                descripcion.textContent = objecto.descripcion;

                var precio = document.createElement("p1");
                precio.setAttribute("class", "card-text");
                precio.textContent = "$" + objecto.precio;

                crearCarasteristica(objecto, innerDiv2);

                innerDiv.appendChild(titulo);
                innerDiv.appendChild(descripcion);
                innerDiv.appendChild(precio);

                divPrincipal.appendChild(innerDiv);
                divPrincipal.appendChild(innerDiv2);
                divPrincipal.appendChild(innerDiv3);
                main.appendChild(divPrincipal);
            }
        }


    }
}


function crearCarasteristica(objecto, divAnuncios) {

    var div = document.createElement("div");
    var i = document.createElement("i");
    i.classList.add("material-icons");
    i.innerHTML = "pets";
    var p = document.createElement("p");
    p.innerText = objecto.raza;

    var div2 = document.createElement("div");
    var i2 = document.createElement("i");
    i2.classList.add("material-icons");
    i2.innerHTML = "cruelty_free";
    var p2 = document.createElement("p");
    p2.innerText = objecto.fecha;

    var div3 = document.createElement("div");
    var i3 = document.createElement("i");
    i3.classList.add("material-icons");
    i3.innerHTML = "vaccines";
    var p3 = document.createElement("p");
    p3.innerText = objecto.vacuna;



    var boton = document.createElement("button");
    boton.innerText="VER MASCOTAS";
    boton.classList.add("botonAnuncio");


    div.appendChild(i);
    div.appendChild(p);
    div.appendChild(boton);
    div2.appendChild(i2);
    div2.appendChild(p2);
    div2.appendChild(boton);
    div3.appendChild(i3);
    div3.appendChild(p3);
    div3.appendChild(boton);


    divAnuncios.appendChild(div);
    divAnuncios.appendChild(div2);
    divAnuncios.appendChild(div3);

}
