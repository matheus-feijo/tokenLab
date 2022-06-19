import { Button, makeStyles, TextField, Typography, withStyles } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { api } from "../services/api";
import moment from 'moment';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import ptBR from "date-fns/locale/pt-BR"


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

const TextFieldCSS = withStyles({
    root: {
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 15px) scale(1)'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '& .MuiOutlinedInput-input': {
            width: '700px',
            height: '2.688rem',
            padding: '0px 0px 0px 10px',
            borderRadius: '4px',
            backgroundColor: "#fff",
        },
        '& .MuiFormHelperText-contained': {
            marginLeft: "0px"
        }
    }
})(TextField);

const DateTimeCSS = withStyles({
    root: {
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 15px) scale(1)'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '& .MuiOutlinedInput-input': {
            width: '348px',
            height: '2.688rem',
            padding: '0px 0px 0px 10px',
            borderRadius: '4px',
            backgroundColor: "#fff",
        },
        '& .MuiFormHelperText-contained': {
            marginLeft: "0px"
        }
    }
})(DateTimePicker);


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


    const [isCreateEvent, setIsCreateEvent] = useState(false);

    const getUserEvents = async () => {
        const user = JSON.parse(localStorage.getItem('usuario'));

        try {
            await api.get(`/events/${user.id}`).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleChangeDate = (e, name) => {
        setFormValues({ ...formValues, [name]: e });
    }

    const handleChangeDesc = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    }

    const shouldDisableDate = (day) => {
        if (day.getTime() > dateStart.getTime()) {
            return false;
        } else {
            return true;
        }
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
        createEvent(formValues);
    }

    const createEvent = async (evento) => {

        try {
            await api.post('/events/create', evento).then((res) => {
                alert(res.data.message);
                setIsCreateEvent(false);
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            throw new Error(error);
        }
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

            <header style={{
                height: "6vh",
                backgroundColor: "#008F8C",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "50px"
            }}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setIsCreateEvent(true);
                }}>criar evento</button>

                <button onClick={(e) => {
                    e.preventDefault();
                    setIsCreateEvent(false);
                }}>
                    Listar eventos
                </button>
            </header>

            {isCreateEvent ? (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "90%",
                        display: "grid",
                        justifyContent: "center",
                        paddingTop: "100px",
                        rowGap: "10px",
                    }}>
                    <TextFieldCSS
                        variant="outlined"
                        name="description"
                        placeholder="descrição do evento"
                        value={formValues.description}
                        onChange={handleChangeDesc}
                        helperText={formErrors.description}
                        error={formErrors.description}
                    />
                    <div style={{
                        display: "flex",
                        gap: "5px",
                    }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                            <DateTimeCSS
                                label="Data inicio"
                                inputVariant="outlined"
                                value={formValues.dateStart}
                                helperText={formErrors.dateStart}
                                error={formErrors.dateStart}
                                onChange={(e) => handleChangeDate(e, 'dateStart')}
                                ampm={false}
                                leftArrowButtonProps={{ "aria-label": "mes anterior" }}
                                rightArrowButtonProps={{ "aria-label": "proximo mes" }}
                                autoOk
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
                            <DateTimeCSS
                                label="Data fim"
                                inputVariant="outlined"
                                disabled={formValues.dateStart === null}
                                value={formValues.dateEnd}
                                helperText={formErrors.dateEnd}
                                error={formErrors.dateEnd}
                                onChange={(e) => handleChangeDate(e, 'dateEnd')}
                                ampm={false}
                                leftArrowButtonProps={{ "aria-label": "mes anterior" }}
                                rightArrowButtonProps={{ "aria-label": "proximo mes" }}
                                autoOk
                                disablePast
                            //shouldDisableDate={shouldDisableDate}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <Button variant="contained" color="primary" type="submit">Criar evento</Button>
                </form>

            ) : (
                <div>

                </div>
            )}

        </div>
    )
}