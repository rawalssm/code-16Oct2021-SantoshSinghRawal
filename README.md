# code-16Oct2021-SantoshSinghRawal for assessment

Project structure
=====================================

API
	Routes
		CalculateBMI
	Controller
Models
	Memer.js
	Healthmetadata.js

config
	db.js  -- to keep the db variables
	config.env -- to keep the environment properties

Routes  
	CalculateBMI -- endpoint to call to calcualte the BMI and Risk and persist the data in Database.

index.js  -- Welcome page

Pakcage.json
	dependencies
		mysql
		dotenv
		nodemon
		sequelize
		mysql2

============================================
Mysql DB Objects

Two Objects created in DB to persists the data for further reporting

BMIHealthRisk --- Meta data for the BMI formula and Risk categorization
MemberBMI-- Member Health and Risk data

============================================
Routes

Two routes exposed /members and /GenerateBMI in restAPI to get and update the data in DB
