import { Fragment } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import ptBR from "date-fns/locale/pt-BR";
import { withStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";

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

export function Fields(props) {
    const formValues = props.formValues;
    const formErrors = props.formErrors;
    const handleChangeDesc = props.handleChangeDesc;
    const handleChangeDate = props.handleChangeDate;


    return (
        <Fragment>
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
        </Fragment>
    )
}