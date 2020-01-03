import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, Typography, CardContent, Card } from "@material-ui/core";
import { Item, Items } from "../../../types";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    },
    tile: {
        backgroundColor: theme.palette.common.white,
        height: 125
    },
    detail: {
        height: "100%",
        display: "flex",
        backgroundColor: theme.palette.common.white
    },
    date: {
        backgroundColor: theme.palette.common.white,
        height: "7%"
    },
    content: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    }
}));

interface Props {
    items: Items;
    toEdit: (item: Item) => void;
}

const Content: React.FC<Props> = props => {
    const { items, toEdit } = props;
    const classes = useStyles();

    const getContent = () => {
        // 月表示のときのみ
        let content: any = [];
        items.items.forEach((item: Item, index: number) => {
            content.push(
                <Card
                //{...rest}
                //className={clsx(classes.root, className)}
                >
                    <CardContent>
                        <Grid
                            container
                            justify="space-between"
                            className={classes.content}
                        >
                            <Button onClick={() => toEdit(item)}>Edit</Button>
                            <Typography variant="h5">
                                {"Date: " + item.StartDate}
                            </Typography>
                            <Typography variant="h5">
                                {"Market Type: " + item.MarketType}
                            </Typography>
                            <Typography variant="h5">
                                {"TradeType: " + item.TradeType}
                            </Typography>
                            <Typography variant="h5">
                                {"Pair: " + item.Pair}
                            </Typography>
                            <Typography variant="h5">
                                {"Lot: " + item.Lot}
                            </Typography>
                            <Typography variant="h5">
                                {"Order: " + item.EntryRate}
                            </Typography>
                            <Typography variant="h5">
                                {"Settle: " + item.SettleRate}
                            </Typography>
                            <Typography variant="h5">
                                {"損益: " + item.Profit}
                            </Typography>
                            <Typography variant="h5">
                                {"損切り価格: " + item.LossCutRate}
                            </Typography>
                            <Typography variant="h5">
                                {"想定損失: " + item.Profit}
                            </Typography>
                            <Typography variant="h5">
                                {"Risk: Reward: " + item.Profit}
                            </Typography>
                            <Typography variant="h5">
                                {"BeforeMemo: " + item.BeforeComment}
                            </Typography>
                            <Typography variant="h5">
                                {"AfterMemo: " + item.AfterComment}
                            </Typography>
                            <Typography variant="h5">
                                {"Tag: " + item.Profit}
                            </Typography>
                            <Typography variant="h5">
                                {"Image: " + item.Profit}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            );
        });

        return <div>{content}</div>;
    };

    return <div>{getContent()}</div>;
};

export default Content;
