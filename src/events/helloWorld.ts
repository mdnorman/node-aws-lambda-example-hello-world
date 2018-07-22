import { Handler, Context } from 'aws-lambda';
import { helloWorld } from '../services/helloWorld';

export interface HelloRequest {
  word?: string;
}

export interface HelloResponse {
  statusCode: number;
  body: string;
}

export const handler: Handler<HelloRequest, HelloResponse> = async (event: HelloRequest, context: Context) => {
  console.log('Event:', JSON.stringify(event));
  console.log('Context:', JSON.stringify(context));

  const body = await helloWorld(event.word);
  return {
    body,
    statusCode: 200,
  };
};
