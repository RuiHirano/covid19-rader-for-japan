import React, { useState, useEffect } from "react";
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
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch, useSelector } from "react-redux";
import { LoadingState } from "../../../../types";
import { useLoading } from "../../../../common/hooks/useLoading";
import { userActions } from "../../../../redux/saga/user";
import { AppState } from "../../../../redux/module";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const AccountDeleteContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleDeleteAccount = () => {
        dispatch(userActions.deleteAccountAction());
    };

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("toHome");
            history.push("/home");
        }
    };

    useLoading(LoadingState.DELETE_ACCOUNT, callback);

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
