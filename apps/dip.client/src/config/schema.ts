import * as Joi from 'joi';

export const notAllowedKeys = ['watches'];

export type Schema = {
  server: string;
  'api-key': string;
  watches: object[];
};

const customJoi = Joi.extend((joi) => ({
  base: joi.object(),
  type: 'hostWithPort',
  prepare(value) {
    if (typeof value !== 'string') return value;

    const [schema, other] = value.split('//');
    const [host, port] = (other ?? schema).split(':');

    return {
      value: { schema: schema ?? 'http', host, port: port ?? 80 },
    };
  },
  validate(value) {
    const { error, value: validatedValue } = Joi.object({
      host: Joi.string().hostname().required(),
      port: Joi.number().port().required(),
      schema: Joi.string().valid('http:', 'https:').required(),
    }).validate(value);

    if (error) return { value: '', error };
    return {
      value: `${validatedValue.schema}//${validatedValue.host}:${validatedValue.port}`,
    };
  },
}));

export const schemaValidator = Joi.object({
  server: customJoi.hostWithPort().required(),
  'api-key': Joi.string().length(64).required(),
  watches: Joi.array().items(Joi.object({})),
});
