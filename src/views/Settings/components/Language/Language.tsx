import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
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
import { Formik, yupToFormErrors, FormikValues } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { withRouter, match } from "react-router";
import * as H from "history";
import { useLoading } from "../../../../common/hooks/useLoading";
import { LoadingState } from "../../../../types";
import { userActions } from "../../../../redux/saga/User/userSaga";

export const useStyles = makeStyles(() => ({
    root: {},
    item: {
        display: "flex",
        flexDirection: "column"
    }
}));

// Container
interface ContainerProps {
    history: H.History;
    location: H.Location;
    match: match;
}
const LanguageContainer: React.FC<ContainerProps> = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const handleUpdateLanguage = (values: FormikValues) => {
        dispatch(
            userActions.updateLanguageAction({ language: values.language })
        );
    };

    const { isLoading, isFinishLoading } = useLoading(
        LoadingState.UPDATE_LANGUAGE
    );
    useEffect(() => {
        if (isFinishLoading) {
            history.push("/dashboard");
        }
    }, [isLoading]);

    return <Language handleUpdateLanguage={handleUpdateLanguage} />;
};

export default withRouter(LanguageContainer);

// Presentational
interface Props {
    handleUpdateLanguage: (values: FormikValues) => void;
}

export const Language: React.FC<Props> = props => {
    const { handleUpdateLanguage } = props;

    const classes = useStyles();

    return (
        <Card
        //{...rest}
        //className={clsx(classes.root, className)}
        >
            <Formik
                initialValues={{
                    language: "ja"
                }}
                onSubmit={values => handleUpdateLanguage(values)}
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
                            title="Language"
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
                                        Language
                                    </Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.language == "en" ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "language",
                                                        "en"
                                                    )
                                                }
                                            />
                                        }
                                        label="English"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={
                                                    values.language == "ja" ||
                                                    false
                                                }
                                                onChange={() =>
                                                    setFieldValue(
                                                        "language",
                                                        "ja"
                                                    )
                                                }
                                            />
                                        }
                                        label="Japanese"
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

//export default Language;
