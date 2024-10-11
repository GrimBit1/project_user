

# Project Initialization and Setup

## Step 1: Install Dependencies

To initialize the project, run the following command to install all necessary dependencies:

```sh
npm install
```


## Step 2: Set Environment Variables

Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Faditya%2FDesktop%2Fnode%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%223937d608-5d52-4973-a461-0992946913da%22%5D "/home/aditya/Desktop/node/.env") file in the root directory of your project and set the following environment variables:

```env
DB='your_database_url'
DB_NAME='your_database_name'
PORT='your_port_number'
SECRET='your_secret_key'
```

Replace `'your_database_url'`, `'your_database_name'`, `'your_port_number'`, and `'your_secret_key'` with your actual database URL, database name, port number, and secret key respectively.

## Step 3: Start the Server

To start the server in watch mode (which automatically restarts the server on file changes), run the following command:

```sh
npm run watch
```

## Step 4: Create an Admin User

To create an admin user without any restrictions, use the following endpoint:

```
POST /users/temp
```

## Step 5: Login and Get Token

After creating the admin user, you can log in and get the token using the following endpoint:

```
POST /users/login
```

Use the token received from this endpoint for authenticated requests.

## Example Requests

### Create Admin User

```sh
curl -X POST http://localhost:3000/temp
```

### Login

```sh
curl -X POST http://localhost:3000/users/login -d '{"username":"admin","password":"password"}' -H "Content-Type: application/json"
```

Replace `http://localhost:3000` with your actual server URL if different.

## Notes

- Ensure your MongoDB server is running and accessible at the URL specified in the [`DB`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Faditya%2FDesktop%2Fnode%2Freadme.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A4%2C%22character%22%3A5%7D%7D%5D%2C%223937d608-5d52-4973-a461-0992946913da%22%5D "Go to definition") environment variable.
- The server will run on the port specified in the `PORT` environment variable.
- Use the secret key specified in the `SECRET` environment variable for JWT token generation and validation.


