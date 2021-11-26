import { createBaseDebugLogger } from '../utils/logger';

export const createConfigDebugLogger = (name: string) => createBaseDebugLogger(`config:${name}`);
