import { Router } from 'express';
import UserService from '../services/UserService';
import Container from 'typedi';
import logger from '../utils/logger';
import { validators } from '../middlewares/validators';
import * as Joi from 'joi';

const router = Router();

router.post('/',
  validators(
    Joi.object().keys({
      nickname: Joi.string().required()
    })
  ),
  async (req, res, next) => {
    try {
      const userDTO = req.body;

      const userServiceInstance = Container.get(UserService);
      const { id, nickname, createdAt, updatedAt } = await userServiceInstance.createUser(userDTO);

      return res.status(201).json({
        data: {
          id, nickname, createdAt, updatedAt
        }
      });
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

export default router;
