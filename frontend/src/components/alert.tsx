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




export const useAlert = () => {

    //const [alertType, setAlertType] = useState<AlertType>(AlertType.NONE);
    const [alertStatus, setAlertStatus] = useState<AlertStatus>({ AlertType: AlertType.NONE, Message: "" });


    const openAlert = (alertType: AlertType, message: string) => {
        setController({ ...controller, alertStatus: { AlertType: alertType, Message: message } })
    };

    const closeAlert = () => {
        setController({ ...controller, alertStatus: { AlertType: AlertType.NONE, Message: "" } })

    };
    const [controller, setController] = useState<ControlProps>({ closeAlert: closeAlert, alertStatus: { AlertType: AlertType.NONE, Message: "" } });


    return { "openAlert": openAlert, "alertController": controller }
}


interface AlertStatus {
    AlertType: AlertType
    Message: string
    Duration?: number
}

interface ControlProps {
    alertStatus: AlertStatus
    closeAlert: () => void
}

interface Props {
    controller: ControlProps
}

const AlertComponent: React.FC<Props> = (props) => {
    const { closeAlert, alertStatus } = props.controller

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
    } else {
        return <div />
    }
}

export default AlertComponent