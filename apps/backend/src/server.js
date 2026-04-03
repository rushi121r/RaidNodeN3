import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { registerLiveScoringSocket } from './sockets/liveScoringSocket.js';

async function startServer() {
  await connectDatabase();

  const app = createApp();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: env.clientOrigin } });

  registerLiveScoringSocket(io);

  server.listen(env.port, () => {
    console.log(`🚀 API listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to boot server', error);
  process.exit(1);
});
