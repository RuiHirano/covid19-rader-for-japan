import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { HistoryToolbar, HistoryTable } from "./components";
import { useSelector } from "react-redux";
import { LoadingState, Item } from "../../types";
import { ReduxState } from "../../redux/module";

// Container
interface ContainerProps {}
const HistoryContainer: React.FC<ContainerProps> = props => {
    /*const dispatch = useDispatch();
    const handleUpdateHisyory = (values: FormikValues) => {
        dispatch(
            userActions.updateHisyoryAction({ password: values.password })
        );
	};*/
    const items_ = useSelector((state: ReduxState) => state.Items);
    const [items, setItems] = useState(items_);

    return <HistoryView items={items} />;
};

export default HistoryContainer;

interface Props {
    items: Item[];
}

const HistoryView: React.FC<Props> = props => {
    const { items } = props;
    const classes = useStyles();

    //const items = useSelector((state: ReduxState) => state.Items);

    return (
        <div className={classes.root}>
            <HistoryToolbar />
            <div className={classes.content}>
                <HistoryTable items={items} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));
