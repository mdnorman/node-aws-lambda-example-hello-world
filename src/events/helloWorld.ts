import { helloWorld } from '../services/helloWorld';
import { createApiGatewayProxyHandler } from './apiGatewayProxyHandlerCreator';

export const handler = createApiGatewayProxyHandler(({ word }) => helloWorld(word));
