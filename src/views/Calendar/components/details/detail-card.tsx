import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Item } from "../../../../types";
import { styled } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({}));

interface Props {
    item: Item;
    toEdit: (item: Item) => void;
    toDetail: (item: Item) => void;
}

const CardContainer = styled(Card)({
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10
});

const DetailCard: React.FC<Props> = props => {
    const { item, toEdit, toDetail } = props;

    return (
        <CardContainer>
            <CardContent>
                <Button onClick={() => toEdit(item)} variant={"outlined"}>
                    Edit
                </Button>
                <Button onClick={() => toDetail(item)} variant={"outlined"}>
                    Detail
                </Button>
                <Typography variant="subtitle1">
                    {item.TradeType.toString() === "FX" ? "Forex" : "Stock"}
                </Typography>
                <Typography variant="subtitle1">
                    {"Time: " + moment(item.StartDate).format("hh:mm")}
                </Typography>
                <Typography variant="subtitle1">
                    {"Pair: " + item.Pair}
                </Typography>
                <Typography variant="subtitle1">
                    {"Lot: " + item.Lot}
                </Typography>
                <Typography variant="subtitle1">
                    {"Profit: " + item.Profit}
                </Typography>
                <Typography variant="subtitle1">
                    {item.BeforeComment}
                </Typography>
            </CardContent>
        </CardContainer>
    );
};

export default DetailCard;
