#!/bin/bash

echo "Checking health of services..."

# Check API Gateway
if curl -s http://localhost:8080 > /dev/null; then
    echo "API Gateway: UP"
else
    echo "API Gateway: DOWN"
fi

# Check Service One
if curl -s http://localhost:8001 > /dev/null; then
    echo "Service One: UP"
else
    echo "Service One: DOWN"
fi

# Check Service Two
if curl -s http://localhost:8002 > /dev/null; then
    echo "Service Two: UP"
else
    echo "Service Two: DOWN"
fi

# Check Prometheus
if curl -s http://localhost:9090 > /dev/null; then
    echo "Prometheus: UP"
else
    echo "Prometheus: DOWN"
fi

# Check Grafana
if curl -s http://localhost:3000 > /dev/null; then
    echo "Grafana: UP"
else
    echo "Grafana: DOWN"
fi
