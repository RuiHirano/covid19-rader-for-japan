import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));

export const AccountDelete: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        firstName: "Shen",
        lastName: "Zhi",
        email: "shen.zhi@devias.io",
        phone: "",
        state: "Alabama",
        country: "USA"
    });

    const handleSubmit = () => {};

    const states = [
        {
            value: "alabama",
            label: "Alabama"
        },
        {
            value: "new-york",
            label: "New York"
        },
        {
            value: "san-francisco",
            label: "San Francisco"
        }
    ];

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <form autoComplete="off" noValidate>
                <CardHeader
                    subheader="Delete your account"
                    title="Delete Account"
                />
                <Divider />
                <CardActions>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => handleSubmit()}
                    >
                        Delete Account
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

//export default AccountDetails;
