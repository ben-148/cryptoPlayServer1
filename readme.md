# Ben Oved Node.js Project

Hi
This server-side project is designed to support the CryptoPlay web application, providing essential functionalities for managing users and coins. Developed to seamlessly integrate with the corresponding React project, CryptoPlay, this Node.js server acts as the backbone for handling user-related operations, coin management, and interactions with external APIs like CoinGecko. The server is a crucial component that facilitates the dynamic and interactive features of the CryptoPlay web application.

## Installation

1. Open vsCode and clone the repository,
   Navigate to the project directory:

2. Install the dependencies:

```bash
  npm i
```

3. Run the server

for development enviroment:

```bash
   npm run dev
```

for production enviroment:

```bash
   npm start
```

<!-- ### my congratulations! Now you can start calling the server using its api.

the passwords for all the inital users is "Aa123456!"
and you will find the emails at ./initialData/useres -->

## API Documentation

The following API endpoints are available in this project:

## USERS:

### GET /users

- **REST Method:** GET
- **URL Request:** /users
- **Authentication:** admin only
- **Request:**
  - must provide token

Retrieves a list of all users in the system.

### GET /users/:id

- **REST Method:** GET
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Retrieves a specific user by their ID.

### POST /users

- **REST Method:** POST
- **URL Request:** /users
- **Authentication:** No
- **Request:**
- body:
- `name`: The name of the user. [object]
- `firstName`: The first name of the user. [string] - Required. Minimum length: 2. Maximum length: 256.
- `middleName`: The middle name of the user. [string] - Minimum length: 2. Maximum length: 256. (Optional)
- `lastName`: The last name of the user. [string] - Required. Minimum length: 2. Maximum length: 256.
- `phone`: The phone number of the user. [string] - Required. - Format: 0XX-XXXXXXX (e.g., 050-0000000)
- `email`: The email address of the user. [string] - Required. - Format: valid email address. - Unique.

- `password`: The password for the user account. [string] - Required. - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).
- `image`: The image of the user. [object] - `url`: The URL of the image. [string] - Required. - Format: valid URL. - `alt`: The alt text for the image. [string] - Required.
- `address`: The address of the user. [object]
- `state`: The state of the user's address. [string] - Minimum length: 2. Maximum length: 256. (Optional)
- `country`: The country of the user's address. [string] - Required. Minimum length: 2. Maximum length: 256.
- `city`: The city of the user's address. [string] - Required. Minimum length: 2. Maximum length: 256.
- `street`: The street of the user's address. [string] - Required. Minimum length: 2. Maximum length: 256.
- `houseNumber`: The house number of the user's address. [string] - Required. Minimum length: 1. - `zip`: The ZIP code of the user's address. [number] - Minimum length: 4.
  Registers a new user in the system.

### POST /users/login

- **REST Method:** POST
- **URL Request:** /users/login
- **Authentication:** None
- **Request:**
  - body:
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
    - `password`: The password for the user account. [string]
      - Required.
      - Format: At least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&\*-).

Logs in a user with the provided email and password.

### PUT /users/:id

- **REST Method:** PUT
- **URL Request:** /users/:id
- **Authentication:** the registered user only
- **Request:**
  - must provide token
  - body:
    - `name`: The name of the user. [object]
      - `firstName`: The first name of the user. [string]
        - Required.
      - `middleName`: The middle name of the user. [string]
      - `lastName`: The last name of the user. [string]
        - Required.
    - `phone`: The phone number of the user. [string]
      - Required.
      - Format: 0XX-XXXXXXX (e.g., 050-0000000)
    - `email`: The email address of the user. [string]
      - Required.
      - Format: valid email address.
      - Unique.
    - `image`: The image of the user. [object]
      - `url`: The URL of the image. [string]
        - Format: valid URL.
        - Required.
      - `alt`: The alt text for the image. [string]
        - Required.
    - `address`: The address of the user. [object]
      - `state`: The state of the user's address. [string]
      - `country`: The country of the user's address. [string]
        - Required.
      - `city`: The city of the user's address. [string]
        - Required.
      - `street`: The street of the user's address. [string]
        - Required.
      - `houseNumber`: The house number of the user's address. [number]
        - Required.
        - Minimum length: 1.
      - `zip`: The ZIP code of the user's address. [number]
        - Minimum length: 4.

