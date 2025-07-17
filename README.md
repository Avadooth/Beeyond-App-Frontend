# 🎯 Beeyond Tech - Frontend (React + Vite)

This is the frontend for the Beeyond Tech Assignment built using **React (Vite)**, **Tailwind CSS**, and **Axios**. It communicates with a backend API and uses **WebSockets** for real-time order updates.

---

## 🚀 Live URL

🌐 **Frontend**: [http://51.20.157.181](http://51.20.157.181)

---

## 🛠 Tech Stack

- React + Vite
- Tailwind CSS
- Axios
- Socket.IO (Client)
- Docker + Nginx

---

## 🐳 Docker Setup

To build and run the frontend via Docker:

### 1. Dockerfile

```dockerfile
# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

2. Build & Run (Standalone)

docker build -t beeyond-frontend .
docker run -d -p 80:80 beeyond-frontend

🧠 Features

🔐 Login & Register pages

📦 Product listing

🛒 Order placement flow

📡 Real-time updates with Socket.IO

📱 Responsive UI

🔁 Axios setup with JWT tokens

🔗 API Endpoints Used
Method	Endpoint	Description
GET	/api/products	List all products
POST	/api/orders/BuyOrder	Place a new order
POST	/api/auth/login	Login user
POST	/api/auth/register	Register user

All routes are prefixed with /api and proxied through Nginx.

🔌 WebSocket Setup
WebSocket is initialized in src/socket.js:


import { io } from "socket.io-client";

const socket = io("http://51.20.157.181", {
  path: "/socket.io",
  transports: ["websocket"],
});

export default socket;
🧪 Health Check

curl http://51.20.157.181/health
# Returns: OK
💡 Notes
App expects the backend to be available at /api

Frontend supports deep-linking and refresh via Nginx's try_files rule

🙋 Author
Avadooth Joshi


---