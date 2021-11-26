import { createConfigDebugLogger } from './logger';

const debug = createConfigDebugLogger('common');

export const environment = process.env.NODE_ENV || 'development';
debug`Environment: ${environment}`;

export const isDevelopment = () => environment === 'development';
export const isTest = () => environment === 'test';
export const isProduction = () => environment === 'production';
