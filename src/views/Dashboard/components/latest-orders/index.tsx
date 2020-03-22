import React, { useState, useEffect } from "react";
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
    TableRow,
    IconButton
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Item } from "../../../../types";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import AlertComponent, { AlertType, useAlert } from "../../../../components/alert";
import { useDeleteItem } from "../../../../redux/hooks/useItem";
import DialogComponent, { useDialog } from "../../../../components/dialog";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter, match } from "react-router";
import * as H from "history";

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
    items: Item[];
    history: H.History;
    location: H.Location;
    match: match;
}

const convertTableItems = (items: Item[]) => {
    /* FileInfoをmaterial-table用に変換する */
    let tableItems: any[] = []
    items.forEach((item: Item) => {
        tableItems.push([
            item.StartDate, item.TradeType, item.Pair, item.Lot, item.Profit, item.BeforeComment, item.AfterComment
        ])
    })
    console.log("tableItem: ", tableItems)
    return tableItems
}

const LatestOrders: React.FC<Props> = props => {
    const { items } = props;

    //const { className, users, ...rest } = props;
    const { history } = props;
    //const items = useSelector((state: ReduxState) => state.Items)
    // alert
    const { openAlert, alertController } = useAlert()
    // dialog
    const { openDialog, dialogController } = useDialog()

    const [selectedItem, setSelectedItem] = useState<Item>(new Item)
    const { deleteItem, status } = useDeleteItem()

    const handleDelete = () => {
        console.log("delete: ", selectedItem)
        deleteItem(selectedItem)
    };

    useEffect(() => {
        console.log("signIn status change", status.Progress)
        if (status.Progress === 100) {
            openAlert(AlertType.SUCCESS, "finish run command")
        }
        if (status.Error !== "") {
            console.log("error occer: ", status.Error)
            openAlert(AlertType.ERROR, "error occur while running command")
        }

    }, [status])

    const handleEdit = (item: Item) => {
        console.log("edit: ", item)
        history.push("/entry/" + item.ID);
    };


    const columns = ["Date", "TradeType", "Pair", "Lot", "Profit", "BeforeComment", "AfterComment"];

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        selectableRows: 'single',
        customToolbarSelect: (selectedRows: any) => (
            <div>
                <IconButton
                    onClick={() => {
                        const index: number = selectedRows.data[0].index
                        console.log("edit", index, items)
                        handleEdit(items[index])
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    onClick={() => {
                        const index: number = selectedRows.data[0].index
                        //handleDelete(items[index])
                        setSelectedItem(items[index])
                        openDialog(handleDelete, "Delete Item", "Are you sure delete?")
                    }}
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    };

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <MUIDataTable
                title={"Trade List"}
                data={convertTableItems(items)}
                columns={columns}
                options={options}
            />
            <DialogComponent controller={dialogController} />
            <AlertComponent controller={alertController} />
        </div>
    )
};

export default withRouter(LatestOrders);
