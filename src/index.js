const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

// Connect to Redis
const Redis_PORT = 6379;
const Redis_HOST = 'redis';
const redisClient = redis.createClient({
  url: `redis://${Redis_HOST}:${Redis_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis...'));
redisClient.connect();

// Connect to Postgres DB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '5432';
const DB_HOST = 'postgres';
const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
  connectionString: URI,
});

client
  .connect()
  .then(() => console.log('Connected to Postgres DB...'))
  .catch((err) => console.log('Failed to connect to Postgres DB', err));

// Connect to MongoDB (commented out)
// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = '27017';
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch((err) => console.log('Failed to connect to MongoDB', err));

// Routes
app.get('/', (req, res) => {
  redisClient.set('products', 'products...');
  res.send('<h1>Hello Adel! Hi, what is your name Adel Nasr Zawia!</h1>');
});

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(`<h1>Hello Adel! Hi, what is your name Adel Nasr Zawia!</h1> <h2>${products}</h2>`);
});

// Start server
app.listen(port, () => {
  console.log(`App is up and running on port: ${port}`);
});
