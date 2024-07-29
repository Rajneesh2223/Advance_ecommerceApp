USE `ecommerce-backend-app`

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    decription TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL ,
    stock INT NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    created_aT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN_KEY (category_id) REFERENCES categories(id)
)
