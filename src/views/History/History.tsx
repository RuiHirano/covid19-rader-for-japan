import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { HistoryToolbar, HistoryTable } from "./components";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/module/rootModule";
import { useLoading } from "../../common/hooks/useLoading";
import { Item } from "../../types/item";
import { LoadingState, Items } from "../../types";

// Container
interface ContainerProps {}
const HistoryContainer: React.FC<ContainerProps> = props => {
    /*const dispatch = useDispatch();
    const handleUpdateHisyory = (values: FormikValues) => {
        dispatch(
            userActions.updateHisyoryAction({ password: values.password })
        );
	};*/
    const items_ = useSelector((state: AppState) => state.Items);
    const [items, setItems] = useState(items_);

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_PASSWORD
    );
    useEffect(() => {
        if (isFinishLoading) {
            setItems(items);
            //history.push("/dashboard");
        }
    }, [items]);

    return <HistoryView items={items} />;
};

export default HistoryContainer;

interface Props {
    items: Items;
}

const HistoryView: React.FC<Props> = props => {
    const { items } = props;
    const classes = useStyles();

    //const items = useSelector((state: AppState) => state.Items);

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
