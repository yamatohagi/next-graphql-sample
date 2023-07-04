import { z } from 'zod';

export const createDefaultValues = (schema: z.ZodObject<any>) => {
  const fields = schema.shape;
  const defaults: any = {};

  const keys = Object.keys(fields);
  keys.forEach((key) => {
    const field = fields[key];

    if (field instanceof z.ZodString) {
      defaults[key] = '';
    } else if (field instanceof z.ZodNumber) {
      defaults[key] = 0;
    } else if (field instanceof z.ZodBoolean) {
      defaults[key] = false;
    } else if (field instanceof z.ZodArray) {
      defaults[key] = [];
    } else if (field instanceof z.ZodObject) {
      defaults[key] = createDefaultValues(field);
    } else if (field instanceof z.ZodUnion) {
      defaults[key] = null;
    } else if (field instanceof z.ZodNull) {
      defaults[key] = null;
    } else if (field instanceof z.ZodNativeEnum) {
      defaults[key] = '';
    } else if (field instanceof z.ZodUndefined) {
      defaults[key] = undefined;
    } else {
      defaults[key] = undefined;
    }
  });

  return defaults;
};
