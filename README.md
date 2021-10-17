
# Weather App - VanillaJS

This project was a study about different ways to create the same project. This was made using pure **JavaScript**, but you can switch between branches and view the other implementations, using things like **HTML+SASS**, **TypeScript** and **Vue 2**.

The idea behind this version is to use pure **JavaScript**, with **Jest** and **Cypress**, to create a Weather App.

**The code will be some over engineer because the purpose is to explore some patterns and implementations.**

### Test Environment

https://weather-app-purejs.netlify.app/


### The challenge

Create a weather app using an API.

Users should be able to:

- See city weather
- See weather of today and the next 5 days
- Search for city
- Request my current location weather
- Convert temperature in Celcius to Fahrenheit and vice versa
- and more...

**The project ideia is from [DevChallenges](https://devchallenges.io/challenges/mM1UIenRhK808W8qmLWv).**


### Built with

- Pure JavaScript
- [Babel](https://babeljs.io/docs/en/)
- [SCSS](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)
  - [HTML Webpack Plugin](https://webpack.js.org/plugins/html-webpack-plugin/)
  - [Babel Loader](https://www.npmjs.com/package/babel-loader)
  - [Mini CSS Extract Plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
  - [Style Loader](https://webpack.js.org/loaders/style-loader/)
  - [CSS Loader](https://webpack.js.org/loaders/css-loader/)
  - [SASS Loader](https://www.npmjs.com/package/sass-loader)
  - [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
- [Jest](https://jestjs.io/pt-BR/)
- [Cypress](https://www.cypress.io/)

### How to run

To run locally the project you will need the `node` and follow the steps below:

```sh

# Clone the project
git clone git@github.com:ianwelerson/weather-app.git

# Open the folder
cd weather-app

# Checkout to the vanillajs branch
git checkout vanillajs

# Install dependencies
npm install

### ---- Prod

# Build for production
npm run prod # The files will be in the /dist/ folder

### ---- Dev

# Build for development
npm run dev # The files will be in the /dist/ folder

# Run dev server
npm run serve

### ---- Run Tests

# Unit
npm run test:unit

# E2E
npm run test:e2e

```

### Screen

 ![Project Preview](./screenshot.png)

### Author

- Website - [IanWelerson.com](https://ianwelerson.com)
- Twitter - [@IanWelerson](https://www.twitter.com/ianwelerson)