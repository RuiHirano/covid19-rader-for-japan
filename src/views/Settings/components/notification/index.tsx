import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
    Typography,
    Button
} from "@material-ui/core";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
    User,
    Notification as NotificationType
} from "../../../../types";
import { withRouter, match } from "react-router";
import * as H from "history";
import { ReduxState } from "../../../../redux/module";
import { useUpdateUserInfo } from "../../../../redux/hooks/useUser";

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const NotificationContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const {updateUserInfo, status} = useUpdateUserInfo()
    const handleUpdateNotification = (values: FormikValues) => {
        const notification = values.notification;
        user.Setting.Notification = notification;
        updateUserInfo(user)
    };

    const user: User = useSelector((state: ReduxState) => state.User);
    let notification: NotificationType = user.Setting.Notification;

    return (
        <Notification
            handleUpdateNotification={handleUpdateNotification}
            notification={notification}
        />
    );
};

export default withRouter(NotificationContainer);

// Presentational
interface Props {
    handleUpdateNotification: (values: FormikValues) => void;
    notification: NotificationType;
}

export const Notification: React.FC<Props> = props => {
    const { handleUpdateNotification, notification } = props;

    const classes = useStyles();

    return (
        <Card>
            <Formik
                initialValues={{
                    notification: notification
                }}
                onSubmit={values => handleUpdateNotification(values)}
                validationSchema={Yup.object().shape({})}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    isSubmitting,
                    setFieldValue
                }) => (
                    <div>
                        <CardHeader
                            subheader="Manage the notifications"
                            title="Notifications"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={6} wrap="wrap">
                                <Grid
                                    className={classes.item}
                                    item
                                    md={4}
                                    sm={6}
                                    xs={12}
                                >
                                    <Typography gutterBottom variant="h6">
                                        Notifications
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.notification.Email ||
                                                    false
                                                }
                                                onChange={() => {
                                                    values.notification.Email = !values
                                                        .notification.Email;
                                                    setFieldValue(
                                                        "notification",
                                                        values.notification
                                                    );
                                                }}
                                            />
                                        }
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.notification.Push ||
                                                    false
                                                }
                                                onChange={() => {
                                                    values.notification.Push = !values
                                                        .notification.Push;
                                                    setFieldValue(
                                                        "notification",
                                                        values.notification
                                                    );
                                                }}
                                            />
                                        }
                                        label="Push Notifications"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => handleSubmit()}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </div>
                )}
            </Formik>
        </Card>
    );
};

const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));
