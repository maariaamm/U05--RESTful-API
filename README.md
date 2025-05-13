# 🚗 Car sales site - RESTFUL API


This REST API car sale site allows you to post car ads for sale by creating an account!  
Users are able to **create**, **read**, **update** and **delete** car ad posts.

---

## This API is built with 

- Node.js  
- Express  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- Bcrypt for password hashing

---

## Visit the deployed version - [CarSales]()



## ▶️ Follow these steps to test this API locally :

#### 1. Clone this repository -> Git clone  
#### 2. Install dependencies -> npm install 
#### 3. Create `.env` file and fill in the following variables with your own credentials:
 - MONGODB_URI= ""
 - JWT_SECRET= 
                            
#### 4. Start server -> npm run dev
#### The server will be running on http://localhost:3000

---

## Object modeling

### CarAd Model

- `make` - Car's make (e.g., Toyota, BMW)
- `model` - Car's model (e.g., Corolla, X5)
- `year` - Year of manufacture
- `price` - Price of the car
- `mileage` - Distance traveled by the car in kilometers/miles
- `fuelType` - Type of fuel (e.g., Gasoline, Diesel, Electric)
- `transmission` - Transmission type (e.g., Manual, Automatic)
- `color` - Car's color
- `description` - Short description of the car
- `datePosted` - Date when the ad was posted

### User Model

- `username` 
- `email` 
- `password` - Hashed password for user authentication
- `role` - Role of the user (e.g., 'user', 'admin')

---

## Resource URIs

### Authentication

| HTTP-metod     | Endpoint              |   
|----------------|-----------------------|
| **POST**       | `/api/users/register` | 
| **POST**       | `/api/users/login`    |  

### Car Ads

| HTTP-metod     | Endpoint             | 
|----------------|----------------------|
| **GET**        | `/api/carAds`        |   
| **GET**        | `/api/carAds/:id`    | 
| **POST**       | `/api/carAds`        | 
| **PUT**        | `/api/carAds/:id`    | 
| **DELETE**     | `/api/carAds/:id`    | 

---

# cURL Examples

Below are examples of how to use `curl` to interact with the car sales API. 

## 1. Register a User (POST `/api/users/register`)

To register a new user, send the following request: (you can skip this step and use the credentials below to log in)
```
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "role": "user"
  }'
```

## 2. Log in (POST /api/users/login)
```
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword"
  }'
```
## 3. Get All Car Ads (GET /api/carAds)
```
curl -X GET http://localhost:3000/api/carAds
```

## 4. Get a Specific Car Ad (GET /api/carAds/:id) (replace :id with the actual ID)
```
curl -X GET http://localhost:3000/api/carAds/68229e64829ef4b28cf2e5e9
```

## 5. Create a New Car Ad (POST /api/carAds)
To create a new car ad, send the following JSON data:
```
curl -X POST http://localhost:3000/api/carAds \
  -H "Content-Type: application/json" \
  -d '{
    "user": "682285f3bdcfbcb995c2d8f3", 
    "brand": "Audi",
    "model": "A7",
    "price": 150000,
    "fuelType": "Petrol",
    "year": 2015
  }'
```

## 6. Update a Car Ad (PUT /api/carAds/:id) To update a car ad (replace :id with the actual ID):
```
curl -X PUT http://localhost:3000/api/carAds/6822959de36ef24d07080f04 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 16000
  }'
```

## 7. Delete a Car Ad (DELETE /api/carAds/:id)
(To delete a car ad, use its ID:)
```
curl -X DELETE http://localhost:3000/api/carAds/6822959de36ef24d07080f04
```







