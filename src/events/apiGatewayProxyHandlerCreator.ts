import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ArgumentError } from '../utils/errors';

export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  proxyEvent: APIGatewayProxyEvent,
) => Promise<TResult>;

export const createApiGatewayProxyHandler = (handler: Handler) => async (
  proxyEvent: APIGatewayProxyEvent,
  context: Context,
) => {
  console.log('ProxyEvent:', JSON.stringify(proxyEvent));
  console.log('Context:', JSON.stringify(context));

  const event = { ...(proxyEvent.body && JSON.parse(proxyEvent.body)), ...proxyEvent.queryStringParameters };
  console.log('Event:', JSON.stringify(event));

  try {
    const result = await handler(event, context, proxyEvent);
    console.log('Result:', JSON.stringify(result));

    return {
      statusCode: 200,
      body: result,
    };
  } catch (e) {
    if (e instanceof ArgumentError) {
      console.log('Argument Error:', e);
      return {
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }

    console.error('Unhandled Error:', e);
    return {
      statusCode: 500,
      body: {
        error: e.message,
      },
    };
  }
};
