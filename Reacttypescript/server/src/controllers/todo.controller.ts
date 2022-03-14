import { Request, Response } from "express";
import { Todo } from "../Entity/todo";
import { getRepository } from "typeorm";

export const getTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const todos = await getRepository(Todo).find();
  return res.json(todos);
};



export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log('first')
  const newtodo = await getRepository(Todo).create(req.body);
  const results = await getRepository(Todo).save(newtodo);
  return res.json(results);
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const todo = await getRepository(Todo).findOne(req.params.id);
  if (todo) {
    getRepository(Todo).merge(todo, req.body);
    const results = await getRepository(Todo).save(todo);
    return res.json(results);
  }

  return res.json({msg: 'Not user found'});
};

export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Todo).delete(req.params.id);
  return res.json(results);
};