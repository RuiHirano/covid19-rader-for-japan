import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, TextField, Button } from "@material-ui/core";
import * as H from "history";
import { withRouter, RouteComponentProps, match } from "react-router";
import { BackButton, Form } from "./components";
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { Item, MarketType, TradeType, LoadingState } from "../../types";
import moment from "moment";
import uuid from "uuid";
import { mockItems } from "../../common/mockData";
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../redux/saga/Item/itemSaga";
import { useLoading } from "../../common/hooks/useLoading";
import { ItemClass } from "../../types/item";
import { AppState } from "../../redux/module/rootModule";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match<{ itemId: string }>;
}
const EntryFormContainer: React.FC<ContainerProps> = props => {
    const { history, match } = props;
    const dispatch = useDispatch();
    const items = useSelector((state: AppState) => state.Items);
    const handleRegistItem = (values: FormikValues) => {
        console.log("debug value", values);
        const itemClass: ItemClass = new ItemClass();
        const item: Item = {
            ID: values.ID,
            MarketType: values.MarketType,
            StartDate: values.StartDate,
            EndDate: values.EndDate,
            TradeType: values.TradeType,
            Pair: values.Pair,
            Lot: values.Lot,
            EntryRate: values.EntryRate,
            LossCutRate: values.LossCutRate,
            SettleRate: values.SettleRate,
            Profit: values.Profit,
            BeforeComment: values.BeforeComment,
            AfterComment: values.AfterComment,
            Tags: values.Tags,
            Images: values.Images,
            UpdatedAt: values.UpdatedAt,
            CreatedAt: values.CreatedAt
        };
        itemClass.setItem(item);
        if (match.params.itemId === "new") {
            dispatch(
                itemActions.createItemAction({
                    item: itemClass
                })
            );
        } else {
            dispatch(
                itemActions.updateItemAction({
                    item: itemClass
                })
            );
        }
    };

    const handleBack = () => {
        history.goBack();
    };

    const { isLoading, isFinishLoading } = useLoading(LoadingState.CREATE_ITEM);

    const [item, setItem] = useState(new ItemClass());

    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    useEffect(() => {
        if (match.params.itemId === "new") {
        } else if (item.ID !== match.params.itemId) {
            items.forEach((item_: ItemClass, index: number) => {
                if (item_.ID === match.params.itemId) {
                    // urlパラメータと同じIDをもつアイテム
                    setItem(item_);
                }
            });
        }
    }, []);

    return (
        <EntryFormView
            handleRegistItem={handleRegistItem}
            item={item}
            handleBack={handleBack}
        />
    );
};

export default withRouter(EntryFormContainer);

// Presentatinal
interface Props {
    handleRegistItem: (values: FormikValues) => void;
    handleBack: () => void;
    item: ItemClass;
}

const EntryFormView: React.FC<Props> = props => {
    const { handleRegistItem, handleBack, item } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.content} item lg={12} xs={12}>
                    <div className={classes.contentHeader}>
                        <BackButton handleBack={handleBack} />
                    </div>
                    <div className={classes.contentBody}>
                        <Form item={item} handleRegistItem={handleRegistItem} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center"
        }
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    grid: {
        height: "100%"
    }
}));

//export default withRouter(EntryFormView);
