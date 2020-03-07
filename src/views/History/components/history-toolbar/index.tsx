import React from "react";


import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import * as H from "history";
import { SearchInput } from "../../../../components";
import { withRouter, match } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    row: {
        height: "42px",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    }
}));

interface Props {
    history: H.History;
    location: H.Location;
    match: match;
}
const HistoryToolbar: React.FC<Props> = props => {
    const { history } = props;

    const classes = useStyles();

    return (
        <div
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <div className={classes.row}>
                <SearchInput
                    className={classes.searchInput}
                    //placeholder="Search user"
                />
                <span className={classes.spacer} />
                <Button
                    onClick={() => history.push("/entry/new")}
                    color="primary"
                    variant="contained"
                >
                    Add Item
                </Button>
            </div>
        </div>
    );
};

export default withRouter(HistoryToolbar);
