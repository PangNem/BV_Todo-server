import { Router } from 'express';
import TodoService from '../services/TodoService';
import Container from 'typedi';
import logger from '../utils/logger';
import { validators } from '../middlewares/validators';
import * as Joi from 'joi';

const router = Router();

router.post(
  '/',
  validators(
    Joi.object().keys({
      title: Joi.string().required()
    })
  ),
  async (req, res, next) => {
    try {
      const userDTO = req.body;

      const todoServiceInstance = Container.get(TodoService);
      const { id, title, done } = await todoServiceInstance.createTodoItem(
        userDTO
      );

      return res.status(201).json({
        data: {
          id,
          title,
          done
        }
      });
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const todoServiceInstance = Container.get(TodoService);
    const todoItems = await todoServiceInstance.readTodoItems();
    return res.status(200).json(todoItems);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

export default router;
