const Event = require('../models/Event');
const moment = require('moment')

module.exports = {

    async createEvents(req, res) {
        const { description, dateStart, dateEnd, user } = req.body;

        const dateI = new Date(dateStart);
        const dateF = new Date(dateEnd);
        const isThereEventSameDate = false;

        try {
            const Novoevento = await Event.create({
                description: description,
                date_start: dateStart,
                date_end: dateEnd,
                user_id: user,
                created_at: new Date(),
                updated_at: new Date()
            });

            return res.status(200).send(Novoevento);
            // const userEvents = await Event.findAll({
            //     attributes: ['id', 'date_start', 'date_end', 'description', 'userId'],
            //     where: {
            //         userId: user
            //     }
            // });

            // for (let i = 0; i < userEvents.length; i++) {

            //     const inicio = new Date(userEvents[i].date_start).getTime();
            //     const fim = new Date(userEvents[i].date_end).getTime();

            //     if (dateI.getTime() === inicio || dateI.getTime() === fim || dateF.getTime() === inicio || dateF.getTime() === fim) {
            //         isThereEventSameDate = true;

            //     } else if ((dateI.getTime() > inicio && dateI.getTime() < fim) || dateF.getTime() > inicio && dateF.getTime() < fim) {
            //         isThereEventSameDate = true;
            //     }
            // }

            // console.log("tesre")
            // if (!isThereEventSameDate) {

            //     Event.create({
            //         description: description,
            //         date_start: dateI,
            //         date_end: dateF,
            //         user_id: user,
            //         created_at: new Date(),
            //         updated_at: new Date()
            //     });


            //     //return res.status(200).json({ 'message': 'evento criado com sucesso' });
            // } else {
            //     //return res.status(400).json({ 'message': 'nao foi possivel criar evento' })
            // }

        } catch (error) {
            return res.status(400).json({ 'message': 'nao foi possivel criar evento' })
        }


    },

    async updateEvents(req, res) {
        const { id, description, dateStart, dateEnd, user } = req.body;

        try {
            const updatedEvent = await Event.update({
                description,
                date_start: dateStart,
                date_end: dateEnd,
                user_id: user,
                updated_at: new Date(),
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json(updatedEvent)

        } catch (error) {
            return res.status(400).json({ "message": "nao foi possivel atualizar evento" })
        }

    },

    async deleteEvents(req, res) {
        const { id } = req.params;

        try {
            const eventoDeleted = await Event.destroy({
                where: {
                    id: id
                }
            });

            return res.status(200).json(eventoDeleted);

        } catch (error) {
            return res.status(400).json({ 'message': 'nao foi possivel deletar evento' });
        }


    },

    async getAllEvents(req, res) {
        const { id } = req.params;

        const allEventsUser = [];

        try {
            const eventos = await Event.findAll({
                where: {
                    user_id: id
                }
            })

            for (let i = 0; i < eventos.length; i++) {
                allEventsUser.push(eventos[i].dataValues);
            }

            return res.status(200).json(allEventsUser);
        } catch (error) {
            return res.status(400).json({ "message": "nao foi possivel pegar eventos desse usuario" });
        }



    },


}