import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
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
    TableRow
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Items, Item } from "../../../../types";

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

interface Props {
    items: Items;
}

const LatestOrders: React.FC<Props> = props => {
    const { items } = props;

    const classes = useStyles();

    //const [items] = useState(mockData);
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
                                {items.items.map((item: Item) => (
                                    <TableRow
                                        //className={classes.tableRow}
                                        hover
                                        key={item.ID}
                                    >
                                        <TableCell>{item.Pair}</TableCell>
                                        <TableCell>{item.TradeType}</TableCell>
                                        <TableCell>{item.Lot}</TableCell>
                                        <TableCell>{item.Profit}</TableCell>
                                        <TableCell>{item.StartDate}</TableCell>
                                        <TableCell>{item.EndDate}</TableCell>
                                        <TableCell>
                                            {item.BeforeComment}
                                        </TableCell>

                                        <TableCell>
                                            {item.AfterComment}
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
