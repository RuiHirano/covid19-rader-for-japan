import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel,
    Checkbox
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import mockData from "./data2";
import { StatusBullet } from "../../../../components";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 800
    },
    statusContainer: {
        display: "flex",
        alignItems: "center"
    },
    status: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: "flex-end"
    }
}));

interface item {
    id: string;
    pair: string;
    class: string;
    lot: string;
    profit: string;
    startDate: number;
    endDate: number;
    beforeComment: string;
    afterComment: string;
    images: string[];
}

interface Props {
    items: item[];
}

const LatestOrders: React.FC = props => {
    //const { className, ...rest } = props;

    const classes = useStyles();

    const [items] = useState(mockData);
    //const { items } = props;

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardHeader
                action={
                    <Button color="primary" size="small" variant="outlined">
                        New entry
                    </Button>
                }
                title="Latest Orders"
            />
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pair</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Lot</TableCell>
                                    <TableCell>Profit</TableCell>
                                    <TableCell>StartDate</TableCell>
                                    <TableCell>EndDate</TableCell>
                                    <TableCell>BeforeComment</TableCell>
                                    <TableCell>AfterComment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow
                                        //className={classes.tableRow}
                                        hover
                                        key={item.id}
                                    >
                                        <TableCell>{item.pair}</TableCell>
                                        <TableCell>{item.class}</TableCell>
                                        <TableCell>{item.lot}</TableCell>
                                        <TableCell>{item.profit}</TableCell>
                                        <TableCell>{item.startDate}</TableCell>
                                        <TableCell>{item.endDate}</TableCell>
                                        <TableCell>
                                            {item.beforeComment}
                                        </TableCell>

                                        <TableCell>
                                            {item.afterComment}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
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

export default LatestOrders;
