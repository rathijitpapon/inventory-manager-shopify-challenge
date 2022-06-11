# Inventory Manager Web Application

## Features
1. Inventory:
   * ID: Unique ID for each item
   *  Name
   *  Price
   *  Quantity
   *  Warehouse Location
2. Warehouse
   * Name
3. Inventory Operations:
   * Create Inventory Items
   * Update Inventory Items
   * Get Inventory Items Using ID or All
   * Remove Inventory Items
   * Assigning Inventory Items to Warehouse and Update Warehouse Location
4. Warehouse Operations:
   * Create Warehouse
   * Update Warehouse
   * Get Warehouse Using ID or All
   * Remove Warehouse & Delete all inventory items in that warehouse

## Backend
1. Node.js
2. Express
3. MongoDB

## Frontend
1. React

## Installation & Usage
1. <b>Local System Configuration</b>
   ```
    npm install

    cd frontend
    npm install --legacy-peer-deps
    npm run build

    cd ..
    npm start

    # Access http://localhost:8000/
   ```
2. <b>Heroku Deployment</b>
   ```
    # Access https://inventorymanagershopify.herokuapp.com/
