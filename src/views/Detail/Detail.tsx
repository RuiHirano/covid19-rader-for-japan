import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Content, DateBar } from "./components";
import * as H from "history";
import { withRouter, match } from "react-router";
import { Item, TradeType, MarketType } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import moment, { Moment } from "moment";
import uuid from "uuid";

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
    statistics: {
        backgroundColor: theme.palette.common.white,
        height: "20%"
    },
    calendar: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%"
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
    history: H.History;
    location: H.Location;
    match: match<{ date: string }>;
    items: Item[];
}

const DetailView: React.FC<Props> = props => {
    const { match, items, history } = props;
    const classes = useStyles();
    //const items = useSelector((state: AppState) => state.Items);
    const [date, setDate] = useState(moment(match.params.date)); // 表示する月日
    const [targetItems, setTargetItems] = useState<Item[]>([]); //　表示する月日のアイテム
    const [dates, setDates] = useState<Moment[]>([]); // 取引したことのある日付の昇順配列

    useEffect(() => {
        dateSort(dates);
        getTargetItems(date);
    }, []);

    const dateSort = (dates: Moment[]) => {
        items.forEach((item: Item, index: number) => {
            if (index === 0) {
                dates.push(moment(item.StartDate));
            } else if (
                !moment(item.StartDate).isSame(
                    moment(items[index - 1].StartDate),
                    "day"
                )
            ) {
                dates.push(moment(item.StartDate));
            }
        });
        console.log("dates", dates);
        dates.sort(function(date1, date2) {
            if (moment(date1).isAfter(moment(date2))) {
                return 1;
            } else {
                return -1;
            }
        });

        console.log("date2", dates);
        setDates(dates);
    };

    const getTargetItems = (tdate: Moment) => {
        let items: Item[] = [];
        let dates: Moment[] = [];

        items.forEach((item: Item, index: number) => {
            if (moment(item.StartDate).isSame(tdate)) {
                items.push(item);
            }
            if (index === 0) {
                dates.push(moment(item.StartDate));
            } else if (
                !moment(item.StartDate).isSame(
                    moment(items[index - 1].StartDate),
                    "day"
                )
            ) {
                dates.push(moment(item.StartDate));
            }
        });
        setTargetItems(items);
    };

    const toPrev = () => {
        console.log("date3", dates);
        dates.forEach((_date, index) => {
            if (_date.isSame(date, "day") && index !== 0) {
                console.log("date22", dates[index - 1].toISOString());
                history.push("/detail/" + dates[index - 1].toISOString());
                setDate(dates[index - 1]);
                getTargetItems(dates[index - 1]);
            }
        });
    };

    const toNext = () => {
        dates.forEach((_date, index) => {
            if (_date.isSame(date, "day") && index !== dates.length - 1) {
                history.push("/detail/" + dates[index + 1].toISOString());
                setDate(dates[index + 1]);
                getTargetItems(dates[index + 1]);
            }
        });
    };

    const toEdit = (item: Item) => {
        history.push("/entry/" + item.ID);
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.root} container>
                <Grid xs={12} sm={12} className={classes.date}>
                    <DateBar date={date} toPrev={toPrev} toNext={toNext} />
                </Grid>
                <Grid xs={12} sm={12} className={classes.content}>
                    <Content items={targetItems} toEdit={toEdit} />
                </Grid>
            </Grid>
        </div>
    );
};

export default withRouter(DetailView);
