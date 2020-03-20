import React, { useState, useCallback } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

export const useDialog = () => {


    const closeDialog = () => {
        console.log("close")
        setController({ ...controller, open: false })
    };

    const [controller, setController] = useState<ControlProps>({ open: false, closeDialog: closeDialog, dialogStatus: { title: "", description: "", "runFunc": () => { } } });

    const openDialog = (func: () => void, title: string, description: string) => {
        console.log("open")
        setController({ ...controller, open: true, dialogStatus: { title: title, description: description, runFunc: func } })

    };

    return { "openDialog": openDialog, "dialogController": controller }
}

interface DialogStatus {
    runFunc: () => void
    title: string
    description: string
}

interface ControlProps {
    open: boolean
    closeDialog: () => void
    dialogStatus: DialogStatus
}

interface Props {
    controller: ControlProps
}

const DialogComponent: React.FC<Props> = props => {
    const { open, closeDialog, dialogStatus } = props.controller
    const { runFunc, title, description } = dialogStatus

    return (
        <Dialog
            open={open}
            onClose={() => {
                closeDialog()
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    closeDialog()
                }} color="primary">
                    Cancel
            </Button>
                <Button onClick={() => {
                    runFunc()
                    closeDialog()
                }}
                    color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent