import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import mockData from "./data";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100%"
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

    const [products] = useState(mockData);

    const [date, setDate] = useState([
        new Date(2019, 10, 13),
        new Date(2019, 10, 14)
    ]);
    const [items, setItems] = useState({
        20191101: { is_holiday: true },
        20191102: { is_holiday: true },
        20191103: { is_holiday: true },
        20191106: { is_holiday: true },
        20191114: { text: "バシャログ執筆" },
        20191117: { text: "バシャログ出稿" }
    });

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
        const day: string = getFormatDate(date);
        const itemsData: any = items;
        return (
            <p>
                <br />
                {itemsData[day] && itemsData[day].text
                    ? itemsData[day].text
                    : " "}
            </p>
        );
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
                    value={date}
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
