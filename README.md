# hCLI — Modern Project Generator

hCLI is a simple, fast, and interactive project generator that helps you create Express, Vue, and React applications with clean templates and automatic setup.

Stop creating project folders manually — let **hCLI** prepare everything in seconds.

---

## Features

- Interactive CLI with beautiful banner
- Express project generator
- Vue 3 + Vite project generator
- React + Vite project generator
- Automatic folder structure setup
- Auto-install required npm packages
- Colorful success messages (Express — yellow, Vue — green, React — blue)
- Template-based architecture
- Zero configuration

---

## Installation

Install globally:

```
npm install -g @nrvboss/hcli
After installation, run:

hcli

Usage
1. Interactive mode
Simply run:

hcli

You will see the animated banner (in terminal):

  _      ____ _     ___
 | |__  / ___| |   |_ _|
 | '_ \| |   | |    | |
 | | | | |___| |___ | |
 |_| |_|\____|_____|___|

Then choose a generator:
Express.JS generator
Vue.JS generator
React generator
Nest.JS generator

After selecting, enter your project name.
Example:
✔ Pick the generator for using: Express.JS generator
✔ Write your project name: demo
demo's Express template created.
Packages installing...
...
Project ready!
If start, write:
  cd demo
  npm run dev

Generators, for example:

Express Generator:
Creates a clean Express project with:

demo/
 ├── config/
 ├── controllers/
 ├── routes/
 ├── .env
 └── app.js

Installed packages: express, cors, dotenv, nodemon (dev)


Start the project

After creation:
cd <project-name>
npm run dev


Contributing
Pull requests and suggestions are welcome!

License
MIT — feel free to use anywhere.

Support
If you like this CLI, leave a star on GitHub.

Author
@nrvboss
```
