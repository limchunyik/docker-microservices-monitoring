const express = require('express');
const client = require('prom-client');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080;

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
  res.send('API Gateway is running');
});

app.get('/service-one', async (req, res) => {
  try {
    const response = await axios.get('http://service-one:8001/');
    httpRequestCounter.inc({ method: 'GET', endpoint: '/service-one', status_code: 200 });
    res.send(response.data);
  } catch (error) {
    httpRequestCounter.inc({ method: 'GET', endpoint: '/service-one', status_code: 500 });
    res.status(500).send('Error connecting to Service One');
  }
});

app.get('/service-two', async (req, res) => {
  try {
    const response = await axios.get('http://service-two:8002/');
    httpRequestCounter.inc({ method: 'GET', endpoint: '/service-two', status_code: 200 });
    res.send(response.data);
  } catch (error) {
    httpRequestCounter.inc({ method: 'GET', endpoint: '/service-two', status_code: 500 });
    res.status(500).send('Error connecting to Service Two');
  }
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
