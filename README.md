# VueJS & Larval Shopping cart


Online Shopping Cart built with Laravel and VueJS using the RESTful API design.
Responsive front-end done with Bootstrap-Vue, Passport for authentication, MYSQL for database.

## API Documentation:
All API End points documentation can be found at [this link](https://documenter.getpostman.com/view/13692561/TVmPBd8X#intro
).

## Installation and usage:

### Backend:
Open the `Server` directory and follow the instructions as seen below:
1.	```composer install```
2.	Create a new database
3.	Make a copy of `.env.example` and change the new file name to `.env`
4.	Set the database connection details in `.env` file

	``` sh
	 php artisan key:generate
	 php artisan migrate 
	 php artisan db:seed
	 php artisan passport:install
	 php artisan serve --port=88888
	```

### Frontend:
Open the `client` directory:

	sh
	npm install
	npm run serve

If you change the server port, follow the instruction below:

Open the `.env` file and change both of the variables:<br /><br />
`VUE_APP_APIURL= http://localhost:<YOUR-SERVER-PORT>/api/`<br />
`VUE_APP_STORAGE= http://localhost:<YOUR-SERVER-PORT>/images/`




