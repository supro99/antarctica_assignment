# antarctica_assignment
REST APIs in nodejs

## PROJECT EXECUTION SETUP
1) git clone the project from the repository online 
(link - https://github.com/supro99/antarctica_assignment.git)
2) Enter your MongoDB database connection string in config(folder) > config.js(file) > database_url(variable)
3) To get required module to run the project > npm install (if failed to execute, try -> sudo npm install)
4) To start the nodejs server > npm start

	

## DATABASE ARCHITECTURE
1) Mongodb is used to store, retrieve and manipulate the data.

2) Only one database is created, named as - 'antarctica-db'

3) This DB has one collection called as 'users' collection.
    This collection has all the user related data and all the operations are performed on this data.

4) Before you use the APIs query the use the following command in mongo database by entering/login/accessing the database. i.e.
    a) use antarctica-db
    b) db.users.createIndex({"fname": "text", "lname": "text", "_id": "text", "orgName": "text"})

## PROJECT ARCHITECTURE
Technology used for the project - Node.js, Express.js, MongoDB

1) This project uses ES6 syntax of javascript.

2) All the routes are in "routes" folder inside "users.js" file. You can navigate to each function from here.

3) All the business logic is written in "services" folder inside the "userServices.js" file.

4) Middleware to authenticated and verify JWT token is written in "authentication" folder inside "verifyToken.js" file

5) All the constants/configuration strings are inside the config folder, such as database connection url, database name, some key secrets (not to be written in config file but to be placed in .env variable for security and privacy purpose)


## API DOCUMENTATION
This project has following API endpoints

A Middleware authentication mechanism is established before all APIs execution, except while registering new user and login existing user, to check if the user who is requesting the resources is valid user or not. 
This can be found in 'authentication' folder in verifyToken.js file.

1) Registering new user through API
        This API is to register/create new user in database. Mandatory fields to enter are as follows - 
            fname 
            lname 
            emailId 
            password  
            orgName
            employeeId (MongoDB automatically generates unique id for each document(record). So, here I am using the auto generated unique id of mongodb's document as employeeID.(That is why I did not created it explicitly)

	    
		curl --location --request POST 'http://54.155.33.247:3000/users/register' \
          --header 'Content-Type: application/json' \
        --data-raw '{
        "fname" : "Komal",
        "lname" :"Rane",
        "emailId" : "krane@gmail.com",
        "orgName" : "TCS",
        "password" : "krane@21"
        }'
  


2) Login API for registered users
        This API is to check if the user is valid registered user or not and it returns an authentication token if the user is a valid registered user.
        
        Mandatory fields to enter are as follows - 
            emailID
            password

		curl --location --request POST 'http://54.155.33.247:3000/users/login' \
        --header 'Content-Type: application/json' \
        --data-raw '{
        "emailId" : "krane@gmail.com",
        "password" : "krane@21"
        }'




3) Search API
        This API is used to search the database based on its key/fields. We can query database on following keys -
            first_name
            last_name
        We just have to enter the text we want to search in 'searchValue' and wait for the data to return from database.
        
        Required fields to process are as follows - 
            searchValue

    	       
		curl --location --request GET 'http://54.155.33.247:3000/users/search?searchValue=Mathur' \
		--header 'x-access-token:		 		    			eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmM5ZWJhNGFjODE3NDg3MmJmMzJmNyIsImlhdCI6MTYxNzczMTk3NywiZXhwIjoxNjE3ODE4Mzc3fQ.ahbcTpcC6z20xR-luJhvV9prFhT13k3XB6vCcKEcW7I'


4) Get users' data in sorted format
        This API is used to fetch the complete data in sorted form. For this, we have to provide on which field do we want to sort and in what order sorting to be done i.e. asc or desc. The sortable fields are first name, last name, _id(employeeId), email and organization name.
        It accepts one field/parameter at a time for sorting.
        
        Required fields to process are as follows - 
            sort_param [last_name or first_name or email or ...]
            sort_order [asc or desc]


		curl --location --request GET 'http://54.155.33.247:3000/users/sort?sortParam=orgName&sortOrder=asc' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmM5ZWJhNGFjODE3NDg3MmJmMzJmNyIsImlhdCI6MTYxNzczMTk3NywiZXhwIjoxNjE3ODE4Mzc3fQ.ahbcTpcC6z20xR-luJhvV9prFhT13k3XB6vCcKEcW7I'


5) Get users' data in paginated form
        This API provides data in paginated form. Limit and Skip are the variable that are used to get the specific amount of data. Limit represents amount of data in one page, while skip represents the page number.
        
        Required fields to process are as follows - 
            limit
            skip

		curl --location --request GET 'http://54.155.33.247:3000/users/paginatedusers?limit=4&skip=1' \
		--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNmM5ZWJhNGFjODE3NDg3MmJmMzJmNyIsImlhdCI6MTYxNzczMTk3NywiZXhwIjoxNjE3ODE4Mzc3fQ.ahbcTpcC6z20xR-luJhvV9prFhT13k3XB6vCcKEcW7I'

































