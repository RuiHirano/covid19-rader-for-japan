import React, { useState } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Divider,
    Typography
} from "@material-ui/core";
import moment, { Moment } from "moment";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useSelector, useDispatch } from "react-redux";

import { Items, Item } from "../../../../types";
import { AppState } from "../../../../redux/module";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
    },
    tile: {
        backgroundColor: theme.palette.common.white,
        height: 125
    },
    content: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%"
    },
    actions: {
        justifyContent: "flex-end"
    },
    calendar: {
        backgroundColor: theme.palette.common.white,
        height: "100%",
        width: "100%"
    }
}));

interface tileContentProps {
    date: Date;
    view: string;
}

const LatestCalendar: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();
    const items: Items = useSelector((state: AppState) => state.Items);

    const [date, setDate] = useState(moment());

    const getFormatDate = (date: Date): string => {
        return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(
            -2
        )}${("0" + date.getDate()).slice(-2)}`;
    };

    const getTileContent = ({ date, view }: tileContentProps) => {
        // 月表示のときのみ
        if (view !== "month") {
            return null;
        }
        let content: any = [];
        items.items.forEach((item: Item, index: number) => {
            if (moment(item.StartDate).isSame(moment(date), "days")) {
                content.push(
                    <Typography variant={"subtitle1"}>{item.Pair}</Typography>
                );
            }
        });

        return <div>{content}</div>;
    };

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardHeader
                //subtitle={`${products.length} in total`}
                title="Latest Calendar"
            />
            <Divider />
            <CardContent className={classes.content}>
                <Calendar
                    className={classes.calendar}
                    tileClassName={classes.tile}
                    value={date.toDate()}
                    tileContent={getTileContent}
                    view={"month"}
                />
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
                <Button color="primary" size="small" variant="text">
                    View all <ArrowRightIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default LatestCalendar;
