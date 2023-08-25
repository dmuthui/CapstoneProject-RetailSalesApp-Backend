# Retail Sales App Backend

This is the backend server for the Retail Sales App, which is a web application for managing product sales, generating Quotation, invoices, and receipts. The backend is built using Node.js, Express.js, and MongoDB.

## Contributors
### Diana
### David
### Mary
### Pius
### Arthanasias

## Table of Contents

## Installation
Clone the repository to your local machine:
git clone https://github.com/dopiyo85/CaptsoneProjectRetailSalesAppBackend

Change into the project directory:
cd Retail-Sales-App-Backend

Install the dependencies:
npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

The server should now be running at http://localhost:5005.

## Usage
To use the Retail Sales App Backend, you need to have the frontend application or API client set up to communicate with the backend.

You can use tools like Postman to test the API endpoints and interact with the backend directly.

## API Endpoints
The backend provides the following API endpoints:

GET /api/invoice: Get all invoices.
POST /api/invoice: Create a new invoice.
GET /api/inventory: Get all inventory.
POST /api/inventory: Create a new inventory.
GET /api/product: Get all product.
POST /api/products: Create a new products.
GET /api/quotation: Get all quotation.
POST /api/quotation: Create a new quotation.
GET /api/saleAgent: Get all saleAgent.
POST /api/saleAgent: Create a new saleAgent.
GET /api/shopLocator: Get all shopLocator.
POST /api/shopLocator: Create a new shopLocator.
GET /api/receipt: Get all receipts.
POST /api/receipt: Create a new receipt.
For more details on the API request and response formats, please refer to the respective route handlers in the routes/invoiceRoutes.js, routes/inventoryRoutes.js, routes/productRoutes.js, routes/quotationRoutes.js, routes/salesAgentRoutes.js, routes/shopLocatorRoutes.js and routes/receiptRoutes.js files.

## Database
The backend uses MongoDB as the database for storing invoices, inventory, product, quotation,salesAgent, shopLocator and receipts. Each invoice and receipt record includes the items sold, the quantity, the amount, and the total amount of the transaction.

## Dependencies
The backend server uses the following main dependencies:

Express.js: Web application framework for handling routes and requests.
Mongoose: MongoDB object modeling for Node.js.
Body-parser: Middleware for parsing request bodies.
Cors: Middleware for enabling CORS in the server.
Nodemon (optional): Development dependency for automatic server restart on code changes.
For a complete list of dependencies, please refer to the package.json file.

## Contributing
If you find any issues or have suggestions for improvement, feel free to create an issue or submit a pull request. Contributions are welcome!

## Future Enhancements
While the Retail Sales App is currently functional with its core features, there are several exciting enhancements that can be considered for future development:

### Customer Management System
Implement a customer management system to allow users to store and manage customer information. This feature would enable personalized customer experiences, such as loyalty programs and targeted marketing campaigns.

### Inventory Management
Introduce an inventory management system to keep track of product stock levels, automated stock alerts, and reorder points. This feature would help prevent stockouts and improve inventory control.

### Sales Analytics and Reporting
Incorporate sales analytics and reporting to provide insights into sales performance, popular products, and revenue trends. This data-driven approach would enable better decision-making and strategic planning.

### User Authentication and Authorization
Add user authentication and authorization to secure sensitive data and restrict access to certain functionalities based on user roles. This enhancement would ensure that only authorized personnel can access critical features.

### Online Payment Integration
Integrate popular online payment gateways (e.g., PayPal, M-pesa) to facilitate secure and convenient online payments. This would enhance the app's usability and offer customers multiple payment options.

### Mobile Application
Develop a mobile application for the Retail Sales App to expand its reach and provide users with a seamless mobile experience. The app could be available on iOS and Android platforms.

### Multi-Language Support
Implement multi-language support to cater to a diverse user base. This feature would allow users to switch between different languages based on their preferences.

### Email Notifications
Introduce email notifications for various events, such as order confirmations, invoice generation, and shipment updates. Email notifications would keep customers informed and engaged throughout the buying process.

### Data Backup and Restore
Set up automated data backup and restore mechanisms to safeguard crucial data and ensure business continuity in case of data loss or system failures.

### Discounts and Coupons
Incorporate a discounts and coupons system to allow users to apply promotional codes during checkout. This would incentivize customers and boost sales.

These future enhancements would take the Retail Sales App to the next level, providing a more comprehensive and feature-rich solution for managing product sales and enhancing customer experience.

## Known Bugs
There are no known bugs on this project.

## GitHub URL Link
- To be able to view the project click on https://github.com/dopiyo85/CaptsoneProjectRetailSalesAppBackend

## Deployed Live Link
To be able to view the project click on https://captsoneprojectretailsalesappbackend.onrender.com


## License
_The License used is GPL_

### Copyright (c) 2023 ** Retail Sales App @ Capstone Project**


