#!/bin/bash

# Navigate to the backend and start the backend server
echo "Starting Backend Server..."
cd backend || exit
npm install
node app.js &
BACKEND_PID=$!

# Navigate to the frontend and start the frontend server
echo "Starting Frontend Server..."
cd ../frontend || exit
npm install
PORT=3001 npm start &
FRONTEND_PID=$!

# Wait for both processes to finish
echo "Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"
wait $BACKEND_PID $FRONTEND_PID
