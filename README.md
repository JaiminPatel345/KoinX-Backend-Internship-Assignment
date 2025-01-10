# KoinX

Assignment of KoinX , hope you not came for copy my code :/

## Live Demo

[ Live ](https://koinx-backend-internship-assignment-dz4l.onrender.com)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- dotenv

## Installation

```bash
# Clone the repository
git clone https://github.com/JaiminPatel345/KoinX-Backend-Internship-Assignment.git

cd KoinX-Backend-Internship-Assignment/

# Install dependencies
npm install

# Update environment variables
# Start the server
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3003
MONGODB_URI=mongodb://localhost:27017/koinx
```

## API Endpoints

### 1. Welcome Route

```http
GET /
```

- Returns a welcome and my portfolio link

### Task 2 : Get Latest Cryptocurrency Stats

```http
GET /stats
```

Example Request:

```http
GET /stats?coin=bitcoin
```

Success Response:

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

Error Response:

```json
{
  "error": "Invalid coin parameter"
}
```

### Task 3 : Get Price Deviation

```http
GET /deviation
```

Example Request:

```http
GET /deviation?coin=bitcoin
```

Success Response:

```json
{
  "deviation": 4082.48
}
```

Error Response:

```json
{
  "error": "Invalid coin parameter"
}
```
