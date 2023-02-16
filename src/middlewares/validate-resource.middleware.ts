import { AnyZodObject } from 'zod';
import { HttpStatusCode } from '../core/enums';
import { NextFunction, Request, Response } from 'express';

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (e: any) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(e.errors);
    }
  };
