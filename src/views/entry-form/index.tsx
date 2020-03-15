import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import * as H from "history";
import { withRouter, match } from "react-router";
import { BackButton, Form } from "./components";
import { FormikValues } from "formik";
import { Item } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { useCreateItem, useUpdateItem } from "../../redux/hooks/useItem";
import { ReduxState } from "../../redux/module";
import { Main as MainLayout } from "../../layouts";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match<{ itemId: string }>;
}
const EntryFormContainer: React.FC<ContainerProps> = props => {
    const { history, match } = props;
    const dispatch = useDispatch();
    const { createItem, status } = useCreateItem()
    const { updateItem } = useUpdateItem()
    const items = useSelector((state: ReduxState) => state.Items);
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
            createItem(item)
        } else {
            updateItem(item)
        }
    };

    const handleBack = () => {
        history.goBack();
    };


    const [item, setItem] = useState(new Item());

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
            items.forEach((item_: Item, index: number) => {
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
        <MainLayout title="Entry Form">
            <Grid className={classes.grid} container>
                <Grid className={classes.content} item lg={12} xs={12}>
                    <div className={classes.contentBody}>
                        <Form item={item} handleRegistItem={handleRegistItem} />
                    </div>
                </Grid>
            </Grid>

        </MainLayout>
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
