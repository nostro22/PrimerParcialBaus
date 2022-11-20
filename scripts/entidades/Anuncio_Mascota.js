import Anuncio from "./Anuncio.js";

  export default class Anuncio_Mascota extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, raza, fecha, vacuna) {
      super(id, titulo, transaccion, descripcion, precio);
      this.id = id;
      this.raza=raza;
      this.fecha=fecha;
      this.vacuna=vacuna;
    }
  
  }