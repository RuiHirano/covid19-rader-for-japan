import React, { forwardRef, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";
import DialogComponent, { useDialog } from "../../../components/dialog";
import AlertComponent, { AlertType, useAlert } from "../../../components/alert";

import { withRouter, RouteComponentProps, match } from "react-router";
import * as H from "history";
import { useSignOut } from "../../../redux/hooks/useAuth";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    item: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: theme.palette.background.default,
        padding: "10px 8px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0,
        width: "100%",
        fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
        color: theme.palette.background.default,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1)
    },
    active: {
        color: theme.palette.background.default,
        marginRight: 10,
        backgroundColor: colors.cyan[500],
        fontWeight: theme.typography.fontWeightMedium,
    }
}));

const SidebarContainer = styled("div")({
    paddingLeft: 15
});

const CustomRouterLink = forwardRef((props: any, ref: any) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
        <RouterLink {...props} />
    </div>
));

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
    pages: { title: string; href: string; icon: any }[];
    isHome: boolean;
    signout: { title: string; icon: any; };
    onClose: () => void;
}

const SidebarNav: React.FC<Props> = props => {
    const { pages, signout, isHome, onClose, history } = props;

    const { signOut, status } = useSignOut()
    // alert
    const { openAlert, alertController } = useAlert()

    // dialog
    const { openDialog, dialogController } = useDialog()

    const classes = useStyles();

    const handleSignOut = () => {
        signOut();
    };

    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            openAlert(AlertType.SUCCESS, "finish run command")
            history.push("/")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
            openAlert(AlertType.ERROR, "error occur while running command")
        }

    }, [status])

    return (
        <SidebarContainer>
            <List>
                {pages.map(page => (
                    <ListItem
                        className={classes.item}
                        disableGutters
                        key={page.title}
                    >
                        <Button
                            activeClassName={classes.active}
                            className={classes.button}
                            component={CustomRouterLink}
                            onClick={() => onClose()}
                            to={page.href}
                        >
                            <div className={classes.icon}> {page.icon} </div>
                            {page.title}
                        </Button>
                    </ListItem>
                ))}
                {isHome ? (
                    <div />
                ) : (
                        <ListItem
                            className={classes.item}
                            disableGutters
                            key={signout.title}
                        >
                            <Button
                                //activeClassName={classes.active}
                                className={classes.button}
                                //component={CustomRouterLink}
                                onClick={() => openDialog(handleSignOut, "Signout", "Are you sure signout?")}
                            >
                                <div className={classes.icon}> {signout.icon} </div>
                                {signout.title}
                            </Button>
                        </ListItem>
                    )}
            </List>
            <DialogComponent controller={dialogController} />
            <AlertComponent controller={alertController} />
        </SidebarContainer>
    );
};

export default withRouter(SidebarNav);
