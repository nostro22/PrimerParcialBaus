function crearTabla(vec) {
    const tabla = document.createElement("table");

    tabla.appendChild(crearCabecera(vec[0]));
    tabla.appendChild(crearCuerpo(vec));

    return tabla;
}

function crearCabecera(elemento) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    tr.setAttribute("class", "cabecera");

    Object.keys(elemento).forEach(key => { 
        if (key !== "id") {
            const th = document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }
    });

    thead.appendChild(tr);

    return thead;
}

function crearCuerpo(vec) {
    const tbody = document.createElement("tbody");

    for (let i = 1; i < vec.length; i++) {
        const tr = document.createElement("tr");

        tr.classList.add(i % 2 == 0 ? "colorPar" : "colorImpar");
        tr.classList.add("pointer");

        for (const key in vec[i]) {
            if (key === "id") {
                tr.setAttribute("data-id", vec[i][key]);
            } else {
                const td = document.createElement("td");
                td.textContent = vec[i][key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    }

    return tbody;
}

export default crearTabla;