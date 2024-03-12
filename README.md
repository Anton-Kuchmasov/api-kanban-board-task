# api-kanban-board-task

Back-end API implementation for github-kanban-test-task
Developed with using REST standards of creating API.

# Technologies I've used

Here I've used several technologies on my way to create & deploy simple API server:

- Node.js;
- TypeScript;
- Express.js;
- Sequelize ORM;
- CORS lib for Express in case of denying default CORS policy of web browser;
- PostgreSQL, pgAdmin (on my PC, not into dev dependencies) for debugging and setting DB for the very first time it was created;
- UUIDv4 for simply and automatically creating unique IDs for todos;
- ESLint and Prettier on way to improve my own code style;
- Nodemon, dotenv libs for simplify development process.

# API instructions

- GET /todos -- returning a whole Todos list (all users, all todos);
- GET /todos/:userID -- returning all Todos from user with selected ID (integer value, bigger than 0);
- POST /todos -- creating a new Todo, write down all specified data onto DB and returning a new Todo instance (as well as REST API standards implementation);
- DELETE /todos/:todoID -- removing a Todo with selected ID;
- PATCH /todos/:todoID/:status -- changing a status of current Todo. Used every time when Todo is dragged from one column to the next one;
- PATCH /todos/:todoID -- updating a Todo data using title and description from request params.

# How to use App

As usual practice with using back-end API servers, there is no need to run server manually.
It deployed onto Render web-service and running in automatically mode.
