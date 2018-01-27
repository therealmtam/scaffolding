# scaffolding
Scaffolding

#WEB APP SCAFFOLDING

## Steps

  - [Step 1] Create the following File Structure:

    - `client`
    - `dist`  folder contains all files that will be distributed
      - `index.html`
      - `styles.css`
    - `src`
      - `components`  folder to contains all React Components
      - `index.jsx` file creates initial React component
    - `database`
      - `index.js`  file contains CRUD functions and DB initialization
    - `server`
      - `index.js` file contains routing and setting up server connection

  - [Step 2] Initialize node project by running:

    `npm init`

    > It creates the package.json file.
    > To save dependencies and  development dependencies:

    `npm install --save-dev ____`
    `npm install --save ____`

  - [Step 3] Add scripts to package.json:

    ```javascript
    "scripts": {
      "start": "node server/index.js",
      "server": "nodemon server/index.js"  //make sure nodemon is npm installed
    }
    ```

  - [Step 4] Add Webpack to bundle React modules and Babel to transpile the modules before bundling:

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

  Then npm install the following:
  >npm install --save-dev babel-core
  >npm install --save-dev babel-loader
  >npm install --save-dev babel-preset-es2015  //transpiles ES6 to ES5
  >npm install --save-dev babel-preset-react   //transpiles JSX to JS
  >npm install --save-dev webpack
