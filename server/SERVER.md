## Server-side

### Technologies:
1. Express (with TypeScript)

### Initial Setup
This is not necessary in this project since the setup is already done. It's just for the sake of knowing how to go about it, incase you'd like to set up an Express server with Typescript from scratch :)

Feel free to refer to the files in this repo for better context on changes needed.

#### Setup Installs
- Initialize a Nodejs project using `npm init -y`
- Install TypeScript using `npm install -D typescript`
- Install Express & Node using `npm install -D @types/express @types/node`
- Install Nodemon using `npm install -D nodemon` (used to automate server restart)
- Install rimraf using `npm install -D rimraf` (used to delete the output folder before recompilation)
- Install concurrently using `npm install concurrently` (cross-platform way of running the commands concurrently instead of using the "&" operator which is unix-specific)

#### Project-specific Installs
- Install CORS using `npm install -D @types/cors`
- Install body-parser using `npm install -D @types/body-parser`
- Install OpenAI using `npm install openai`
- Install dotenv using `npm install dotenv` for env variables

#### Run & Build Configs
Some customization is required to transpile the TS code to JS so that it can be executed as Node scripts.

- Create a typescript config file using `npx tsc --init`
- Ucomment & edit the "outDir" key to "./dist" or whatever name you choose to call your output folder for the transpiled files.
- Automate the compilation & serve process by adding the following under "scripts" in package.json:
```
...
"scripts": {
    "build": "rimraf dist && npx tsc", // clears out the outdated output (in my case, dist) folder and transpile the TS files to JS
    "prestart": "npm run build", // set to run the "build" script, everytime the "start" script is run
    "start": "node dist/server.js", // run the transpiled JS files in the output folder
    "preserve": "npm run build", // set to run the "build" script, everytime the "serve" script is run
    "serve": "concurrently \"tsc -w\" \"nodemon dist/server.js\""
  },
...
```
