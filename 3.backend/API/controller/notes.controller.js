import { NoteMongoRepo } from "../repo/notes.mongo.repo";

export class NotesController {
  constructor() {
    this.repo = new NoteMongoRepo();
    console.log("Node_env:", process.env.NODE_ENV);
  }

  async getAll(_req, res, next) {
    try {
      const result = await this.repo.getAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await this.repo.getById(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await this.repo.create(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.repo.update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.repo.delete(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