Updates a specific user by their ID.

### DELETE /users/:id

- **REST Method:** DELETE
- **URL Request:** /users/:id
- **Authentication:** admin or the registered user
- **Request:**
  - must provide token

Deletes a specific user by their ID.

### PUT /users/trade/:id/

- **REST Method:** PUT
- **URL Request:** /users/trade/:id/
- **Authentication:** registered user
- **Request:**
  must provide token
  body:
  coinId: The ID of the coin. [string]
  Required.
  tradeAmount: The amount to trade. [number]
  Required.
  userId: The ID of the user. [string]
  Required.
  coinAmount: The amount of the coin to trade. [number]
  Required.
  action: The trade action. [string]
  Required.
  Options: "buy" or "sell".
  coinPrice: The price of the coin. [number]
  Required.
  Performs a trade action (buy/sell) for a specific user and coin.

### PATCH /users/updateAmount/:id

- **REST Method:** PATCH
- **URL Request:** /users/updateAmount/:id
- **Authentication:** admin only
- **Request:**
  must provide token
  body:
  amountToAdd: The amount to add to the user's account. [number]
  Required.
  Updates the amount in a user's account.

  ## COINS:

### GET /coins

- **REST Method:** GET
- **URL Request:** /coins
- **Authentication:** None
- **Request:** None

Retrieves a list of all coins.

### POST /coins

- **REST Method:** POST
- **URL Request:** /coins
- **Authentication:** Admin
- **Request:**
  - must provide token
  - body: -`name: The name of the coin. [string]
    Required.
    codeName: The code name of the coin. [string]
    Required.
    description: The description of the coin. [string]
    Required.
    Maximum length: 1024 characters.
    price: The price of the coin. [number] . if the coin is listed in the external API, the price will updated immediately according to the real live price.
    Required.
    Add a new coin.

### PUT /coins/:id

- **REST Method:** PUT
- **URL Request:** /coins/:id
- **Authentication:** owner user only
- **Request:**
  - must provide token
  - body: - body: -`name: The name of the coin. [string]
    Required.
    codeName: The code name of the coin. [string]
    Required.
    description: The description of the coin. [string]
    Required.
    Maximum length: 1024 characters.
    price: The price of the coin is correlate with the external API and dont possible to edit

### PATCH /coins/like/:id

- **REST Method:** PATCH
- **URL Request:** /coins/like/:id
- **Authentication:** registered user
- **Request:**
  must provide token
  Body:
  None
  Add or remove a like from the coin's likes array.

This route allows a registered user to add or remove a like from the specified coin identified by :id. If the user has already liked the coin, it will be unliked, and vice versa.
The response will include the updated like status of the coin.

### PATCH /coins/bulk-update

- **REST Method:** PATCH
- **URL Request:** /coins/bulk-update
- **Authentication:** None
- **Request:**
  Body:
  coins: An array of objects representing coins to be updated.
  Each object should contain:
  id: The ID of the coin to be updated. [string] - Required.
  Other fields representing the updated information for the coin.
  Bulk update multiple coins in the database.

This route allows for the bulk update of multiple coins in the database. The request body should contain an array of objects, each representing a coin to be updated. Each object should include the id field, identifying the coin to be updated, along with other fields representing the updated information for the coin.

The update process involves connecting to the CoinGecko API to retrieve the latest information for each specified coin. The fields provided in the request body will be used to update the corresponding coins in the database with the latest information from CoinGecko.

The response will confirm the successful update of the coins and provide a message indicating the success.

### DELETE /coins/:id

- **REST Method:** DELETE
- **URL Request:** /coins/:id
- **Authentication:** admin
- **Request:**
  - must provide token

Deletes a specific coin by its ID.

### Google API

To login or register by google user, open the follow url in your browser:

```bash
http://localhost:8181/google/google-login
```
