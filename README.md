# Product Inventory System

A full-stack application for managing product inventory, built with .NET 9 backend and Angular frontend.

## Project Overview

This project is a complete inventory management system that allows users to perform the following operations:
- Add, view, update, and delete products in the inventory
- View product details in a simple user interface
- Store product data in a PostgreSQL database

## Features

- **CRUD Operations**: Complete set of Create, Read, Update, and Delete operations for products
- **Search & Filter**: Filter products by category or search by name/description
- **Pagination**: Navigate through large product lists with pagination
- **Form Validation**: Client-side validation for all form inputs
- **Success/Error Feedback**: User-friendly notifications on operations
- **Loading Indicators**: Visual feedback during data loading
- **Responsive Design**: Works on various screen sizes
- **Image Support**: Products can include image URLs

## Tech Stack

- **Backend**: .NET 9 with ASP.NET Core Web API
- **Frontend**: Angular 
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core
- **API Documentation**: Swagger
- **UI Components**: Angular Material

## Project Structure

### Backend (.NET)

- `ProductInventory.API` - ASP.NET Core Web API project
  - `Controllers` - API endpoints
  - `Models` - Data models
  - `Data` - Database context and configurations

### Frontend (Angular)

- `product-inventory-client` - Angular project
  - `components` - UI components
  - `models` - TypeScript interfaces
  - `services` - Services for API communication

## Setup Instructions

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Angular CLI](https://angular.io/cli)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Database Setup

1. Install PostgreSQL and pgAdmin 4
2. Create a new database named `inventory_db`
3. Create a table named `products` with the following schema:

```sql
CREATE TABLE public.products (
    id bigint PRIMARY KEY,
    name character varying(255) NOT NULL,
    description character varying(255),
    price double precision NOT NULL,
    quantity_in_stock integer NOT NULL,
    category character varying(255),
    image_url character varying(255)
);
```

### Database Credentials

- **Username**: postgres
- **Password**: 2727
- **User Password**: 0000

### Backend Setup

1. Clone the repository
2. Navigate to the API project directory:
   ```bash
   cd ProductInventory.API
   ```
3. Update the connection string in `appsettings.json` with your PostgreSQL credentials:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=inventory_db;Username=postgres;Password=2727"
   }
   ```
4. Run the API:
   ```bash
   dotnet run
   ```
5. The API will be available at http://localhost:5090, and Swagger documentation at http://localhost:5090/swagger

### Frontend Setup

1. Navigate to the Angular project directory:
   ```bash
   cd product-inventory-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the API URL in `src/app/services/product.service.ts` if needed:
   ```typescript
   private apiUrl = 'http://localhost:5090/api/products';
   ```
4. Run the Angular application:
   ```bash
   ng serve
   ```
5. The application will be available at http://localhost:4200

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/products | Get all products (with optional filtering and pagination) |
| GET    | /api/products/{id} | Get product by ID |
| POST   | /api/products | Create a new product |
| PUT    | /api/products/{id} | Update an existing product |
| DELETE | /api/products/{id} | Delete a product |
| GET    | /api/products/categories | Get all distinct product categories |

### Query Parameters for GET /api/products

- `page`: Page number (default: 1)
- `pageSize`: Number of items per page (default: 10)
- `searchTerm`: Search by name or description
- `category`: Filter by category

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was developed as part of a coding assessment for Interway
- Angular Material for the UI components
- Entity Framework Core for ORM
