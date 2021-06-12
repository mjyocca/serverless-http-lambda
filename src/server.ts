import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

import handler from './handler';
const { app } = handler;

app.listen(PORT as number, () => console.log(`listening on port:${PORT}, 🔥 http://localhost:${PORT} 🔥`))