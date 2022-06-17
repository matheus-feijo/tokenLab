import { makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { TableUsers } from "../components/TableUsers";
import { api } from "../services/api";

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
    const [userList, setUserList] = useState([]);
    const classes = useStyles();
    const { id } = useParams();

    /**FUNCTIONS */
    const searchUser = async () => {

    }

    /**USE EFFECTS */
    useEffect(() => {
        searchUser();
        console.log(localStorage.getItem("usuario"));
    }, []);

    return (
        <div className={classes.divContainerAll}>
            <div className={classes.divContent}>
                <Typography className={classes.title}>Usuarios:</Typography>
                <div className={classes.content}>
                    <TableUsers
                        users={userList}
                    />
                </div>
            </div>
        </div>
    )
}