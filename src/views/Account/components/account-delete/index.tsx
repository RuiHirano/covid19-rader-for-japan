import React from "react";


import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardActions,
    Divider,
    Button,
} from "@material-ui/core";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch} from "react-redux";
import { useDeleteAccount } from "../../../../redux/hooks/useUser";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const AccountDeleteContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const {deleteAccount, status} = useDeleteAccount()

    const handleDeleteAccount = () => {
        deleteAccount()
    };

    return <AccountDelete handleDeleteAccount={handleDeleteAccount} />;
};

export default withRouter(AccountDeleteContainer);

//Presentational

interface Props {
    handleDeleteAccount: () => void;
}

export const AccountDelete: React.FC<Props> = props => {
    const { handleDeleteAccount } = props;

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
                        onClick={() => handleDeleteAccount()}
                    >
                        Delete Account
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {}
}));
