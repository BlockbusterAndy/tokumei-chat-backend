import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import connectDB from './config/database.js'

const app = express();
const server = createServer(app);

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
let isRedisConnected = false;

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
  isRedisConnected = false;
});

redisClient.on('connect', () => {
  isRedisConnected = true;
});

//Initialize Socket.io
const io = new Server(server);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

async function startServer() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
    isRedisConnected = true;
  } catch (err) {
    console.warn('Redis not available, continuing without Redis:', err.message);
    isRedisConnected = false;
  }

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  app.get('/', (req, res) => {
      res.status(200).send(
          "<h1>Welcome to Tokumei Chat Backend</h1>\n" + 
          "<p>This is a simple chat server built with Node.js, Express, Socket.io and Redis</p>"
      );
  });

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
    console.log(`Redis status: ${isRedisConnected ? 'Connected' : 'Not available'}`);
  });
}

startServer();