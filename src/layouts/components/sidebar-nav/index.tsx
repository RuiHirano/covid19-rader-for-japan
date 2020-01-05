import React, { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { List, ListItem, Button, colors } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import theme from "../../../styles/theme";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    item: {
        display: "flex",
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        color: colors.blueGrey[800],
        padding: "10px 8px",
        justifyContent: "flex-start",
        textTransform: "none",
        letterSpacing: 0,
        width: "100%",
        fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
        color: theme.palette.primary.light,
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1)
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        "& $icon": {
            color: theme.palette.primary.main
        }
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
    pages: { title: string; href: string; icon: any }[];
    isHome: boolean;
    signout: { title: string; icon: any; handleSignOut: () => void };
    onClose: () => void;
}

const SidebarNav: React.FC<Props> = props => {
    const { pages, signout, isHome, onClose } = props;

    const classes = useStyles();

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
                            onClick={() => signout.handleSignOut()}
                        >
                            <div className={classes.icon}> {signout.icon} </div>
                            {signout.title}
                        </Button>
                    </ListItem>
                )}
            </List>
        </SidebarContainer>
    );
};

export default SidebarNav;
