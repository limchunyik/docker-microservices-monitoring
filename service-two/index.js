const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 8002;

// Create a Registry to register metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Create a custom counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'endpoint', 'status_code']
});

register.registerMetric(httpRequestCounter);

app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: 'GET', endpoint: '/', status_code: 200 });
  res.send('Hello from Service Two!');
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`Service Two listening on port ${port}`);
});
