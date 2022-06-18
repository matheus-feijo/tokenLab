const Event = require('../models/Event');

module.exports = {

    async createEvents(req, res) {

    },

    async updateEvents(req, res) {

    },

    async deleteEvents(req, res) {

    },

    async getAllEvents(req, res) {
        const { id } = req.params;

        const allEventsUser = [];

        try {
            const events = await Event.findAll({
                attributes: ['id', 'date_start', 'date_end', 'description', 'userId'],
                where: {
                    userId: id
                }
            });

            for (let i = 0; i < events.length; i++) {
                allEventsUser.push(events[i].dataValues);
            }

            return res.status(200).json(allEventsUser);
        } catch (error) {
            return res.status(400).json({ "message": "nao foi possivel pegar eventos desse usuario" });
        }



    },


}