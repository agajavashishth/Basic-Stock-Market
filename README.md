# Basic-Stock-Market
MERN Stack: Stock Trading Web App


The primary function of this application is to enable stock trading. 

The server utilizes the Express framework. Meanwhile, client utilises React. The client makes API calls to the server to retrieve data. Authentication is handled using JSON tokens. These tokens are dispatched by the server and are bind to request headers in the client. This token contains tokenized UserData: name and email. The email field is used to identify unique users. No two users will have the same email. Passport and bcrypt are used for authentication middleware and password hashing respectively.

The server is connected to an instance on MongoDB Atlas. Mongoose is used to connect to the instance.  Authentication uses this database to store user objects using a schema in the users collection. Form data from client is input-validated using validator.


The stockBase array is hard-coded with the provided symbol codes. If one wants to add a new stock symbol, simply add the symbol to the stockBase array. 
Server uses finnhub.io to obtain real-world market data. A while loop runs during server-runtime to update stockBase every 32 seconds. API Calls have a hard limit at 30 seconds on finnhub side, hence 32 seconds was chosen to prevent errors.
All routes to access transaction and subscriptions are private, i.e. they can only be accessed if the request had a valid token in the authorization header. 


txnBase & subBase elements have an email field representing the user associated with that element.
When POST requests are made for transactions and subscriptions, the server returns an object with its ID field populated. Upon receiving, the client will take this object, update it with the user input and send it back to the server. When server receives this object with an ID already, it finds the corresponding element in the base array, and rewrites it to match the object.
During GET requests, the server supplies all txn/subs objects associated with the requesting user’s email address.


REST API endpoints:
 
GET-
	/api/users
	/api/txns
	/api/subs
	/api/stocks
		?symbol=
		?minprice=
		?maxprice=
POST-
	/api/users/login
	/api/users/register
	/api/txns
	/api/subs
 

POST endpoints create objects and return their ID. If the request's body has the ID field, then
all properties from request will be copied into the object in memory.
Client uses ReactJS framework with Redux for global state-management. It has two routes currently, two public and one private. On authentication, client stores token to axios request header. Additionally, it stores the logged in user’s user-data in types.js to allow other components to access it. On logout, the token is deleted, and data in types.js is cleared. 

Server is hosted on localhost:5000 while Client is hosted on localhost:3000. Client is set to proxy requests to server using the proxy script in package.json.
Development and production scripts are added to server’s package.json to concurrently start both applications.
Terminal window of node displays received requests and stock updates.


To run project: 
Install npm modules from npm modules.txt into the respective server and client folders.
Navigate to the server folder in a terminal.
Enter command "npm run dev".
