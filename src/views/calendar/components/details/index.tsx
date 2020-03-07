import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import * as H from "history";
import PerfectScrollbar from "react-perfect-scrollbar";
import DetailCard from "./detail-card";
import moment, { Moment } from "moment";
import { Item } from "../../../../types";
import { withRouter, match } from "react-router";
import { styled } from "@material-ui/core/styles";

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
        height: "80%",
        display: "flex",
        backgroundColor: theme.palette.common.white
    },
    statistics: {
        backgroundColor: theme.palette.common.black,
        height: "20%"
    },
    calendar: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%"
    }
}));

const Date = styled(Typography)({
    textAlign: "center"
});

interface Props {
    date: Moment;
    items: Item[];
    history: H.History;
    location: H.Location;
    match: match;
}

const Details: React.FC<Props> = props => {
    const { date, items, history } = props;
    const classes = useStyles();

    const toEdit = (item: Item) => {
        history.push("/entry/" + item.ID);
    };

    const toDetail = (item: Item) => {
        console.log("itemId: ", item);
        history.push("/detail/" + item.StartDate);
    };

    const queryDateItems = () => {
        let dateItems: Item[] = [];
        /*const iterator: Iterator = items.iterator()
		while(iterator.hasNext()){
			const item = iterator.next()
			if (moment(item.StartDate).isSame(moment(date), "days")) {
                dateItems.push(item);
            }
		}*/
        items.forEach(item => {
            if (moment(item.StartDate).isSame(moment(date), "days")) {
                dateItems.push(item);
            }
        });
        return dateItems;
    };

    const dateItems = queryDateItems();

    return (
        <div>
            <PerfectScrollbar>
                <Date variant="h6">{date.format("YYYY/MM/DD")}</Date>
                {dateItems.map((item, index) => (
                    <DetailCard
                        item={item}
                        toEdit={toEdit}
                        toDetail={toDetail}
                    />
                ))}
            </PerfectScrollbar>
        </div>
    );
};

export default withRouter(Details);
