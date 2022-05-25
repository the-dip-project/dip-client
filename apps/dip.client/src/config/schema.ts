import * as Joi from 'joi';

export const notAllowedKeys = ['watches'];

export type Schema = {
  server: string;
  apiKey: string;
  watches: object[];
};

export const schemaValidator = Joi.object({
  server: Joi.string().hostname(),
  apiKey: Joi.string().length(64),
  watches: Joi.array().items(Joi.object({})),
});
