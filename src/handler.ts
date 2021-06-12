import serverless from 'serverless-http';
import { App } from '@tinyhttp/app';
import bodyParser from 'body-parser';
import 'source-map-support/register';

import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();
const PORT = process.env.PORT || 5000;

const app = new App();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (_req, res) => {
  res.send('hi :), I see you')
});

app.post('/', ({ body }, res) => res.json(body));


if (process.env.LOCAL) {
  app.listen(PORT as number, () => console.log(`listening on port:${PORT}, 🔥 http://localhost:${PORT} 🔥`))
}

/* Lambda handler function */
export const handler = serverless(app.handler.bind(app));