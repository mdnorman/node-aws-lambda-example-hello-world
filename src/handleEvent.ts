import { Context } from 'aws-lambda';

interface HelloResponse {
  statusCode: number;
  body: string;
}

const handleEvent = (event: any, context: Context) => {
  const response: HelloResponse = {
    statusCode: 200,
    body: 'Hello Lambda!',
  };

  return response;
};

export { handleEvent };
