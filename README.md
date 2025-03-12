# Real-Time Trading and Investment Platform

A modern, secure, and feature-rich trading platform built with Spring Boot, React, and Tailwind CSS.

## Features

- 🔐 Secure Authentication with JWT and 2FA
- 📊 Real-time Cryptocurrency Trading Data
- 💼 Portfolio Management
- 💳 Payment Processing (Razorpay & Stripe)
- 🤖 AI-powered Chatbot Support
- 🌓 Dark/Light Mode
- 📱 Responsive Design

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- MySQL 8.0
- JWT Authentication

### Frontend
- React 18
- Redux Toolkit
- Tailwind CSS
- Chart.js
- Socket.IO (for real-time updates)

### APIs
- Gemini API
- CoinGecko API
- Razorpay
- Stripe

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.8+

## Project Structure

```
trading-platform/
├── backend/                 # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── frontend/               # React application
│   ├── src/
│   ├── package.json
│   └── README.md
└── docker-compose.yml      # Docker configuration
```

## Getting Started

1. Clone the repository
2. Set up environment variables
3. Start the backend server
4. Start the frontend development server

## Environment Variables

Create a `.env` file in both backend and frontend directories with the following variables:

### Backend
```
DB_URL=jdbc:mysql://localhost:3306/trading_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

### Frontend
```
REACT_APP_API_URL=http://localhost:8080
REACT_APP_SOCKET_URL=ws://localhost:8080
```

## License

MIT License # real-time-trading-platform
