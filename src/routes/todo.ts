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

      const TodoServiceInstance = Container.get(TodoService);
      const { id, title, done } = await TodoServiceInstance.createTodoItem(
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

export default router;
