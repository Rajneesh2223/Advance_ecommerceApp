# E-commerce Backend API

A robust backend API for an e-commerce platform built with Express.js and MySQL. This application provides endpoints for user management, authentication, product management, order processing, and vendor operations.

## Features

- 🔐 User authentication and authorization
- 👤 User management
- 🛍️ Product management
- 📦 Order processing
- 🏪 Vendor management
- 👑 Admin dashboard
- 🔒 Role-based access control

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication Routes
```
POST /api/auth/login
POST /api/auth/register
```

### User Routes
```
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
```

### Product Routes
```
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Order Routes
```
GET /api/orders
GET /api/orders/:id
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id
```

### Admin Routes
```
GET /admin/*
POST /admin/*
PUT /admin/*
DELETE /admin/*
```

### Vendor Routes
```
GET /api/vendor/*
POST /api/vendor/*
PUT /api/vendor/*
DELETE /api/vendor/*
```

## Project Structure
```
├── config/
│   └── db.js
├── controllers/
├── middlewares/
├── models/
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── adminRoutes.js
│   └── vendorRoutes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Database Configuration

The application uses MySQL as its database. The connection is configured in `config/db.js` using the environment variables defined in your `.env` file.

## Security

- CORS enabled
- JWT authentication
- Role-based access control
- Request body parsing with express.json()

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
