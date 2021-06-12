import serverless from 'serverless-http';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { App } from '@tinyhttp/app';
import type { Request } from '@tinyhttp/app';
import bodyParser from 'body-parser';
import 'source-map-support/register';

interface LambdaRequest extends Request {
  serverless: {
    event: APIGatewayProxyEvent,
    context: Context
  }
}

const app = new App();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.send('hi :), I see you')
});

app.post('/', ({ serverless, body }: LambdaRequest, res) => {
  res.json({serverless, body})
});

// Cache
let handler;

export default {
  /* Lambda handler function */
  handler: async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    if (!handler) {
      handler = serverless(app.handler.bind(app), {
        request: (request) => {
          request.serverless = { event, context };
        }
      });
    }
    const result = await handler(event, context);
    return result;
  },
  app
}

module.exports = module.exports.default;
