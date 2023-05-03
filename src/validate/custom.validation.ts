import { CustomHelpers } from 'joi';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const objectId = (value: string, helpers: CustomHelpers) => {
  if (!/^[0-9a-fA-F]{24}$/.exec(value)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({
      custom: 'password must be at least 8 characters',
    });
  }
  if (!/\d/.exec(value) || !/[a-zA-Z]/.exec(value)) {
    return helpers.message({
      custom: 'password must contain at least 1 letter and 1 number',
    });
  }
  return value;
};
