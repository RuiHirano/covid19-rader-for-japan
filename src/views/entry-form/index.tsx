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
import { useDispatch, useSelector } from "react-redux";
import { itemActions } from "../../redux/saga/item";
import { useLoading } from "../../common/hooks/useLoading";
import { AppState } from "../../redux/module";
import { Iterator } from "../../types/iterator";

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
        const item: Item = new Item();
        item.ID = values.ID;
        item.MarketType = values.MarketType;
        item.StartDate = values.StartDate;
        item.EndDate = values.EndDate;
        item.TradeType = values.TradeType;
        item.Pair = values.Pair;
        item.Lot = parseFloat(values.Lot);
        item.EntryRate = parseFloat(values.EntryRate);
        item.LossCutRate = parseFloat(values.LossCutRate);
        item.SettleRate = parseFloat(values.SettleRate);
        item.Profit = parseInt(values.Profit);
        item.BeforeComment = values.BeforeComment;
        item.AfterComment = values.AfterComment;
        item.Tags = values.Tags;
        item.Images = values.Images;
        item.UpdatedAt = values.UpdatedAt;
        item.CreatedAt = values.CreatedAt;

        if (match.params.itemId === "new") {
            dispatch(
                itemActions.createItemAction({
                    item: item
                })
            );
        } else {
            dispatch(
                itemActions.updateItemAction({
                    item: item
                })
            );
        }
    };

    const handleBack = () => {
        history.goBack();
    };


    const [item, setItem] = useState(new Item());

    const callback = (nowLoading: boolean, finishLoading: boolean) => {
        if (nowLoading) {
            console.log("loading now");
        } else if (finishLoading) {
            console.log("finish loading");
            history.push("/dashboard");
        }
    };

    useLoading(LoadingState.CREATE_ITEM, callback);

    useEffect(() => {
        if (match.params.itemId === "new") {
        } else if (item.ID !== match.params.itemId) {
            /*const iterator: Iterator = items.iterator();
            while (iterator.hasNext()) {
                const item_ = iterator.next();
                if (item_.ID === match.params.itemId) {
                    // urlパラメータと同じIDをもつアイテム
                    setItem(item_);
                }
            }*/
            items.items.forEach((item_: Item, index: number) => {
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
    item: Item;
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
