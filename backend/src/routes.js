const express = require('express');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');

const routes = express.Router();

routes.post('/user/create', userController.createUser);
routes.put('/user/update', userController.updateUser);
routes.delete('/user/delete', userController.deleteUser);
routes.get('/user/getAll', userController.getAllUser);
routes.post('/user/getUser', userController.getUser);

routes.get('/events/:id', eventController.getAllEvents);
routes.post('/events/create', eventController.createEvents);
routes.delete('/events/delete/:id', eventController.deleteEvents);
routes.put('/events/update', eventController.updateEvents);



module.exports = routes;