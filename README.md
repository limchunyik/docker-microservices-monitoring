# Docker Microservices with Monitoring

This project demonstrates a microservices architecture using Docker with Prometheus and Grafana for monitoring.

## Architecture

The project consists of:
- API Gateway: Routes requests to appropriate services
- Service One: A simple microservice
- Service Two: Another simple microservice
- Prometheus: Metrics collection
- Grafana: Metrics visualization

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

## Getting Started

1. Clone the repository:

git clone https://github.com/yourusername/docker-microservices-monitoring.git
cd docker-microservices-monitoring


2. Start the services:

docker-compose up -d


3. Access the services:
- API Gateway: http://localhost:8080
- Service One: http://localhost:8001
- Service Two: http://localhost:8002
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000 (login with admin/password)

## Monitoring Setup

1. Prometheus collects metrics from all services
2. Grafana visualizes the metrics

### Setting up Grafana Dashboard

1. Log in to Grafana at http://localhost:3000 with admin/password
2. Go to Configuration > Data Sources
3. Add Prometheus as a data source with URL http://prometheus:9090
4. Import the dashboard from the JSON file in the `grafana` folder

## Automation Scripts

- `scripts/deploy.sh`: Automates the deployment process
- `scripts/monitor-health.sh`: Checks the health of all services

## Technologies Used

- Docker and Docker Compose
- Node.js and Express
- Prometheus
- Grafana

## License

MIT
