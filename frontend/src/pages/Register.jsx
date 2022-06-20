import { useNavigate } from "react-router-dom"
import { api } from "../services/api";
import React, { useState, useEffect } from "react";

import { StyledInput, StyledPassword } from "../components/Inputs";
import { StyledButton } from "../components/Buttons";

import { useStyles } from "./Login";

export function Register() {

    /**VARIAVEIS */
    const navigate = useNavigate();
    const classes = useStyles();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",

    })

    /**FUNCTIONS */

    const submit = () => {
        createUser(formValues);
    }

    const createUser = async (formValues) => {
        try {
            await api.post("/user/create", formValues).then((res) => {
                navigate('/')
                alert(res.data.message);
            }).catch(erro => {
                alert('nao foi possivel criar usuario');
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormErrors(validate(formValues))
    }

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Campo obrigatorio";
        }
        if (!values.password) {
            errors.password = "Campo Obrigatorio";
        }
        if (!values.name) {
            errors.name = "Campo obrigatorio";
        }

        return errors;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }


    /**USE EFFECTS */
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
            setIsSubmitting(false);
        }
    }, [formErrors, isSubmitting]);

    return (
        <div className={classes.divContainerAllContent}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.formDivInputs}>

                    {/**USUARIO */}
                    <StyledInput
                        formErrors={formErrors}
                        formValues={formValues}
                        handleChange={handleChange}
                        name="email"

                    />

                    {/**PASSWORD */}
                    <StyledPassword
                        formErrors={formErrors}
                        formValues={formValues}
                        handleChange={handleChange}

                    />

                    {/**Nome */}
                    <StyledInput
                        formErrors={formErrors}
                        formValues={formValues}
                        handleChange={handleChange}
                        name="name"
                    />

                </div>

                <div className={classes.formDivButtons}>
                    <StyledButton
                        className={classes.register}
                        variant="contained"
                        type="submit"
                    >
                        Registrar
                    </StyledButton>
                </div>
            </form>

        </div>
    )
}