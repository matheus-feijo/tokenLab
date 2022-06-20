import { Button, CircularProgress, IconButton, makeStyles } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { api } from "../../services/api";
import moment from 'moment';

import "./styles/home.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Fields } from "./components/Fields";

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
    const initialValues = {
        user: null,
        description: "",
        dateStart: null,
        dateEnd: null,
    }
    const classes = useStyles();
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userEvents, setUserEvents] = useState([]);
    const [isCreateEvent, setIsCreateEvent] = useState(true);
    const [loading, setLoading] = useState(false);

    const getUserEvents = async () => {
        const user = JSON.parse(localStorage.getItem('usuario'));

        setLoading(true);
        try {
            await api.get(`/events/${user.id}`).then((res) => {
                setUserEvents(res.data);
                console.log(res.data)
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            throw new Error(error);
        }

        setLoading(false);
    }

    const handleChangeDate = (e, name) => {
        setFormValues({ ...formValues, [name]: e });
    }

    const handleChangeDesc = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values) => {
        let erros = {};

        if (!values.description) {
            erros.description = 'Campo obrigatorio'
        }
        if (!values.dateStart) {
            erros.dateStart = 'Campo obrigatorio'
        }
        if (!values.dateEnd) {
            erros.dateEnd = 'Campo obrigatorio'
        }

        return erros;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);

    }

    const submit = () => {
        console.log(formValues);
        isCreateEvent ? createEvent(formValues) : updateEvent(formValues);
    }

    const createEvent = async (evento) => {
        setLoading(true);
        try {
            await api.post('/events/create', evento).then((res) => {
                alert('evento criado com sucesso');
                getUserEvents();
                setIsCreateEvent(false);
            }).catch((err) => {
                alert('evento nao pode ser criado')
            })
        } catch (error) {
            throw new Error(error);
        }
        setLoading(false);
    }

    const deleteEvent = async (e, evento) => {

        setLoading(true);
        try {
            api.delete(`/events/delete/${evento.id}`).then((res) => {
                alert('evento deletado com sucesso');
                getUserEvents();
            }).catch((err) => {
                alert('evento nao pode ser deletado')
            })

        } catch (error) {
            throw new Error(error);
        }
        setLoading(false);
    }

    const updateEvent = async (evento) => {

        setLoading(true);
        console.log(evento);
        try {
            api.put('/events/update', evento).then((res) => {
                alert("Evento atualizado com sucesso");
                getUserEvents();
                setIsCreateEvent(true);
                setFormValues(initialValues);
                console.log(res);
            }).catch((err) => {
                alert('Evento nao pode ser atualizado');
            })


        } catch (error) {
            throw new Error(error);
        }

        setLoading(false);
    }

    const handleEditEvent = (e, evento) => {
        setIsCreateEvent(false);
        setFormValues({
            dateStart: evento.date_start,
            dateEnd: evento.date_end,
            description: evento.description,
            user: evento.user,
            id: evento.id
        });
    }

    const handleCloseEdit = (e) => {
        e.preventDefault();
        setIsCreateEvent(true);
        setFormValues(initialValues);
    }


    /**USE EFFECTS */
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('usuario'));
        getUserEvents();
        setFormValues({ ...formValues, user: user.id });
    }, []);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
            setIsSubmitting(false);
        }
    }, [formErrors, isSubmitting, submit])

    return (
        <div className={classes.divContainerAll}>

            {loading && <CircularProgress style={{ position: "absolute", left: "50%", top: "50%" }} />}

            {(!loading) &&
                <form onSubmit={handleSubmit}>
                    <Fields
                        formValues={formValues}
                        formErrors={formErrors}
                        handleChangeDate={handleChangeDate}
                        handleChangeDesc={handleChangeDesc}
                    />

                    <div style={{
                        display: "flex",
                        gap: "5px"
                    }}>
                        {!isCreateEvent &&
                            <Button variant="contained"
                                fullWidth
                                onClick={handleCloseEdit}
                            >
                                Cancelar
                            </Button>}

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >{isCreateEvent ? "Criar evento" : "editar evento"}
                        </Button>

                    </div>
                </form>
            }

            {(!loading) &&
                <div className="container-user-events">

                    {userEvents.map((evento, index) => {
                        return (
                            <div className="content-home-user-events" key={index}>
                                <p className="description" >
                                    {evento.description}
                                </p>

                                <p className="hours">
                                    {`${moment(evento.date_start).format('MMMM Do YYYY, h:mm:ss')} até ${moment(evento.date_end).format('MMMM Do YYYY, h:mm:ss')}`}
                                </p>

                                <IconButton children={<EditIcon />} onClick={(e) => handleEditEvent(e, evento)} />
                                <IconButton children={<DeleteIcon color="error" />} onClick={(e) => deleteEvent(e, evento)} />

                            </div>
                        )
                    })}


                </div>
            }
        </div>
    )
}