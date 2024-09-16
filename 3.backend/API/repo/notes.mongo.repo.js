// ULTIMA CAPA
import { NoteModel } from "./notes.mongo.model";

export class NoteMongoRepo {
  async getAll() {
    const result = await NoteModel.find().exec();
    return result;
  }
  async getById(id) {
    const result = await NoteModel.findById(id).exec();
    return result;
  }

  async create(note) {
    const result = await NoteModel.create(note);
    return result;
  }

  async update(id, note) {
    const result = await NoteModel.findByIdAndUpdate(id, note).exec();
    return result;
  }

  async delete(id) {
    const result = await NoteModel.findByIdAndDelete(id).exec();
    return result;
  }
}
// METODOS DE REPOSITORIO: Se encargan de contactar con la base de datos, obtener unos datos y devolverlos.
// .find() hace un query como de " SELCET * FROM NoteModel, si se le pasa un criterio de busqueda, devolverá solo lo especificado.
// .exec() ejecuta la consulta y devuelve una promesa. En este caso, la función getAll espera (await) a que esta promesa se resuelva antes de continuar.
