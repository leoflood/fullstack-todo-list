# CRUD To-Do List

## Docker Installation
This project uses a docker-compose file, you can do:

```bash
  docker-compose up
```

and the application will be running.

## Manual Installation

This project uses yarn, if you do not have it please do:

```bash
  npm install --global yarn
```

This application has a back-end made in Node JS and a front-end made in React, you have to install and run both for the application to work properly.

### Back End

Install and run the Back End with yarn:

```bash
  cd back-end
  yarn
  yarn dev
```

### Front End

Install and run the Front End with yarn:

```bash
  cd front-end
  yarn
```

Before run the Front End you must create an .env.local file inside the front-end folder. You can copy it from .env.local.sample.

Once the .env.local file is created, run:

```bash
  yarn dev
```

In the browser enter http://localhost:3000/ or the url that the front-end returns to use.