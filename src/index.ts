import { Handler, Context, Callback } from 'aws-lambda';
import { handleEvent } from './handleEvent';

const handler: Handler = (event: any, context: Context, callback: Callback) => {
  try {
    console.log('Event:', JSON.stringify(event));
    console.log('Context:', JSON.stringify(context));
    Promise.resolve(handleEvent(event, context))
      .then((result) => {
        console.log('Result:', JSON.stringify(result));
        callback(null, result);
      })
      .catch((error) => {
        console.error('Error:', error);
        callback(error);
      });
  } catch (e) {
    console.error('Error:', e);
    callback(e);
  }
};

export { handler };
