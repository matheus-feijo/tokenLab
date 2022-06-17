const express = require('express');
const userController = require('./controllers/userController');
const cors = require('cors');



const routes = express.Router();

routes.use(cors());

routes.get("/", (req, res) => { return res.status(200).send({ titulo: "MAHTEUS E FODA" }) });


routes.post('/user/create', userController.createUser);
routes.put('/user/update', userController.updateUser);
routes.delete('/user/delete', userController.deleteUser);
routes.get('/user/getAll', userController.getAllUser);
routes.post('/user/getUser', userController.getUser);



module.exports = routes;