import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Item } from "../../../../types";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {
    item: Item;
    toEdit: (item: Item) => void;
    toDetail: (item: Item) => void;
}

const DetailCard: React.FC<Props> = props => {
    const { item, toEdit, toDetail } = props;
    const classes = useStyles();

    return (
        <Card>
            <CardContent>
                <Button onClick={() => toEdit(item)}>Edit</Button>
                <Button onClick={() => toDetail(item)}>Detail</Button>
                <Typography variant="h6">{item.TradeType}</Typography>
                <Typography variant="h6">{item.StartDate}</Typography>
                <Typography variant="h6">{item.Pair}</Typography>
                <Typography variant="h6">{item.Lot}</Typography>
                <Typography variant="h6">{item.Profit}</Typography>
                <Typography variant="h6">{item.BeforeComment}</Typography>
            </CardContent>
        </Card>
    );
};

export default DetailCard;
