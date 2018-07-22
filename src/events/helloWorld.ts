import { helloWorld } from '../services/helloWorld';
import { createApiGatewayProxyHandler } from './apiGatewayProxyHandlerCreator';

interface HelloEvent {
  word?: string;
}

export const handler = createApiGatewayProxyHandler<HelloEvent, string>(({ word }) => helloWorld(word));
