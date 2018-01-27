#WEB APP SCAFFOLDING

## Table of Contents
1. [Create file structure](#1)
1. [Initialize Node Project](#2)
1. [Add scripts to package.json](#3)
1. [Add Webpack and Babel](#4)
1. [Add .gitignore file](#5)
1. [Add Airbnb ESLint](#6)

## Steps
  <a name="1"></a>
  - ([1](#1)) Create the following File Structure:

    - `client`
      - `dist`  //folder contains all files that will be distributed
        - `index.html`
        - `styles.css`
      - `src`
        - `components`  //folder to contains all React Components
        - `index.jsx` //file creates initial React component
    - `database`
      - `index.js`  //file contains CRUD functions and DB initialization
    - `server`
      - `index.js` //file contains routing and setting up server connection

  <a name="2"></a>
  - ([2](#2)) Initialize node project by running:

    `npm init`

    >It creates the package.json file.
    To save dependencies and  development dependencies:

    - `npm install --save-dev ____`
    - `npm install --save ____`

  <a name="3"></a>
  - ([3](#3)) Add scripts to package.json:

    ```javascript
    "scripts": {
      "start": "node server/index.js",
      "server": "nodemon server/index.js"  //make sure nodemon is npm installed
    }
    ```
  <a name="4"></a>
  - ([4](#4)) Add Webpack to bundle React modules and Babel to transpile the modules before bundling:

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
<a name="5"></a>
- ([5](#5)) Add .gitignore file to ignore:

  - `node_modules`
  - `bundle.js`

<a name="6"></a>
- ([6](#6)) Add Airbnb ESLint:

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
  npm install --save-dev eslint-plugin-import
  npm install --save-dev eslint-plugin-react  //React specific linting rules for ESLint https://github.com/yannickcr/eslint-plugin-react

  //OR
  npm install --save-dev eslint eslint-plugin-import eslint-plugin-react
  ```

  >Reference: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base

  >[The ESlint extension in VScode will read the .eslintrc file and work.](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6)
  To disable the linter in any document of code, write the following at the top of the document:
  ```javascript
  /*eslint-disable */
  ```

