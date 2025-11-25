# hCLI — Modern Full-Stack Project Generator

hCLI is a **simple, fast, and interactive** project generator that helps you create **Express**, **NestJS**, **Vue**, and **React** applications with clean templates and automatic setup.

Stop creating project folders manually — let **hCLI** prepare everything in seconds.

---

## FEATURES

### Core Features
- **Interactive CLI** with beautiful animated banner
- **Full-Stack project generation** in one command
- **Backend generators**: Express.js & NestJS
- **Frontend generators**: Vue 3 + Vite & React + Vite
- **Module generators**: Create Express/Nest modules instantly
- **Docker support**: Optional Dockerfile generation
- **Automatic folder structure** setup
- **Auto-install** required npm packages
- **Colorful success messages** (Express — yellow, Vue — green, React — blue, Nest — red)
- **Template-based architecture**
- **Zero configuration**

### New in v1.8.0
-  **Express Module Generator** — Generate controller, model, and routes with one command
-  **NestJS Module Generator** — Create complete Nest modules automatically
-  **Docker Support** — Ready-to-use Dockerfiles for backend projects
-  **Improved CLI flow** with new spinner UI and better error handling

---

## 📦 INSTALLATION

Install globally:
```bash
npm install -g @nrvboss/hcli
```

After installation, run:
```bash
hcli
```

---

## USAGE

### Interactive Mode

Simply run:
```bash
hcli
```

You will see the animated banner:
```
  _      ____ _     ___
 | |__  / ___| |   |_ _|
 | '_ \| |   | |    | |
 | | | | |___| |___ | |
 |_| |_|\____|_____|___|
```

Then choose a section:
```
? Pick the section for generating:
❯ Full-Stack
  Backend(Express.js/Nest.js)
  Frontend(Vue/React)
```

### FULL-STACK
Create a complete full-stack application with both backend and frontend:
- Choose your backend: **Express.js** or **NestJS**
- Choose your frontend: **Vue 3** or **React**
- Everything is set up and ready to go!

### BACKEND (Express.js/Nest.js)
Generate standalone backend projects:
- **Express.js** — Clean REST API structure
- **NestJS** — Modern TypeScript backend framework

### FRONTEND (Vue/React)
Generate standalone frontend projects:
- **Vue 3 + Vite** — Progressive JavaScript framework
- **React + Vite** — Modern React with fast HMR

---

## PROJECT STRUCTURE EXAMPLES

### Express.js Project
```
demo/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── .env
 ├── app.js
 └── package.json
```

**Installed packages:** `express`, `cors`, `dotenv`, `nodemon` (dev)

### NestJS Project
```
demo/
 ├── src/
 │   ├── app.module.ts
 │   ├── app.controller.ts
 │   ├── app.service.ts
 │   └── main.ts
 ├── test/
 ├── nest-cli.json
 └── package.json
```

**Installed packages:** `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`

### Vue 3 Project
```
demo/
 ├── src/
 │   ├── components/
 │   ├── App.vue
 │   └── main.js
 ├── public/
 ├── index.html
 └── package.json
```

### React Project
```
demo/
 ├── src/
 │   ├── components/
 │   ├── App.jsx
 │   └── main.jsx
 ├── public/
 ├── index.html
 └── package.json
```

---

## MODULE GENERATORS

### Express Module Generator

Generate a complete Express module:
```bash
hcli c express <module-name>
```

**Creates:**
- `<module-name>.controller.js`
- `<module-name>.model.js`
- `<module-name>.routes.js`

All connections are wired automatically!

### NestJS Module Generator

Generate a complete Nest module:
```bash
hcli c nest <module-name>
```

**Creates:**
- `<module-name>.module.ts`
- `<module-name>.controller.ts`
- `<module-name>.service.ts`

The module is **automatically imported** into `app.module.ts`.

---

## DOCKER SUPPORT

When creating backend projects, you can choose to include Docker support:
```
? Do you want to add Docker support? (Y/n)
```

Select **Yes** → A ready-to-use `Dockerfile` is added to your project root.

---

## START YOUR PROJECT

After creation:
```bash
cd 
npm run dev
```

---

## CONTRIBUTING

Pull requests and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## LICENSE

**MIT** — Feel free to use anywhere.

---

## SUPPORT

If you like this CLI, leave a **star** on [GitHub](https://github.com/nrvboss/hcli)!

---

## AUTHOR

Created with ❤️ by **[@nrvboss](https://github.com/nrvboss)**

---

## CHANGELOG

### v1.8.0
-  Added Express module generator
-  Added NestJS module generator
-  Added Docker support for backend projects
-  Improved CLI flow with new spinner UI
-  Better error handling and safe exits
-  Simplified template structure
-  Codebase cleanup and refactor

---

**Made with passion to make your development faster** 