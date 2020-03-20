import React, { useState, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Calendar from "react-calendar/dist/entry.nostyle";
import { Grid, Typography } from "@material-ui/core";
import { Details, Statistics } from "./components";
import { Item, StatsResult } from "../../types";
import moment, { Moment } from "moment";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../redux/module";
import { Main as MainLayout } from "../../layouts";
import { useStatistics } from "../../redux/hooks/useStatistics";
import { PeriodType } from "../../types/statistics2";
import DateBar from "./components/date-bar";

/*// Container
interface ContainerProps { }
const CalendarContainer: React.FC<ContainerProps> = props => {
    const dispatch = useDispatch();
    const items: Item[] = useSelector((state: ReduxState) => state.Items);

    const [date, setDate] = useState<Moment>(moment());

    const content = useSelector(
        (state: ReduxState) => state.User.Setting.Content
    );

    const [statsValues, setStatsValues] = useState(
        //items.calculator(moment(), PeriodType.ALL, content)
    );

    useEffect(() => {
        //setStatsValues(items.calculator(date, PeriodType.MONTH, content));
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
};*/



//Presentational
interface tileContentProps {
    date: Date;
    view: string;
}

interface Props {
}

const CalendarView: React.FC<Props> = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const items: Item[] = useSelector((state: ReduxState) => state.Items);

    const [date, setDate] = useState<Moment>(moment());
    const [periodType, setPriodType] = useState<PeriodType>(PeriodType.MONTH);

    const [statsValues, setStatsValues] = useState(
        //items.calculator(moment(), PeriodType.ALL, content)
    );

    const { calcStats, status, statsResult } = useStatistics()

    useEffect(() => {
        calcStats(date, periodType)
    }, [date])

    const changeDate = (nextDate: Moment) => {
        setDate(nextDate);
    };

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
        items.forEach((item: Item, index: number) => {
            if (moment(item.StartDate).isSame(moment(date), "days")) {
                content.push(
                    <Typography variant={"subtitle1"}>{item.Pair}</Typography>
                );
            }
        });

        return <div>{content}</div>;
    };

    const createDateFormat = () => {
        switch (periodType) {
            case PeriodType.YEAR:
                return date.format("YYYY")
            case PeriodType.MONTH:
                return date.format("YYYY/MM")
            case PeriodType.DAY:
                return date.format("YYYY/MM/DD")
        }
    }

    const handleChangePeriod = (period: PeriodType) => {
        setPriodType(period)
    };


    const handleForwardDate = () => {
        console.log("forward", date)
        const datecp = date.clone()
        switch (periodType) {
            case PeriodType.YEAR:
                setDate(datecp.add(1, "year"));
                break
            case PeriodType.MONTH:
                setDate(datecp.add(1, "month"));
                break
            case PeriodType.DAY:
                setDate(datecp.add(1, "days"));
                break
        }
    };

    const handleBackDate = () => {
        const datecp = date.clone()
        switch (periodType) {
            case PeriodType.YEAR:
                setDate(datecp.subtract(1, "year"));
                break
            case PeriodType.MONTH:
                setDate(datecp.subtract(1, "month"));
                break
            case PeriodType.DAY:
                setDate(datecp.subtract(1, "days"));
                break
        }
    };
    const handleInitDate = () => {
        setDate(moment())
    };

    return (
        <MainLayout title="Calendar">
            <Grid className={classes.root} container>
                <Grid item xs={12} sm={9}>
                    <DateBar date={createDateFormat()} period={periodType} changePeriod={handleChangePeriod} initDate={handleInitDate} forwardDate={handleForwardDate} backDate={handleBackDate} />
                    <Calendar
                        className={classes.calendar}
                        tileClassName={classes.tile}
                        value={date.toDate()}
                        showNavigation={false}
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
                        <Statistics date={date} stats={statsResult} />
                    </Grid>
                    <Grid item className={classes.detail} xs={12} sm={12}>
                        <Details date={date} items={items} />
                    </Grid>
                </Grid>
            </Grid>

        </MainLayout>
    );
};

export default CalendarView;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.common.white,
        height: "100%"
    },
    tile: {
        backgroundColor: theme.palette.common.white,
        height: 150
    },
    detail: {
        height: "100%",
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
        backgroundColor: theme.palette.grey[100],
        height: "7%"
    },
}));

//export default CalendarView;
