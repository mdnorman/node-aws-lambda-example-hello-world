import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import { helloWorld } from '../services/helloWorld';
import { createApiGatewayProxyHandler } from './apiGatewayProxyHandlerCreator';

export interface HelloRequest {
  word?: string;
}

export interface HelloResponse {
  statusCode: number;
  body: string;
}

export const handler2: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('Event:', JSON.stringify(event));
  console.log('Context:', JSON.stringify(context));

  const params = event.queryStringParameters || (event.body && JSON.parse(event.body)) || {};
  const body = await helloWorld(params.word);
  return {
    body,
    statusCode: 200,
  };
};

export const handler = createApiGatewayProxyHandler(({ word }) => helloWorld(word));
