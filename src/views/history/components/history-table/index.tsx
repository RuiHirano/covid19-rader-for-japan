import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    Button
} from "@material-ui/core";

import { Item } from "../../../../types";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useDispatch } from "react-redux";
import { useDeleteItem } from "../../../../redux/hooks/useItem";

const useStyles = makeStyles((theme: Theme) => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    nameContainer: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: "flex-end"
    }
}));

interface Props {
    items: Item[];
    history: H.History;
    location: H.Location;
    match: match;
}

const HistoryTable: React.FC<Props> = props => {
    //const { className, users, ...rest } = props;
    const { items, history } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState<Item>(items[0]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [page, setPage] = useState(0);

    /*const handleSelectAll = (event: any) => {
        let selectedUsers: string[];

        if (event.target.checked) {
            selectedUsers = items.map(item => item.id);
        } else {
            selectedUsers = [];
        }

        setSelectedUsers(selectedUsers);
    };

    const handleSelectOne = (event: any, id: string) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelectedUsers: string[] = [];

        if (selectedIndex === -1) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            newSelectedUsers = newSelectedUsers.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }

        setSelectedUsers(newSelectedUsers);
    };*/
    const {deleteItem, status} = useDeleteItem()

    const handleDelete = (item: Item) => {
        deleteItem(item)
    };

    const handleDetail = (item: Item) => {
        history.push("/detail/" + item.StartDate);
    };

    const handlePageChange = (event: any, page: number) => {
        setPage(page);
    };

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
    };

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                handleDelete(selectedItem)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() =>
                                                handleDetail(selectedItem)
                                            }
                                        >
                                            Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={false}
                                            color="primary"
                                            onChange={() => {}}
                                        />
                                    </TableCell>
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
                                {items.slice(0, rowsPerPage).map(item => (
                                    <TableRow
                                        //className={classes.tableRow}
                                        hover
                                        key={item.ID}
                                        selected={selectedItem.ID === item.ID}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={
                                                    selectedItem.ID === item.ID
                                                }
                                                color="primary"
                                                onChange={event =>
                                                    setSelectedItem(item)
                                                }
                                                value="true"
                                            />
                                        </TableCell>
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
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={items.length}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
        </Card>
    );
};

export default withRouter(HistoryTable);
