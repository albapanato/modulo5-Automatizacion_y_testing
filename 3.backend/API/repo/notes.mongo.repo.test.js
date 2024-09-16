import { NoteMongoRepo } from "./notes.mongo.repo"; // Para testear la clase
import { NoteModel } from "./notes.mongo.model"; // Para testear la conexion con la base de datos

jest.mock("./notes.mongo.model.js");

describe("NotesMongoRepo", () => {
  describe("getAll", () => {
    it("should return all notes", async () => {
      // Arrange parte-1: Nos inventamos un array con datos
      const notes = [
        { title: "note 1", content: "content 1" },
        { title: "note 2", content: "content 2" },
      ];
      // Aqui mockeamos el funcionamiento de NoteModel, simulamos el comportamiento de la funcion en notes.mongo.repo.js:

      //   export class NoteMongoRepo {
      //     async getAll() {
      //       const result = await NoteModel.find().exec();
      //       return result;
      //     }
      //   }
      // Moqueando: Siguendo la estrutura de mongoose, le decimos que el valor del objeto .find({ va a tener un metodo que se llama .exec (que tiene el valor de notes, que nos hemos inventado)})
      NoteModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(notes),
      });
      // Arrange parte-2: creamos una instancia para poder hacer el test
      const repo = new NoteMongoRepo();
      // Act: Llamamos al metodo getAll
      const result = await repo.getAll();
      // Assert: Chequeamos que el resultado sean iguales que las notas
      expect(result).toEqual(notes);
      expect(NoteModel.find).toHaveBeenCalledTimes(1);
    });
  });
  describe("getById", () => {
    it("should return one note by id", async () => {
      // Arrange: Crea una nota simulada con un id
      const note = { id: 1, title: "note 1", content: "content 1" };

      // Simula el método findById del modelo de Mongoose para devolver la nota simulada
      NoteModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(note),
      });

      // Crea una nueva instancia de NoteMongoRepo
      const repo = new NoteMongoRepo();

      // Act: Llama al método getById del repositorio
      const result = await repo.getById(note.id);

      // Assert: Verifica que el resultado sea igual a la nota simulada
      expect(result).toEqual(note);
      expect(NoteModel.findById).toHaveBeenCalledTimes(1);
      expect(NoteModel.findById).toHaveBeenCalledWith(note.id);
    });
  });
  describe("create", () => {
    it("should create a new note", async () => {
      const newNote = { id: 3, title: "note 3", content: "content 3" };

      NoteModel.create = jest.fn().mockResolvedValue(newNote);

      const repo = new NoteMongoRepo();

      const result = await repo.create(newNote);

      expect(result).toEqual(newNote);
      expect(NoteModel.create).toHaveBeenCalledTimes(1);
      expect(NoteModel.create).toHaveBeenCalledWith(newNote);
    });
  });
  describe("update", () => {
    it("should updated an existing note", async () => {
      const updatedNote = {
        id: 3,
        title: "note updated 3",
        content: "content updated 3",
      };
      NoteModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedNote),
      });
      const repo = new NoteMongoRepo();
      const result = await repo.update(updatedNote.id, updatedNote);
      expect(result).toEqual(updatedNote);
      expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledWith(
        updatedNote.id,
        updatedNote
      );
      expect(NoteModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });
  describe("deleteById", () => {
    it("should delete a note by id", async () => {
      // Arrange: Crea una nota simulada con un id
      const noteToBeDelete = {
        id: 1,
        title: "note deleted",
        content: "content deleted",
      };

      // Simula el método findById del modelo de Mongoose para devolver la nota simulada
      NoteModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(noteToBeDelete),
      });

      // Crea una nueva instancia de NoteMongoRepo
      const repo = new NoteMongoRepo();

      // Act: Llama al método getById del repositorio
      const result = await repo.delete(noteToBeDelete.id);

      // Assert: Verifica que el resultado sea igual a la nota simulada
      expect(result).toEqual(noteToBeDelete);
      expect(NoteModel.findById).toHaveBeenCalledTimes(1);
      expect(NoteModel.findById).toHaveBeenCalledWith(noteToBeDelete.id);
    });
  });
});
