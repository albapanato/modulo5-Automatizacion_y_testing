import { NoteMongoRepo } from "../repo/notes.mongo.repo.js";
import { NotesController } from "./notes.controller.js";

describe("NotesController", () => {
  describe("getAll", () => {
    it("should return all notes", async () => {
      // arrange: Mock the NotesMongoRepo.getAll method
      const notes = [
        { title: "note 1", content: "content 1" },
        { title: "note 2", content: "content 2" },
      ];
      NoteMongoRepo.prototype.getAll = jest.fn().mockResolvedValue(notes);

      // arrange: Create a new NotesController instance
      const controller = new NotesController();
      // arrange: Mock the request, response, and next function
      const req = {};
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      // act: Call the controller.getAll method
      await controller.getAll(req, res, next);
      // assert: Verify that the NotesMongoRepo.getAll method was called
      expect(res.json).toHaveBeenCalledWith(notes);
    });
    it("should call next function when an error occurs", async () => {
      // arrange: Mock the NotesMongoRepo.getAll method to throw an error
      NoteMongoRepo.prototype.getAll = jest
        .fn()
        .mockRejectedValue(new Error("An error occurred"));

      // arrange: Create a new NotesController instance
      const controller = new NotesController();
      // arrange: Mock the request, response, and next function
      const req = {};
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      // act: Call the controller.getAll method
      await controller.getAll(req, res, next);
      // assert: Verify that the next function was called
      expect(next).toHaveBeenCalled();
    });
  });
  describe("getById", () => {
    it("should return notesById", async () => {
      const note = { id: 1, title: "note 1", content: "content 1" };
      NoteMongoRepo.prototype.getById = jest.fn().mockResolvedValue(note);
      const controller = new NotesController();
      const req = {
        params: { id: 1 },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.getById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(note);
    });
    it("should return error notesByID", async () => {
      const note = { id: 1, title: "note 1", content: "content 1" };
      NoteMongoRepo.prototype.getById = jest
        .fn()
        .mockRejectedValue(new Error("An error occurred"));
      const controller = new NotesController();
      const req = {
        params: { id: 1 },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.getById(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should create a new note", async () => {
      const newNote = { id: 2, title: "note 2", content: "content 2" };
      NoteMongoRepo.prototype.create = jest.fn().mockResolvedValue(newNote);
      const controller = new NotesController();
      const req = {
        body: newNote,
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.create(req, res, next);
      expect(res.json).toHaveBeenCalledWith(newNote);
    });
    it("should return an error, failling creating a new note ", async () => {
      const newNote = { id: 2, title: "note 2", content: "content 2" };
      NoteMongoRepo.prototype.create = jest
        .fn()
        .mockRejectedValue(new Error("An error occurred"));
      const controller = new NotesController();
      const req = {
        body: newNote,
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.create(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should updated an existing note", async () => {
      const updatedNote = {
        id: 2,
        title: "note updated 2",
        content: "content updated 2",
      };
      NoteMongoRepo.prototype.update = jest.fn().mockResolvedValue(updatedNote);
      const controller = new NotesController();
      const req = {
        params: { id: updatedNote.id },
        body: updatedNote,
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.update(req, res, next);
      expect(res.json).toHaveBeenCalledWith(updatedNote);
    });
    it("should call next with an error when update fails", async () => {
      const updatedNote = { id: 2, title: "note 2", content: "content 2" };
      NoteMongoRepo.prototype.update = jest
        .fn()
        .mockRejectedValue(new Error("An error occurred"));
      const controller = new NotesController();
      const req = {
        params: { id: updatedNote.id },
        body: updatedNote,
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.update(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("delete", () => {
    it("should delete an existing note", async () => {
      const noteToBeDelete = {
        id: 1,
        title: "note deleted",
        content: "content deleted",
      };
      NoteMongoRepo.prototype.delete = jest
        .fn()
        .mockResolvedValue(noteToBeDelete.id);

      const controller = new NotesController();
      const req = {
        params: { id: noteToBeDelete.id },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.delete(req, res, next);
      expect(res.json).toHaveBeenCalledWith(noteToBeDelete.id);
    });
    it("should return an error. Failing deleting an existing note", async () => {
      const noteToBeDelete = {
        id: 1,
        title: "note deleted",
        content: "content deleted",
      };
      NoteMongoRepo.prototype.delete = jest
        .fn()
        .mockRejectedValue(new Error("Error"));

      const controller = new NotesController();
      const req = {
        params: { id: noteToBeDelete.id },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      await controller.delete(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
