# Budget Tracker Application
![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)

## Description
This budget tracker is a fully functional progressive web application. The client wanted to update an existing budget tracker to allow for offline access and functionality. Users will be able to add expenses and deposits to their budget with or without an internet connection. Having offline functionality is paramount to the success of an app that handles users' financial information.

## Table of Contents
* [Technologies](#technologies)
* [Screenshots](#screenshots)
* [Enhancements](#enhancements)
* [Links](#links)

## Technologies
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose.js](https://img.shields.io/badge/Mongoose.js-DD0031?style=for-the-badge)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

## Screenshots
![Screenshots]()

## Enhancements
1. Added functionality that allows for expenses or deposits to be entered when there is no internet connection using IndexedDB API
2. The app uses a Service Worker and Web Manifest to cache all public assets which will load while offline
3. When the user enters their transaction, they will receive a notification that they have added an expense or deposit and it will be added to the ledger 
4. As soon as the user reestablishes an internet connection, their deposits or expenses that were added while they were offline are added to their transaction history and their totals are updated

## Links
* [Budget Tracker Deployed App]()
* [Budget Tracker Repository](https://github.com/bspiewak6/budget-tracker)

## License
![License](https://img.shields.io/badge/license-MIT%20License-blue.svg)  
This app is licensed under the MIT license.