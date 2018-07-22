import { APIGatewayProxyEvent, Context } from 'aws-lambda';

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

  const result = await handler(event, context, proxyEvent);

  return {
    statusCode: 200,
    body: result,
  };
};
