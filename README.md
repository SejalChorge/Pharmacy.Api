# Pharmacy Inventory Management System

## Overview

A Pharmacy Inventory Management System built using ASP.NET Core Web API and React.

The application allows users to:

* Add medicines
* View available medicines
* Search medicines
* Record medicine sales
* Track low stock medicines
* Highlight medicines nearing expiry
* Persist data using JSON files

## Technology Stack

### Backend

* ASP.NET Core Web API
* C#
* JSON File Storage

### Frontend

* React
* Axios
* Bootstrap

## Features

### Medicine Management

* Add new medicines
* View inventory
* Search by medicine name

### Inventory Monitoring

* Low stock highlighting (Quantity < 10)
* Near expiry highlighting (Expiry within 30 days)

### Sales Management

* Record medicine sales
* Automatically update stock quantity

## Running the Application

### Backend

```bash
dotnet run
```

Swagger will be available at:

https://localhost:7152/swagger

### Frontend

```bash
cd pharmacy-ui
npm install
npm run dev
```

Frontend will be available at:

http://localhost:5173

```
```
