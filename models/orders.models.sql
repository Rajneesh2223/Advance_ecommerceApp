USE `ecommerce-backend-app`

CREATE TABLE orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    productId INT,
    quantity INT,
    totalPrice DECIMAL(10, 2),
    status ENUM('pending', 'shipped', 'delivered', 'canceled'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
