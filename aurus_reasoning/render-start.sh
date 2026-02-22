#!/bin/bash
# Start script for the NAT agent on Render
# Render provides the PORT environment variable dynamically

PORT="${PORT:-8000}"

echo "Starting NAT Agent on 0.0.0.0:${PORT}..."
nat serve --config_file src/aurus_reasoning/configs/config.yml --host 0.0.0.0 --port $PORT
