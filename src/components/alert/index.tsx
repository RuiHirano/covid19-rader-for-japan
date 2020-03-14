import React, { useState } from "react";
import { 
    Snackbar, 
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export enum AlertType {
    ERROR,
    SUCCESS,
    NONE
}

interface Props{
    alertStatus: AlertStatus
    closeAlert: ()=>void
}

interface AlertStatus{
    AlertType: AlertType
    Message: string
}

export const useAlert = () => {

    //const [alertType, setAlertType] = useState<AlertType>(AlertType.NONE);
    const [alertStatus, setAlertStatus] = useState<AlertStatus>({AlertType: AlertType.NONE, Message: ""});

    const openAlert = (alertType: AlertType, message: string) => {
        const newStatus: AlertStatus = {AlertType: alertType, Message: message}
        setAlertStatus(newStatus)
        //setAlertType(alertType)
    };

    const closeAlert = () => {
        const newStatus: AlertStatus = {AlertType: AlertType.NONE, Message: ""}
        setAlertStatus(newStatus)
        //setAlertType(AlertType.NONE);
    };
  
    return { "openAlert": openAlert, "closeAlert": closeAlert, "alertStatus": alertStatus}
}

const AlertComponent: React.FC<Props> = (props) => {
    const {closeAlert, alertStatus} = props
    //const [open, setOpen] = React.useState(props.open);
    console.log("alert: ")

    if (alertStatus.AlertType === AlertType.SUCCESS) {
        return (
            <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={closeAlert}
            >
                <Alert onClose={closeAlert} severity="success">
                    {alertStatus.Message}
                </Alert>
            </Snackbar>
        );
    } else if (alertStatus.AlertType === AlertType.ERROR) {
        return (
            <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={closeAlert}
            >
                <Alert onClose={closeAlert} severity="error">
                    {alertStatus.Message}
                </Alert>
            </Snackbar>
        );
    }else{
        return <div/>
    }
}

export default AlertComponent