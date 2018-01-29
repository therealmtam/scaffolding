## WEB APP SCAFFOLDING
  These instructions are for creating the scaffolding of a React + Node + Express + (Choice of DB(s)).
  
## Table of Contents
[**PART I**](#1) - Development Setup:
1. [Create file structure](#1-1)
1. [Initialize Node Project](#1-2)
1. [Add scripts to package.json](#1-3)
1. [Add Webpack and Babel](#1-4)
1. [Add .gitignore file](#1-5)
1. [Add Airbnb ESLint](#1-6)

[**PART II**](#2) - Technology Setup:
1. [Setup Express](#2-express)
1. [Setup React](#2-react)
1. [Setup Database](#2-database)
    1. [Setup MongoDB](#2-mongodb)
    1. [Setup MySQL](#2-mysql)
1. [Setup Mocha & Chai](#2-mocha)
1. [Setup Jasmine & Enzyme](#2-jasmine)

<a name="1"></a>
## Part I
  <a name="1-1"></a>
  - ([1](#1-1)) Create the following File Structure:

    - `client`
      - `dist`  //folder contains all files that will be distributed
        - `index.html`
        - `style.css`
      - `src`
        - `components`  //folder to contains all React Components
        - `index.jsx` //file creates initial React component
    - `database`
      - `index.js`  //file contains CRUD functions and DB initialization
    - `server`
      - `index.js` //file contains routing and setting up server connection

  <a name="1-2"></a>
  - ([2](#1-2)) Initialize node project by running:

    `npm init`

    >It creates the package.json file.
    To save dependencies and  development dependencies:

    - `npm install --save-dev ____`
    - `npm install --save ____`

  <a name="1-3"></a>
  - ([3](#1-3)) Add scripts to package.json:

    ```javascript
    "scripts": {
      "start": "node server/index.js",
      "server": "nodemon server/index.js"  //make sure nodemon is npm installed
    }
    ```
  <a name="1-4"></a>
  - ([4](#1-4)) Add Webpack to bundle React modules and Babel to transpile the modules before bundling:

    > Create a webpack.config.js file in the root directory with the following code:

    ```javascript
    const path = require('path');
    const SRC_DIR = path.join(__dirname, '/client/src');
    const DIST_DIR = path.join(__dirname, '/client/dist');

    module.exports = {
      entry: `${SRC_DIR}/index.jsx`,
      output: {
        filename: 'bundle.js',
        path: DIST_DIR
      },
      module: {
        loaders: [
          {
            test: /\.jsx?/,
            include: SRC_DIR,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    };
    ```

    >Then npm install the following:

    ```javascript
    npm install --save-dev babel-core
    npm install --save-dev babel-loader
    npm install --save-dev babel-preset-es2015  //transpiles ES6 to ES5
    npm install --save-dev babel-preset-react   //transpiles JSX to JS
    npm install --save-dev webpack

    //OR
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react webpack
    ```

    >Then add a script to package.json to run webpack:

    ```javascript
    "scripts": {
      "build": "webpack -p",
      "react-dev": "webpack -d --watch" //it is set to watch for automating bundling in development
    }
    ```
<a name="1-5"></a>
- ([5](#1-5)) Add .gitignore file to ignore:

  - `node_modules`
  - `bundle.js`

<a name="1-6"></a>
- ([6](#1-6)) Add Airbnb ESLint:

  >Create a .eslintrc.js file in the root directory and store the following:

  ```javascript
  module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "react",
        "import"
    ]
  };
  ```

  >Then npm install the following:

  ```javascript
  npm install --save-dev eslint
  npm install --save-dev eslint-config-airbnb-base
  npm install --save-dev eslint-plugin-import
  npm install --save-dev eslint-plugin-react  //React specific linting rules for ESLint https://github.com/yannickcr/eslint-plugin-react

  //OR
  npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-react
  ```

  >Reference: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base

  >[The ESlint extension in VScode will read the .eslintrc file and work.](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6)
  To disable the linter in any document of code, write the following at the top of the document:
  ```javascript
  /*eslint-disable */
  ```

<a name="2"></a>
## PART II
  <a name="2-express"></a>
  - [**Setup Express**](#2-express)
  
  <a name="2-react"></a>
  - [**Setup React**](#2-react)
    - (1) In index.html, add the initial element for React to target:
      ```html
      <div id="app"></div>
      
      <script type="text/javascript" src="bundle.js"></script>
      ```
      Make sure that bundle.js is AFTER the element. Otherwise if is is in
      the head, the html parser will read the bundle's React code but 
      won't be able to find the targeted element on the DOM yet and throw a runtime error.
      
    - (2) In index.jsx, add the initial React script that renders the React Components
      ```javascript
      import React from 'react';
      import ReactDOM from 'react-dom';
      import App from './components/app.jsx';
      
      ReactDOM.render(<App /> , document.getElementById('app'));
      ```
      ...And npm install the modules:
      ```javascript
      npm install --save react
      npm install --save react-dom
      OR
      npm install --save react react-dom
      ```
      ...And create a <code>app.jsx</code> file in the <code>components</code> folder.
      
      App.jsx will be the initial React component.
      
    - (3) App.jsx scaffold:
      ```javascript
      
      ```
      Notes: 
      - Add documentation to all functions and components
      - Add Prop Types and npm install the module
        ```javascript
        npm install --save prop-types
        ```
  
  <a name="2-database"></a>
  - [**Setup Database**](#2-database)
  
      <a name="2-mongodb"></a>
    - [**Setup MongoDB**](#2-mongodb)
    
      <a name="2-mysql"></a>
    - [**Setup MySQL**](#2-mysql)
    
  <a name="2-mocha"></a>
  - [**Setup Mocha & Chai**](#2-mocha)
  
  <a name="2-jasmine"></a>  
  - [**Setup Jasmine & Enzyme**](#2-jasmine)   

  
 
