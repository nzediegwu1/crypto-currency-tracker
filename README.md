# Crypto-Currency-Tracker

[![Maintainability](https://api.codeclimate.com/v1/badges/643884fda3206f39cadc/maintainability)](https://codeclimate.com/github/nzediegwu1/crypto-currency-tracker/maintainability)

<hr>
A microservice which periodically retrieves currency rates from CoinMarketCap, for the following pairs: BTC/EUR, BTC/USD, BTC/GBP, ETH/EUR, ETH/USD, ETH/GBP

<hr>

## Table of Contents

    1. Features
    2. Technologies
    2. Installation and Setup
    4. Documentation
    5. Limitations
    6. How To Contribute

## Features

  #### Application perform the following automated tasks
    
      - Periodically fetches latest cryptocurrency rates for Bitcoin, and Etherium against USD, EUR and GBP fiat currencies from coinmarketcap.com
      - Save cryptocurrency exchange rates to a postgres database

  
  #### Users can perform the following actions with this api
    
      - Retrieve records of latest cryptocurrency rates in descending order
      - Apply pagination to returned data
      - Search records `from` and `to` given timestamps
      - Retrieve application logs using endpoint: `GET /logs`
  
  
## Technologies

  ### Server
    1. Nodejs
    2. Express for api routes implementation
    3. Winston and volleyball for logging events and requests
    4. Babel for transpiling from ES6+ to ES6
    5. Axios for making http request to COIN_MARKET_CAP API
    6. Postgresql & Sequelize for database management
    7. Heroku for hosting services




## Installation and Setup
 
 ### Development
    1. Install Nodejs and Postgres SQL
    2. Clone this repo "git clone https://github.com/nzediegwu1/crypto-currency-tracker.git"
    3. Run "npm install" to install dependencies
    4. Create a Postgresql database 
    5. Create a ".env" file and define env variables using sample file: ".env.sample" in the root directory.
    6. Run migrations: `yarn migrations`
    7. Start the application: `yarn dev`
  
  ### Production
  
    1. Use "yarn postinstall" → to orchastrate build and migrations
    2. Start the application using `yarn start`
    
  ### Finally
    Go to http://localhost:8000 on your browser to view app


## Documentation

* The API was documented using postman.
1. To view on Postman: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/748bfdae01b196cbf17c)
2. Online Documentation: [Click here](https://documenter.getpostman.com/view/4912237/SVSHrVC3?version=latest)


## Limitations
    1. Does not have rate limiting to prevent DDOS
    2. Currently limited to BTC and ETH cryptocurrencies
    3. Only retrieves conversion rates in USD, EUR and GBP

## How to Contribute
To contribute to the project, follow the instructions below
 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that I can review your changes

**NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## Licence
* This project is licensed under the [MIT License](https://github.com/nzediegwu1/crypto-currency-tracker/blob/master/LICENSE)
* Copyright ©  2019 Anaeze Nsoffor
