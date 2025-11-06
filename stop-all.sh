#!/bin/bash

echo "================================"
echo "Stopping ERP Municipal Services"
echo "================================"

if [ -d ".pids" ]; then
    for pidfile in .pids/*.pid; do
        if [ -f "$pidfile" ]; then
            PID=$(cat "$pidfile")
            SERVICE=$(basename "$pidfile" .pid)
            echo "  ➜ Stopping $SERVICE (PID: $PID)..."
            kill $PID 2>/dev/null || echo "    Process already stopped"
            rm "$pidfile"
        fi
    done
    rmdir .pids
else
    echo "No running services found (no .pids directory)"
fi

echo ""
echo "All services stopped!"
