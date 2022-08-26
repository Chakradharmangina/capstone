- Unzip the file.

- going inside the Capstone- folder and open in VS Code.

- go inside client folder and hit npm i in the terminal
	cd client->npm i

- go inside server folder and hit npm i in the terminal
	cd server->npm i

- go inside each of the microservices folder in the routes folder and hit npm i there also
	- cd server/routes/{microservice folder name}/
	- npm i
(this step should be followed in every microservice and API GateWay)

- go inside the bin folder in every microservice folder and hit the command nodemon www
	- cd bin
	- nodemon www
(this step should be followed in every microservice and API GateWay)

- Now the project Should be running and open http://localhost:3000/ in any browser

- The backend services are running on PORT number 3003.

- Every aspect of the project has been covered in the UI except ADMIN registeration.
	So register admin in postman to login to admin pages.
	Ex - http://localhost:3003/admin/signUp
	- POST Request
	- Body - {"email":"Example@gmail.com","password":"12345678","admin":"John"}