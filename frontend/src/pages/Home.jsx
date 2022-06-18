import { makeStyles, Typography } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TableUsers } from "../components/TableUsers";
import { api } from "../services/api";
import moment from 'moment';

const useStyles = makeStyles(() => ({
    title: {
        lineHeight: "64px",
        font: "400 32px Roboto",
        letterSpacing: "-0.25px",
    },
    content: {
        width: "100%",
    },
    divContainerAll: {
        display: "grid",
        justifyItems: "center",
    },
    divContent: {
        width: "80%",
    }
}))

export function Home() {

    /**VARIAVEIS */
    const [events, setEvents] = useState([]);
    const classes = useStyles();

    const getUserEvents = async () => {
        const user = JSON.parse(localStorage.getItem('usuario'));

        try {
            await api.get(`/events/${user.id}`).then((res) => {
                console.log(res.data);
                setEvents(res.data);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    /**USE EFFECTS */
    useEffect(() => {
        getUserEvents();
    }, []);

    return (
        <div className={classes.divContainerAll}>
            {events.map((evento, ind) => {
                return (
                    <Fragment>
                        <p>
                            {`inicio:${moment(evento.date_start).format()} fim:${moment(evento.date_end).format()} description:${evento.description}`}
                        </p>
                    </Fragment>
                )
            })}

        </div>
    )
}