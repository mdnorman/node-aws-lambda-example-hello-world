import { createBaseDebugLogger } from '../utils/logger';

export const createEventDebugLogger = (name: string) => createBaseDebugLogger(`event:${name}`);
