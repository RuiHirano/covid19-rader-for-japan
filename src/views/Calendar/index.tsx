import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar/dist/entry.nostyle";
import { width } from "@material-ui/system";
import { Grid, Typography } from "@material-ui/core";
import { Details, Statistics } from "./components";
import { Item, PeriodType, Items, StatsResult } from "../../types";
import moment, { Moment } from "moment";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/module";
import { Iterator } from "../../types/iterator";

// Container
interface ContainerProps {}
const CalendarContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items: Items = useSelector((state: AppState) => state.Items);

    const [date, setDate] = useState<Moment>(moment());

    const content = useSelector(
        (state: AppState) => state.User.Setting.Content
    );

    const [statsValues, setStatsValues] = useState(
        items.calculator(moment(), PeriodType.ALL, content)
    );

    useEffect(() => {
        setStatsValues(items.calculator(date, PeriodType.MONTH, content));
    }, [date]);

    const changeDate = (nextDate: Moment) => {
        setDate(nextDate);
    };

    return (
        <CalendarView
            items={items}
            statsValues={statsValues}
            date={date}
            changeDate={changeDate}
        />
    );
};

export default CalendarContainer;

//Presentational
interface tileContentProps {
    date: Date;
    view: string;
}

interface Props {
    items: Items;
    statsValues: StatsResult;
    date: Moment;
    changeDate: (date: Moment) => void;
}

const CalendarView: React.FC<Props> = props => {
    const { items, statsValues, date, changeDate } = props;
    const classes = useStyles();

    const getTileContent = ({ date, view }: tileContentProps) => {
        // 月表示のときのみ
        let content: any = [];
        /*const iterator: Iterator = items.iterator();
        while(iterator.hasNext()){
			const item = iterator.next()
			if (moment(item.StartDate).isSame(moment(date), "days")) {
                content.push(
                    <Typography variant={"h6"}>{item.Pair}</Typography>
                );
            }
		}*/
        items.items.forEach((item: Item, index: number) => {
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
                        value={date.toDate()}
                        onClickDay={value => {
                            changeDate(moment(value));
                        }}
                        onActiveDateChange={values => {
                            console.log(values);
                            changeDate(moment(values.activeStartDate));
                        }}
                        tileContent={getTileContent}
                        view={"month"}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Grid item className={classes.statistics} xs={12} sm={12}>
                        <Statistics date={date} stats={statsValues} />
                    </Grid>
                    <Grid item className={classes.detail} xs={12} sm={12}>
                        <Details date={date} items={items} />
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
