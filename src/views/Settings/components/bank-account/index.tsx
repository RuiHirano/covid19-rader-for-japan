import React, { useState } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {}
}));

// Container
interface ContainerProps {}
const BankAccountContainer: React.FC<ContainerProps> = props => {
    return <BankAccount />;
};

export default BankAccountContainer;

export const BankAccount: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        password: "",
        confirm: ""
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <form>
                <CardHeader subheader="Bank Informatin" title="Bank Account" />
                <Divider />
                <CardContent>
                    <Typography variant="h4">7**********3</Typography>
                    <Typography variant="h6">2023/9/30</Typography>
                    <Typography variant="h6">VISA</Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button color="primary" variant="outlined">
                        Edit
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

//export default BankAccount;
