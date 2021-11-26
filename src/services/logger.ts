import { createBaseDebugLogger } from '../utils/logger';

export const createServicesDebugLogger = (name: string) => createBaseDebugLogger(`services:${name}`);
