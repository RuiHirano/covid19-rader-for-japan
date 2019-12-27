import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar/dist/entry.nostyle";
import { width } from "@material-ui/system";
import { Grid, Typography } from "@material-ui/core";
import { Details, Statistics } from "./components";
import { Item, PeriodType } from "../../types";
import moment, { Moment } from "moment";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/module/rootModule";
import { ItemClass } from "../../types/item";
import { CalendarStats } from "./CalendarStats";

// Container
interface ContainerProps {}
const CalendarContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items = useSelector((state: AppState) => state.Items);
    console.log("items: ", items);

    /*const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_PASSWORD
    );
    useEffect(() => {
        if (isFinishLoading) {
            //history.push("/dashboard");
        }
    }, [isLoading]);*/

    return <CalendarView items={items} />;
};

export default CalendarContainer;

//Presentational
interface tileContentProps {
    date: Date;
    view: string;
}

interface Props {
    items: ItemClass[];
}

const CalendarView: React.FC<Props> = props => {
    const { items } = props;
    const classes = useStyles();

    const [date, setDate] = useState(new Date());

    const [stats, setStats] = useState(
        new CalendarStats(items, PeriodType.MONTH, moment(date), 10)
    );

    const getTileContent = ({ date, view }: tileContentProps) => {
        // 月表示のときのみ
        let content: any = [];
        items.forEach((item: ItemClass, index: number) => {
            if (moment(item.StartDate).isSame(moment(date), "days")) {
                content.push(
                    <Typography variant={"h6"}>{item.Pair}</Typography>
                );
            }
        });

        return <div>{content}</div>;
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.root} container>
                <Grid item xs={12} sm={9}>
                    <Calendar
                        className={classes.calendar}
                        tileClassName={classes.tile}
                        value={date}
                        onClickDay={value => {
                            setDate(value);
                        }}
                        onActiveDateChange={values => {
                            console.log(values);
                            stats.changePeriod(moment(values.activeStartDate));
                            stats.calcStatistics();
                            setDate(values.activeStartDate);
                        }}
                        tileContent={getTileContent}
                        view={"month"}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Grid item className={classes.statistics} xs={12} sm={12}>
                        <Statistics date={moment(date)} stats={stats} />
                    </Grid>
                    <Grid item className={classes.detail} xs={12} sm={12}>
                        <Details date={moment(date)} items={items} />
                    </Grid>
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
    }
}));

//export default CalendarView;
