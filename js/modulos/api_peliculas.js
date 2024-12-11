export function dataPelis() {
  const urlJSON = "../data/data.json";
  const aggpelis = document.getElementById("contenedor-galeria");

  fetch(urlJSON)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pelicula) => {
        let {
          nombre,
          fecha,
          descripcion,
          valoraciones,
          categoria,
          duracion,
          imagen,
        } = pelicula;

        let div = crearCard(
          nombre,
          fecha,
          descripcion,
          valoraciones,
          categoria,
          duracion,
          imagen
        );
        aggpelis.appendChild(div);
      });
    });

  function crearCard(
    nombre,
    fecha,
    descripcion,
    valoraciones,
    categoria,
    duracion,
    imagen
  ) {
    const div = document.createElement("div");
    div.className = "card-img";

    const estrellas = generarEstrellas(valoraciones);

    div.innerHTML = `
      <img
          class="imagen"
          src="${imagen}"
          alt="Póster Película"
      />
      <div class="info-peli">
        <h2>${nombre} <span>(${fecha})</span></h2>
        <div class="datos-peli">
          <p>${descripcion}</p>
          <p class="categorias">${categoria} <span>${duracion}</span></p>
          <p class="valoraciones">
            ${estrellas} <!-- Estrellas dinámicas aquí -->
          </p>
        </div>
      </div>
    `;
    return div;
  }

  function generarEstrellas(valor) {
    const maxEstrellas = 5;
    let estrellasHTML = "";

    const estrellasCompletas = Math.floor(valor);
    estrellasHTML += "★".repeat(estrellasCompletas);

    if (valor - estrellasCompletas >= 0.5) {
      estrellasHTML += "☆";
    }

    const estrellasVacias =
      maxEstrellas -
      estrellasCompletas -
      (valor - estrellasCompletas >= 0.5 ? 1 : 0);
    estrellasHTML += "☆".repeat(estrellasVacias);

    return estrellasHTML;
  }
}
