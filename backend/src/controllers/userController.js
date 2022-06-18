const User = require("../models/User");


module.exports = {
    async createUser(req, res) {
        const { name, email, password } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email: email,
                }
            });

            if (user === null) {
                User.create({
                    name: name,
                    email: email,
                    password: password,
                    created_at: new Date(),
                    updated_at: new Date(),
                });

                const newUser = await User.findOne({ where: { email: email } })

                return res.status(200).json({ 'message': 'Usuario cadastrado com sucesso', 'user': newUser });

            } else {
                return res.status(203).json({ 'message': 'Email ja cadastrado' });
            }

        } catch (error) {
            return res.status(400).send("nao foi possivel cadastrar usuario");
        }
    },

    async updateUser(req, res) {
        const { user } = req.body;

        try {
            User.update({
                name: user.name,
                email: user.email,
                password: user.password,
                updated_at: new Date(),
            }, {
                where: {
                    id: user.id
                }
            });

            return res.status(200).send("usuario atualizado com sucesso");

        } catch (error) {
            return res.status(400).send("nao foi possivel atualizar cadastro do usuario");
        }

    },

    async deleteUser(req, res) {
        const { user } = req.body;

        try {
            User.destroy({
                where: user.id
            })

            return res.status(200).send("usuario deletado com sucesso");
        } catch (error) {
            return res.status(400).send("nao foi possivel deletar usuario");
        }
    },

    async getAllUser(req, res) {

        try {
            const users = await User.findAll();

            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).send("nao foi possivel listar todos usuarios");
        }
    },
    async getUser(req, res) {
        const { email, password } = req.body;

        try {
            const userLogged = await User.findOne({
                where: {
                    email: email,
                    password: password,
                }
            });
            return res.status(200).json(userLogged);

        } catch (error) {
            return res.status(400).send("usuario nao cadastrado");
        }

    }
}