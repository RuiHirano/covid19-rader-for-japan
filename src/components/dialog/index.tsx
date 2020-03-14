import React, { useState } from "react";
import { Button, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

export const useDialog = () => {

    const [open, setOpen] = useState(false);

    const openDialog = () => {
        console.log("open")
        setOpen(true);
    };

    const closeDialog = () => {
        console.log("close")
        setOpen(false);
    };
  
    return { "open": open, "openDialog": openDialog, "closeDialog": closeDialog}
}

interface Props{
    open: boolean
    closeDialog: ()=>void
    runFunc: ()=>void
}

const DialogComponent: React.FC<Props> = props => {
    const {open, closeDialog, runFunc} = props

    return (
        <Dialog
            open={open}
            onClose={()=>{
                closeDialog()
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Run your command?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {"content"}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                closeDialog()
            }} color="primary">
                Cancel
            </Button>
            <Button onClick={()=>{
                runFunc()
                closeDialog()
            }} 
                color="primary" autoFocus>
                {"runtext"}
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent