import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { ArgumentError } from '../utils/errors';
import { toJson } from '../utils/logger';
import { xrayCaptureAllHttpTraffic } from '../utils/xray';
import { createEventDebugLogger } from './logger';

const debug = createEventDebugLogger('api-gateway');
const trace = createEventDebugLogger('api-gateway:trace');

export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  proxyEvent: APIGatewayProxyEvent,
) => Promise<TResult>;

export class StandardResponse implements APIGatewayProxyResult {
  statusCode: number;
  body: string;
  headers?: {
    [header: string]: boolean | number | string;
  };

  constructor(statusCode: number, body?: string) {
    this.statusCode = statusCode;
    this.body = body || '';
  }
}

export class RedirectResponse extends StandardResponse {
  constructor(uri: string, permanent?: boolean, body?: string) {
    super(permanent ? 301 : 307, body);

    this.headers = { Location: uri };
  }
}

export class InvalidArgumentResponse extends StandardResponse {
  constructor(body?: string) {
    super(400, body);
  }
}

export class NotFoundResponse extends StandardResponse {
  constructor(body?: string) {
    super(404, body);
  }
}

export const createApiGatewayProxyHandler =
  <TEvent = any, TResult = any>(handler: Handler<TEvent, TResult | StandardResponse>) =>
  async (proxyEvent: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    trace`ProxyEvent: ${toJson(proxyEvent)}`;
    trace`Context: ${toJson(context)}`;

    const event: TEvent = { ...(proxyEvent.body && JSON.parse(proxyEvent.body)), ...proxyEvent.queryStringParameters };
    debug`Event: ${toJson(event)}`;

    xrayCaptureAllHttpTraffic();

    try {
      const result: TResult | StandardResponse = await handler(event, context, proxyEvent);

      if (result instanceof StandardResponse) {
        debug`Standard response: ${toJson(result)}`;
        return result;
      }

      debug`Result: ${toJson(result)}`;

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (e) {
      if (e instanceof ArgumentError) {
        debug`Argument Error: ${toJson(e)}`;
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: e.message,
          }),
        };
      }

      console.error('Unhandled Error:', e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: e.message,
        }),
      };
    }
  };
