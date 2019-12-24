import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Navigation from "../../../components/navigation";
import { LoadingState } from "../../../../types";
import { withRouter, RouteComponentProps, match } from "react-router";
import { useDispatch } from "react-redux";
import { signActions } from "../../../../redux/saga/Sign/signSaga";
import { useLoading } from "../../../../common/hooks/useLoading";
import * as H from "history";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        boxShadow: "none"
    },
    flexGrow: {
        flexGrow: 1
    },
    signOutButton: {
        marginLeft: theme.spacing(1)
    }
}));

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    className?: string;
    onSidebarOpen: () => void;
}

const Topbar: React.FC<Props> = props => {
    const { className, onSidebarOpen, history } = props;

    const classes = useStyles();

    const [notifications] = useState([]);

    const dispatch = useDispatch();

    const { isLoading, isFinishLoading } = useLoading(LoadingState.SIGN_OUT);

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/");
        }
    }, [isLoading]);

    const handleSignOut = () => {
        dispatch(signActions.signOutAction());
    };

    return (
        <AppBar className={clsx(classes.root, className)}>
            <Toolbar>
                <RouterLink to="/">
                    <img
                        alt="Trading Manager"
                        src="./../../../../../public/app_icon.png"
                    />
                </RouterLink>
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        onClick={() => handleSignOut()}
                        className={classes.signOutButton}
                        color="inherit"
                    >
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(Topbar);
