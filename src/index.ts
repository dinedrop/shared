import { logger, morgan } from './logger';
import { ApiError, errorConverter, errorHandler } from './errors';
import { catchAsync, pick, authLimiter } from './utils';
import { paginate, paginateTypes, QueryResult, IOptions } from './paginate';
import { toJSON } from './toJSON';
import auth from './auth/auth.middleware';
import { roles } from './config/roles';
import { objectId, password, validate } from './validate';
import getSwagger from './swagger/swagger.definition';
import { IUserRequest } from './auth/auth.types';
import {
  KafkaConsumer,
  KafkaProducer,
  ProducerConfig,
  TopicHandler,
  ConsumerConfig,
} from './kafka';

export {
  logger,
  morgan,
  ApiError,
  errorConverter,
  errorHandler,
  catchAsync,
  pick,
  authLimiter,
  toJSON,
  paginate,
  paginateTypes,
  QueryResult,
  IOptions,
  auth,
  objectId,
  password,
  validate,
  roles,
  KafkaConsumer,
  KafkaProducer,
  ProducerConfig,
  TopicHandler,
  ConsumerConfig,
  getSwagger,
  IUserRequest,
};
