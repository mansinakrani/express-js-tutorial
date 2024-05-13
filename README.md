# express-js-tutorial

### Intro & Setup :

- create folder , then run cmd command : `npm init -y` that will create package.json file

```bash
npm i express
```

- nodemon : run the application on watch mode, the process will automatically restart

> Nodemon is a command-line tool that **helps with the speedy development of Node.** **js applications**. It monitors your project directory and automatically restarts your node application when it detects any changes.
> 

```bash
npm i -D nodemon
```

- add scripts commands in package.json:

```json
"start:dev": "nodemon ./src/index.js",
"start": "node ./src/index.js"
```

- add `“type”: “module”` in package.json

```json
"type": "module", use ESM as module system so we can use modern import/export statements instead of having use require() to import modules => change file 
extension to .mjs (.js => .mjs)

OR "commonjs"

---------
"main": "index.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon ./src/index.mjs",
    "start": "node ./src/index.mjs"
  },
```

```bash
npm run start:dev
```

