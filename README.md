# MERN Note App

Note app built with MERN stack. Currently WIP.

App's design is a clone of https://www.notion.so/.

## App Preview

https://github.com/jp-quintana/mern-note-app/assets/87621233/10b92abc-03c0-4932-a213-aa3b375f3c80

## Features

- Create, Edit, Duplicate and Delete notes.
- Basic note customization.
- Note list reorder.
- Basic JWT auth.
- DAO layer setup in server.

## Future additions

Check issues tab.

## Installation

- Step 1: Clone Repository and Install Packages.

```
git clone https://github.com/jp-quintana/mern-note-app.git

npm i

npm run setup

```

- Step 2: Set Up a MongoDB Cluster.

- Step 3: Create .env file and add in server directory.

```
MONGO_URI="Cluster connection string. Can not be left empty."
PORT="Default is 8080 if left empty."
DAO_OPTION="Currently MONGOOSE is only option available. It is also the default option if left empty."
JWT_SECRET="Can not be left empty."
```

- Step 4: Create .env.local file and add in client directory.

```
VITE_API_URL='http://localhost:8080'
```

- Step 5: Start the development server.

```
npm run dev
```

## Authors

- [@jp-quintana](https://github.com/jp-quintana)
