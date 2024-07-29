## Personal notes app built with React, Redux and Express.js

CRUD application built using React, Redux, and Express.js to leverage skills in developing a full-stack application. This includes implementing CRUD API operations, integrating the frontend with the backend, and managing the deployment process.

Available here: [https://personal-notepad-react-redux.vercel.app/](https://personal-notepad-react-redux.vercel.app/)

#### How to run project locally

- Fork repository
- Go to `/client` and run `npm i`
- Go to `/server` , run `npm i` and create there `.env` file with this three variables:
  - _MONGO_URI_
  - _PORT_
  - _JWT_SECRET_
- Run backend (`/server`) with `node index.js`
- Run frontend (`/client`) with `npm start`
