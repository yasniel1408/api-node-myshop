import express from 'express';
import argon2 from 'argon2';
import userService from '../services/userService';
import { PatchUserDto } from '../models/patchUserDto';

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await userService.findAll(req.body.limit || 100, req.body.page || 0);
    return res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await userService.getById(req.body.id);
    return res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.create(req.body);
    return res.status(201).send({ id: userId });
  }

  async patchUser(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    await userService.patchById(req.body.id, req.body);
    return res.status(204).send();
  }

  async editUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    await userService.editById(req.body.id, req.body);
    return res.status(204).send();
  }

  async removeUser(req: express.Request, res: express.Response) {
    await userService.deleteById(req.body.id);
    return res.status(204).send();
  }

  async updatePermissionRol(req: express.Request, res: express.Response) {
    const patchUserDto: PatchUserDto = {
      rol: parseInt(req.params.rol, 10)
    };
    await userService.patchById(req.body.id, patchUserDto);
    return res.status(204).send();
  }
}

export default new UsersController();
